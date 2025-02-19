import AppBar from '@/elements/AppBar';
import { ProfileView } from '@/elements/user/ProfileView';
import { DarkTheme } from '@/styles';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { t } = useTranslation();
    const theme = useTheme<DarkTheme>();
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
            <ProfileView />
        </View>
    );
}
