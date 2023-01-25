import catchAsync from '../utils/catchAsync.js';
import axios from 'axios';
import AppError from '../utils/AppError.js';

export const getYoutubePlaylistItems = catchAsync(async (req, res, next) => {
  const { playlistId } = req.params;
  console.log(req.query);
  console.log(playlistId);
  await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlistId}&key=${process.env.GOOGLE_API_KEY}`).then((data) => {
    return res.status(200).json({
      status: 'success',
      message: 'Playlist loaded',
      data: data.data,
    }).catch((err) => next(new AppError("Couldn't load playlist", 500)));
  });
});