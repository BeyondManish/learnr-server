import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import Media from '../models/Media.js';
import catchAsync from '../utils/catchAsync.js';

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

  s3.upload(params, async (err, data) => {
    if (err) {
      return res.status(500).json({ err });
    }

    const media = await Media.create({
      url: data.Location,
      location: data.key,
      fileName: data.key.split('/')[1],
      fileType: data.key.split('.')[1],
      postedBy: req.user._id
    });
    console.log(media);

    res.status(200).json({ media });
  });
};

export const loadAllMedias = catchAsync(async (req, res, next) => {
  const medias = await Media.find();
  res.status(200).json({ status: "success", message: "All media fetched", medias });
});

export const deleteImage = catchAsync(async (req, res) => {
  const imageId = req.params.id;
  await Media.findByIdAndDelete({ _id: imageId });
  res.status(204).json({ status: "success", message: "Image deleted" });
});