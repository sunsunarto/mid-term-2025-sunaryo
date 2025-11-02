import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LayoutApp from '../../../components/LayoutApp';
import EventForm from '../../../components/EventForm';
import { Typography, Divider, message } from 'antd';
import { useEvents } from '../../../context/EventContext';

const { Title } = Typography;

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { events, setEvents } = useEvents();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      const found = events.find((e) => e.id === id);
      setEvent(found);
    }
  }, [id, events]);

  const handleUpdate = (updatedEvent) => {
    const newList = events.map((e) => (e.id === id ? { ...updatedEvent, id } : e));
    setEvents(newList);
    message.success('Event updated');
    router.push('/events');
  };

  if (!event) {
    return (
      <LayoutApp>
        <Title>Event Not Found</Title>
      </LayoutApp>
    );
  }

  return (
    <LayoutApp>
      <Title>Edit Event</Title>
      <Divider />
      <EventForm initialValues={event} onSubmit={handleUpdate} />
    </LayoutApp>
  );
}
