var stream = require("stream");
const uuidv4 = require("uuid/v4");
const s3 = require("../config/s3.config.js");

var counter = uuidv4();
var filename;
exports.doUpload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;
  filename = "";

  req.file.originalname = counter + req.file.originalname;
  console.log(req.file.originalname);
  params.Key = req.file.originalname;
  params.Body = req.file.buffer;

  //   filename = req.file.originalname;
  const linkhalf = "https://problem-image-upload.s3.ap-south-1.amazonaws.com/";
  filename = req.file.originalname;
  url = linkhalf + filename;
  filename = req.file.originalname;
  s3Client.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error -> " + err });
    }
    res.json({
      message:
        "File uploaded successfully! -> keyname = " + req.file.originalname,
      file_name: filename,
      primary_key: counter,
      S3_url: url
    });
  });
};
exports.filename = filename;
exports.counter = counter;
