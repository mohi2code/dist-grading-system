import mongoose from "mongoose";
import User from './user.js'
const { Schema } = mongoose;

const homeworkSchema = new Schema({

})

const courseSchema = new Schema({
  name: { type: String, required: true },
  instructor: { type: mongoose.Types.ObjectId, ref: User },
  passing_grade: { type: Number, required: true },
  number_of_homeworks: { type: Number, require: true },
  students: [{ type: mongoose.Types.ObjectId, ref: User }],
  experts: [{ type: mongoose.Types.ObjectId, ref: User }],
});

const Course = mongoose.model('course', courseSchema);

export default Course;
