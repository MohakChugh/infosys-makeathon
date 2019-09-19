const express = require('express')
const app = express()
const s3FileUpload = require('./app/multipleupload/multiupload');
const port = 8080
let router = require('./app/routers/upload.router.js');
app.use('/', router);
app.use('/api', s3FileUpload);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});