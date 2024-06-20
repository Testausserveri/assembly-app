import React from 'react';
import { View, Text } from 'react-native';
import TimetableTitle from '@/components/timetable/TimetableTitle'
import DateSelector from '@/components/timetable/DateSelector'
import { useTheme } from 'react-native-paper';

const TimetableHead = ({ date, pressNext, pressLast }) => {

    const theme = useTheme();

    return(
        <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '25%',
                top: 0,
              }}>
              <TimetableTitle />
              <DateSelector date={ date } pressNext={ pressNext } pressLast={ pressLast } />
        </View>
    )
};

export default TimetableHead;
