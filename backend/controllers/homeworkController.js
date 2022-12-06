import asyncHandler from 'express-async-handler';
import { Homework } from '../models/homework.js';
import { SubmissionGroup } from '../models/homework.js';

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

const createSubmissionGroup = asyncHandler(async (req, res) => {
  const homework_id = req.params.id;
  const _homework = await Homework.findById(homework_id).populate('course_id');

  let students = _homework.course_id.students;
  let experts  = _homework.course_id.experts;

  if (students.length%2 > 0)
    students.push(experts[0]);

  students = shuffle(students);

  let group = [];

  for (let i = 0; i < students.length; i+=2) {
    group.push({
      submitter: students[i],
      grader: students[i+1]
    });
    group.push({
      submitter: students[i+1],
      grader: students[i]
    });
  }

  const _subGroup = await SubmissionGroup.create({ homework_id, group });

  res.json(_subGroup);
  
});

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getSubmissionGroup = asyncHandler(async (req, res) => {
  const homework_id = req.params.id;
  const _group = await SubmissionGroup.findOne({homework_id})
    .populate('group.submitter')
    .populate('group.grader');
  res.json(_group);
});

export {
  getAllHomeworks,
  getOneHomework,
  createHomework,
  updateHomework,
  createSubmissionGroup,
  getSubmissionGroup
}
