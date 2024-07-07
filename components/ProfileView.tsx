import { useGlobalState } from './GlobalStateProvider';
import { loginRequest, signupRequest } from '@/api/user';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export function ProfileView() {
    const {
        state: { login },
        signin,
        signout,
    } = useGlobalState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO handle errors gracefully

    if (login) {
        const { profile } = login;
        return (
            <View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <Text>You are logged in!</Text>
                <Text>
                    {profile.first_name && profile.last_name
                        ? `${profile.first_name} ${profile.last_name}`
                        : 'No email set'}
                </Text>
                <Text>{profile.email ? `Email: ${profile.email}` : 'No email set'}</Text>
                <Text>{profile.phone ? `Phone: ${profile.email}` : 'No phone number set'}</Text>
                <Button mode='outlined' onPress={signout}>
                    Sign out
                </Button>
            </View>
        );
    } else {
        return (
            <View style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <TextInput
                    mode='outlined'
                    label='Email'
                    value={email}
                    onChangeText={(v) => setEmail(v)}
                />
                <TextInput
                    mode='outlined'
                    label='Password'
                    value={password}
                    onChangeText={(v) => setPassword(v)}
                />
                <Button
                    mode='outlined'
                    onPress={() =>
                        loginRequest(email, password).then(({ profile, token }) =>
                            signin({ profile, token })
                        )
                    }
                >
                    Sign in
                </Button>
                <Button
                    mode='outlined'
                    onPress={() =>
                        signupRequest(email, password).then(({ profile, token }) =>
                            signin({ profile, token })
                        )
                    }
                >
                    Sign up
                </Button>
            </View>
        );
    }
}
