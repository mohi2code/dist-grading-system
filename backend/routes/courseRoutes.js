import express from "express";
const router = express.Router();
import {
  getCourses,
  getCourseById,
  createCourse,
  addExpert,
  addStudent,
  updateCourse
} from '../controllers/courseController.js'
import { authenticated, hasCreatedCourse, isInstructorOrExpert, isInstructor, isStudent } from '../middleware/rbac.js'

router.route('/').get(authenticated, getCourses);
router.route('/:id').get(authenticated, getCourseById);
router.route('/').post(authenticated, isInstructor, createCourse);
router.route('/:id').put(authenticated, isInstructorOrExpert, updateCourse);
router.route('/:id/students').put(authenticated, isStudent, addStudent);
router.route('/:id/experts').put(authenticated, hasCreatedCourse, addExpert);

export default router;