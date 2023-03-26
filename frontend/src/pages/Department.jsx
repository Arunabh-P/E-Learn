import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDepartmentAction,
  getDepartmentsAction,
} from '../actions/departmentAction';
import { IoMdAdd } from 'react-icons/io';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal';
import { getTeacherAction } from '../actions/teacherActions';
const Department = () => {
  // modal
  const [modalShow, setModalShow] = useState(false);
  const [head, setHead] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const { loading, departments } = useSelector(
    (state) => state.getDepartmentsReducer
  );
  const { teachers } = useSelector((state) => state.getTeachersReducer);
  const { role } = useSelector((state) => state.teacherDetails.teacher);

  // const { details } = useSelector((state) => state.createDepartmentReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDepartmentAction({ name, head }));
  };

  useEffect(() => {
    dispatch(getDepartmentsAction());
    dispatch(getTeacherAction());
  }, [dispatch]);

  return (
    <>
      <div className="main-page">
        <Container>
          <div className="page-wrapper pt-4">
            {loading ? (
              <Loading />
            ) : (
              <>
                {role === 'admin' ? (
                  <button
                    className="button-1"
                    onClick={() => setModalShow(true)}
                  >
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
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Department
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              type="text"
              name="name"
              className="input-style-1"
              placeholder="Enter department title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              id="head"
              name="head"
              value={head}
              onChange={(e) => setHead(e.target.value)}
            >
              {teachers?.map((curElem) => (
                <option key={curElem?._id} value={curElem?._id}>
                  {curElem?.name}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button>Submit</Button> */}
            <input type="submit" value="Submit" />
          </Modal.Footer>
        </form>
      </Modal>
      );
    </>
  );
};

export default Department;
