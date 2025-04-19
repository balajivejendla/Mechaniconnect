import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTheme } from '../Context/ThemeContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface TimeSlot {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAvailable: boolean;
}

interface ServiceCalendarProps {
  onTimeSlotSelect: (slot: TimeSlot) => void;
}

const ServiceCalendar: React.FC<ServiceCalendarProps> = ({ onTimeSlotSelect }) => {
  const { darkMode } = useTheme();
  const [events, setEvents] = useState<TimeSlot[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate available time slots for the next 7 days
  useEffect(() => {
    const newEvents: TimeSlot[] = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(currentDate, i);
      const daySlots = generateTimeSlots(new Date(date));
      newEvents.push(...daySlots);
    }
    setEvents(newEvents);
  }, [currentDate]);

  const generateTimeSlots = (date: Date) => {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      const slotDate = new Date(date);
      slotDate.setHours(hour);
      slots.push({
        id: `slot-${slotDate.toISOString()}`,
        title: `Available ${hour}:00`,
        start: new Date(slotDate.setHours(hour, 0, 0)),
        end: new Date(slotDate.setHours(hour + 1, 0, 0)),
        isAvailable: true,
      });
    }
    return slots;
  };

  const handleSlotSelect = ({ start }: { start: Date }) => {
    const selectedSlot = events.find(
      (event) => event.start.getTime() === start.getTime()
    );

    if (selectedSlot?.isAvailable) {
      onTimeSlotSelect(selectedSlot);
    }
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <div className={`h-[600px] ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelect}
        onNavigate={handleNavigate}
        className={`${darkMode ? 'dark-calendar' : ''} min-h-[500px]`}
        views={['week', 'day']}
        defaultView="week"
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
        eventPropGetter={(event: any) => ({
          className: `${
            event.isAvailable
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-500 cursor-not-allowed'
          } text-white rounded-md p-1`,
        })}
      />
    </div>
  );
};

export default ServiceCalendar;