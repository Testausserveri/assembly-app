import Timetable from '@/elements/timetable/Timetable';
import { useTranslation } from 'react-i18next';
import { Appbar, Surface, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TimetableScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const { t } = useTranslation();
    const title = t('timetable');

    return (
        <Surface
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                paddingTop: insets.top,
            }}
        >
            <Appbar style={{ justifyContent: 'center', backgroundColor: theme.colors.background }}>
                <Text variant='headlineLarge'>{title}</Text>
            </Appbar>
            <Timetable />
        </Surface>
    );
}
