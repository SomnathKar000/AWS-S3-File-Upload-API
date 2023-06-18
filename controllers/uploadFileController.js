const AWS = require("aws-sdk");
const { customError, buildResponse } = require("../utils/custom-response");
const S3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

const handler = async (event) => {
  console.log(event);
  try {
    const reqBody = JSON.parse(event.body);
    const base64File = reqBody.file;
    const decodedFile = Buffer.from(
      base64File.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const params = {
      Bucket: BUCKET_NAME,
      Key: `images/${new Date().toISOString()}.jpeg`,
      Body: decodedFile,
      ContentType: "image/jpeg",
    };

    const result = await S3.upload(params).promise();

    const body = {
      message: "Uploaded image successfully",
      result,
    };

    return buildResponse(body);
  } catch (error) {
    return customError(500, error.message, error.stack);
  }
};

module.exports = handler;
