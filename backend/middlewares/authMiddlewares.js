import Teacher from '../model/teacherModel.js';
import jwt from 'jsonwebtoken';

export const isTeacher = async (req, res, next) => {
  try {
    const { teacherToken } = req.cookies;
    if (!teacherToken) {
      return res.status(401).json({
        message: 'Please login first',
      });
    }

    const decoded = jwt.verify(teacherToken, process.env.JWT_SECRET);

    req.teacher = await Teacher.findById(decoded.teacherId);

    console.log(req.teacher._id, 'after');
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
