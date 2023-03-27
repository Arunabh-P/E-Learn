import React from 'react';
import { Container } from 'react-bootstrap';
import teacherImg from '../images/banners/teacher2.jpg';
import studentImg from '../images/banners/student.jpg';
import { Link } from 'react-router-dom';

const TeacherOrStudentPage = () => {
  return (
    <>
      <Container className="login-page">
        <div className="login-page-wrapper">
          <div
            className="teacher-student-img-div"
            style={{ backgroundImage: `url(${studentImg})` }}
          >
            <Link className="w-100">
              <button className="m-4 button-3 w-100">Student login</button>
            </Link>
          </div>
          <div
            className="teacher-student-img-div"
            style={{ backgroundImage: `url(${teacherImg})` }}
          >
            <Link to="/teacher" className="w-100">
              <button className="m-4 button-3 w-100">Teacher login</button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TeacherOrStudentPage;
