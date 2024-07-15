import { StatusError } from '@/api/errors';
import { loginRequest, signupRequest } from '@/api/userService';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Portal, Snackbar, Surface, Text, TextInput, useTheme } from 'react-native-paper';

export function ProfileView() {
    const {
        state: { login },
        signin,
        signout,
    } = useGlobalState();

    const { t } = useTranslation();

    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorText, setErrorText] = useState('');
    const [showError, setShowError] = useState(false);
    const [signIn, setSignIn] = useState(true);

    // TODO handle errors gracefully

    return (
        <Surface
            elevation={0}
            style={{ alignItems: 'center', gap: 10, marginTop: 20, width: '90%' }}
        >
            {login ? (
                <>
                    <Text>You are logged in!</Text>
                    <Text>
                        {login.profile.first_name && login.profile.last_name
                            ? `${login.profile.first_name} ${login.profile.last_name}`
                            : 'No name set'}
                    </Text>
                    <Text>
                        {login.profile.email ? `Email: ${login.profile.email}` : 'No email set'}
                    </Text>
                    <Text>
                        {login.profile.phone
                            ? `Phone: ${login.profile.email}`
                            : 'No phone number set'}
                    </Text>
                    <Button mode='outlined' onPress={signout}>
                        Sign out
                    </Button>
                </>
            ) : (
                <>
                    <TextInput
                        mode='outlined'
                        label={t('email')}
                        value={email}
                        onChangeText={(v) => setEmail(v)}
                        style={{ width: '100%' }}
                    />
                    <TextInput
                        mode='outlined'
                        label={t('password')}
                        secureTextEntry
                        value={password}
                        onChangeText={(v) => setPassword(v)}
                        style={{ width: '100%' }}
                    />
                    {signIn ? (
                        <>
                            <Button
                                mode='outlined'
                                style={{ width: '50%' }}
                                onPress={() =>
                                    loginRequest(email, password).then(
                                        ({ profile, token }) => {
                                            signin({ profile, token });
                                            setEmail('');
                                            setPassword('');
                                        },
                                        (e) => {
                                            if (e instanceof StatusError) {
                                                if (e.statusCode === 401) {
                                                    setErrorText(t('invalid-credentials'));
                                                } else {
                                                    setErrorText(
                                                        `${t(e.message)}. Status: ${e.statusCode}`
                                                    );
                                                }
                                            } else {
                                                setErrorText(t('unknown-error'));
                                            }
                                            setShowError(true);
                                        }
                                    )
                                }
                            >
                                {t('sign-in')}
                            </Button>
                            <Button mode='text' onPress={() => setSignIn(false)}>
                                <Text style={{ textDecorationLine: 'underline' }}>
                                    {t('sign-up') + ' ' + t('instead')}
                                </Text>
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextInput
                                mode='outlined'
                                label={t('confirm-password')}
                                secureTextEntry
                                value={passwordConfirm}
                                onChangeText={(v) => setPasswordConfirm(v)}
                                style={{ width: '100%' }}
                            />
                            <Button
                                mode='outlined'
                                style={{ width: '50%' }}
                                onPress={() => {
                                    if (password !== passwordConfirm) {
                                        setErrorText(t('password-mismatch'));
                                        setShowError(true);
                                        return;
                                    }

                                    if (email === '' || password === '' || passwordConfirm === '') {
                                        setErrorText(t('empty-fields'));
                                        setShowError(true);
                                        return;
                                    }

                                    signupRequest(email, password).then(
                                        ({ profile, token }) => {
                                            signin({ profile, token });
                                            setSignIn(true);
                                            setPassword('');
                                            setEmail('');
                                        },
                                        (e) => {
                                            if (e instanceof StatusError) {
                                                if (e.statusCode === 401) {
                                                    setErrorText(t('email-exists'));
                                                } else {
                                                    setErrorText(
                                                        `${t(e.message)}. Status: ${e.statusCode}`
                                                    );
                                                }
                                            } else {
                                                setErrorText(t('unknown-error'));
                                            }
                                            setShowError(true);
                                        }
                                    );
                                }}
                            >
                                {t('sign-up')}
                            </Button>
                            <Button
                                mode='text'
                                onPress={() => {
                                    setSignIn(true);
                                    setPasswordConfirm('');
                                }}
                            >
                                <Text style={{ textDecorationLine: 'underline' }}>
                                    {t('sign-in') + ' ' + t('instead')}
                                </Text>
                            </Button>
                        </>
                    )}
                    <Portal>
                        <Snackbar
                            duration={3000}
                            visible={showError}
                            onDismiss={() => setShowError(false)}
                            style={{ backgroundColor: theme.colors.primaryContainer }}
                        >
                            <Text>{t(errorText)}</Text>
                        </Snackbar>
                    </Portal>
                </>
            )}
        </Surface>
    );
}
