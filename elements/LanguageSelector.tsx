import i18next from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Button, Snackbar, Surface, Text, useTheme } from 'react-native-paper';

export default function LanguageSelector() {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [languageChangeResult, setLanguageChangeResult] = useState('');

    const { t } = useTranslation();
    const theme = useTheme();

    const changeLang = (lang: string) => {
        i18next.changeLanguage(lang, (err) => {
            if (err) {
                setLanguageChangeResult('error-lang-change');
            } else {
                setLanguageChangeResult('success-lang-change');
            }
            setSnackbarVisible(true);
            setTimeout(() => {
                setSnackbarVisible(false);
            }, 3000);
        });
    };

    return (
        <>
            <Surface style={{ width: '100%', gap: 16, alignItems: 'center' }} elevation={0}>
                <Text variant='titleMedium'>{t('select-language')}</Text>
                <Button
                    icon={() => (
                        <Image
                            source={require('../assets/images/gb.png')}
                            style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 50 }}
                        />
                    )}
                    onPress={() => changeLang('en')}
                >
                    <Text>{t('english')}</Text>
                </Button>
                <Button
                    icon={() => (
                        <Image
                            source={require('../assets/images/fi.png')}
                            style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 50 }}
                        />
                    )}
                    onPress={() => changeLang('fi')}
                >
                    <Text>{t('finnish')}</Text>
                </Button>
            </Surface>
            <Snackbar
                style={{ backgroundColor: theme.colors.primaryContainer }}
                visible={snackbarVisible}
                onDismiss={() => {}}
            >
                <Text>{t(languageChangeResult)}</Text>
            </Snackbar>
        </>
    );
}
