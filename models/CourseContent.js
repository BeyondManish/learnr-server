import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CourseContentSchema = new Schema({
  title: String,
  description: String,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }
});

export default mongoose.model('CourseContent', CourseContentSchema);
