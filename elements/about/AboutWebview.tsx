import { determineEvent } from '@/api/eventService';
import WhitelistedWebview from '@/components/WhitelistedWebview';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native-paper';

const AboutWebview = () => {
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    const event = determineEvent();

    const uri =
        i18n.language === 'fi'
            ? `https://assembly.org/events/${event}/info`
            : `https://assembly.org/en/events/${event}/en/info-en`;

    const whitelist = [
        new RegExp(`^https:\/\/assembly\.org\/(fi\/)?events\/${event}\/info`),
        new RegExp(`^https:\/\/assembly\.org\/en\/events\/${event}\/en\/info-en`),
    ];

    return (
        <>
            {loading && <ActivityIndicator animating />}
            <WhitelistedWebview
                whitelistedUrls={whitelist}
                style={{ display: loading ? 'none' : 'flex' }}
                onLoad={() => setLoading(false)}
                source={{ uri }}
            />
        </>
    );
};

export default AboutWebview;
