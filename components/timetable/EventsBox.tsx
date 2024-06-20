import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Event from '@/components/timetable/Event'

const EventsBox = ({ theme }) => {
    return(
        <View
            style={{
                position: 'absolute',
                width: '100%',
                height: '75%',
                bottom: 0,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '98%',
                    bottom: 0,
                }}
            >
                <Event title="Lipunmyynti alkaa" location="Location: Main Stage" time="Time: 13:00 - 13:30" style={{backgroundColor: theme.colors.redHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-2236-2-1-600x600.jpg" theme={ theme } />
                <Event title="TestTitle2" location="Location: Black Stage" time="Time: 14:00 - 13:30" style={{backgroundColor: theme.colors.greenHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/06/hackrave_cover-600x600.jpg" theme={ theme } />
                <Event title="TestTitle3" location="Location: Content Corner" time="Time: 15:00 - 13:30" style={{backgroundColor: theme.colors.tealHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/04/eSM2023-16_9_edit-600x600.jpg" theme={ theme } />
                <Event title="TestTitle4" location="Location: Creative Zone" time="Time: 16:00 - 13:30" style={{backgroundColor: theme.colors.blueHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-1348-1-600x600.jpg" theme={ theme } />
                <Event title="TestTitle1" location="Location: Main Stage" time="Time: 17:00 - 13:30" style={{backgroundColor: theme.colors.redHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-2236-2-1-600x600.jpg" theme={ theme } />
                <Event title="TestTitle2" location="Location: Black Stage" time="Time: 18:00 - 13:30" style={{backgroundColor: theme.colors.greenHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/06/hackrave_cover-600x600.jpg" theme={ theme } />
                <Event title="TestTitle3" location="Location: Content Corner" time="Time: 19:00 - 13:30" style={{backgroundColor: theme.colors.tealHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/04/eSM2023-16_9_edit-600x600.jpg" theme={ theme } />
                <Event title="TestTitle4" location="Location: Creative Zone" time="Time: 20:00 - 13:30" style={{backgroundColor: theme.colors.blueHighlight}} thumbnail="https://wp.assembly.org/summer23/wp-content/uploads/sites/6/2023/05/ASMS2022_OttoJahnukainen_20220806-1348-1-600x600.jpg" theme={ theme } />
            </ScrollView>
        </View>
    )
};

export default EventsBox;
