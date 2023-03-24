import express from 'express';
const router = express.Router();

import { isAdmin, isTeacher } from '../middlewares/authMiddlewares.js';
import {
  createTeacher,
  teacherLogin,
  logoutTeacher,
  getAllTeachers,
  getATeacher,
  verifyTeacher,
  getDepartments,
} from '../controller/teacherController.js';

router.get('/verify', isTeacher, verifyTeacher);
router.post('/login', teacherLogin);
router.get('/logout', isTeacher, logoutTeacher);
router.get('/departments', getDepartments);

router.post('/register', isAdmin, createTeacher);
router.get('/allTeachers', getAllTeachers);
router.get('/:id', getATeacher);

export default router;
