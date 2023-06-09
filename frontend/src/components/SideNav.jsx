import React, { useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { AiOutlineMenuFold, AiOutlineCrown } from 'react-icons/ai';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';
import { TfiNotepad } from 'react-icons/tfi';
import { BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SideNav = () => {
  const [isSidebarReduced, setIsSidebarReduced] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const handleClick = (button) => {
    setActiveButton(button);
  };
  const toggleSidebar = () => {
    setIsSidebarReduced(!isSidebarReduced);
  };
  return (
    <div className={`sidebar ${isSidebarReduced ? 'sidebar-reduced' : ''}`}>
      <div className="sidebar-header">
        <button id="sidebar-toggle" onClick={toggleSidebar}>
          <AiOutlineMenuFold className="toggle-icon fs-4" />
        </button>
      </div>
      <div className="sidebar-brand">
        <span
          className="full-title "
          style={{ display: isSidebarReduced ? 'none' : 'block' }}
        >
          E-Learn
        </span>
        <span
          className="short-title"
          style={{ display: isSidebarReduced ? 'block' : 'none' }}
        >
          E | L
        </span>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-submenu">
          <Link
            to="/teacher"
            onClick={() => handleClick('button1')}
            className="sidebar-submenu-link"
            style={{
              backgroundColor: activeButton === 'button1' ? '#65b7e5' : '#ffff',
            }}
          >
            <div className="sidebar-submenu-item" data-tooltip="Home">
              <BiHomeAlt2 style={{ color: 'black' }} className="fs-4" />
              {!isSidebarReduced && <span className="sidebar-txt">Home</span>}
            </div>
          </Link>

          <Link
            to="/teacher/department"
            onClick={() => handleClick('button2')}
            className="sidebar-submenu-link"
            style={{
              backgroundColor: activeButton === 'button2' ? '#65b7e5' : '#ffff',
            }}
          >
            <div className="sidebar-submenu-item" data-tooltip="Home">
              <HiOutlineBuildingLibrary
                style={{ color: 'black' }}
                className="fs-4"
              />
              {!isSidebarReduced && (
                <span className="sidebar-txt">Departments</span>
              )}
            </div>
          </Link>

          <Link
            to="/teacher/students"
            onClick={() => handleClick('button3')}
            className="sidebar-submenu-link"
            style={{
              backgroundColor: activeButton === 'button3' ? '#65b7e5' : '#ffff',
            }}
          >
            <div className="sidebar-submenu-item" data-tooltip="Home">
              <BsPeople style={{ color: 'black' }} className="fs-4" />
              {!isSidebarReduced && (
                <span className="sidebar-txt">Students</span>
              )}
            </div>
          </Link>
          <Link
            to="/teacher/teachers"
            onClick={() => handleClick('button4')}
            className="sidebar-submenu-link"
            style={{
              backgroundColor: activeButton === 'button4' ? '#65b7e5' : '#ffff',
            }}
          >
            <div className="sidebar-submenu-item" data-tooltip="Home">
              <AiOutlineCrown style={{ color: 'black' }} className="fs-4" />
              {!isSidebarReduced && (
                <span className="sidebar-txt">Teachers</span>
              )}
            </div>
          </Link>
          <Link
            to="/teacher/subjects"
            onClick={() => handleClick('button5')}
            className="sidebar-submenu-link"
            style={{
              backgroundColor: activeButton === 'button5' ? '#65b7e5' : '#ffff',
            }}
          >
            <div className="sidebar-submenu-item" data-tooltip="Home">
              <BsBook style={{ color: 'black' }} className="fs-4" />
              {!isSidebarReduced && (
                <span className="sidebar-txt">Subjects</span>
              )}
            </div>
          </Link>

          <Link
            to="/teacher/tasks"
            onClick={() => handleClick('button6')}
            className="sidebar-submenu-link"
            style={{
              backgroundColor: activeButton === 'button6' ? '#65b7e5' : '#ffff',
            }}
          >
            <div className="sidebar-submenu-item" data-tooltip="Home">
              <TfiNotepad style={{ color: 'black' }} className="fs-4" />
              {!isSidebarReduced && <span className="sidebar-txt">Tasks</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
