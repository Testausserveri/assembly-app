import { useTranslation } from 'react-i18next';
import { Appbar } from 'react-native-paper';

interface AppBarProps {
    title: string;
}

export default function AppBar({ title }: AppBarProps) {
    const { t } = useTranslation();

    return (
        <Appbar
            mode='center-aligned'
            style={{
                backgroundColor: 'transparent',
            }}
        >
            <Appbar.Content title={t(title)} />
        </Appbar>
    );
}
