import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudentsAction } from '../actions/studentAction';
import Loading from '../components/Loading';

const Students = () => {
  const dispatch = useDispatch();
  const { loading, students } = useSelector(
    (state) => state.getStudentsReducer
  );
  console.log(students);

  useEffect(() => {
    dispatch(getStudentsAction());
  }, [dispatch]);
  return (
    <div className="main-page">
      <Container>
        <div className="page-wrapper pt-4">
          {loading ? (
            <Loading />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((curElem) => (
                  <tr key={curElem?._id}>
                    <Link to={`/teacher/students/${curElem?._id}`}>
                      <td>{curElem?.name}</td>
                    </Link>

                    <td>{curElem?.email}</td>
                    <td>{curElem?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Students;
