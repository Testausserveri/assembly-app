import { AssemblyEvent, determineStartDayIndex, getEvents } from '@/api/eventService';
import DateSelector from '@/components/timetable/DateSelector';
import EventsBox from '@/elements/timetable/EventsBox';
import { useFavorite } from '@/hooks/useFavorite';
import { useNavigationPanel } from '@/hooks/useNavigationPanel';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ActivityIndicator } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const Timetable = () => {
    const [events, setEvents] = useState<AssemblyEvent[][]>([]);
    const [eventDayIndex, setEventDayIndex] = useState(-1);
    const { favorites, toggle: toggleFavorite } = useFavorite();

    const callback = useCallback((position: number) => {
        setEventDayIndex(position);
    }, []);
    const { ref, nextPage, previousPage, onPageSelected } = useNavigationPanel(callback);

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
        <View style={{ flex: 1 }}>
            {events.length === 0 || eventDayIndex === -1 ? (
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
                        next={nextPage}
                        previous={previousPage}
                    />
                    <AnimatedPager
                        ref={ref}
                        useNext={false}
                        initialPage={eventDayIndex}
                        onPageSelected={onPageSelected}
                        layoutDirection='ltr'
                        orientation='horizontal'
                        style={{ flex: 1 }}
                    >
                        {events.map((day, index) => (
                            <View collapsable={false} key={index}>
                                <EventsBox
                                    events={day ?? []}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                />
                            </View>
                        ))}
                    </AnimatedPager>
                </View>
            )}
        </View>
    );
};

export default Timetable;
