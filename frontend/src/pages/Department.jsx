import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentsAction } from '../actions/departmentAction';

const Department = () => {
  const dispatch = useDispatch();
  const { loading, departments } = useSelector(
    (state) => state.getDepartmentsReducer
  );
  useEffect(() => {
    dispatch(getDepartmentsAction());
  }, [dispatch]);
  return (
    <div className="main-page">
      <Container>
        <div className="page-wrapper pt-4">
          {loading ? (
            <p>Loading</p>
          ) : (
            <div className="department-div">
              {departments?.map((curElem) => (
                <Link
                  to={`/singleDepartment/${curElem?._id}`}
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
          )}
        </div>
      </Container>
    </div>
  );
};

export default Department;
