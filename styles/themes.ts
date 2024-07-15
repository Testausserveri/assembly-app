/**
 * Themes
 */
import Colors from './colors';
import { configureFonts } from 'react-native-paper';

const fonts = configureFonts({
    config: {
        displayLarge: { fontFamily: 'Gaba' },
        displayMedium: { fontFamily: 'Gaba' },
        displaySmall: { fontFamily: 'Gaba' },
        headlineLarge: { fontFamily: 'Gaba' },
        headlineMedium: { fontFamily: 'Gaba' },
        headlineSmall: { fontFamily: 'Gaba' },
        titleLarge: { fontFamily: 'Gaba' },
        titleMedium: { fontFamily: 'Gaba' },
        titleSmall: { fontFamily: 'Gaba' },
    },
});

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

export type DarkTheme = (typeof Themes)['dark']['default'];

export default Themes;
