import Timetable from '@/components/timetable/Timetable';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TimetableScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Surface
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                paddingTop: insets.top + 16,
            }}
        >
            <Timetable />
        </Surface>
    );
}
