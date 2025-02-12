import { TabBarIcon } from '@/components';
import { GlobalStateProvider } from '@/hooks/providers/GlobalStateProvider';
import Locales from '@/locales';
import { Themes } from '@/styles';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
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
    resources: { ...Locales },
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function RootLayout() {
    const [loaded] = useFonts({
        Gaba: require('../assets/fonts/Gaba-Super.otf'),
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    });

    const { t } = useTranslation();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GlobalStateProvider>
            <SafeAreaProvider>
                <PaperProvider theme={Themes['dark']['default']}>
                    <Stack>
                        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                        <Stack.Screen name='+not-found' />

                        <Stack.Screen name='signin' options={{ headerShown: false }} />

                        <Stack.Screen
                            name='credits'
                            options={{
                                headerTitle: t('credits'),
                                headerStyle: {
                                    backgroundColor: Themes['dark']['default'].colors.background,
                                },
                                headerTintColor: Themes['dark']['default'].colors.primary,
                                headerLeft: (props) => (
                                    <TabBarIcon
                                        style={{
                                            color: Themes['dark']['default'].colors.primary,
                                            marginRight: 10,
                                        }}
                                        name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
                                        onPress={() => router.canGoBack() && router.back()}
                                    />
                                ),
                            }}
                        />
                    </Stack>
                </PaperProvider>
            </SafeAreaProvider>
        </GlobalStateProvider>
    );
}
