import Department from '../model/departmentModel.js';
import Teacher from '../model/teacherModel.js';
import asyncHandler from 'express-async-handler';

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
