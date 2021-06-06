const AWS = require('ibm-cos-sdk')

//const s3Endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT)

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  apiKeyId: process.env.S3_ACCESS_KEY,
  serviceInstanceId: process.env.S3_SECRET_ACCESS,
})

module.exports = s3

// {
//     "apikey": "kHkbGtoRYcwx35C6VniL6yyqrWMHxGHSlcWjOoLrC1N6",
//     "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
//     "iam_apikey_description": "Auto-generated for key a82fc56a-3e29-49c4-b7ea-53f1465c3475",
//     "iam_apikey_name": "Service credentials-1",
//     "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
//     "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/c196c7f7bbe4416f8427e872f3e11d72::serviceid:ServiceId-c6bc9334-d266-4d97-9a1b-3cb04ddcb86c",
//     "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/c196c7f7bbe4416f8427e872f3e11d72:59c53072-ab6b-4ffa-9912-541e7f308631::"
// }
