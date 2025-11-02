import { Form, Input, Select, DatePicker, Radio, Button, Typography, Space } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const categoryOptions = ['Workshop', 'Seminar', 'Meetup'];
const statusOptions = ['Upcoming', 'Completed'];

export default function EventForm({ initialValues = {}, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const formatted = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    onSubmit(formatted);
  };

  const handleReset = () => {
    form.resetFields();
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
          category: initialValues.category || categoryOptions[0],
          status: initialValues.status || statusOptions[0],
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

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select category">
            {categoryOptions.map((cat) => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea rows={4} placeholder="Event description" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Radio.Group>
            {statusOptions.map((status) => (
              <Radio key={status} value={status}>{status}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save Event
            </Button>
            <Button htmlType="button" onClick={handleReset}>
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
