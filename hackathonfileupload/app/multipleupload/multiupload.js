var express = require('express');
var router = express.Router();
var multer = require('multer');
var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');
var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  }
});
const linkhalf = "https://problem-image-upload.s3.ap-south-1.amazonaws.com/";
var u = uuidv4();
var multipleUpload = multer({ storage: storage }).array('file');
const BUCKET_NAME = '<>';
const IAM_USER_KEY = '<>';
const IAM_USER_SECRET = '<>';
router.post('/upload', multipleUpload, function (req, res) {
  const file = req.files;
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    region: "us-east-2"
  });
  s3bucket.createBucket(function () {
    // let Bucket_Path = 'http://problem-image-upload.s3.us-east-2.amazonaws.com';

    var ResponseData = [];
    var u = uuidv4()
    file.map((item) => {
      var params = {
        Bucket: BUCKET_NAME,
        Key: u + item.originalname,
        Body: item.buffer,
        ACL: 'public-read',
        uuid: u,
        url: linkhalf + u + item.originalname
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          res.json({ "error": true, "Message": err });
        } else {
          data.url = linkhalf + u + item.originalname;
          data.uuid = u;
          ResponseData.push(data);
          console.log(data);

          if (ResponseData.length == file.length) {
            res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: ResponseData });
          }
        }
      });
    });
  });
});
module.exports = router;