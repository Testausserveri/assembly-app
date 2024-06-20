import React from 'react';
import { View, Text } from 'react-native';
import TimetableHead from '@/components/timetable/TimetableHead'
import EventsBox from '@/components/timetable/EventsBox';

const Timetable = ({ theme }) => {
    return(
        <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
              }}>
              <TimetableHead theme={ theme } />
              <EventsBox theme={ theme } />
        </View>
    )
};

export default Timetable;
