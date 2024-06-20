import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const EventInfo = ({ title, location, time}) => {

    const theme = useTheme();

    return(
        <View
            style={{
            position: 'absolute',
            width: '100%',
            left: '0',
            height: '100%',
            top: 0,
            justifyContent: "center",
            }}
        >
            <View
                style={{
                position: 'absolute',
                width: '100%',
                left: 0,
                height: '40%',
                top: 0,
                justifyContent: "center",
                }}
            >
                <Text
                     style={{
                        textAlign: 'center',
                        fontFamily: "Gaba",
                        color: theme.colors.primary,
                        fontSize: 18,
                     }}
                >
                {title}
                </Text>
            </View>
            <View
                style={{
                position: 'absolute',
                width: '100%',
                left: 0,
                height: '20%',
                bottom: '40%',
                justifyContent: "center",
                }}
            >
                <Text
                     style={{
                        textAlign: 'center',
                        fontFamily: "RobotoMono",
                        color: theme.colors.primary,
                        fontSize: 15,
                     }}
                >
                {location}
                </Text>
            </View>
            <View
                style={{
                position: 'absolute',
                width: '100%',
                left: 0,
                height: '20%',
                bottom: '15%',
                justifyContent: "center",
                }}
            >
                <Text
                     style={{
                        textAlign: 'center',
                        fontFamily: "RobotoMono",
                        color: theme.colors.primary,
                        fontSize: 15,
                     }}
                >
                {time}
                </Text>
            </View>
        </View>
    )
};

export default EventInfo;
