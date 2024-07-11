import Timetable from '@/elements/timetable/Timetable';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from '@/components/lootbox/Title'
import { useTranslation } from 'react-i18next';

export default function TimetableScreen() {
    const { t } = useTranslation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Surface
            style={{
                height: '100%',
                backgroundColor: theme.colors.background,
                paddingTop: insets.top,
            }}
        >
            <Title text={t("timetable")} />
            <Timetable />
        </Surface>
    );
}
