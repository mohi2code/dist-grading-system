import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { useFetchCourses, useFetchCourseByInstructor } from "../../api/course";
import { Avatar, Button, List, Space } from 'antd'
import { BookOutlined, PlusOutlined } from '@ant-design/icons'

export default function AllCourses() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchByInstructor = useFetchCourseByInstructor()
  const fetchCourses = useFetchCourses()

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        let courses = undefined;
        if (user.role === 'instructor')
          courses = await fetchByInstructor.execute(user.id, user.token);
        else 
          courses = await fetchCourses.execute(user.token);
        console.log(courses);
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
      footer={ListFooter(user, navigate)}
      dataSource={dataSource}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={ListItemActions(user, item, navigate)}
        >
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

const ListFooter = (user, navigate) => (
  user.role === 'instructor' && <Button 
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

const ListItemActions = (user, item, navigate) => [
  user.role !== 'student' && (
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
  ),

  user.role === 'student' && (
    <Button type='default'>Enroll</Button>
  )
]
