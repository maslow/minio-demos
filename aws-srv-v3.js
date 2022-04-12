

// const S3 = require('aws-sdk/clients/s3');
const { S3, GetObjectCommand, PutObjectCommand, ListBucketsCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const s3 = new S3({
  endpoint: 'http://127.0.0.1:9000',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'minio-root-password',
  },
  forcePathStyle: true
})

// // putObject operation.
const bn = '9b069020-06e3-4949-83d9-992a52ca99fe-public'

async function main() {
  try {

    const r = await s3.send(new GetObjectCommand({ Bucket: bn, Key: 'testobject.html' }))

    const stream = require('fs').createWriteStream('./tmp.txt')
    r.Body.pipe(stream)

    const cmd = new PutObjectCommand({ Bucket: bn, Key: 'index.html', ContentType: 'text/html', Body: 'Hello from MinIO!!' })
    const res = await s3.send(cmd)
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}
 
main()