import React from "react";
import { Outlet, useNavigate } from "umi";
import { Layout, Typography, Button, Space } from "antd";
import Sidebar from "@/components/Sidebar";

const App: React.FC = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();

  // 假设我们有一个获取用户信息的函数
  const userInfo = { name: "John Doe" }; // 这里应该替换为实际的用户信息获取逻辑

  const handleLogout = () => {
    // 实现退出登录逻辑
    // 例如: clearUserSession();
    navigate('/login');
  };

  return (
    <Layout>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 20px',
        height: '64px' // Explicitly set the height to match Ant Design's default header height
      }}>
        <Title level={3} style={{ color: 'white', margin: 0, lineHeight: '64px' }}>共享助教后台管理系统</Title>
        <Space align="center">
          <span style={{ color: 'white' }}>欢迎，{userInfo.name}</span>
          <Button onClick={handleLogout}>退出登录</Button>
        </Space>
      </Header>
      <Layout>
        <Sidebar />
        <Layout>
          <Content style={{ backgroundColor: '#fff', margin: 8, borderRadius: 4 }}>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
