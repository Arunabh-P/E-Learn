import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDepartmentContext } from '../context/DepartmentContext';

const SingleDepartment = () => {
  const params = useParams();
  let departmentId = params.id;
  const { single_department, isLoading, isError, getSingleDepartment } =
    useDepartmentContext();

  useEffect(() => {
    getSingleDepartment(departmentId);
  }, [departmentId, getSingleDepartment]);

  return (
    <Container>
      <div className="page-wrapper">
        <NavBar />
        <p>{departmentId}</p>
        <h2>{single_department?.name}</h2>
      </div>
    </Container>
  );
};

export default SingleDepartment;
