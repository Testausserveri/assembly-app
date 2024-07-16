import { AssemblyEvent, getEvents } from '@/api/eventService';
import DateSelector from '@/components/timetable/DateSelector';
import EventsBox from '@/elements/timetable/EventsBox';
import { usePagerPageHandler } from '@/hooks/usePagerPage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ActivityIndicator } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const Timetable = () => {
    const [events, setEvents] = useState<AssemblyEvent[][]>([]);
    const [eventDayIndex, setEventDayIndex] = useState(0);

    const onPageSelectedHandler = usePagerPageHandler({
        onPageSelected: (e: any) => {
            'worklet';
            console.log('Selected page ', e.position);
            //setEventDayIndex(e.position);
        },
    });

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
            setEventDayIndex(index === -1 ? eventsGroupedByDay.length - 1 : index);
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {events.length === 0 ? (
                <ActivityIndicator animating />
            ) : (
                <View
                    style={{
                        display: 'flex',
                        gap: 16,
                        flex: 1,
                    }}
                >
                    <DateSelector
                        date={events[eventDayIndex][0].start}
                        nextVisible={eventDayIndex < events.length - 1}
                        previousVisible={eventDayIndex > 0}
                    />
                    <AnimatedPager
                        useNext={true}
                        initialPage={eventDayIndex}
                        onPageSelected={onPageSelectedHandler}
                        layoutDirection='ltr'
                        orientation='horizontal'
                        style={{ flex: 1 }}
                    >
                        {events.map((day, index) => (
                            <View collapsable={false} key={index}>
                                <EventsBox events={day ?? []} />
                            </View>
                        ))}
                    </AnimatedPager>
                </View>
            )}
        </View>
    );
};

export default Timetable;
