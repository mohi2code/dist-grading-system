import express from 'express';
const router = express.Router();
import { getUsers } from '../controllers/userController.js';
import { authenticated, isInstructorOrExpert } from '../middleware/rbac.js';

router.route('/').get(authenticated, isInstructorOrExpert, getUsers);

export default router;
