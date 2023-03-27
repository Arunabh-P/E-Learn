import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createSubjectAction,
  getSubjectAction,
} from '../actions/subjectAction';
import { getTeacherAction } from '../actions/teacherActions';
import Loading from '../components/Loading';

const Subject = () => {
  const [modalShow, setModalShow] = useState(false);
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [created, setCreated] = useState(false);

  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.getTeachersReducer);
  const { role } = useSelector((state) => state.teacherDetails.teacher);

  const { loading } = useSelector((state) => state.getSubjectReducer);
  const subjectData = useSelector((state) => state.getSubjectReducer.subjects);
  console.log(subjectData, 'hey');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(createSubjectAction({ subject, teacher }));
    if (success) {
      setModalShow(false);
      setCreated(true);
    }
  };
  useEffect(() => {
    if (created) {
      setModalShow(false);
      dispatch(getTeacherAction());
      dispatch(getSubjectAction());
      setCreated(false);
    }
  }, [created, dispatch]);

  useEffect(() => {
    dispatch(getTeacherAction());
    dispatch(getSubjectAction());
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
                    className="button-1 mb-3"
                    onClick={() => setModalShow(true)}
                  >
                    <IoMdAdd className="add-icon fs-3" />
                  </button>
                ) : (
                  ''
                )}
                <div className=" table-div">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Subject</th>
                        <th scope="col">Teachers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectData?.map((curElem) => (
                        <tr className="table-row" key={curElem?._id}>
                          <td>
                            {' '}
                            <Link
                              className="p-text"
                              to={`/teacher/subjects/${curElem?._id}`}
                            >
                              {curElem?.subject}
                            </Link>
                          </td>
                          <td>
                            {curElem?.teacher?.map((curList) => (
                              <Link className="p-text" key={curList?._id}>
                                {curList?.name},{' '}
                              </Link>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            Add Teacher
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              type="text"
              name="subject"
              className="input-style-2 m-2"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <select
              id="teacher"
              name="teacher"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="input-select-1 mx-1"
            >
              <option value="">Choose teacher</option>
              {teachers?.map((curElem) => (
                <option key={curElem?._id} value={curElem?._id}>
                  {curElem?.name}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" className="button-2" value="Add Subject" />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Subject;
