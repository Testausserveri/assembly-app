import LoginAcceptTerms from '@/components/login/LoginAcceptTerms';
import LoginFooterStageNavigation from '@/components/login/LoginFooterStageNavigation';
import LoginLogo from '@/components/login/LoginLogo';
import LoginOptionButtons from '@/components/login/LoginOptionButtons';
import LoginTextHeader from '@/components/login/LoginTextHeader';
import LoadingScreen from '@/elements/LoadingScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import { t } from 'i18next';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorValue, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
    const [stage, setStage] = useState<'login' | 'register' | 'register_email' | 'login_email'>(
        'login'
    );
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [bottomHeight, setBottomHeight] = useState<number>(0);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onEmailLogin = useCallback(async () => {
        // TODO: implement login
    }, []);

    const onEmailRegister = useCallback(async () => {
        // TODO: implement register
    }, []);

    const onOAuthLogin = useCallback(async (provider: 'google' | 'facebook' | 'twitch') => {
        // TODO: implement OAuth login
    }, []);

    const shouldSkipLoadingScreen = useRef<boolean>(true);
    useEffect(() => {
        // Do not show loading screen on first load and when navigating away from register_email.
        if (shouldSkipLoadingScreen.current) {
            shouldSkipLoadingScreen.current = false;
            return;
        }

        if (stage === 'register_email' || stage === 'login_email') {
            shouldSkipLoadingScreen.current = true;
        }

        // Reset the accept terms checkbox when switching between login and register.
        if (stage === 'login') {
            setAcceptTerms(false);
        }

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
        onPress?: () => void;
    }[] = useMemo(
        () => [
            {
                name: 'Google',
                color: 'rgb(234, 67, 53)',
                icon: <Ionicons name={'logo-google'} size={24} color={'white'} />,
                onPress: () => onOAuthLogin('google'),
            },
            {
                name: 'Facebook',
                color: 'rgb(76, 113, 190)',
                icon: <Ionicons name={'logo-facebook'} size={24} color={'white'} />,
                onPress: () => onOAuthLogin('facebook'),
            },
            {
                name: 'Twitch',
                color: 'rgb(100, 65, 165)',
                icon: <Ionicons name={'logo-twitch'} size={24} color={'white'} />,
                onPress: () => onOAuthLogin('twitch'),
            },
            {
                name: stage === 'login' ? t('auth.email') : t('auth.registerWithEmail'),
                color: 'rgb(98,98,98)',
                textColor: 'white',
                icon: <Ionicons name={'mail'} size={24} color={'white'} />,
                onPress: () => {
                    if (stage === 'register') {
                        setStage('register_email');
                    } else if (stage === 'login') {
                        setStage('login_email');
                    }
                },
            },
        ],
        [onOAuthLogin, stage]
    );

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
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    display: 'flex',
                    flex: 1,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        padding: 32,
                        flex: 1,
                    }}
                >
                    {stage === 'login' || stage === 'login_email' ? (
                        <LoginLogo />
                    ) : (
                        <LoginTextHeader
                            title={t('auth.joinUs').toUpperCase()}
                            subtitle={t('auth.registerNewAccount')}
                        />
                    )}
                </View>
                <View
                    style={{
                        paddingVertical: 20,
                        marginHorizontal: 32,
                        gap: 16,
                        alignItems: 'center',
                        height:
                            stage === 'register_email' || stage === 'login_email'
                                ? bottomHeight
                                : undefined,
                    }}
                    onLayout={(e) => setBottomHeight(e.nativeEvent.layout.height)}
                >
                    {stage === 'register' || stage === 'register_email' ? (
                        <LoginAcceptTerms
                            acceptTerms={acceptTerms}
                            setAcceptTerms={setAcceptTerms}
                        />
                    ) : null}
                    {stage === 'register_email' || stage === 'login_email' ? (
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '100%',
                                gap: 24,
                            }}
                        >
                            <TextInput
                                style={{
                                    backgroundColor: '#FFF',
                                    borderStyle: 'solid',
                                    borderColor: '#000',
                                    borderWidth: StyleSheet.hairlineWidth * 3,
                                    height: 50,
                                    padding: 16,
                                }}
                                placeholder={t('auth.email')}
                                placeholderTextColor={'#939292'}
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                autoComplete={'email'}
                            />
                            <TextInput
                                style={{
                                    backgroundColor: '#FFF',
                                    borderStyle: 'solid',
                                    borderColor: '#000',
                                    borderWidth: StyleSheet.hairlineWidth * 3,
                                    height: 50,
                                    padding: 16,
                                }}
                                placeholder={t('auth.password')}
                                placeholderTextColor={'#939292'}
                                onChangeText={(value) => setPassword(value)}
                                value={password}
                                autoComplete={
                                    stage === 'register_email' ? 'new-password' : 'current-password'
                                }
                                secureTextEntry={true}
                            />
                            <LoginOptionButtons
                                entries={[
                                    {
                                        name:
                                            stage === 'register_email'
                                                ? t('auth.register')
                                                : t('auth.login'),
                                        color: 'rgb(98,98,98)',
                                        textColor: '#FFF',
                                        icon: <Ionicons name={'mail'} size={24} color={'white'} />,
                                        onPress: () =>
                                            stage === 'register_email'
                                                ? onEmailRegister()
                                                : onEmailLogin(),
                                    },
                                ]}
                            />

                            {stage === 'login_email' ? (
                                <Text
                                    style={{
                                        color: '#FFF',
                                        textDecorationLine: 'underline',
                                        fontSize: 16,
                                        textAlign: 'center',
                                    }}
                                    onPress={() => {
                                        WebBrowser.openBrowserAsync(
                                            t('auth.forgotPasswordUrl')
                                        ).catch();
                                    }}
                                >
                                    {t('auth.forgotPassword')}
                                </Text>
                            ) : null}
                        </View>
                    ) : (
                        <LoginOptionButtons entries={entries} />
                    )}

                    <LoginFooterStageNavigation stage={stage} setStage={setStage} />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
