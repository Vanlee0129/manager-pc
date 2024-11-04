import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.less';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/');
  };

  return (
    <div className="login-container">
      <Card 
        title="登录" 
        className="login-card"
        headStyle={{ textAlign: 'center' }}
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
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
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
