import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { useFetchCourseById } from "../../api/course";
import { Descriptions, Space, Col, Button, Result, Skeleton } from "antd"

export default function CourseSuccess() {

  const navigate = useNavigate();
  let { courseId } = useParams();
  const { user } = useContext(UserContext)
  const fetchCourseById = useFetchCourseById();

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourseById.execute(courseId, user.token);
        setCourse(data)
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <Col
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '4rem' }} 
      span={16} offset={4}
    >
      <Skeleton loading={loading}>
        <Space block direction='vertical'>
          <Result
            status='success'
            title='Course was created successfully!'
            extra={
              <Button onClick={() => navigate('/courses/all')} type="primary" key="console">
                Back to main page
              </Button>
            }
          />

          <Descriptions title="Course Info" bordered>
            <Descriptions.Item label='Course name' span={2}>
              {course && course.name}
            </Descriptions.Item>
            <Descriptions.Item label='Instructor' span={2}>
              {course && course.instructor && (course.instructor['display_name'] || course.instructor.username)}
            </Descriptions.Item>
            <Descriptions.Item label='Passing Grade' span={2}>
              {course && course.passing_grade}
            </Descriptions.Item>
            <Descriptions.Item label='Number Of Homeworks' span={2}>
              {course && course.number_of_homeworks}
            </Descriptions.Item>
          </Descriptions>
        </Space> 
      </Skeleton>
    </Col>
  )
}