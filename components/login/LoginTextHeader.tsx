import React from 'react';
import { Text, View } from 'react-native';

export default function LoginTextHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
            }}
        >
            <Text
                style={{
                    color: '#FFF',
                    fontSize: 36,
                    fontWeight: 'bold',
                    fontFamily: 'Gaba',
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    color: '#9d9d9d',
                    fontSize: 24,
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                }}
            >
                {subtitle}
            </Text>
        </View>
    );
}
