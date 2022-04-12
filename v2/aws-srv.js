

const S3 = require('aws-sdk/clients/s3');

var s3 = new S3({
  // accessKeyId: 'test-rocky',
  // secretAccessKey: '123456789',
  accessKeyId: 'admin',
  secretAccessKey: 'password',
  endpoint: 'http://127.0.0.1:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});


// putObject operation.

const bn = '9b069020-06e3-4949-83d9-992a52ca99fe.public'

// var params = { Bucket: bn, Key: 'testobject.html', Body: 'Hello from MinIO!!' };

// s3.putObject({ ...params, ContentType: 'text/html' }, function (err, data) {
//   if (err)
//     console.log(err)
//   else
//     console.log("Successfully uploaded data to testbucket/testobject");
// });

// s3.listBuckets().send((err, data) => {
//   console.log(data)
// })

const res = s3.getSignedUrl('getObject', { Bucket: bn, Key: 'testobject.html' })
console.log(res)
