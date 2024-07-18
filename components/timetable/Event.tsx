import { useFavorite } from '@/hooks/useFavorite';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';

interface EventProps {
    id: number;
    title: string;
    location: string;
    start: Date;
    end: Date;
    color: string;
    thumbnail: string;
}

const getEventTimeString = (start: Date, end: Date) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);

    if (startTime.isSame(endTime)) {
        return startTime.format('HH:mm');
    }

    return `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`;
};

const Event = ({ id, title, location, start, end, color, thumbnail }: EventProps) => {
    const timeString = useMemo(() => getEventTimeString(start, end), [start, end]);
    const { isFavorite, setIsFavorite } = useFavorite(id);
    const { t, i18n } = useTranslation();

    const [isAfterEnd, isBeforeStart] = useMemo(() => {
        dayjs.locale(i18n.language);

        return [dayjs().isAfter(end), dayjs().isBefore(start)];
    }, [end, i18n.language, start]);

    return (
        <Surface
            style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: color,
            }}
            elevation={0}
        >
            {isAfterEnd &&
                process.env.EXPO_PUBLIC_ENVIRONMENT !== 'development' &&
                process.env.EXPO_PUBLIC_ENVIRONMENT !== 'preview' && (
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            borderRadius: 8,
                            zIndex: 10,
                        }}
                    />
                )}
            {thumbnail && (
                <Image
                    source={{ uri: thumbnail }}
                    contentFit='cover'
                    cachePolicy='memory-disk'
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '97%',
                        justifyContent: 'center',
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                    }}
                />
            )}
            <View
                style={{
                    position: 'absolute',
                    width: '97%',
                    height: '100%',
                    top: 0,
                    right: 0,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }}
            />
            <Surface elevation={0} style={{ padding: 16, width: '100%', alignItems: 'center' }}>
                <Text variant='titleMedium' style={{ textAlign: 'center' }}>
                    {title}
                </Text>
                {location && (
                    <Text
                        variant='labelLarge'
                        style={{ textAlign: 'center' }}
                    >{`${t('location')}: ${location}`}</Text>
                )}
                <Text variant='labelLarge' style={{ textAlign: 'center' }}>
                    {`${t('time')}: ${timeString}`}
                </Text>
            </Surface>
            {dayjs().isBefore(start) ||
                ((process.env.EXPO_PUBLIC_ENVIRONMENT === 'development' ||
                    process.env.EXPO_PUBLIC_ENVIRONMENT === 'preview') && (
                    <IconButton
                        onPress={() => toggleFavorite()}
                        icon={favorite ? 'heart' : 'heart-outline'}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    />
                ))}
        </Surface>
    );
};

export default React.memo(Event);
