import Teacher from '../model/teacherModel.js';
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

// teacher login
export const teacherLogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    const teacher = await Teacher.findOne({ email });

    if (!teacher) return res.status(404).send({ message: 'teacher not found' });

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch)
      return res.status(401).send({ message: 'Authentifiaction faild' });

    const token = jwt.sign({ teacherId: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });
    res
      .cookie('teacherToken', token, { maxAge: 3600000, httpOnly: true })
      .status(200)
      .send({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
});

// // logout
export const logoutTeacher = asyncHandler(async (req, res, next) => {
  try {
    res
      .clearCookie('teacherToken', {
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send({ message: 'Logout successfully' });
  } catch (error) {
    next(error);
  }
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
