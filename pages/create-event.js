import { useState } from 'react';
import { Typography, Divider, Card, Row, Col } from 'antd';
import LayoutApp from '../components/LayoutApp';
import EventForm from '../components/EventForm';
import EventCard from '../components/EventCard';
import { useRouter } from 'next/router';
import { useEvents } from '../context/EventContext';

const { Title } = Typography;

export default function CreateEvent() {
  const router = useRouter();
  const { events, setEvents } = useEvents();
  const [preview, setPreview] = useState({});

  const stats = {
    total: events.length,
    upcoming: events.filter((e) => e.status === 'Upcoming').length,
    completed: events.filter((e) => e.status === 'Completed').length,
  };

  const handleSubmit = (values) => {
    const newEvent = {
      ...values,
      id: Date.now().toString(), // unique ID
    };

    setEvents([...events, newEvent]); // update global state
    router.push('/events'); // redirect after save
  };

  return (
    <LayoutApp>
      <Title>Create New Event</Title>
      <Divider />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card title="Total Events">
            <Title level={4}>{stats.total}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Upcoming Events">
            <Title level={4}>{stats.upcoming}</Title>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Completed Events">
            <Title level={4}>{stats.completed}</Title>
          </Card>
        </Col>
      </Row>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <EventForm
            initialValues={{}}
            onSubmit={handleSubmit}
            onValuesChange={(_, allValues) => setPreview(allValues)}
          />
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <EventCard event={preview} />
        </div>
      </div>
    </LayoutApp>
  );
}
