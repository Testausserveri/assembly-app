import React from 'react';
import { View, Text } from 'react-native';

const DateText = ({ theme }) => {
    return(
        <View
            style={{
            position: 'absolute',
            width: '80%',
            left: '10%',
            height: '100%',
            top: 0,
            justifyContent: "center",
            }}
        >
            <Text
                 style={{
                    textAlign: 'center',
                    fontFamily: "RobotoMono",
                    color: theme.colors.primary,
                    fontSize: 35
                 }}
            >
            MONDAY
            </Text>
        </View>
    )
};

export default DateText;
