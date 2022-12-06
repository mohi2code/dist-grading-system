import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useFetchBySubmitter, useGradeSubmission, useObjectGrade, useSubmitHomework } from "../../api/submission";
import { useFetchHomworkById, useFetchHomworkGroup } from "../../api/homework";
import { Space, Breadcrumb, Tabs, Row, Col, Form, Descriptions, Skeleton, Input, Button, message, Tag } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function NewSubmission() {

  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams()
  const fetchHomework = useFetchHomworkById();

  const [homework, setHomework] = useState(null);
  const [canGrade, setCanGrade] = useState(false);

  useEffect(() => {
    let homeworkId = searchParams.get('homeworkId');
    const fetchData = async () => {
      try {
        const _homework = await fetchHomework.execute(homeworkId, user.token);
        setHomework(_homework);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Space
      size="large"
      direction="vertical"
      style={{ width: '100%' }}
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
                label: 'Submit',
                key: 'submit',
                children: <SubmitForm user={user} homework={homework} setCanGrade={setCanGrade} />
              },
              {
                label: 'Grade',
                key: 'grade',
                disabled: !canGrade,
                children: <GradeForm user={user} homework={homework} />
              }
            ]}
          />
        </Col>
      </Row>
    </Space>
  )
}

const SubmitForm = ({ user, homework, setCanGrade }) => {

  const navigate = useNavigate();
  const fetchBySubmitter = useFetchBySubmitter();
  const submitHomework = useSubmitHomework();
  const objectGrade = useObjectGrade();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [submission, setSubmission] = useState();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const _submission = await fetchBySubmitter.execute(homework._id, user.id, user.token);
        _submission && populateForm({ answer: _submission.answer });
        _submission && setCanGrade(true);
        setSubmission(_submission)
        console.log(_submission);
      } catch (error) {
        console.log(error);
      }
    }
    homework && fetchData();
  }, [homework]);

  const populateForm = (values) => form.setFieldsValue(values);

  const onFinish = async (values) => {
    const { answer } = values;
    try {
      messageApi.loading('Processing!');
      const data = await submitHomework.execute(user.token, {
        answer,
        homework_id: homework._id
      });
      messageApi.success('Answer submitted!', 1)
        .then(() => navigate(0));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const object = async () => {
    try {
      messageApi.loading('processing!', 1);
      await objectGrade.execute(submission._id, user.token, {
        objected: true
      });
      messageApi.success('Objection successful!', 1)
        .then(() => navigate(0));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Skeleton loading={!homework} >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        {contextHolder}
        <Form.Item>
          <Descriptions title={homework && homework.name} bordered>
            <Descriptions.Item label="Question" >
              {homework && homework.question}
            </Descriptions.Item>
            <Descriptions.Item label="Grade" >
              {submission && (
                submission.grade ? 
                  <Space size="large">
                    {submission.grade}
                    <Button 
                      type="dashed" 
                      onClick={object}
                      disabled={submission && submission.objected}
                    >
                        Object
                      </Button>
                  </Space>
                  :
                  "Not graded yet!"
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form.Item>

        <Form.Item
          name="answer"
          label="Answer"
        >
          <Input.TextArea 
            rows={5}
            disabled={submission && submission.answer}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary"
            htmlType="submit"
            disabled={submission && submission.answer}
          >
            Submit Answer
          </Button>
        </Form.Item>
      </Form>
    </Skeleton>
  );
}

const GradeForm = ({ user, homework }) => {

  const navigate = useNavigate();
  const fetchGroup = useFetchHomworkGroup();
  const fetchBySubmitter = useFetchBySubmitter();
  const gradeSubmission = useGradeSubmission();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [submitter, setSubmitter] = useState(null);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _subGroup = await fetchGroup.execute(homework._id, user.token);
        const group = _subGroup.group.filter(record => record.grader._id === user.id)[0];
        const _submitter = group.submitter;
        setSubmitter(_submitter);

        const _submission = await fetchBySubmitter.execute(homework._id, _submitter._id, user.token);
        setSubmission(_submission);
        form.setFieldValue('grade', _submission.grade);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      messageApi.loading('Processing!', 1);
      await gradeSubmission.execute(submission._id, user.token, {
        grade: values.grade
      });
      messageApi.success('grade updated!', 1)
        .then(() => navigate(0))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{width: '100%'}}>
      {contextHolder}
      <Descriptions title="Grade student submission" bordered>
        <Descriptions.Item label="Question" span={2} >
          {homework && homework.question}
        </Descriptions.Item>
        <Descriptions.Item label="Points">
          {homework && homework.points}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered>
        <Descriptions.Item label="Answer" span={4} >
          {submission ? submission.answer : "Not answered yet!"}
        </Descriptions.Item>
        <Descriptions.Item label="Grade" span={1} >
          {submission ? submission.grade : "Not graded yet!"}
        </Descriptions.Item>
      </Descriptions>

      { submitter && submitter.role === 'studnet' ? 
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="grade"
            label="Grade"
            rules={[
              { required: true, message: 'Required field' },
              { min: 0, message: 'Grade can not be less than zero!' },
              { max: homework && homework.points ? homework.points: 100, message: 'Upper limit!' }
            ]}
          >
            <Input type="number" disabled={(submitter && submitter.role !== 'student') || !submission} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={(submission && submission.objected) || (submitter && submitter.role !== 'student') || !submission}
            >
              submit
            </Button>
          </Form.Item>
        </Form>
        :
        <Tag color="warning">The grading will be handled by an expert</Tag>
      }
    </Space>
  );
}
