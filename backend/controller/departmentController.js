import Department from '../model/departmentModel.js';
import Teacher from '../model/teacherModel.js';
import Student from '../model/studentModel.js';

import asyncHandler from 'express-async-handler';

// create department
export const createDepartment = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;

    const findDepartment = await Department.findOne({ name: name });

    if (!findDepartment) {
      const departmentData = {
        name: req.body.name,
        head: req.teacher._id,
      };

      const department = await Department.create(departmentData);

      await department.save();

      res.status(201).send(department);
    } else {
      throw new Error('department already exist');
    }
  } catch (error) {
    next(error);
  }
});

// add student into department
export const addStudentToDeparttment = asyncHandler(async (req, res, next) => {
  const { studentId } = req.body;
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    if (department.head.toString() !== req.teacher._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Class teacher can only add student' });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'student not found' });
    }

    department.students.push(student);
    await department.save();
    res.json({ message: 'Student added to department successfully' });
  } catch (error) {
    next(error);
  }
});

// get all department
export const getAllDepartments = asyncHandler(async (req, res, next) => {
  try {
    const departments = await Department.find();
    // res.send(departments);
    res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    next(err);
  }
});

// get single department by id
export const getADepartment = asyncHandler(async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).send();

    res.send(department);
  } catch (error) {
    next(error);
  }
});
