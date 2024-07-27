import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';

interface AppBarProps {
    title: string;
    transparent?: boolean;
}

export default function AppBar({ title, transparent = false }: AppBarProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Appbar
            mode='center-aligned'
            style={{
                backgroundColor: transparent ? 'transparent' : theme.colors.background,
            }}
        >
            <Appbar.Content title={t(title)} />
        </Appbar>
    );
}
