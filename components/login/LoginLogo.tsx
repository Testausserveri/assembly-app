// @ts-ignore
import Logo from '@/assets/images/logo.png';
import { Image } from 'expo-image';
import React from 'react';

export default function LoginLogo() {
    return (
        <Image
            source={Logo}
            contentFit={'contain'}
            style={{
                width: '100%',
                flex: 1,
                maxWidth: '85%',
            }}
        />
    );
}
