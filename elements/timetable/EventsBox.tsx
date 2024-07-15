import { AssemblyEvent } from '@/api/eventService';
import Event from '@/components/timetable/Event';
import { ScrollView } from 'react-native';

interface EventsBoxProps {
    events: AssemblyEvent[];
}

const EventsBox = ({ events }: EventsBoxProps) => {
    return (
        <ScrollView
            style={{ paddingHorizontal: 30, paddingBottom: 8 }}
            contentContainerStyle={{ gap: 8 }}
        >
            {events.map((event) => (
                <Event
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    start={event.start}
                    end={event.end}
                    color={event.color}
                    thumbnail={event.thumbnail}
                />
            ))}
        </ScrollView>
    );
};

export default EventsBox;
