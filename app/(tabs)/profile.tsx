import AppBar from '@/elements/AppBar';
import LanguageSelector from '@/elements/LanguageSelector';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';
import { DarkTheme } from '@/styles';
import { Link, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { t } = useTranslation();
    const theme = useTheme<DarkTheme>();
    const insets = useSafeAreaInsets();
    const { signout } = useGlobalState();

    function handleSignout() {
        signout();
        router.dismissTo('/signin');
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                gap: 8,
                backgroundColor: theme.colors.background,
                paddingTop: insets.top,
            }}
        >
            <AppBar title={t('profile')} />
            <View
                style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
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
                </Surface>
            </View>

            {/** <ProfileView /> */}
        </View>
    );
}
