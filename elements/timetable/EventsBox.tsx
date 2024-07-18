import { AssemblyEvent } from '@/api/eventService';
import Event from '@/components/timetable/Event';
import React, { useEffect } from 'react';
import { VirtualizedList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface EventsBoxProps {
    events: AssemblyEvent[];
}

const EventsBox = ({ events }: EventsBoxProps) => {
    const [loadedEvents, setLoadedEvents] = React.useState<AssemblyEvent[]>([]);

    const isLoading = loadedEvents !== events;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoadedEvents(events);
        }, 250);

        return () => clearTimeout(timeout);
    }, [events]);

    return (
        <>
            {isLoading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
            <VirtualizedList<AssemblyEvent>
                removeClippedSubviews={true}
                pointerEvents={isLoading ? 'none' : 'auto'}
                style={{
                    paddingHorizontal: 30,
                    paddingBottom: 8,
                    opacity: isLoading ? 0 : 1,
                }}
                renderItem={({ item: event }) => (
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
                )}
                contentContainerStyle={{ gap: 8 }}
                keyExtractor={(event) => event.id.toString()}
                getItem={(data, index) => data[index]}
                getItemCount={(_) => loadedEvents.length}
                data={loadedEvents}
                initialNumToRender={8}
            />
        </>
    );
};

export default React.memo(EventsBox);
