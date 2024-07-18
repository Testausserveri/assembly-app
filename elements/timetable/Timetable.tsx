import { AssemblyEvent, determineStartDayIndex, getEvents } from '@/api/eventService';
import DateSelector from '@/components/timetable/DateSelector';
import EventsBox from '@/elements/timetable/EventsBox';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Timetable = () => {
    const [events, setEvents] = useState<AssemblyEvent[][]>([]);
    const [eventDayIndex, setEventDayIndex] = useState(0);

    const previous = () => {
        if (eventDayIndex > 0) {
            setEventDayIndex(eventDayIndex - 1);
        }
    };

    const next = () => {
        if (eventDayIndex < events.length - 1) {
            setEventDayIndex(eventDayIndex + 1);
        }
    };

    useEffect(() => {
        getEvents().then((eventRes) => {
            // Group events by date
            const eventsGroupedByDay = eventRes
                .reduce((acc, event) => {
                    if (acc.length === 0) {
                        return [[event]];
                    }
                    const last = acc[acc.length - 1];
                    if (last[0].start.getDate() === event.start.getDate()) {
                        last.push(event);
                    } else {
                        last.sort((a, b) => a.start.getTime() - b.start.getTime());
                        acc.push([event]);
                    }
                    return acc;
                }, [] as AssemblyEvent[][])
                .sort((a, b) => a[0].start.getTime() - b[0].start.getTime());

            setEvents(eventsGroupedByDay);

            const startDayIndex = determineStartDayIndex(eventRes);
            // If the event has not started yet
            if (new Date().getTime() < eventsGroupedByDay[startDayIndex][0].start.getTime()) {
                // Set the index to be the "official" event start index
                setEventDayIndex(startDayIndex);
            } else {
                // Set index so that the current day is shown
                const index = eventsGroupedByDay.findIndex(
                    (events) => events[events.length - 1].end.getTime() > new Date().getTime()
                ); // If last event of the day has ended, it's not the current day
                setEventDayIndex(index === -1 ? eventsGroupedByDay.length - 1 : index);
            }
        });
    }, []);

    return (
        <View
            style={{
                display: 'flex',
                gap: 16,
                flex: 1,
            }}
        >
            {events.length === 0 ? (
                <ActivityIndicator animating />
            ) : (
                <>
                    <View
                        style={{
                            zIndex: 2,
                        }}
                    >
                        <DateSelector
                            date={events[eventDayIndex][0].start}
                            next={next}
                            previous={previous}
                            nextVisible={eventDayIndex < events.length - 1}
                            previousVisible={eventDayIndex > 0}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <EventsBox events={events[eventDayIndex] ?? []} />
                    </View>
                </>
            )}
        </View>
    );
};

export default Timetable;
