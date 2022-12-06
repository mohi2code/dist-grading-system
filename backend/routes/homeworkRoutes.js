import express from "express";
import {
  getAllHomeworks,
  getOneHomework,
  createHomework,
  updateHomework,
  getSubmissionGroup,
  createSubmissionGroup
} from "../controllers/homeworkController.js";
const router = express.Router();
import { authenticated } from '../middleware/rbac.js';

router.route('/').get(authenticated, getAllHomeworks);
router.route('/:id').get(authenticated, getOneHomework);
router.route('/:id/group').get(authenticated, getSubmissionGroup);
router.route('/:id/group').post(authenticated, createSubmissionGroup);
router.route('/').post(authenticated, createHomework);
router.route('/:id').put(authenticated, updateHomework);

export default router;
