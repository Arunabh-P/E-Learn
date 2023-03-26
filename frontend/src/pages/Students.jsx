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
            <div className=" table-div">
              <table className="table table-1">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((curElem) => (
                    <tr className="table-row" key={curElem?._id}>
                      <td>
                        <Link
                          className="p-text"
                          to={`/teacher/students/${curElem?._id}`}
                        >
                          {' '}
                          {curElem?.name}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="p-text"
                          to={`/teacher/students/${curElem?._id}`}
                        >
                          {' '}
                          {curElem?.email}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="p-text"
                          to={`/teacher/students/${curElem?._id}`}
                        >
                          {' '}
                          {curElem?.status}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Students;
