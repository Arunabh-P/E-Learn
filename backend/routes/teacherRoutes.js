import express from 'express';
import { isAdmin } from '../middlewares/authMiddlewares.js';
import {
  createTeacher,
  teacherLogin,
  logoutTeacher,
  getAllTeachers,
  getATeacher,
} from '../controller/teacherController.js';

const router = express.Router();

router.post('/register', isAdmin, createTeacher);
router.post('/login', teacherLogin);
router.post('/logout', logoutTeacher);
router.get('/allTeachers', getAllTeachers);
router.get('/:id', getATeacher);

export default router;
