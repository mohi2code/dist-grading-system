import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from '../../context/UserContext'
import { useFetchBySubmitter, useFetchSubmissionById, useGradeSubmission } from '../../api/submission'
import { Breadcrumb, Form, Col, Descriptions, message, Row, Space, Tag, Input, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function ViewSubmission() {

  const navigate = useNavigate();
  const { submissionId } = useParams();
  const { user } = useContext(UserContext)
  const fetchSubmissionById = useFetchSubmissionById();
  const fetchBySubmitter = useFetchBySubmitter();
  const gradeSubmission = useGradeSubmission();

  const [messageApi, contextHolder] = message.useMessage();
  const [submitterForm] = Form.useForm();
  const [graderForm] = Form.useForm();
  const [submission, setSubmission] = useState(null);
  const [submission2, setSubmission2] = useState(null);
  const [homework, setHomework] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _submission = await fetchSubmissionById.execute(submissionId, user.token);
        setSubmission(_submission);
        setHomework(_submission.homework_id);
        populateSubmitterForm(_submission.grade);

        const _submission2 = await fetchBySubmitter.execute(_submission.homework_id._id, _submission.graded_by._id, user.token);
        setSubmission2(_submission2);
        populateGraderForm(_submission2.grade)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const populateSubmitterForm = (grade) => submitterForm.setFieldValue('grade', grade);

  const onFinishSubmitter = async (values) => {
    try {
      messageApi.loading('processing!', 1);
      await gradeSubmission.execute(submission._id, user.token, {
        grade: values.grade
      });
      messageApi.success('Grade updated successfully!', 1)
        .then(() => navigate(0))
    } catch (error) {
      console.log(error);
    }
  }

  const populateGraderForm = (grade) => graderForm.setFieldValue('grade', grade);

  const onFinishGrader = async (values) => {
    try {
      messageApi.loading('processing!', 1);
      await gradeSubmission.execute(submission2._id, user.token, {
        grade: values.grade
      });
      messageApi.success('Grade updated successfully!', 1)
        .then(() => navigate(0))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Breadcrumb 
        style={{ background: '#FFF', padding: '1rem' }}
      >
        {contextHolder}
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href='/homeworks/all'>
          All Homeworks
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/homeworks/all">
          {homework && homework.course_id.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/homeworks/${homework && homework._id}`}>
          {homework && homework.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          {submission && submission.submitted_by.username}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row style={{width: '100%', background: '#fff', padding: '2rem'}}>
        <Col span={11}>
          <Space direction="vertical" style={{width: '100%'}} size="large">
            <Descriptions title="Submitted By" bordered>
              <Descriptions.Item label="Name" span={2}>
                {submission && submission.submitted_by.display_name}
              </Descriptions.Item>
              <Descriptions.Item label="Username" span={2}>
                {submission && submission.submitted_by.username}
              </Descriptions.Item>
              <Descriptions.Item label="Answer" span={4}>
                {submission && submission.answer}
              </Descriptions.Item>
              <Descriptions.Item label="Grade" span={2}>
                {submission && submission.grade}
              </Descriptions.Item>
              <Descriptions.Item label="Objected" span={2}>
                { submission && submission.objected ?
                  <Tag color="red">Yes</Tag>
                  :
                  <Tag color="default">No</Tag>
                }
              </Descriptions.Item>
            </Descriptions>

            <Form
              form={submitterForm}
              onFinish={onFinishSubmitter}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="grade"
                label="Grade"
                rules={[
                  { required: true, message: 'Required field' }
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="dashed"
                  htmlType="submit"
                >
                  Update grade
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Col>

        <Col span={11} offset={2}>
          <Space 
            direction="vertical" style={{width: '100%'}} size="large"
          >
            <Descriptions title="Graded By" bordered>
              <Descriptions.Item label="Name" span={2}>
                {submission2 && submission2.submitted_by.display_name}
              </Descriptions.Item>
              <Descriptions.Item label="Username" span={2}>
                {submission2 && submission2.submitted_by.username}
              </Descriptions.Item>
              <Descriptions.Item label="Grade" span={2}>
                {submission2 && submission2.grade}
              </Descriptions.Item>
            </Descriptions>

            { submission && submission.graded_by && submission.graded_by.role === 'student' ?
              <Form
                form={graderForm}
                onFinish={onFinishGrader}
                layout="vertical"
                size="large"
              >
                <Form.Item
                  name="grade"
                  label="Grade"
                  rules={[
                    { required: true, message: 'Required field' }
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="dashed"
                    htmlType="submit"
                  >
                    Update grade
                  </Button>
                </Form.Item>
              </Form>
              :
              <Tag color="warning">Handled by an expert</Tag>
            }
          </Space>
        </Col>
      </Row>
    </Space>
  )
}