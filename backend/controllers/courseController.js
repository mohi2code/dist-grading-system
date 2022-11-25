import asyncHandler from "express-async-handler";
import Course from '../models/course.js';
import User from "../models/user.js";

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
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
    number_of_homeworks
  });

  res.json({ created: _created });
})

const addStudent = asyncHandler(async (req, res) => {
  let _course = await Course.findById(req.params.id)

  let updated = await Course.findByIdAndUpdate(_course.id, {
    students: [req.user.id, ..._course.students]
  });

  res.json({ updated });
})

const addExpert = asyncHandler(async (req, res) => {
  const { expert } = req.body;
  const _expert = await User.findById(expert);

  if (!_expert) {
    res.status(400);
    throw new Error('No such user!');
  }

  if(_expert.role == 'student') {
    res.status(400);
    throw new Error('You cannot assign a student as an expert!');
  }

  let _newExperts = req.course.experts.filter(e => !(expert == e))

  let updated = await Course.findOneAndUpdate({ id: req.course.id }, {
    experts: [expert, _newExperts]
  })

  res.json({updated});
})

export { 
  getCourses,
  getCourseById,
  createCourse,
  addStudent,
  addExpert
};