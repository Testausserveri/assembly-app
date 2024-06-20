import React from 'react';
import { View, Text, Stylesheet, Button, TouchableOpacity } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

const DateSelectorArrowButton = ({ visible, onPress, style }) => {

    const theme = useTheme();

    return(
        <View
            style={[{
                position: 'absolute',
                width: '15%',
                height: '100%',
                top: 0,
                justifyContent: "center",
                zIndex: 1,
                display: (visible ? "" : "none")
            }, style]}
        >
            <TouchableOpacity
                style={{
                    width: "100%",
                    aspectRatio: 1,
                    backgroundColor: theme.colors.purpleHighlight,
                    borderRadius:50,
                }}
                activeOpacity={1}
                onPress={ onPress }
            >
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicon
                        name="arrow-forward"
                        size={25}
                        color={theme.colors.background}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default DateSelectorArrowButton;
