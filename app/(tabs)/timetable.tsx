import { useTranslation } from 'react-i18next';
import { Button } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Timetable from '@/components/timetable/Timetable';

export default function TimetableScreen() {
    const { t } = useTranslation();
    const theme = useTheme();
    return (
        <Surface
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.background,
            }}
        >
            <Timetable theme={ theme } />
        </Surface>
    );
}
