import { useTranslation } from 'react-i18next';
import { ImageBackground, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Credits() {
    const theme = useTheme();
    const { t } = useTranslation();

    const safeArea = useSafeAreaInsets();

    return (
        <ScrollView
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.background,
            }}
            contentContainerStyle={{
                gap: 16,
                paddingBottom: safeArea.bottom,
            }}
        >
            <View>
                <ImageBackground
                    source={require('../assets/images/TSRY_Hero.png')}
                    style={{ width: '100%', height: 100 }}
                />
                <ImageBackground
                    source={require('../assets/images/ASSEMBLY_Logo_White_TightCrop.png')}
                    style={{ width: '100%', height: 100 }}
                    resizeMode='contain'
                />
                <View
                    style={{
                        width: '100%',
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        gap: 16,
                        backgroundColor: theme.colors.primaryContainer,
                    }}
                >
                    <Text variant='bodyLarge'>{t('testausserveri-credits')}</Text>
                    <Text
                        variant='bodyLarge'
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {t('project-management')}
                    </Text>
                </View>
            </View>
            <View style={{ gap: 16, paddingHorizontal: 16 }}>
                <Text variant='bodyLarge'>Samu Kupiainen</Text>
            </View>
            <Text
                variant='bodyLarge'
                style={{
                    fontWeight: 'bold',
                    width: '100%',
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    backgroundColor: theme.colors.primaryContainer,
                }}
            >
                {t('devteam')}
            </Text>
            <View style={{ gap: 16, paddingHorizontal: 16 }}>
                <Text variant='bodyLarge'>Luukas Pörtfors</Text>
                <Text variant='bodyLarge'>Otto Laakkonen</Text>
                <Text variant='bodyLarge'>Onni Linnala</Text>
                <Text variant='bodyLarge'>Anto Keinänen</Text>
                <Text variant='bodyLarge'>Samu Kupiainen</Text>
                <Text variant='bodyLarge'>Miika Tuominen</Text>
                <Text variant='bodyLarge'>Eero Salla</Text>
            </View>
            <Text
                variant='bodyLarge'
                style={{
                    fontWeight: 'bold',
                    width: '100%',
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    backgroundColor: theme.colors.primaryContainer,
                }}
            >
                {t('some-great-administrative-work')}
            </Text>
            <View style={{ gap: 16, paddingHorizontal: 16 }}>
                <Text variant='bodyLarge'>Mikael Hannolainen</Text>
            </View>
        </ScrollView>
    );
}
