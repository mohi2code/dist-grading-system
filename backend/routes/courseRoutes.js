import express from "express";
const router = express.Router();
import {
  getCourses,
  getCourseById,
  createCourse,
  addExpert,
  addStudent
} from '../controllers/courseController.js'
import { authenticated, hasCreatedCourse, isInstructor, isStudent } from '../middleware/rbac.js'

router.route('/').get(authenticated, getCourses);
router.route('/:id').get(authenticated, getCourseById);
router.route('/').post(authenticated, isInstructor, createCourse);
router.route('/:id/students').put(authenticated, isStudent, addStudent);
router.route('/:id/experts').post(authenticated, hasCreatedCourse, addExpert);

export default router;