import asyncHandler from "express-async-handler";
import Course from '../models/course.js';
import User from "../models/user.js";

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ ...req.query });
  res.json([...courses]);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('instructor', '-hashed_password')
    .populate('experts', '-hashed_password')
    .populate('students', '-hashed-password');
  res.json(course);
});

const createCourse = asyncHandler(async (req, res) => {
  const { name, passing_grade, number_of_homeworks } = req.body;
  const instructor = req.user.id;

  const _created = await Course.create({
    name,
    instructor,
    passing_grade,
    number_of_homeworks,
    experts: [req.user.id]
  });

  res.json(_created);
})

const addStudent = asyncHandler(async (req, res) => {
  let _course = await Course.findById(req.params.id)

  let updated = await Course.findByIdAndUpdate(_course.id, {
    students: [req.user.id, ..._course.students]
  });

  res.json({ updated });
})

const addExpert = asyncHandler(async (req, res) => {
  const { experts } = req.body;
  let updated = await Course.findOneAndUpdate({ id: req.course.id }, {experts})
  console.log(updated);
  res.json(updated);
})

export { 
  getCourses,
  getCourseById,
  createCourse,
  addStudent,
  addExpert
};