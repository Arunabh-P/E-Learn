import Student from '../model/studentModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// create Student
export const createStudent = asyncHandler(async (req, res, next) => {
  try {
    const email = req.body.email;

    const findStudent = await Student.findOne({ email: email });

    if (!findStudent) {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const student = new Student({ ...req.body, password: hash });

      await student.save();
      res.status(201).send(student);
    } else {
      throw new Error('User already exists');
    }
  } catch (error) {
    next(error);
  }
});

// student login
export const studentlogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    const student = await Student.findOne({ email });

    if (!student) return res.status(404).send({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch)
      return res.status(401).send({ message: 'Authentifiaction faild' });

    const token = jwt.sign(
      { studentId: student._id },
      process.env.JWT_SECRETE,
      { expiresIn: '10d' }
    );
    res
      .cookie('token', token, { maxAge: 3600000, httpOnly: true })
      .status(200)
      .send({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
});

// logout
export const logoutStudent = asyncHandler(async (req, res, next) => {
  try {
    res
      .clearCookie('token', {
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send({ message: 'Logout successfully' });
  } catch (error) {
    next(error);
  }
});

// get all students
export const getAllStudents = asyncHandler(async (req, res, next) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

// get a single student by id
export const getAStudent = asyncHandler(async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).send();

    res.send(student);
  } catch (error) {
    next(error);
  }
});
