// import entire SDK
const aws = require('aws-sdk')

const sts = new aws.STS({
  apiVersion: '2011-06-15',
  endpoint: 'http://localhost:9000',
  accessKeyId: 'admin',
  secretAccessKey: 'password',
  s3ForcePathStyle: true,
  region: 'us-east-1',
});

const params = {
  DurationSeconds: 3600,
  Policy: '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"s3:*","Resource":"arn:aws:s3:::*"}]}',
  RoleArn: 'arn:xxx:xxx:xxx:xxxx',
  RoleSessionName: 'anything',
};

sts.assumeRole(params, async function (err, data) {

  const credentials = data.Credentials
  console.log(credentials)
  console.log(data)
});
