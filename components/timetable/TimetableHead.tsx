import DateSelector from '@/components/timetable/DateSelector';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Surface, Text, useTheme } from 'react-native-paper';

interface TimetableHeadProps {
    date: string;
    next: () => void;
    previous: () => void;
}

const TimetableHead = ({ date, next, previous }: TimetableHeadProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const title = t('timetable');

    return (
        <Surface
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: theme.colors.background,
            }}
        >
            <Text variant='headlineLarge'>{title}</Text>
            <DateSelector date={date} next={next} previous={previous} />
        </Surface>
    );
};

export default TimetableHead;
