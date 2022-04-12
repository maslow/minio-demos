
const cp = require('child_process')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')


const target = process.argv[2] || 'oss1'
const target_port = process.argv[3] || 9021

const passwd = 'minio-root-password'
const policies_dir = path.resolve('./test-policies')
fs.mkdirSync(policies_dir)

exec(`mc alias set ${target} http://localhost:${target_port} minio-root-user minio-root-password`)

main()

function main() {
  for (let i = 0; i < 10000; i++) {
    const appid = crypto.randomUUID()
    // generatePolicy(appid)
    // createPolicy(appid)
    createUser(appid)
    setPolicy(appid)
    console.log(i)
  }
}

function setPolicy(appid) {
  // const policy = `app_${appid}`
  const policy = 'test-common-policy'
  const cmd = `mc admin policy set ${target} ${policy} user=${appid}`
  exec(cmd)
}


function createUser(appid) {
  const cmd = `mc admin user add ${target} ${appid} ${passwd}`
  exec(cmd)
}

function createPolicy(appid) {
  const name = `app_${appid}`
  const filepath = path.join(policies_dir, `${name}.json`)
  const cmd = `mc admin policy add ${target} ${name} ${filepath}`
  exec(cmd)
}


function generatePolicy(appid) {
  const data = `
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListMultipartUploadParts",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:GetBucketLocation",
                "s3:GetBucketPolicy",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:ListBucketMultipartUploads"
            ],
            "Resource": [
                "arn:aws:s3:::${appid}-*"
            ]
        }
    ]
  }
  `
  fs.writeFileSync(path.join(policies_dir, `app_${appid}.json`), data)
}

function exec(cmd) {
  const res = cp.execSync(cmd)
  console.log(res.toString('utf-8'))
}