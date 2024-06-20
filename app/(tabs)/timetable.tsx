import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Timetable from '@/components/timetable/Timetable';
import { getEvents } from '@/api/eventService'

export default function TimetableScreen() {
    const { t } = useTranslation();
    const theme = useTheme();
    return (
        <Surface
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.background,
            }}
        >
            <Timetable />
        </Surface>
    );
}
