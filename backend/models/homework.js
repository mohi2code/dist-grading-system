import mongoose from "mongoose";
import Course from "./course.js";
import User from "./user.js";
const { Schema } = mongoose;

const homeworkSchema = new Schema({
  name: { type: String, required: true },
  course_id: { type: mongoose.Types.ObjectId, ref: Course, required: true },
  question: { type: String, required: true },
  points: { type: Number, required: true }
});

const Homework = mongoose.model('homework', homeworkSchema);

const submissionSchema = new Schema({
  homework_id: { type: mongoose.Types.ObjectId, ref: Homework, required: true },
  submitted_by: { type: mongoose.Types.ObjectId, ref: User, required: true },
  edited_by: { type: mongoose.Types.ObjectId, ref: User },
  answer: { type: String, required: true },
  grade: Number,
  objected: { type: Boolean, default: false }
});

const Submission = mongoose.model('submission', submissionSchema);

export { Homework, Submission };
