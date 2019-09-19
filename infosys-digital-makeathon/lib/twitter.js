var Twit = require('twit');
const citizensApp = require('../routes/models/citizens_app/query');
const citizensAppInsert = require('../routes/models/citizens_app/insert');

function twitter () {
    console.log("Listening for tweets hashtag => #CitizensAppMakeathon");

    var T = new Twit({
        consumer_key:         process.env.consumer_key,
        consumer_secret:      process.env.consumer_secret,
        access_token:         process.env.access_token,
        access_token_secret:  process.env.access_token_secret,
        timeout_ms:           60*1000,
        strictSSL:            true,
    });

    var stream = T.stream('statuses/filter', { track: '#CitizensAppMakeathon', language: 'en' });
    stream.on('tweet', function (tweet) {
        var info = {
            origin: tweet.created_at,
            email: tweet.text.match(/^Email\:(.)*$/gm)[0].split(":")[1],
            description: tweet.text.match(/^Description\:(.)*$/gm)[0].split(":")[1],
            area: tweet.text.match(/^Area\:(.)*$/gm)[0].split(":")[1],
            city: tweet.text.match(/^City\:(.)*$/gm)[0].split(":")[1],
            problemTag: tweet.text.match(/^Problem Tag\:(.)*$/gm)[0].split(":")[1]
        };

        (async() => {
            let data = await cacheTweet(info);
            console.log(data);
        })().catch(function(err){
            console.log(err);
        });
    });
}

function cacheTweet (tweetInfo) {
    return new Promise(async (resolve, reject) => {
        if (tweetInfo.origin && tweetInfo.description && tweetInfo.area && tweetInfo.problemTag && tweetInfo.email && tweetInfo.city) {
            
            // check if user exist in database from email
            var cid = await citizensApp.getCitizenByEmail(tweetInfo.email);
            if(!cid.citizens[0]) {
                cid = 'c7fb4953-2596-4f4b-84a5-4a00463af249';
            } else {
                cid = cid.citizens[0].CitizenID;
            }
    
            // check if problemTag exist in database
            var tid = await citizensApp.problemTagByName(tweetInfo.problemTag);
            if(!tid.problem_tags[0]) {
                tid = -1;
            } else {
                tid = tid.problem_tags[0].TagID;
            }
            
            // check if area exist in database
            var aid = await citizensApp.queryAreaByName(tweetInfo.area);
            if(!aid.area[0]) {
                reject("Invalid Area");
            } else {
                aid = aid.area[0].AreaID;
            }
    
            // if all above true then insert in DB and resolve
            // else reject
            var problemID = Math.floor((Math.random() * 1000000000) + 1000000000000);
            var res = await citizensAppInsert.insertProblem(aid, cid, tweetInfo.description, problemID, tid);
            resolve("Tweet Inserted in DB");
        } else {
            reject("Invalid Tweet !");
        }
    });
}


twitter();

// module.exports = { cacheTweet }