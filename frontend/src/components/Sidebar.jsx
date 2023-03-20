import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImBlog } from 'react-icons/im';
import { BsPeople } from 'react-icons/bs';

import { HiOutlineBuildingLibrary } from 'react-icons/hi2';

import { BiHomeAlt2 } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { RiCouponLine } from 'react-icons/ri';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div
        className="logo m-2 rounded h-auto"
        style={{ background: '#6a9691' }}
      >
        <h2 className="text-white fs-5 text-center py-3 mb-0">
          <span className="sm-logo">E | L</span>
          <span className="lg-logo">E-Learn</span>
        </h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['']}
        onClick={({ key }) => {
          if (key === 'signout') {
          } else {
            navigate(key);
          }
        }}
        items={[
          {
            key: '',
            icon: <BiHomeAlt2 className="fs-4" />,
            label: 'Home',
          },
          {
            key: 'department',
            icon: <HiOutlineBuildingLibrary className="fs-4" />,
            label: 'Departments',
          },
          {
            key: 'students',
            icon: <BsPeople className="fs-4" />,
            label: 'Students',
          },
          {
            key: 'tasks',
            icon: <FaClipboardList className="fs-4" />,
            label: 'Tasks',
          },

          {
            key: 'marketing',
            icon: <RiCouponLine className="fs-4" />,
            label: 'Marketing',
            children: [
              {
                key: 'coupon',
                icon: <ImBlog className="fs-4" />,
                label: 'Add Coupon',
              },
              {
                key: 'coupon-list',
                icon: <RiCouponLine className="fs-4" />,
                label: 'Coupon List',
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
