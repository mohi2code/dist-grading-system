import { useContext, useReducer } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { useCreateCourse } from '../../api/course'
import { Breadcrumb, Col, Form, Input, Row, Space, Steps, Button, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons'

export default function NewCourse() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const createCourse = useCreateCourse();

  const [step, dispatch] = useReducer(reducer, 0);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      messageApi.loading('Processing...');
      const data = await createCourse.execute(user.token, values);
      dispatch({ type: 'increment' });
      navigate(`/courses/new/success/${data._id}`);
    } catch (error) {
      messageApi.error(error);
    }
  }

  return (
    <Space.Compact style={{height: '100%'}} block direction='vertical' size='large'>
      {contextHolder}
      <Breadcrumb 
        style={{ background: '#FFF', padding: '1rem' }}
      >
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href='/courses/all'>
          Courses
        </Breadcrumb.Item>
        <Breadcrumb.Item href='#'>
          Create a new course
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row style={{ background: '#FFF', marginTop: '2rem', padding: '2rem' }}>
        <Col span={16} offset={4}>
          <Steps
            progressDot
            current={step}
            items={[
              {
                key: 0,
                title: 'Course Info',
                description: 'Basic information about the course'
              },
              {
                key: 1,
                title: 'Complete',
                description: 'Review & submit'
              }
            ]}
          />
        </Col>

        <Outlet />

        {step === 0 && (
          <Col
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '4rem' }} 
            span={8} offset={8}
          >
            <Form
              form={form}
              onFinish={onFinish}
              layout='vertical'
              style={{ width: '100%' }}
            >
              <Form.Item
                name='name'
                label='Course name'
                rules={[{ required: true, message: 'course name is required' }]}
              >
                <Input />
              </Form.Item>

              <Row>
                <Col span={11}>
                  <Form.Item
                    name='passing_grade'
                    label='Passing grade'
                    rules={[{ required: true, message: 'passing grade is required' }]}
                  >
                    <Input type="number" min={0} max={100} />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    name='number_of_homeworks'
                    label='Number of homeworks'
                    rules={[{ required: true, message: 'specify number of homeworks' }]}
                  >
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button block type="primary" htmlType='submit'>
                  next
                </Button>
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </Space.Compact>
  )
}

function reducer(step, action) {
  switch (action.type) {
    case 'increment':
      return step = step + 1;

    case 'decrement':
      return step = step - 1
      
    default:
      break;
  }
}
