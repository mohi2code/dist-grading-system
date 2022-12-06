import { useContext } from "react";
import { UserContext } from '../context/UserContext'
import { useLogin } from "../api/user";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

export default function LoginForm() {  

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const login = useLogin();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      messageApi.loading('Processing...');
      const data = await login.execute(values);
      messageApi.success('Login successful!', 1).then(() => navigate('/'));
      dispatch({ type: 'save-data', user: data });
    } catch (error) {
      messageApi.error(error);
    }
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={formStyle}
      size='large'
    >
      { contextHolder }
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>

    </Form>
  );
}

const formStyle = {
  width: '100%',
  paddingTop: '2rem'
}