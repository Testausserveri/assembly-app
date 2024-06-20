import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const DateText = ({ text }) => {

    const theme = useTheme();

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
                    fontSize: 35,
                    textTransform: 'uppercase',
                 }}
            >
            {text}
            </Text>
        </View>
    )
};

export default DateText;
