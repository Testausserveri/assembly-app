import LanguageSelector from '../LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { DarkTheme } from '@/styles';
import { Link, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';

export function ProfileView() {
    const { profile, signout } = useAuth();
    const theme = useTheme<DarkTheme>();
    const { t } = useTranslation();

    function handleSignout() {
        signout();
        router.dismissTo('/signin');
    }

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='headlineLarge'>{t('greeting', { username: profile?.username })}</Text>
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
            {/* TODO: auth
            <Button
                style={{
                    width: '100%',
                    backgroundColor: theme.colors.purpleHighlight,
                    paddingVertical: 4,
                    marginBottom: 16,
                }}
                onPress={handleSignout}
            >
                {t('signout')}
            </Button>
            */}
        </View>
    );
}
