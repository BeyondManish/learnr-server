import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';

const s3 = new AWS.S3(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
  }
);

export const uploadImage = (req, res, next) => {
  let { image, name, type } = req.body;
  const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  type = type.split('/')[1];
  const params = {
    Bucket: 'learnrapp',
    Key: `content-images/${name}-${nanoid(15)}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'Base64',
    ContentType: `image/${type}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(200).json({ url: data.Location });
  });
};