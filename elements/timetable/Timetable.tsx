import { AssemblyEvent, getEvents } from '@/api/eventService';
import DateSelector from '@/components/timetable/DateSelector';
import EventsBox from '@/elements/timetable/EventsBox';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ActivityIndicator } from 'react-native-paper';

const Timetable = () => {
    const [events, setEvents] = useState<AssemblyEvent[][]>([]);

    let currentDay = 0;

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

            // Set index so that the current day is shown
            const index = eventsGroupedByDay.findIndex(
                (events) => events[events.length - 1].end.getTime() > new Date().getTime()
            ); // If last event of the day has ended, it's not the current day
            currentDay = index === -1 ? eventsGroupedByDay.length - 1 : index;
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {events.length === 0 ? (
                <ActivityIndicator animating />
            ) : (
                <PagerView
                    initialPage={currentDay}
                    layoutDirection='ltr'
                    orientation='horizontal'
                    style={{ flex: 1 }}
                >
                    {events.map((day, index) => (
                        <View
                            key={index}
                            collapsable={false}
                            style={{
                                display: 'flex',
                                gap: 16,
                                flex: 1,
                            }}
                        >
                            <DateSelector
                                date={day[0].start}
                                nextVisible={index < events.length - 1}
                                previousVisible={index > 0}
                            />
                            <View style={{ flex: 1 }}>
                                <EventsBox events={day ?? []} />
                            </View>
                        </View>
                    ))}
                </PagerView>
            )}
        </View>
    );
};

export default Timetable;
