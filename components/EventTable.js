import { Table, Button, Space, Popconfirm, message } from 'antd';
import { useRouter } from 'next/router';
import { useEvents } from '../context/EventContext';

export default function EventTable() {
  const router = useRouter();
  const { events, setEvents } = useEvents();

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    message.success('Event deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => router.push(`/events/${record.id}`)}>View</Button>
          <Button size="small" onClick={() => router.push(`/events/${record.id}/edit`)}>Edit</Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}><Button danger size="small">Delete</Button></Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={events} rowKey="id" pagination={{ pageSize: 5 }} />;
}
