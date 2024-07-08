import React, { ReactNode } from 'react';
import { ColorValue, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function LoginOptionButtons({
    entries,
}: {
    entries: {
        name: string;
        color: ColorValue;
        textColor?: ColorValue;
        icon: ReactNode;
    }[];
}) {
    return entries.map((item, index) => (
        <TouchableOpacity
            key={index}
            style={{
                backgroundColor: item.color,
                padding: 16,
                flexDirection: 'row',
                borderStyle: 'solid',
                borderColor: '#000',
                borderWidth: StyleSheet.hairlineWidth * 3,
            }}
            activeOpacity={0.6}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                {item.icon}
                <Text
                    style={{
                        color: item.textColor ?? '#FFF',
                        fontSize: 16,
                        fontFamily: 'Roboto300',
                    }}
                >
                    {' '}
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    ));
}
