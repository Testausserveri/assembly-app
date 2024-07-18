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
            splash: {
                image: './assets/images/splash.png',
                resizeMode: 'contain',
                backgroundColor: '#191919',
            },
            ios: {
                supportsTablet: true,
                bundleIdentifier:
                    process.env.EXPO_PUBLIC_ENVIRONMENT === 'production'
                        ? 'com.testausserveri.assemblyapp'
                        : 'com.testausserveri.assemblyapp-dev',
            },
            android: {
                adaptiveIcon: {
                    foregroundImage: './assets/images/adaptive-icon.png',
                    backgroundColor: '#191919',
                },
                package:
                    process.env.EXPO_PUBLIC_ENVIRONMENT === 'production'
                        ? 'com.testausserveri.assemblyapp'
                        : 'com.testausserveri.assemblyapp-dev',
            },
            web: {
                bundler: 'metro',
                output: 'static',
                favicon: './assets/images/favicon.png',
            },
            plugins: ['expo-router', 'expo-build-properties'],
            experiments: {
                typedRoutes: true,
            },
            extra: {
                router: {
                    origin: false,
                },
                eas: {
                    projectId: '469c71b6-54c5-4111-bc4a-03e2cf92a23d',
                },
            },
            owner: 'testausserveri',
        },
    };
};
