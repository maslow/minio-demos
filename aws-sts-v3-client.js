


const { S3, PutObjectCommand, ListBucketsCommand, ListObjectsCommand, ListObjectsV2Command, ListObjectsRequest, WebsiteConfiguration } = require('@aws-sdk/client-s3')

const token = require('./sts-credentials.json')

const s3 = new S3({
  endpoint: 'http://127.0.0.1:9021',
  region: 'us-east-1',
  credentials: {
    accessKeyId: token.AccessKeyId,
    secretAccessKey: token.SecretAccessKey,
    sessionToken: token.SessionToken,
    expiration: token.Expiration
  },
  forcePathStyle: true
})


async function main() {
  const bn = '9b069020-06e3-4949-83d9-992a52ca99fe-public'

  // const cmd = new PutObjectCommand({
  //   Bucket: bn, Key: 'index.html', Body: 'Hello from MinIO!!' , ContentType: 'text/html'
  // })

  // const res = await s3.send(cmd)
  // console.log(res)

  // const cmd2 = new ListBucketsCommand({})
  // console.log(await s3.send(cmd2))

  const cmd3 = new ListObjectsCommand({ Bucket: 'test-test', MaxKeys: 2, Delimiter: '/' })
  const res = await s3.send(cmd3)
  console.log(res.Contents)
}

main()