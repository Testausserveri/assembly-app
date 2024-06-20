/**
 * Themes
 */
import Colors from './colors';
import { adaptNavigationTheme, configureFonts } from 'react-native-paper';

const fonts = configureFonts({ config: { fontFamily: 'Gaba' } });

const Themes = {
    dark: {
        default: {
            fonts,
            colors: {
                ...Colors.dark.default,
            },
        },
    },
};

export default Themes;
