import { AssemblyEvent } from '@/api/eventService';
import Event from '@/components/timetable/Event';
import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

interface EventsBoxProps {
    events: AssemblyEvent[];
}

const EventsBox = ({ events }: EventsBoxProps) => {
    const theme = useTheme();

    return (
        <ScrollView style={{ paddingHorizontal: 30 }} contentContainerStyle={{ gap: 8 }}>
            <Event
                title='Lipunmyynti alkaa'
                location='Location: Main Stage'
                time='Time: 13:00 - 13:30'
                color={theme.colors.redHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-2236-2-1-600x600.jpg'
            />
            <Event
                title='TestTitle2'
                location='Location: Black Stage'
                time='Time: 14:00 - 13:30'
                color={theme.colors.greenHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/06/hackrave_cover-600x600.jpg'
            />
            <Event
                title='TestTitle3'
                location='Location: Content Corner'
                time='Time: 15:00 - 13:30'
                color={theme.colors.tealHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/04/eSM2023-16_9_edit-600x600.jpg'
            />
            <Event
                title='TestTitle4'
                location='Location: Creative Zone'
                time='Time: 16:00 - 13:30'
                color={theme.colors.blueHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-1348-1-600x600.jpg'
            />
            <Event
                title='TestTitle1'
                location='Location: Main Stage'
                time='Time: 17:00 - 13:30'
                color={theme.colors.redHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-2236-2-1-600x600.jpg'
            />
            <Event
                title='TestTitle2'
                location='Location: Black Stage'
                time='Time: 18:00 - 13:30'
                color={theme.colors.greenHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/06/hackrave_cover-600x600.jpg'
            />
            <Event
                title='TestTitle3'
                location='Location: Content Corner'
                time='Time: 19:00 - 13:30'
                color={theme.colors.tealHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/04/eSM2023-16_9_edit-600x600.jpg'
            />
            <Event
                title='TestTitle4'
                location='Location: Creative Zone'
                time='Time: 20:00 - 13:30'
                color={theme.colors.blueHighlight}
                thumbnail='https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-1348-1-600x600.jpg'
            />
        </ScrollView>
    );
};

export default EventsBox;
