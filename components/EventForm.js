import { Form, Input, Select, DatePicker, Radio, Button, Typography } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

export default function EventForm({ initialValues = {}, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const formatted = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    onSubmit(formatted);
  };

  return (
    <>
      <Title level={4}>Event Form</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          date: initialValues.date ? dayjs(initialValues.date) : null,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Event Name"
          name="name"
          rules={[{ required: true, message: 'Please enter event name' }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select placeholder="Select category">
            <Option value="Workshop">Workshop</Option>
            <Option value="Seminar">Seminar</Option>
            <Option value="Meetup">Meetup</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Event description" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Radio.Group>
            <Radio value="Upcoming">Upcoming</Radio>
            <Radio value="Completed">Completed</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Event
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
