import LanguageSelector from '../LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { DarkTheme } from '@/styles';
import { Link, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';

export function ProfileView() {
    const { profile } = useAuth();
    const theme = useTheme<DarkTheme>();
    const { t } = useTranslation();

    const { signout } = useAuth();

    function handleSignout() {
        signout();
        router.dismissTo('/signin');
    }

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='headlineLarge'>Hello {profile?.username ?? 'there'}!</Text>
            <LanguageSelector />
            <Surface
                elevation={0}
                style={{ padding: 16, width: '100%', justifyContent: 'center', gap: 16 }}
            >
                <Text style={{ textAlign: 'center' }} variant='bodyLarge'>
                    {t('working-on-this')}
                </Text>
                <Link
                    style={{
                        color: theme.colors.primary,
                        textDecorationLine: 'underline',
                        textAlign: 'center',
                    }}
                    href='/credits'
                >
                    {t('meanwhile')}
                </Link>
            </Surface>
            <Button
                style={{
                    width: '100%',
                    backgroundColor: theme.colors.purpleHighlight,
                    paddingVertical: 4,
                    marginBottom: 16,
                }}
                onPress={handleSignout}
            >
                Log out
            </Button>
        </View>
    );
}
