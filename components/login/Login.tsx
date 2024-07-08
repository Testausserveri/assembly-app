// @ts-ignore
import Logo from '@/assets/images/logo.png';
import Checkbox from '@/components/forms/Checkbox';
import LoginOptionButtons from '@/components/login/LoginOptionButtons';
import LoadingScreen from '@/elements/LoadingScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { t } from 'i18next';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { ColorValue, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const [stage, setStage] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

    const isFirstLoadRef = useRef<boolean>(true);
    useEffect(() => {
        // Do not show loading screen on first load.
        if (isFirstLoadRef.current) {
            isFirstLoadRef.current = false;
            return;
        }

        // Reset the accept terms checkbox when switching between login and register.
        setAcceptTerms(false);

        // UX: Add loading between login->register transition and vice versa, because
        // the views are very similar and the user might not notice the change.
        if (stage === 'register' || stage === 'login') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [stage]);

    const entries: {
        name: string;
        color: ColorValue;
        textColor?: ColorValue;
        icon: ReactNode;
    }[] = useMemo(() => [
        {
            name: 'Google',
            color: 'rgb(234, 67, 53)',
            icon: <Ionicons name={'logo-google'} size={24} color={'white'} />,
        },
        {
            name: 'Facebook',
            color: 'rgb(76, 113, 190)',
            icon: <Ionicons name={'logo-facebook'} size={24} color={'white'} />,
        },
        {
            name: 'Twitch',
            color: 'rgb(100, 65, 165)',
            icon: <Ionicons name={'logo-twitch'} size={24} color={'white'} />,
        },
        {
            name: stage === 'login' ? t('auth.email') : t('auth.registerWithEmail'),
            color: 'rgb(98,98,98)',
            textColor: 'white',
            icon: <Ionicons name={'mail'} size={24} color={'white'} />,
        },
    ], [stage]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    display: 'flex',
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        padding: 32,
                    }}
                >
                    {stage === 'login' ? (
                        <Image
                            source={Logo}
                            contentFit={'contain'}
                            style={{
                                width: '100%',
                                flex: 1,
                                maxWidth: '85%',
                            }}
                        />
                    ) : (
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
                                {t('auth.joinUs').toUpperCase()}
                            </Text>
                            <Text
                                style={{
                                    color: '#9d9d9d',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                            >
                                {t('auth.registerNewAccount')}
                            </Text>
                        </View>
                    )}
                </View>
                <View
                    style={{
                        paddingVertical: 20,
                        marginHorizontal: 32,
                        gap: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {stage === 'register' ? (
                        <Checkbox value={acceptTerms} onChange={(value) => setAcceptTerms(value)}>
                            <Text
                                style={{
                                    color: '#FFF',
                                    fontSize: 16,
                                    padding: 8,
                                    lineHeight: 24,
                                    textAlign: 'center',
                                }}
                            >
                                <Trans
                                    i18nKey={'auth.acceptTerms'}
                                    components={{
                                        tos: (
                                            <Text
                                                style={{
                                                    color: '#FFF',
                                                    textDecorationLine: 'underline',
                                                }}
                                                onPress={() => {
                                                    WebBrowser.openBrowserAsync(
                                                        t('auth.tosUrl')
                                                    ).catch();
                                                }}
                                            />
                                        ),
                                        privacy: (
                                            <Text
                                                style={{
                                                    color: '#FFF',
                                                    textDecorationLine: 'underline',
                                                }}
                                                onPress={() => {
                                                    WebBrowser.openBrowserAsync(
                                                        t('auth.privacyUrl')
                                                    ).catch();
                                                }}
                                            />
                                        ),
                                    }}
                                />
                            </Text>
                        </Checkbox>
                    ) : null}
                    <LoginOptionButtons entries={entries} />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: 16,
                                alignItems: 'center',
                                gap: 10,
                            }}
                            onPress={() => {
                                if (stage === 'login') {
                                    setStage('register');
                                } else if (stage === 'register') {
                                    setStage('login');
                                }
                            }}
                        >
                            <Text
                                style={{
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
                            >
                                {stage === 'login'
                                    ? t('auth.dontHaveAnAccountYet')
                                    : t('auth.alreadyHaveAnAccount')}
                            </Text>
                            <Text
                                style={{
                                    color: '#FFF',
                                    textDecorationLine: 'underline',

                                    fontSize: 16,
                                }}
                            >
                                {stage === 'login' ? t('auth.goToSignUp') : t('auth.goToLogin')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
