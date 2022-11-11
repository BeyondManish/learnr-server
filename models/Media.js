import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    url: String,
    location: String,
    fileName: String,
    fileType: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

export default Media;