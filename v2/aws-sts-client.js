

const S3 = require('aws-sdk/clients/s3');

const token = {"AccessKeyId":"ISLN3L18FB13E5OW27B9","SecretAccessKey":"lQkXYlhsz7LYdNE1aIEwV4RemKz7sG1jlzmTbKVl","SessionToken":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJJU0xOM0wxOEZCMTNFNU9XMjdCOSIsImV4cCI6MTY0ODk5OTUwMywicGFyZW50IjoiYWRtaW4iLCJzZXNzaW9uUG9saWN5IjoiZXlKV1pYSnphVzl1SWpvaU1qQXhNaTB4TUMweE55SXNJbE4wWVhSbGJXVnVkQ0k2VzNzaVUybGtJam9pVTNSdGRERWlMQ0pGWm1abFkzUWlPaUpCYkd4dmR5SXNJa0ZqZEdsdmJpSTZJbk16T2lvaUxDSlNaWE52ZFhKalpTSTZJbUZ5YmpwaGQzTTZjek02T2pvcUluMWRmUT09In0.Bqah7u5GMT6ff_9k36dPn32JgjvH4s6Odoq_h46pVKgK8MgisHuWQxqML2BV5vWJ-_SNiLQMD5arOKiLjJrG5A","Expiration":"2022-04-03T15:25:03.000Z"}
var s3 = new S3({
  accessKeyId: token.AccessKeyId,
  secretAccessKey: token.SecretAccessKey,
  sessionToken: token.SessionToken,
  endpoint: 'http://127.0.0.1:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
  region: 'us-east-1'
});


const bn = '9b069020-06e3-4949-83d9-992a52ca99fe.public'

// var params = { Bucket: bn, Key: 'testobject.html', Body: 'Hello from MinIO!!' };

// s3.putObject({ ...params, ContentType: 'text/html' }, function (err, data) {
//   if (err)
//     console.log(err)
//   else
//     console.log("Successfully uploaded data to testbucket/testobject");
// });

s3.listBuckets().send((err, data) => {
  console.log(data)
})

// const res = s3.getSignedUrl('getObject', { Bucket: bn, Key: 'testobject.html' })
// console.log(res)
