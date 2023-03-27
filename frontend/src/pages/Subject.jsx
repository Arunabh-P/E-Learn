import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { createSubjectAction } from '../actions/subjectAction';
import { getTeacherAction } from '../actions/teacherActions';

const Subject = () => {
  const [modalShow, setModalShow] = useState(false);
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [created, setCreated] = useState(false);

  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.getTeachersReducer);
  const { role } = useSelector((state) => state.teacherDetails.teacher);

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
      setCreated(false);
    }
  }, [created, dispatch]);

  useEffect(() => {
    dispatch(getTeacherAction());
  }, [dispatch]);
  return (
    <>
      <div className="main-page">
        <Container>
          <div className="page-wrapper pt-4">
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
