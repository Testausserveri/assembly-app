import AppBar from '@/elements/AppBar';
import AboutWebview from '@/elements/about/AboutWebview';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AboutScreen() {
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
            <AppBar title='about' />
            <AboutWebview />
        </Surface>
    );
}

export default AboutScreen;
