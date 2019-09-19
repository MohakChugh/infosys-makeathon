const s3 = require('aws-s3');
const config = {
    bucketName: '<BUCKET NAME>',
    dirName: '<>DIR NAME', /* optional */
    region: '<REGION NAME>',
    accessKeyId: '<ACCESS ID>',
    secretAccessKey: '<SECRET ACCESS KEYS>'
}
const S3Client = new s3(config);

const upload = async (file, newFileName) => {

};

const del = async (filename) => {

}

exports.upload = upload;
exports.del = del;