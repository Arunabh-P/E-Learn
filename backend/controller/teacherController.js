import Teacher from '../model/teacherModel.js';
import Student from '../model/studentModel.js';
import Departments from '../model/departmentModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc  Create teacher
// @rout  POST /api/teacher/addTeacher
export const createTeacher = asyncHandler(async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const findteacher = await Teacher.findOne({ email: email });

    if (!findteacher) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const teacher = new Teacher({ email, name, password: hashedPassword });

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
});

// @desc  Logout teacher
// @rout  GET /api/teacher/logout
export const logoutTeacher = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('teacherToken').send({});
});

// @desc    Get teachers
// @rout    GET /api/teacher/teachers
export const getTeachers = asyncHandler(async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ status: true, teachers });
  } catch (error) {
    next(error);
  }
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

// @desc Create department
// @rout    POST /api/teacher/departments
export const createDepartment = asyncHandler(async (req, res, next) => {
  try {
    let { name, head } = req.body;

    const findDepartment = await Departments.findOne({ name });

    if (findDepartment) {
      res.status(400).send({ message: 'Department already exists' });
      return;
    }

    const department = await Departments.create({ name, head });
    res.status(201).send(department);
  } catch (error) {
    next(error);
  }
});

// @desc Create student
// @rout    POST /api/teacher/departments/addStudent
export const createStudent = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, departmentId } = req.body;

    const findStudent = await Student.findOne({ email: email });

    if (!findStudent) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const student = await Student.create({
        name,
        email,
        password: hashedPassword,
        departmentId,
      });

      //update department collection
      const department = await Departments.findById(departmentId);
      department.students.push(student._id);
      await department.save();

      res.status(201).send(student);
    } else {
      throw new Error('User already exists');
    }
  } catch (error) {
    next(error);
  }
});

// get a single teacher by id
export const getATeacher = asyncHandler(async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) return res.status(404).send();

    res.send(teacher);
  } catch (error) {
    next(error);
  }
});
