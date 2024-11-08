import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { login } from '@/services/login';
import './Login.less';
import { useEffect } from 'react';
import { useModel } from 'umi';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useModel('userModel');
  const { runAsync: userLogin, loading } = useRequest(login, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        message.success('登录成功');
        sessionStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/');
        return;
      }
      message.error(data.error);
    },
    onError: (error) => {
      message.error(error.message);
    }
  });

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    await userLogin(values);
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="login-container">
      <Card 
        title="登录" 
        className="login-card"
        styles={{
          header: {
            textAlign: 'center',
          }
        }}
        style={{ width: '400px', maxWidth: '90%' }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password placeholder="密码" value='cBxDf6zikmdcczmJ' />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
