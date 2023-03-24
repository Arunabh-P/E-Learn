import Teacher from '../model/teacherModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ObjectId from 'mongodb';
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
  res.status(200).json({ email: teacher.email, name: teacher.name });
});

// @desc  Verify teacher
// @rout  GET /api/teacher/verify

export const verifyTeacher = asyncHandler(async (req, res) => {
  const tokenId = req.body.decodeId;

  const teacher = await Teacher.findOne({ _id: ObjectId(tokenId) });

  if (teacher) {
    teacher.token = req.body.token;
    res.status(200).json({ email: teacher.email, name: teacher.name });
  } else {
    res.status(404).json({ status: false });
  }
});

// @desc  Logout teacher
// @rout  GET /api/teacher/logout
export const logoutTeacher = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('teacherToken').send({});
});

// // get all teachers
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
