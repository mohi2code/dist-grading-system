import express from "express";
const router = express.Router();
import { editGrade, getAllSubmission, getSubmission, objectGrade, submitHomework } from '../controllers/submissionController.js';
import { authenticated } from '../middleware/rbac.js';

router.route('/').get(authenticated, getAllSubmission);
router.route('/:id').get(authenticated, getSubmission);
router.route('/').post(authenticated, submitHomework);
router.route('/:id/object').put(authenticated, objectGrade);
router.route('/:id').put(authenticated, editGrade);

export default router;
