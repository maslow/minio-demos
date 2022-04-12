const Minio = require('minio');
const { CloudFunctionConfig } = require('minio/dist/main/notification');

const token = require('../sts-credentials.json')

const oss = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: token.AccessKeyId,
  secretKey: token.SecretAccessKey,
  sessionToken: token.SessionToken,
  region: 'us-east-1'
});




async function main() {
  const bn = '9b069020-06e3-4949-83d9-992a52ca99fe.public'
  try {
    // const res = await oss.presignedUrl('GET', bn, 'testobject.html')
    // console.log(res)

    // console.log(await oss.presignedPutObject(bn, '微草轻课产品分析设计.pdf', 3600))

    const res = await oss.listObjects(bn)

    res.on('data', item => {
      console.log(item)
    })

  } catch (error) {
    console.log(error)
  }
}

main().then(() => console.log('exited'))



// const oss = cloud.createOSS(region)

// function createOSS({ region }) {
//   const client = new Minio.Client({ endPoint, port, accessKey, secretKey, region})

//   client.presignedUrl = (...params) => {
//     region = region || 'default'
//     const _client = new Minio.Client({ endPoint: accessEndPoint, port, accessKey, secretKey, region })
//     return _client.presignedGetObject(...params)
//   }

//   return client
// }

// oss.presignedUrl('bucketname', 'filename.txt')