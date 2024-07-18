import AppBar from '@/elements/AppBar';
import LanguageSelector from '@/elements/LanguageSelector';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { t } = useTranslation();
    const theme = useTheme();

    const insets = useSafeAreaInsets();

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
                </Surface>
            </View>

            {/** <ProfileView /> */}
        </View>
    );
}
