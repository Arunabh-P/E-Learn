import React, { useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from 'react-icons/ai';
import { ImBlog } from 'react-icons/im';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaClipboardList, FaBloggerB } from 'react-icons/fa';
import { RiCouponLine } from 'react-icons/ri';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

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
          <span className="sm-logo">L | A</span>
          <span className="lg-logo">E-Learn</span>
        </h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['']}
        onClick={({ key }) => {
          if (key == 'signout') {
          } else {
            navigate(key);
          }
        }}
        items={[
          {
            key: '',
            icon: <AiOutlineDashboard className="fs-4" />,
            label: 'Dashboard',
          },
          {
            key: 'customers',
            icon: <AiOutlineUser className="fs-4" />,
            label: 'Customers',
          },
          {
            key: 'Catalog',
            icon: <AiOutlineShoppingCart className="fs-4" />,
            label: 'Catalog',
            children: [
              {
                key: 'product',
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: 'Add Product',
              },
              {
                key: 'list-product',
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: 'Product List',
              },
              {
                key: 'brand',
                icon: <SiBrandfolder className="fs-4" />,
                label: 'Add Brand',
              },
              {
                key: 'list-brand',
                icon: <SiBrandfolder className="fs-4" />,
                label: 'Brand List ',
              },
              {
                key: 'category',
                icon: <BiCategoryAlt className="fs-4" />,
                label: 'Add Category',
              },
              {
                key: 'list-category',
                icon: <BiCategoryAlt className="fs-4" />,
                label: 'Category List',
              },
              {
                key: 'color',
                icon: <AiOutlineBgColors className="fs-4" />,
                label: 'Add Color',
              },
              {
                key: 'list-color',
                icon: <AiOutlineBgColors className="fs-4" />,
                label: 'Color List',
              },
            ],
          },
          {
            key: 'orders',
            icon: <FaClipboardList className="fs-4" />,
            label: 'Orders',
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
          {
            key: 'blogs',
            icon: <FaBloggerB className="fs-4" />,
            label: 'Blogs',
            children: [
              {
                key: 'blog',
                icon: <ImBlog className="fs-4" />,
                label: 'Add Blog',
              },
              {
                key: 'blog-list',
                icon: <FaBloggerB className="fs-4" />,
                label: 'Blog List',
              },
              {
                key: 'blog-category',
                icon: <ImBlog className="fs-4" />,
                label: 'Add Blog Category',
              },
              {
                key: 'blog-category-list',
                icon: <FaBloggerB className="fs-4" />,
                label: 'Blog Category List',
              },
            ],
          },
          {
            key: 'enquiries',
            icon: <FaClipboardList className="fs-4" />,
            label: 'Enquiries',
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
