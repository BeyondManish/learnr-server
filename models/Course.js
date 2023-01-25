import mongoose from 'mongoose';


/**
 * @openapi
 * components:
 *  schemas:
 *   Course:
 *    type: object
 *    required:
 *     - courseTitle
 *     - courseSlug
 *     - courseDescription
 *     - courseCreator
 *     - courseImage
 *    properties:
 *     courseTitle:
 *      type: string
 *      default: Course Title
 *     courseSlug:
 *      type: string
 *      default: course-title
 *      unique: true
 *     courseDescription:
 *      type: string
 *      default: Course Description
 */

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseSlug: {
    type: String,
    required: true,
    unique: true,
  },
  courseDescription: {},
  courseCreator: {
    type: String,
    required: true,
  },
  curatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  courseContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseContent',
  }],
  courseImage: {
    type: String,
    required: true,
  },
  courseIsPublished: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;