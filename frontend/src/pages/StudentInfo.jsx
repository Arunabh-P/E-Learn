import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStudentByIdAction } from '../actions/studentAction';
import Loading from '../components/Loading';

const StudentInfo = () => {
  const params = useParams();
  let studentId = params.id;

  const dispatch = useDispatch();

  const { loading, student } = useSelector(
    (state) => state.getStudentByIdReducer
  );

  useEffect(() => {
    dispatch(getStudentByIdAction(studentId));
  }, [dispatch, studentId]);

  return (
    <div className="main-page">
      <Container>
        <div className="page-wrapper pt-4">
          {loading ? (
            <Loading />
          ) : (
            <div className="single-department-div">
              <div className="dep-details-div">
                <h5 className="sub-heading">Student Details</h5>
                <p className="p-text">Name : {student.name}</p>
                <p className="p-text">Email : {student.email}</p>
                <p className="p-text">Status : {student.status}</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default StudentInfo;
