const graphqlrequest = require('graphql-request');
const GraphQLClient = graphqlrequest.GraphQLClient;

const queryState = async (StateID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        State(where: {StateID: {_eq: "${StateID}"}}) {
            GovtID
            StateID
            StateName
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const queryArea = async (AreaID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        area(where: {AreaID: {_eq: "${AreaID}"}}) {
            AreaID
            AreaName
            CityID
            GovtID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const queryAreaByName = async (areaName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        area(where: {AreaName: {_eq: "${areaName}"}}) {
            AreaID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getCitizenByEmail = async (emailID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        citizens(where: {Email: {_eq: "${emailID}"}}) {
            CitizenID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getCitizenByID = async (citizenID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        citizens(where: {CitizenID: {_eq: "${citizenID}"}}) {
            FirstName
            LastName
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getAreaofCitizen = async (citizenID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        citizens(where: {CitizenID: {_eq: "${citizenID}"}}) {
            Area
            City
            State
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getCityBYGovtID = async (govtID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        city(where: {GovtID: {_eq: "${govtID}"}}) {
            CityID
            CityName
            GovtID
            StateID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getDigitalSignatures = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        digital_signatures(where: {ProblemID: {_eq: "${ProblemID}"}}) {
            ProblemID
            Signature
            SignerID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getGovtEmpData = async (userID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        government_official(where: {GovtID: {_eq: "${userID}"}}) {
            AreaCode
            CityCode
            Email
            FirstName
            GovtID
            LastName
            Phone
            StateCode
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getGovtEmpDataByArea = async (areaID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        government_official(where: {AreaCode: {_eq: "${areaID}"}}) {
            Email
            FirstName
            LastName
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const problemTagEvent = async (TagID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        problem_tags(where: {TagID: {_eq: "${TagID}"} }) {
            TagID
            TagName
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const problemTagByName = async (tagName) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        problem_tags(where: {TagName: {_eq: "${tagName}"} }) {
            TagID
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const problemFeed = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems {
            Area
            DigitalSignaturesCount
            OriginTImeStamp
            ProbemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
            UpVotes
            DownVotes
        }
    }`;
    let result = await client.request(query)
        .then(data => { 
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const problemTags = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problem_tags {
            TagID
            TagName
        }
    }`;
    let result = await client.request(query)
        .then(data => { 
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const area = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        area {
            AreaID
            AreaName
            GovtID
            CityID
        }
    }`;
    let result = await client.request(query)
        .then(data => { 
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const city = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        city {
            CityID
            CityName
            StateID
            GovtID
        }
    }`;
    let result = await client.request(query)
        .then(data => { 
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const states = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        State {
            StateID
            StateName
            GovtID
        }
    }`;
    let result = await client.request(query)
        .then(data => { 
            return data;
        })
        .catch((err) => { return err });
    return result;
};
const getProblemOfUser = async (ProblemRaiserID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        problems(where: {ProblemRaiserID: {_eq: "${ProblemRaiserID}"}}) {
            Area
            DigitalSignaturesCount
            OriginTImeStamp
            ProblemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
            UpVotes
            DownVotes
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getStatusWithStatusCode = async (StatusCode) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        status(where: {StatusCode: {_eq: "${StatusCode}"}}) {
            StatusCode
            StatusDescription
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const searchProblemsByArea = async (AreaCode) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = ` {
        problems(where: {Area: {_eq: "${AreaCode}"}}) {
            Area
            DigitalSignaturesCount
            DownVotes
            OriginTImeStamp
            ProblemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
            UpVotes
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const searchProblemsByUserID = async (UserID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {ProbemRaiserID: {_eq: "${UserID}"}}) {
            Area
            DigitalSignaturesCount
            DownVotes
            OriginTImeStamp
            ProbemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
            UpVotes
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const searchProblemsByGovtID = async (GovtID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {relationship_area: {GovtID: {_eq: "${GovtID}"}}}) {
            Area
            DigitalSignaturesCount
            DownVotes
            OriginTImeStamp
            ProbemRaiserID
            ProblemDescription
            ProblemID
            ProblemTag
            ResolveTimeStamp
            Status
            UpVotes
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
const getKeys = async (citizenID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        keys(where: {CitizenID: {_eq: "${citizenID}"}}) {
            PrivateKey
            PublicKey
        }
    }`;
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err });
    return result;
};
//govt
const totalproblems = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems {
            ProblemID
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    console.log(result.problems.length)
    return result
};
const activeProblems = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {Status: {_eq: "0"}}) {
            relationship_status {
                StatusCode
            }
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result.problems.length
};
const resolvedProblems = async () => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {Status: {_eq: "1"}}) {
            relationship_status {
                StatusCode
            }
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result.problems.length
};
const getUpvotes = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {ProblemID: {_eq: "${ProblemID}"}}) {
            UpVotes
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    // console.log(result.problems.length)
    return result
};
const getDownvotes = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    const query = `{
        problems(where: {ProblemID: {_eq: "${ProblemID}"}}) {
            DownVotes
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    // console.log(result.problems.length)
    return result
};
const UpVote = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    let upvotecount = await getUpvotes(ProblemID);
    // console.log(upvotecount.problems[0].UpVotes);
    let count = upvotecount.problems[0].UpVotes;
    const query = `mutation {
        update_problems(where: {ProblemID: {_eq: "${ProblemID}"}}, _set: {UpVotes: "${++count}"}) {
            affected_rows
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result
};
const DownVote = async (ProblemID) => {
    const client = new GraphQLClient('https://msit-makeathon.herokuapp.com/v1/graphql', {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'makeathonmsit'
        },
    })
    let upvotecount = await getDownvotes(ProblemID);
    console.log(upvotecount.problems[0].DownVotes);
    let count = upvotecount.problems[0].DownVotes;
    const query = `mutation {
        update_problems(where: {ProblemID: {_eq: "${ProblemID}"}}, _set: {DownVotes: "${++count}"}) {
            affected_rows
        }
    }`
    let result = await client.request(query)
        .then(data => { return data })
        .catch((err) => { return err })
    return result
};
exports.queryState = queryState;
exports.queryArea = queryArea;
exports.getCitizenByEmail = getCitizenByEmail;
exports.getCitizenByID = getCitizenByID;
exports.getCityBYGovtID = getCityBYGovtID;
exports.getDigitalSignatures = getDigitalSignatures;
exports.getGovtEmpData = getGovtEmpData;
exports.problemTagEvent = problemTagEvent;
exports.problemFeed = problemFeed;
exports.getProblemOfUser = getProblemOfUser;
exports.getStatusWithStatusCode = getStatusWithStatusCode;
exports.getAreaofCitizen = getAreaofCitizen;
exports.searchProblemsByArea = searchProblemsByArea;
exports.searchProblemsByUserID = searchProblemsByUserID;
exports.searchProblemsByGovtID = searchProblemsByGovtID;
exports.getKeys = getKeys;
exports.problemTags = problemTags;
exports.area = area;
exports.city = city;
exports.states = states;
exports.getGovtEmpDataByArea = getGovtEmpDataByArea;
exports.totalproblems = totalproblems;
exports.activeProblems = activeProblems;
exports.resolvedProblems = resolvedProblems;
exports.getUpvotes = getUpvotes;
exports.getDownvotes = getDownvotes;
exports.UpVote = UpVote;
exports.DownVote = DownVote;
exports.queryAreaByName = queryAreaByName;
exports.problemTagByName = problemTagByName;