import mongoose from "mongoose";
import Course from "./course.js";
import User from "./user.js";
const { Schema } = mongoose;

const homeworkSchema = new Schema({
  name: { type: String, required: true },
  course_id: { type: mongoose.Types.ObjectId, ref: Course, required: true },
  question: { type: String, required: true, default: 'Not specified' },
  points: { type: Number, required: true, default: 0 },
});

const Homework = mongoose.model('homework', homeworkSchema);

const submissionSchema = new Schema({
  homework_id: { type: mongoose.Types.ObjectId, ref: Homework, required: true },
  submitted_by: { type: mongoose.Types.ObjectId, ref: User, required: true },
  graded_by: { type: mongoose.Types.ObjectId, ref: User },
  answer: { type: String, required: true },
  grade: Number,
  objected: { type: Boolean, default: false }
});

const Submission = mongoose.model('submission', submissionSchema);

const submissionGroupSchema = new Schema({
  homework_id: { type: mongoose.Types.ObjectId, ref: Homework, required: true },
  group: [{
    submitter: { type: mongoose.Types.ObjectId, ref: User },
    grader: { type: mongoose.Types.ObjectId, ref: User }
  }]
});

const SubmissionGroup = mongoose.model('submission_group', submissionGroupSchema);

export { Homework, Submission, SubmissionGroup };
