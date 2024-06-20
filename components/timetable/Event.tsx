import React from 'react';
import { View, Text, Image } from 'react-native';
import EventInfo from '@/components/timetable/EventInfo'

const Event = ({ title, location, time, style, thumbnail, theme }) => {
    return(
        <View
            style={{
                position: 'relative',
                width: '80%',
                left: "10%",
                top: 0,
                height: 90,
                justifyContent: "center",
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: theme.colors.primaryContainer,
            }}
        >
            <Image
                source={{uri: thumbnail}}
                resizeMode="cover"
                style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    borderRadius: 10,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: "100%",
                    top: 0,
                    left: 0,
                    borderRadius: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                }}
            >
            </View>
            <View
                style={[{
                    position: 'absolute',
                    width: '3%',
                    height: "100%",
                    top: 0,
                    left: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }, style]}
            >
            </View>
            <View
                style={{
                    position: 'absolute',
                    width: '94%',
                    height: "100%",
                    top: 0,
                    left: "3%",
                }}
            >
                <EventInfo title={title} location={location} time={time} theme={theme} />
            </View>
        </View>
    )
};

export default Event;
