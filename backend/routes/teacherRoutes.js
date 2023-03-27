import express from 'express';
const router = express.Router();

import { isAdmin, isTeacher } from '../middlewares/authMiddlewares.js';
import {
  createTeacher,
  teacherLogin,
  logoutTeacher,
  getTeachers,
  getATeacher,
  getDepartments,
  getOneDepartment,
  getStudents,
  getStudentById,
  createDepartment,
  createStudent,
  createSubject,
} from '../controller/teacherController.js';

router.post('/login', teacherLogin);
router.get('/logout', isTeacher, logoutTeacher);
router.get('/allTeachers', isTeacher, getTeachers);
router.get('/departments', isTeacher, getDepartments);
router.get('/departments/:id', isTeacher, getOneDepartment);
router.get('/students', isTeacher, getStudents);
router.get('/students/:id', isTeacher, getStudentById);
router.post('/departments/create', isAdmin, createDepartment);
router.post('/departments/addStudent', isTeacher, createStudent);
router.post('/addTeacher', isAdmin, createTeacher);
router.post('/subjects/createSubject', isAdmin, createSubject);

router.get('/:id', getATeacher);

export default router;
