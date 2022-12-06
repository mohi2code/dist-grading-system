import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { useFetchCourses, useFetchCourseByInstructor, useFetchCourseByExperts, useEnroll } from "../../api/course";
import { Avatar, Badge, Button, List, message, Popconfirm, Space } from 'antd'
import { BookOutlined, PlusOutlined } from '@ant-design/icons'

export default function AllCourses() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchByInstructor = useFetchCourseByInstructor();
  const fetchByExperts = useFetchCourseByExperts();
  const fetchCourses = useFetchCourses();
  const enroll = useEnroll();

  const [messageApi, contextHolder] = message.useMessage()
  const [dataSource, setDataSource] = useState([]);

  const enrollStudent = async (courseId) => {
    try {
      messageApi.loading('Processing...');
      await enroll.execute(courseId, user.token);
      messageApi.success('Success!', .5)
        .then(() => navigate(`/`));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      try {
        let courses = undefined;
        if (user.role === 'instructor')
          courses = await fetchByInstructor.execute(user.id, user.token);
        else if (user.role === 'expert')
          courses = await fetchByExperts.execute(user.id, user.token);
        else
          courses = await fetchCourses.execute(user.token);
        setDataSource(courses);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  return (
    <List 
      style={{ background: '#FFF', padding: '1rem 2rem', borderRadius: '.5rem' }}
      itemLayout='horizontal'
      header={ListHeader()}
      footer={ListFooter(user.role, navigate)}
      dataSource={dataSource}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={ListItemActions(
            {
              studentId: user.id,
              role: user.role, 
              item,
              navigate,
              enrollStudent
            }
          )}
        >
          {contextHolder}
          <List.Item.Meta 
            avatar={<Avatar icon={<BookOutlined />} size='large' style={{background: '#00C08C'}} />}
            title={item.name}
            description={ListItemDesc(item)}
          />
        </List.Item>
      )}
    />
  );
}

const ListHeader = () => (
  <Space style={{padding: '1rem 0'}}>
    <h1>Courses</h1>
  </Space>
)

const ListFooter = (role, navigate) => (
  role === 'instructor' && <Button 
    onClick={() => navigate('/courses/new')}
    block icon={<PlusOutlined />} type='dashed'
  >
    Create Course
  </Button>
)

const ListItemDesc = (item) => (
  <Space size='small'>
    <p>Students: {item.students && item.students.length}</p>
    <p>Experts: {item.experts && item.experts.length}</p>
    <p>Homeworks: {item.number_of_homeworks && item.number_of_homeworks}</p>
    <p>Passing Grade: {item.passing_grade && item.passing_grade}</p>
  </Space>
)

const ListItemActions = ({studentId, role, item, navigate, enrollStudent}) => {
  if (role === 'instructor' || role === 'expert')
    return [(
      <Space size='small'>
        <Button 
          type='link' 
          onClick={() => navigate(`/courses/${item._id}`)}
        >
          View
        </Button>
        <Button 
          type='link'
          onClick={() => navigate(`/courses/edit/${item._id}`)}
        >
          Edit
        </Button>
      </Space>
    )];
  else if (role === 'student')
    return item.students && item.students.includes(studentId) ? [(
      <Badge status="success" text="Enrolled" />
    )]: [(
      <Popconfirm
        title="Confirm course enrollment ?"
        placement='bottomLeft'
        onConfirm={() => enrollStudent(item._id)}
      >
        <Button type='default'>enroll</Button>
      </Popconfirm>
    )];
  else 
      return []
}
