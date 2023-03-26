import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTeacherAction } from '../actions/teacherActions';
import Loading from '../components/Loading';

const Teachers = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const { teachers, loading } = useSelector(
    (state) => state.getTeachersReducer
  );
  useEffect(() => {
    dispatch(getTeacherAction());
  }, [dispatch]);
  const { role } = useSelector((state) => state.teacherDetails.teacher);

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
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers?.map((curElem) => (
                        <tr className="table-row" key={curElem?._id}>
                          <td>
                            {' '}
                            <Link
                              className="p-text"
                              to={`/teacher/teachers/${curElem?._id}`}
                            >
                              {curElem?.name}
                            </Link>
                          </td>

                          <td>
                            <Link
                              className="p-text"
                              to={`/teacher/students/${curElem?._id}`}
                            >
                              {curElem?.email}
                            </Link>
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
        <form
        //  onSubmit={handleSubmit}
        >
          <Modal.Body>
            <input
              type="text"
              name="name"
              className="input-style-2 m-2"
              placeholder="Enter name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              className="input-style-2 m-2 "
              placeholder="Enter email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              className="input-style-2 m-2 "
              placeholder="Enter password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button>Submit</Button> */}
            <input type="submit" className="button-2" value="Add Student" />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Teachers;
