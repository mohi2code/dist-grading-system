import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { useFetchCourseById } from "../../api/course";
import { Breadcrumb, Button, Col, Descriptions, Divider, List, Row, Skeleton, Space, Avatar } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default function ViewCourse() {

  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user} = useContext(UserContext);
  const fetchCourse = useFetchCourseById();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const data = await fetchCourse.execute(courseId, user.token);
        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <Space.Compact
      style={{height: '100%'}}
      block direction='vertical'
    >
      <Breadcrumb style={{ background: '#FFF', padding: '1rem' }}>
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href='/courses/all'>
          Courses
        </Breadcrumb.Item>
        <Breadcrumb.Item href='#'>
          { course && course.name }
        </Breadcrumb.Item>
      </Breadcrumb>

      <Skeleton active loading={!course}>
        <Row style={{ background: '#FFF', marginTop: '2rem', padding: '2rem' }}>
          <Col span={24}>
            <Descriptions title={CourseInfoTitle({courseId, navigate})} bordered>
              <Descriptions.Item label='Course Name' span={2}>
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
          </Col>

          <Divider />

          <Col span={24}>
            <List 
              header="Enrolled Students"
              size='small'
              dataSource={course && course.students}
              renderItem={item => (
                <List.Item
                  key={item._id}
                >
                  <List.Item.Meta 
                    avatar={<Avatar icon={<UserOutlined />} size='large'/>}
                    title={item['display_name']}
                    description={item.username}
                  />
                </List.Item>
              )}
            />
          </Col>

          <Divider />

          <Col span={24}>
            <List 
              header="Assigned Experts"
              size='small'
              dataSource={course && course.experts}
              renderItem={item => (
                <List.Item
                  key={item._id}
                >
                  <List.Item.Meta 
                    avatar={<Avatar icon={<UserOutlined />} size='large' style={{background: '#00C08C'}} />}
                    title={item['display_name']}
                    description={item.username}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Skeleton>
    </Space.Compact>
  );
}

const CourseInfoTitle = ({ courseId, navigate }) => (
  <Space.Compact style={{width: '100%'}}>
    <h3 style={{fontWeight: 600}}>Course Info</h3>
    <Button 
      style={{ marginLeft: 'auto' }}
      type='dashed'
      onClick={() => navigate(`/courses/edit/${courseId}`)}
    >
      Edit
    </Button>
  </Space.Compact>
)
