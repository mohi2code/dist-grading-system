import asyncHandler from 'express-async-handler';
import { Homework } from '../models/homework.js';

const getAllHomeworks = asyncHandler(async (req, res) => {
  const _homeworks = await Homework.find({ ...req.query })
    .populate('course_id');
  res.json([..._homeworks]);
});

const getOneHomework = asyncHandler(async (req, res) => {
  const _homework = await Homework.findById(req.params.id)
    .populate('course_id');
  res.json(_homework);
});

const createHomework = asyncHandler(async (req, res) => {
  const { name, course_id, question, points } = req.body;
  const _new = await Homework.create({
    name,
    course_id,
    points,
    question
  });
  res.json(_new);
});

const updateHomework = asyncHandler(async (req, res) => {
  const { name, question, points } = req.body;
  const _updated = await Homework.findByIdAndUpdate(req.params.id, {
    name,
    question,
    points
  }).populate('course_id');
  res.json(_updated);
});

export {
  getAllHomeworks,
  getOneHomework,
  createHomework,
  updateHomework
}
