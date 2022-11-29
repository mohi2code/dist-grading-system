import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useRegister } from "../api/user";
import { Col, Form, Input, Row, Select, Button, message } from 'antd';

export default function RegisterForm() {

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const register = useRegister();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      messageApi.loading('Creating a new user, please wait')
      const data = await register.execute(values)
      dispatch({ type: 'save-data', user: data });
      messageApi.success('User was created successfully!').then(() => navigate('/'));
    } catch (error) {
      messageApi.error(error)
    }
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={formStyle}
      size='large'
      initialValues={{role: 'student'}}
    >
      { contextHolder }
      <Form.Item
        name="username"
        label='Username'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label='Password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input type="password" />
      </Form.Item>

      <Input.Group>
        <Row>
          <Col span={12}>
            <Form.Item
              name="display_name"
              label='Display Name'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              name='role'
              label='Role'
              rules={[{required: true, message: 'Please select a role!'}]}
              >
              <Select 
                options={[
                  {
                    value: 'student',
                    label: 'Student'
                  },
                  {
                    value: 'expert',
                    label: 'Expert'
                  }, 
                  {
                    value: 'instructor',
                    label: 'Instructor'
                  }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>

      <Form.Item>
        <Button block type='primary' htmlType="submit">
          Create my account
        </Button>
      </Form.Item>
    </Form>
  );
}

const formStyle = {
  width: '100%',
  paddingTop: '2rem'
}