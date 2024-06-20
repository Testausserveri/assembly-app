import React from 'react';
import { View, Text } from 'react-native';
import DateText from '@/components/timetable/DateText'
import DateSelectorArrowButton from '@/components/timetable/DateSelectorArrowButton'
import { useTheme } from 'react-native-paper';

const DateSelector = ({ date, pressNext, pressLast }) => {

    const theme = useTheme();

    return(
        <View
            style={{
                position: 'absolute',
                width: '100%',
                height: '50%',
                bottom: 0,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    width: '95%',
                    left: "2.5%",
                    height: '100%',
                    bottom: 0,
                    justifyContent: "center",
                }}
            >
                <DateSelectorArrowButton visible={ true } onPress={ pressLast } style={{ left: 0, transform: [{ rotate: '180deg' }] }} />
                <View
                    style={{
                        position: 'absolute',
                        width: '90%',
                        left: '5%',
                        height: '100%',
                        borderRadius: 10,
                        backgroundColor: theme.colors.primaryContainer,
                    }}
                >
                    <DateText text={date} />
                </View>
                <DateSelectorArrowButton visible={ true } onPress={ pressNext } style={{ right: 0, transform: [{ rotate: '0deg' }] }} />
            </View>
        </View>
    )
};

export default DateSelector;
