import React, { useEffect } from 'react';
import { useDepartmentContext } from '../context/DepartmentContext';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
const Department = () => {
  const { isLoading, departments } = useDepartmentContext();
  console.log(departments, 'this is another');
  useEffect(() => {}, []);

  return (
    <>
      <Container>
        <div className="page-wrapper">
          <NavBar />
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <div className="department-div">
              {departments?.map((curElem) => (
                <Link to={`/singleDepartment/${curElem?._id}`}>
                  <div className="department-card" key={curElem?._id}>
                    <h4>Department : {curElem?.name} </h4>
                    <p> Department Head : {curElem?.head?.name} </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Department;
