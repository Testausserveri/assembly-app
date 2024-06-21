import { AssemblyEvent, getEvents } from '@/api/eventService';
import EventsBox from '@/components/timetable/EventsBox';
import TimetableHead from '@/components/timetable/TimetableHead';
import { useEffect, useState } from 'react';
import { Surface } from 'react-native-paper';

const Timetable = () => {
    const [events, setEvents] = useState<AssemblyEvent[]>([]);

    const pressLast = () => {
        console.log('Last');
    };

    const pressNext = () => {
        console.log('Next');
    };

    useEffect(() => {
        getEvents().then((eventRes) => {
            setEvents(eventRes);
        });
    }, []);

    return (
        <Surface
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: 8,
            }}
        >
            <TimetableHead date='friday' previous={pressLast} next={pressNext} />
            <EventsBox events={events} />
        </Surface>
    );
};

export default Timetable;
