import Locales from '@/locales';
import { Themes } from '@/styles';
import 'dayjs/locale/en';
import 'dayjs/locale/fi';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        Gaba: require('../assets/fonts/Gaba-Super.otf'),
        RobotoMono: require('../assets/fonts/RobotoMono-Bold.ttf'),
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
        <SafeAreaProvider>
            <PaperProvider theme={Themes['dark']['default']}>
                <Stack>
                    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                    <Stack.Screen name='+not-found' />
                </Stack>
            </PaperProvider>
        </SafeAreaProvider>
    );
}
