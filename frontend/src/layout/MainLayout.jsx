import React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout, theme } from 'antd';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
const { Content } = Layout;
const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <NavBar />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
