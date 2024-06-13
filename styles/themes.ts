/**
 * Themes
 */

import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import Colors from './colors';

const { DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const fonts = configureFonts({ config: { fontFamily: 'SpaceMono' } });

const BaseDarkTheme = {
    ...DarkTheme,
    ...MD3DarkTheme,
    fonts,
};

const Themes = {
    dark: {
        default: {
            ...BaseDarkTheme,
            colors: {
                ...BaseDarkTheme.colors,
                ...Colors.dark.default,
            },
        },
    },
};

export default Themes;
