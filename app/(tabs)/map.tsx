import AppBar from '@/elements/AppBar';
import EventMap from '@/elements/map/EventMap';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MapScreen() {
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
            <AppBar title='map' />
            <EventMap />
        </Surface>
    );
}
