import React, { useEffect, useState } from 'react';
import { useDepartmentContext } from '../context/DepartmentContext';

const Department = () => {
  const { isLoading, departments } = useDepartmentContext();
  console.log(departments, 'this is another');
  useEffect(() => {}, []);
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="department-div">
          {departments?.map((curElem) => (
            <div className="department-card" key={curElem?._id}>
              <h4>Department : {curElem?.name} </h4>
              <p> Department Head : {curElem?.head?.name} </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Department;
