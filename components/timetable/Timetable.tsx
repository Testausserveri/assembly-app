import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TimetableHead from '@/components/timetable/TimetableHead'
import EventsBox from '@/components/timetable/EventsBox';
import { useTheme } from 'react-native-paper';

const Timetable = () => {

    const theme = useTheme();

    const pressNext = () => {
        console.log("next")
    };

    const pressLast = () => {
        console.log("last")
    };

    return(
        <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
              }}>
              <TimetableHead date="friday" pressLast={ pressLast } pressNext={ pressNext } />
              <EventsBox pressLast={ pressLast } pressNext={ pressNext } />
        </View>
    )
};

export default Timetable;
