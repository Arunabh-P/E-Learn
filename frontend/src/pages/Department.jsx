import React from 'react';
import { useDepartmentContext } from '../context/DepartmentContext';

const Department = () => {
  const { departments } = useDepartmentContext();
  console.log(departments, 'heyhyehyeeh');
  return (
    <div>
      {departments.map((curElem, id) => (
        <>
          <h1 key={curElem._id}> {curElem.name} </h1>
          <h1> {curElem.head.name} </h1>
        </>
      ))}
    </div>
  );
};

export default Department;
