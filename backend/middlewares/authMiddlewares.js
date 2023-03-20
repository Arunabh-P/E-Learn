import Teacher from '../model/teacherModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const isTeacher = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let teacherToken = req.headers.authorization.split(' ')[1];

    try {
      // const { teacherToken } = req.cookies;
      // console.log(teacherToken);
      if (!teacherToken) {
        return res.status(401).json({
          message: 'Please login first',
        });
      }

      const decoded = jwt.verify(teacherToken, process.env.JWT_SECRET);

      req.teacher = await Teacher.findById(decoded.teacherId);

      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
});
export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { teacherToken } = req.cookies;
    if (!teacherToken) {
      return res.status(401).json({
        message: 'Please login first',
      });
    }

    const decoded = jwt.verify(teacherToken, process.env.JWT_SECRET);

    req.teacher = await Teacher.findById(decoded.teacherId);

    if (req.teacher.role === 'admin') {
      next();
    } else {
      throw new Error('Only admin can access here');
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
