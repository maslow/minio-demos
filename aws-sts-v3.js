


const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts");

const sts = new STSClient({
  region: 'us-east-1',
  endpoint: 'http://127.0.0.1:9021',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'minio-root-password',
    // accessKeyId: 'admin',
    // secretAccessKey: 'password'
  }
})


const bn = '9b069020-06e3-4949-83d9-992a52ca99fe-public'

async function main() {
  const cmd = new AssumeRoleCommand({
    DurationSeconds: 3600,
    Policy: '{"Version":"2012-10-17","Statement":[{"Sid":"Stmt1","Effect":"Allow","Action":"s3:*","Resource":"arn:aws:s3:::*"}]}',
    // RoleArn: 'arn:xxx:xxx:xxx:xxxx',
    // RoleSessionName: 'anything'
  })

  const res = await sts.send(cmd)
  console.log(JSON.stringify(res.Credentials))

  require('fs').writeFileSync('sts-credentials.json', JSON.stringify(res.Credentials), 'utf-8')
}

main()