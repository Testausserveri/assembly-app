import { AssemblyEvent } from '@/api/eventService';
import Event from '@/components/timetable/Event';
import { ScrollView } from 'react-native';

interface EventsBoxProps {
    events: AssemblyEvent[];
    favorites: number[];
    toggleFavorite: (id: number, title: string, start: Date) => void;
}

const EventsBox = ({ events, favorites, toggleFavorite }: EventsBoxProps) => {
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
                    toggleFavorite={() => toggleFavorite(event.id, event.title, event.start)}
                    isFavorite={favorites.includes(event.id)}
                />
            ))}
        </ScrollView>
    );
};

export default EventsBox;
