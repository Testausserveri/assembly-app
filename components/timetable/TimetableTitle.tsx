import React from 'react';
import { View, Text } from 'react-native';

const TimetableTitle = ({ theme }) => {
    return(
        <View
            style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            top: 0,
            justifyContent: "center",
            }}>
            <Text
                 style={{
                    textAlign: 'center',
                    fontFamily: "Gaba",
                    color: theme.colors.primary,
                    fontSize: 40
                 }}
            >
            TIMETABLE
            </Text>
        </View>
    )
};

export default TimetableTitle;
