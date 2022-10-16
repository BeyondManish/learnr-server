import mongoose from 'mongoose';
import { ObjectId } from 'mongoose.Schema.Types';

const mediaSchema = new mongoose.Schema({
    url: String,
    public_id: String,
    postedBy: {
        type: ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

export default Media;