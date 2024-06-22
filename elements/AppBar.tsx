import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';

export default function AppBar({ title }: { title: string }) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Appbar mode='center-aligned' style={{ backgroundColor: theme.colors.background }}>
            <Appbar.Content title={t(title)} />
            <Appbar.Action icon='dots-vertical' onPress={() => {}} />
        </Appbar>
    );
}
