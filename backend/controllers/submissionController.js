import asyncHandler from 'express-async-handler';
import { Submission, SubmissionGroup } from '../models/homework.js';

const submitHomework = asyncHandler(async (req, res) => {
  const { 
    homework_id,
    answer
  } = req.body;
  const submitted_by = req.user.id;

  const _created = await Submission.create({
    homework_id,
    submitted_by,
    answer
  });

  res.json(_created);
});

const editGrade = asyncHandler(async (req, res) => {
  const { grade } = req.body;
  const graded_by = req.user.id;

  const _edited = await Submission.findByIdAndUpdate(req.params.id, {
    grade,
    graded_by,
    objected: false
  }).populate(['submitted_by', 'homework_id']);

  res.json(_edited);
});

const objectGrade = asyncHandler(async (req, res) => {
  const { objected } = req.body;
  const _submission = await Submission.findById(req.params.id);

  if(!_submission) {
    res.status(400);
    throw new Error('Bad request, No submission was found...');
  }

  if(_submission.submitted_by != req.user.id) {
    res.status(403);
    throw new Error('Not authorized to perform this action.');
  }

  const _objected = await Submission.findByIdAndUpdate(req.params.id, {objected});

  res.json(_objected);
})

const getSubmission = asyncHandler(async (req, res) => {
  const _submission = await Submission.findById(req.params.id)
    .populate('homework_id')
    .populate('submitted_by', '-hashed_password')
    .populate('graded_by', '-hashed_password');
  res.json(_submission);
});

const getAllSubmission = asyncHandler(async (req, res) => {
  const _submissions = await Submission.find(req.query)
    .populate('submitted_by', '-hashed_password')
    .populate('graded_by', '-hashed_password');
  res.json([..._submissions]);
});


export {
  submitHomework,
  editGrade,
  objectGrade,
  getSubmission,
  getAllSubmission,
};
