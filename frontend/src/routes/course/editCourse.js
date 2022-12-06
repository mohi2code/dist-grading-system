import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useFetchUsersByRole } from "../../api/user";
import { useFetchCourseById, useUpdateCourse, useUpdateExperts } from "../../api/course";
import { Breadcrumb, Space, Row, Col, Tabs, Form, Select, Button, message, Input } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function EditCourse() {

  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const fetchCourse = useFetchCourseById();
  const updateCourse = useUpdateCourse();
  const fetchExperts = useFetchUsersByRole();
  const updateExperts = useUpdateExperts();

  const [messageApi, contextHolder] = message.useMessage();
  const [expertsForm] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [course, setCourse] = useState(null);
  const [users, setUsers] = useState(null);

  const onFinishInfo = async (values) => {
    console.log(values);
    try {
      messageApi.loading('Processing...');
      const data = await updateCourse.execute(
        courseId, user.token, values
      );
      messageApi.success('Course experts were updated successfully!', 1)
        .then(() => navigate(`/courses/edit/${data._id}`));
    } catch (error) {
      console.log(error);
      messageApi.error(error)
    }
  }

  const populateInfoForm = (values) => infoForm.setFieldsValue(values);

  const onFinishExperts = async (values) => {
    let _experts = values.experts.map(e => e)
    try {
      messageApi.loading('Processing...');
      const data = await updateExperts.execute(
        courseId, user.token, 
        { experts: _experts }
      );
      messageApi.success('Course experts were updated successfully!')
        .then(() => navigate(`/courses/edit/${data._id}`));
    } catch (error) {
      console.log(error);
      messageApi.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _course = await fetchCourse.execute(courseId, user.token);
        const _users = await fetchExperts.execute('expert', user.token)
        setCourse(_course);
        setUsers(_users);
        populateInfoForm(_course);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Space.Compact
      style={{height: '100%'}} block direction='vertical' size='large'
    >
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
          Edit course - {course && course.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row 
        style={{ background: '#FFF', marginTop: '2rem', padding: '2rem' }}
      >
        <Col
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          span={16} offset={4}
        >
          <Tabs 
            style={{width: '100%'}}
            tabPosition='left'
            items={[
              {
                label: 'Basic info',
                key: 'basic-info',
                children: BasicInfoForm({
                  userRole: user && user.role,
                  form: infoForm,
                  onFinish: onFinishInfo
                })
              },
              {
                label: 'Experts',
                key: 'experts',
                disabled: user.role !== 'instructor',
                children: ExpertsForm(
                  {
                    form: expertsForm,
                    onFinish: onFinishExperts,
                    initial: course && course.experts.map(e => ({
                      label: e['display_name'] || e.username,
                      value: e._id
                    })),
                    options: users && [
                      {
                        label: user['display_name'] || user.username,
                        value: user.id
                      },
                      ...users.map(e => ({
                        label: e['display_name'] || e.username,
                        value: e._id
                      }))
                    ]
                  }
                )
              }
            ]}
          />
        </Col>
      </Row>
    </Space.Compact>
  )
}

const BasicInfoForm = ({userRole, form, onFinish }) => (
  <Form
    form={form}
    onFinish={onFinish}
    layout='vertical'
    style={{width: '100%'}}
  >
    <Form.Item
      name='name'
      rules={[{ required: true, message: 'Course name cannot be empty' }]}
      label='Course Name'
    >
      <Input disabled={userRole && userRole !== 'instructor'} />
    </Form.Item>

    <Row>
      <Col span={11}>
        <Form.Item
          name='passing_grade'
          label='Passing grade'
          rules={[{ required: true, message: 'passing grade is required' }]}
        >
          <Input 
            type="number" min={0} max={100}
            disabled
          />
        </Form.Item>
      </Col>
      <Col span={11} offset={1}>
        <Form.Item
          name='number_of_homeworks'
          label='Number of homeworks'
          rules={[{ required: true, message: 'specify number of homeworks' }]}
        >
          <Input disabled type="number" min={0} max={10} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item>
      <Button
        type='primary'
        htmlType='submit'
      >
        save
      </Button>
    </Form.Item>
  </Form>
)

const ExpertsForm = ({ form, onFinish, initial, options }) => (
  <Form
    form={form}
    onFinish={onFinish}
    style={{width: '100%'}}
    layout='vertical'
    initialValues={{ experts: initial }}
  >
    <Form.Item
      name='experts'
      label='Experts'
    >
      <Select 
        mode='multiple'
        style={{ width: '100%' }}
        options={options}
      />
    </Form.Item>

    <Form.Item>
      <Button
        type='primary'
        htmlType='submit'
      >
        save
      </Button>
    </Form.Item>
  </Form>
)
