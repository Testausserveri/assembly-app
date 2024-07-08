import { t } from 'i18next';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function LoginFooterStageNavigation({
    stage,
    setStage,
}: {
    stage: 'login' | 'register' | 'register_email' | 'login_email';
    setStage: (value: 'login' | 'register') => void;
}) {
    return (
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
                    } else if (
                        stage === 'register' ||
                        stage === 'register_email' ||
                        stage === 'login_email'
                    ) {
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
                    {stage === 'register' || stage === 'register_email'
                        ? t('auth.alreadyHaveAnAccount')
                        : stage === 'login_email'
                          ? t('auth.loginUsingAnotherWay')
                          : t('auth.dontHaveAnAccountYet')}
                </Text>
                <Text
                    style={{
                        color: '#FFF',
                        textDecorationLine: 'underline',
                        fontSize: 16,
                    }}
                >
                    {stage === 'register' || stage === 'register_email' || stage === 'login_email'
                        ? t('auth.goToLogin')
                        : t('auth.goToSignUp')}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
