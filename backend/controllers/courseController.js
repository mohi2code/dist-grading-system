import asyncHandler from "express-async-handler";
import Course from '../models/course.js';
import { Homework } from "../models/homework.js";

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ ...req.query });
  res.json([...courses]);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('instructor', '-hashed_password')
    .populate('experts', '-hashed_password')
    .populate('students', '-hashed_password');
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

  const _names = Array.from({length: number_of_homeworks}, (_, i) => i + 1);
  await Homework.insertMany(_names.map(name => (
    {
      name: `HW ${name}`,
      course_id: _created._id,
      points: passing_grade
    }
  )));

  res.json(_created);
})

const updateCourse = asyncHandler(async (req, res) => {
  const { name, passing_grade, number_of_homeworks } = req.body;
  let _updated = await Course.findByIdAndUpdate(req.params.id, {
    name,
    passing_grade,
    number_of_homeworks
  });
  res.json(_updated);
})

const addStudent = asyncHandler(async (req, res) => {
  let _course = await Course.findById(req.params.id);
  let students = 
    _course.students.includes(req.user.id) ? _course.students : [req.user.id, ..._course.students];

  let _updated = await Course.findByIdAndUpdate(_course.id, {
    students
  });
  res.json(_updated);
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
  updateCourse,
  addStudent,
  addExpert
};