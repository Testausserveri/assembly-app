import WhitelistedWebview from '@/components/WhitelistedWebview';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const AboutWebview = () => {
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const theme = useTheme();

    const uri = `https://assembly.org/${i18n.language}/about`;
    const whitelist = [
        /^https:\/\/assembly\.org\/(fi\/|en\/)?about/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?history/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?historia/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?crewien-esittelyt/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?volunteer-crews/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?tietoa-vanhemmille/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?info-for-parents/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?tilaa-uutiskirje/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?subscribe-to-newsletter/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?tule-tekemaan-tapahtumaa/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?become-an-organizer/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?contact/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?yrityksille/,
        /^https:\/\/assembly\.org\/(fi\/|en\/)?business/,
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
