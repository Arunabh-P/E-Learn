import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentsAction } from '../actions/departmentAction';
import { IoMdAdd } from 'react-icons/io';
import Loading from '../components/Loading';

const Department = () => {
  const dispatch = useDispatch();

  const { loading, departments } = useSelector(
    (state) => state.getDepartmentsReducer
  );
  const { role } = useSelector((state) => state.teacherDetails.teacher);
  console.log(role);
  useEffect(() => {
    dispatch(getDepartmentsAction());
  }, [dispatch]);

  return (
    <div className="main-page">
      <Container>
        <div className="page-wrapper pt-4">
          {loading ? (
            <Loading />
          ) : (
            <>
              {role === 'admin' ? (
                <button className="button-1">
                  <IoMdAdd className="add-icon fs-3" />
                </button>
              ) : (
                ''
              )}

              <div className="department-div mt-4">
                {departments?.map((curElem) => (
                  <Link
                    to={`/teacher/department/${curElem?._id}`}
                    key={curElem?._id}
                  >
                    <div className="department-card">
                      <h4 className="sub-heading">
                        Department : {curElem?.name}{' '}
                      </h4>
                      <p className="p-text">
                        {' '}
                        Department Head : {curElem?.head?.name}{' '}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Department;
