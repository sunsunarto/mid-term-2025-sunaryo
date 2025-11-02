import { createContext, useContext, useState } from 'react';
import initialEvents from '../data/events.json';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(initialEvents);
  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
