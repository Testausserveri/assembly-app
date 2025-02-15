import { StatusError } from '@/api/errors';
import { loginRequest } from '@/api/userService';
import { useAuth } from '@/hooks/useAuth';
import { DarkTheme } from '@/styles';
import { Link, Redirect, router } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ActivityIndicator, Button, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

function SignIn() {
    const theme = useTheme<DarkTheme>();
    const insets = useSafeAreaInsets();
    const { signin, status } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignin() {
        setLoading(true);
        try {
            const { token, profile } = await loginRequest(email, password);
            signin(token, profile);
            setLoading(false);

            router.dismissTo('/(tabs)');
        } catch (error) {
            if (error instanceof StatusError) {
                if (error.statusCode === 401) {
                    Toast.show({ type: 'error', text1: 'Invalid username and/or password' });
                    return;
                }
            }
            Toast.show({ type: 'error', text1: 'Unknown error, try again later' });
        }
        setLoading(false);
    }

    if (status === 'logged-in') {
        return <Redirect href={'/(tabs)'} />;
    }

    return (
        <Surface
            style={{
                height: '100%',
                backgroundColor: theme.colors.background,
                paddingTop: insets.top,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                paddingHorizontal: 32,
            }}
        >
            <View style={{ flexGrow: 0 }}>
                <ImageBackground
                    source={require('../assets/images/ASSEMBLY_Logo_White_TightCrop.png')}
                    style={{ width: '100%', height: 100, marginBottom: 16 }}
                    resizeMode='contain'
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={{ marginBottom: 8 }}
                    label='Email'
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={{ marginBottom: 8 }}
                    label='Password'
                    secureTextEntry
                />
                <Button
                    onPress={handleSignin}
                    style={{
                        backgroundColor: theme.colors.purpleHighlight,
                        paddingVertical: 4,
                        paddingHorizontal: 24,
                        marginTop: 32,
                        marginBottom: 8,
                        alignSelf: 'center',
                        width: 'auto',
                    }}
                >
                    {loading ? <ActivityIndicator /> : <Text>Sign in</Text>}
                </Button>
                <Link href='https://assembly.org/signup'>
                    <Text variant='labelMedium' style={{ textAlign: 'center' }}>
                        No account yet?{' '}
                        <Text style={{ textDecorationLine: 'underline' }}>Sign up now!</Text>
                    </Text>
                </Link>
            </View>
        </Surface>
    );
}

export default SignIn;
