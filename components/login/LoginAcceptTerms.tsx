import Checkbox from '@/components/forms/Checkbox';
import * as WebBrowser from 'expo-web-browser';
import { t } from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { Text } from 'react-native';

export default function LoginAcceptTerms({
    acceptTerms,
    setAcceptTerms,
}: {
    acceptTerms: boolean;
    setAcceptTerms: (value: boolean) => void;
}) {
    return (
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
                                    WebBrowser.openBrowserAsync(t('auth.tosUrl')).catch();
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
                                    WebBrowser.openBrowserAsync(t('auth.privacyUrl')).catch();
                                }}
                            />
                        ),
                    }}
                />
            </Text>
        </Checkbox>
    );
}
