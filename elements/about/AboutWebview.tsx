import WhitelistedWebview from '@/components/WhitelistedWebview';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const AboutWebview = () => {
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const theme = useTheme();

    const uri =
        i18n.language === 'fi'
            ? 'https://assembly.org/events/summer24/info'
            : 'https://assembly.org/en/events/summer24/en/info-en';

    const whitelist = [
        /^https:\/\/assembly\.org\/(fi\/)?events\/summer24\/info/,
        /^https:\/\/assembly\.org\/en\/events\/summer24\/en\/info-en/,
    ];

    return (
        <>
            {loading && <ActivityIndicator animating />}
            <WhitelistedWebview
                whitelistedUrls={whitelist}
                style={{
                    display: loading ? 'none' : 'flex',
                    backgroundColor: theme.colors.background,
                }}
                onLoad={() => setLoading(false)}
                source={{ uri }}
            />
        </>
    );
};

export default AboutWebview;
