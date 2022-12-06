import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateHomework } from "../../api/homework";
import { message, Row, Col, Form, Input, Button } from "antd";


export default function InfoForm({ user, homework }) {

  const navigate = useNavigate();
  const updateHomework = useUpdateHomework();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      messageApi.loading('Processing...');
      await updateHomework.execute(
        homework._id, user.token, values
      );
      messageApi.success('Homework info was updated successfully!', 1)
        .then(() => navigate(0));
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    form.setFieldsValue(homework)
  }, [homework]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      {contextHolder}
      <Row style={{width: '100%'}}>
        <Col span={11}>
          <Form.Item
            name="name"
            label="name"
            rules={[{ required: true, message: 'Course name cannot be empty' }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={11} offset={2}>
          <Form.Item
            name="points"
            label="Points"
            rules={[{ required: true, message: 'Course name cannot be empty' }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="question"
        label="Question"
        rules={[{ required: true, message: 'Course name cannot be empty' }]}
      >
        <Input.TextArea rows={5} />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          block
        >
          save
        </Button>
      </Form.Item>
    </Form>
  );
}
