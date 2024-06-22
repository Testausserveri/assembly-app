import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';

interface AppBarProps {
    title: string;
}

export default function AppBar({ title }: AppBarProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Appbar
            mode='center-aligned'
            elevated
            style={{
                backgroundColor: theme.colors.background,
            }}
        >
            <Appbar.Content title={t(title)} />
        </Appbar>
    );
}
