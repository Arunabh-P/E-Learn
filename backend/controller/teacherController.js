import Teacher from '../model/teacherModel.js';
import Student from '../model/studentModel.js';
import Departments from '../model/departmentModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// create teacher
export const createTeacher = asyncHandler(async (req, res, next) => {
  try {
    const email = req.body.email;

    const findteacher = await Teacher.findOne({ email: email });

    if (!findteacher) {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const teacher = new Teacher({ ...req.body, password: hash });

      await teacher.save();
      res.status(201).send(teacher);
    } else {
      throw new Error('Teacher already exists');
    }
  } catch (error) {
    next(error);
  }
});

// @desc  Signin teacher
// @rout  POST /api/teacher/login
export const teacherLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });

  if (!teacher)
    return res.status(404).json({ message: 'You are not an Teacher!' });

  const isPassValid = await bcrypt.compare(password, teacher.password);

  if (!isPassValid)
    return res.status(400).json({ message: 'Invalid Credentials' });

  const token = jwt.sign(
    {
      email: teacher.email,
      id: teacher._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.cookie('teacherToken', token, {
    httpOnly: true,
    signed: true,
    maxAge: 900000,
  });
  res
    .status(200)
    .json({ email: teacher.email, name: teacher.name, role: teacher.role });
  console.log(teacher.role);
});

// @desc  Logout teacher
// @rout  GET /api/teacher/logout
export const logoutTeacher = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('teacherToken').send({});
});

// @desc    Get department
// @rout    GET /api/teacher/department
export const getDepartments = asyncHandler(async (req, res) => {
  let response = await Departments.find().populate('head', 'name');
  if (response) {
    res.status(200).json({ status: true, departments: response });
  }
});

// @desc Get department by id
// @rout    GET /api/teacher/departments/:id
export const getOneDepartment = asyncHandler(async (req, res, next) => {
  try {
    if (!req.params.id || req.params.id === '') {
      return res.status(400).send('Department ID is missing or invalid');
    }
    const department = await Departments.findById(req.params.id).populate(
      'head students'
    );
    if (!department) {
      return res.status(404).send('Department not found');
    }

    res.send(department);
  } catch (error) {
    next(error);
  }
});

// @desc    Get students
// @rout    GET /api/teacher/students
export const getStudents = asyncHandler(async (req, res, next) => {
  try {
    let response = await Student.find().populate('department');
    if (response) {
      res.status(200).json({ status: true, students: response });
    }
  } catch (error) {
    next(error);
  }
});

// @desc Get student by id
// @rout    GET /api/teacher/students/:id
export const getStudentById = asyncHandler(async (req, res, next) => {
  try {
    if (!req.params.id || req.params.id === '') {
      return res.status(400).send('Student ID is missing or invalid');
    }
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.send(student);
  } catch (error) {
    next(error);
  }
});

// // // get all teachers
export const getAllTeachers = asyncHandler(async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (error) {
    next(error);
  }
});

// get a single student by id
export const getATeacher = asyncHandler(async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) return res.status(404).send();

    res.send(teacher);
  } catch (error) {
    next(error);
  }
});
