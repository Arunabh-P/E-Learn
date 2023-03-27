import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createStudentAction,
  getOneDepartmentAction,
} from '../actions/departmentAction';
import Loading from '../components/Loading';
import Modal from 'react-bootstrap/Modal';
import {
  addSubjectToDepAction,
  getSubjectAction,
} from '../actions/subjectAction';
const SingleDepartment = () => {
  // modal
  const [modalShow, setModalShow] = useState(false);
  const [created, setCreated] = useState(false);

  const [modalShow2, setModalShow2] = useState(false);
  const [created2, setCreated2] = useState(false);

  const params = useParams();
  let departmentId = params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const dispatch = useDispatch();

  const myEmail = useSelector((state) => state.teacherDetails.teacher.email);
  const headEmail = useSelector(
    (state) => state.getOneDepartmentReducer.department?.head?.email
  );

  const { loading, department } = useSelector(
    (state) => state.getOneDepartmentReducer
  );

  console.log(department);

  const { subjects } = useSelector((state) => state.getSubjectReducer);
  console.log(subjects);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesss = await dispatch(
      createStudentAction({
        name,
        email,
        password,
        departmentId,
      })
    );
    if (sucesss) {
      setModalShow(false);
      setCreated(true);
    }
  };

  const subjectSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(
      addSubjectToDepAction({
        departmentId,
        subjectId,
      })
    );
    if (success) {
      setModalShow2(false);
      setCreated2(true);
    }
  };

  useEffect(() => {
    if (created2) {
      setModalShow2(false);
      dispatch(getOneDepartmentAction(departmentId));
      setCreated2(false);
    }
  }, [created2, dispatch, departmentId]);

  useEffect(() => {
    if (created) {
      setModalShow(false);
      dispatch(getOneDepartmentAction(departmentId));
      setCreated(false);
    }
  }, [created, dispatch, departmentId]);

  useEffect(() => {
    dispatch(getOneDepartmentAction(departmentId));
    dispatch(getSubjectAction());
  }, [dispatch, departmentId]);

  return (
    <>
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
                      <Link to={`/teacher/students/${curElem?._id}`}>
                        <div key={curElem?._id} className="dep-student-div">
                          <p className="p-text">{curElem.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {myEmail === headEmail ? (
                    <button
                      className="button-1"
                      onClick={() => setModalShow(true)}
                    >
                      <IoMdAdd className="add-icon fs-3" />
                    </button>
                  ) : (
                    ''
                  )}
                </div>
                <div className="dep-students-div">
                  <h5 className="sub-heading">Subjects</h5>
                  <div className="dep-students-wrapper">
                    {department?.subjects?.map((curElem) => (
                      <Link to={`/teacher/students/${curElem?._id}`}>
                        <div key={curElem?._id} className="dep-student-div">
                          <p className="p-text">{curElem.subject}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {myEmail === headEmail ? (
                    <button
                      className="button-1"
                      onClick={() => setModalShow2(true)}
                    >
                      <IoMdAdd className="add-icon fs-3" />
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
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
            Add Student
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              type="text"
              name="name"
              className="input-style-2 m-2"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              className="input-style-2 m-2 "
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              className="input-style-2 m-2 "
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" className="button-2" value="Add Student" />
          </Modal.Footer>
        </form>
      </Modal>
      <Modal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Subject
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={subjectSubmit}>
          <Modal.Body>
            <select
              id="head"
              name="head"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="input-select-1 mx-1 w-100"
            >
              <option value="">Choose Subject</option>
              {subjects?.map((curElem) => (
                <option key={curElem?._id} value={curElem?._id}>
                  {curElem?.subject}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" className="button-2" value="Add Student" />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default SingleDepartment;
