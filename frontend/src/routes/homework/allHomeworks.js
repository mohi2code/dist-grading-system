import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { useFetchCourseByInstructor, useFetchCourseByExperts, useFetchCourseByStudents } from "../../api/course";
import { useFetchHomeworksByCourse } from "../../api/homework";
import { Button, List, Space } from "antd";

export default function AllHomeworks() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const fetchByInstructor = useFetchCourseByInstructor();
  const fetchByExperts = useFetchCourseByExperts();
  const fetchByStudents = useFetchCourseByStudents();

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let _courses = undefined;
        if (user.role === 'instructor')
          _courses = await fetchByInstructor.execute(user.id, user.token);
        else if (user.role === 'expert')
          _courses = await fetchByExperts.execute(user.id, user.token);
        else 
          _courses = await fetchByStudents.execute(user.id, user.token);

        setCourses(_courses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <Space direction='vertical' style={{ width: '100%', height: '100%' }}>
      {courses && courses.map(course => (
        <HomeworksList 
          key={course._id}
          user={user}
          course={course}
          navigate={navigate}
        />
      ))}
    </Space>
  );
}

const HomeworksList = ({ navigate, user, course }) => {

  const fetchByCourse = useFetchHomeworksByCourse();
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeworks = await fetchByCourse.execute(course._id, user.token);
        setDataSource(homeworks);
        console.log(homeworks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <List 
      dataSource={dataSource}
      loading={!dataSource}
      style={{ background: '#FFF', padding: '1rem 2rem', borderRadius: '.5rem' }}
      itemLayout='horizontal'
      header={ListHeader(course.name)}
      renderItem={homework => (
        HomeworksListItem({ navigate, user, homework })
      )}
    />
  )
}

const ListHeader = (header) => (
  <Space style={{padding: '1rem 0'}}>
    <h1>{header}</h1>
  </Space>
)

const HomeworksListItem = ({ navigate, user, homework }) => {
  return (
    <List.Item
      key={homework._id}
      actions={
        user.role === 'expert' || user.role === 'instructor' ? 
          ExpertActions({homework, navigate})
          :
          StudentActions({ navigate, homework })
      }
    >
      <List.Item.Meta 
        title={homework.name}
        description={<p>Points: {homework.points}</p>}
      />
    </List.Item>
  )
}

const ExpertActions = ({ homework, navigate }) => ([
  <Button
    type="link"
    onClick={() => navigate(`/homeworks/${homework._id}`)}
  >
    view submissions
  </Button>,
  <Button
    type="dashed"
    onClick={() => navigate(`/homeworks/${homework._id}`)}
  >
    edit
  </Button>
])

const StudentActions = ({ navigate, homework }) => ([
  <Button
    type="link"
    onClick={() => navigate(`/submissions/new?homeworkId=${homework._id}`)}
  >
    grade
  </Button>,
  <Button
    type="dashed"
    onClick={() => navigate(`/submissions/new?homeworkId=${homework._id}`)}
  >
    submit
  </Button>
])
