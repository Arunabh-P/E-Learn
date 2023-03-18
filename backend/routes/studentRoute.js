import express from 'express';
import {
  createStudent,
  studentlogin,
  logoutStudent,
  getAllStudents,
  getAStudent,
} from '../controller/studentController.js';

const router = express.Router();

router.post('/register', createStudent);
router.post('/login', studentlogin);
router.post('/logout', logoutStudent);
router.get('/allstudents', getAllStudents);
router.get('/:id', getAStudent);

export default router;
