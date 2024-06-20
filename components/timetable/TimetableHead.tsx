import React from 'react';
import { View, Text } from 'react-native';
import TimetableTitle from '@/components/timetable/TimetableTitle'
import DateSelector from '@/components/timetable/DateSelector'

const TimetableHead = ({ theme }) => {
    return(
        <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '25%',
                top: 0,
              }}>
              <TimetableTitle theme={ theme } />
              <DateSelector theme={ theme } />
        </View>
    )
};

export default TimetableHead;
