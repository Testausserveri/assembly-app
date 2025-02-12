export default () => {
    return {
        expo: {
            name: 'Assembly',
            slug: 'assembly-app',
            version: '1.0.0',
            orientation: 'portrait',
            icon: './assets/images/icon.png',
            scheme: 'myapp',
            userInterfaceStyle: 'automatic',
            newArchEnabled: true,
            splash: {
                image: './assets/images/splash.png',
                resizeMode: 'contain',
                backgroundColor: '#191919',
            },
            ios: {
                supportsTablet: true,
                bundleIdentifier:
                    process.env.EXPO_PUBLIC_ENVIRONMENT === 'production'
                        ? 'fi.testausserveri.assemblyapp'
                        : 'fi.testausserveri.assemblyapp-dev',
            },
            android: {
                adaptiveIcon: {
                    foregroundImage: './assets/images/adaptive-icon.png',
                    backgroundColor: '#191919',
                },
                package:
                    process.env.EXPO_PUBLIC_ENVIRONMENT === 'production'
                        ? 'fi.testausserveri.assemblyapp'
                        : 'fi.testausserveri.assemblyapp_dev',
                useNextNotificationApi: true,
            },
            web: { bundler: 'metro', output: 'static', favicon: './assets/images/favicon.png' },
            plugins: [
                [
                    'expo-secure-store',
                    {
                        configureAndroidBackup: true,
                        faceIDPermission:
                            'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
                    },
                ],
                'expo-font',
                'expo-router',
                'expo-build-properties',
                [
                    'expo-notifications',
                    { icon: './assets/images/icon.png', color: '#191919', sounds: [] },
                ],
                [
                    'expo-tracking-transparency',
                    {
                        userTrackingPermission:
                            'This identifier will be used for providing services, personalization of services, statistical purposes and for legal obligations.',
                    },
                ],
            ],
            experiments: { typedRoutes: true },
            extra: {
                router: { origin: false },
                eas: { projectId: '469c71b6-54c5-4111-bc4a-03e2cf92a23d' },
            },
            owner: 'testausserveri',
            updates: { url: 'https://u.expo.dev/469c71b6-54c5-4111-bc4a-03e2cf92a23d' },
            runtimeVersion: { policy: 'appVersion' },
        },
    };
};
