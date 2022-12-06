import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useFetchHomworkById } from "../../api/homework";
import { Space, Breadcrumb, Row, Col, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import InfoForm from "../../components/homework/infoForm";
import GroupSection from "../../components/homework/groupSection";
import SubmissionsSection from '../..//components/homework/submissionsSection';

export default function ViewAndEdit() {

  const { homeworkId } = useParams();
  const { user } = useContext(UserContext);
  const fetchHomework = useFetchHomworkById();

  const [homework, setHomework] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _homework = await fetchHomework.execute(homeworkId, user.token);
        setHomework(_homework);
        console.log(_homework);
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
      <Breadcrumb 
        style={{ background: '#FFF', padding: '1rem' }}
      >
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href='/homeworks/all'>
          All Homeworks
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/homeworks/all">
          {homework && homework.course_id.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item href='#'>
          {homework && homework.name}
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
            tabPosition="left"
            items={[
              {
                label: 'Info',
                key: 'info',
                children: <InfoForm
                  user={user}
                  homework={homework}
                />
              },
              {
                label: 'Groups',
                key: 'groups',
                children: <GroupSection
                  user={user}
                  homework={homework}
                />
              },
              {
                label: 'Submissions',
                key: 'submissions',
                children: <SubmissionsSection
                  user={user}
                  homework={homework}
                />
              }
            ]}
          />
        </Col>
      </Row>
    </Space.Compact>
  );
}
