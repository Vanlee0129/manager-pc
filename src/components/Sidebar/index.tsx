import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import './styles.less';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">仪表板</Link>,
    },
    {
      key: '/merchants',
      icon: <UserOutlined />,
      label: <Link to="/merchants">商户列表</Link>,
    },
    {
      key: '/workerList',
      icon: <UserOutlined />,
      label: <Link to="/workerList">人员列表</Link>,
    },
    {
      key: '/profit-sharing',
      icon: <SettingOutlined />,
      label: <Link to="/profit-sharing">设置分账</Link>,
    },
    {
      key: '/orders',
      icon: <ShoppingOutlined />,
      label: <Link to="/orders">订单管理</Link>,
    },
    {
      key: '/work-records',
      icon: <FileTextOutlined />,
      label: <Link to="/work-records">工作记录</Link>,
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: <Link to="/reports">报表</Link>,
    },
  ];

  return (
    <Sider
      width={200}
      className="sidebar"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;