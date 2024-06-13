import Locales from '@/locales';
import { Themes } from '@/styles';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    debug: true,
    resources: {
        ...Locales,
    },
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        // TODO: Assembly brand fonts
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <PaperProvider theme={Themes['dark']['default']}>
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='+not-found' />
            </Stack>
        </PaperProvider>
    );
}
