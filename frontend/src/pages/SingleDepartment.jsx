import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneDepartmentAction } from '../actions/departmentAction';
import { verifyTeacher } from '../api/teacher';
import Loading from '../components/Loading';

const SingleDepartment = () => {
  const params = useParams();
  let departmentId = params.id;

  const { loading, department } = useSelector(
    (state) => state.getOneDepartmentReducer
  );
  console.log(department);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneDepartmentAction(departmentId));
  }, [dispatch, departmentId]);

  return (
    <div className="main-page">
      <Container>
        <div className="page-wrapper pt-4">
          {loading ? (
            <Loading />
          ) : (
            <div className="single-department-div">
              <div className="dep-details-div">
                <h5 className="sub-heading">Department Details</h5>
                <p className="p-text">Department : {department.name}</p>
                <p className="p-text">Started At : {department.createdAt}</p>
              </div>
              <div className="dep-head-div">
                <h5 className="sub-heading">Department Head</h5>
                <p className="p-text">Name : {department.head.name}</p>
                <p className="p-text">Email : {department.head.email}</p>
              </div>
              <div className="dep-students-div">
                <h5 className="sub-heading">Students</h5>
                <div className="dep-students-wrapper">
                  {department?.students?.map((curElem) => (
                    <div key={curElem?._id} className="dep-student-div">
                      <p className="p-text">{curElem.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SingleDepartment;
