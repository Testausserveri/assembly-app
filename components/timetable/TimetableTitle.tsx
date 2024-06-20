import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const TimetableTitle = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const title = t("timetable")
    return(
        <View
            style={{
            position: 'absolute',
            width: '100%',
            height: '50%',
            top: 0,
            justifyContent: "center",
            }}>
            <Text
                 style={{
                    textAlign: 'center',
                    fontFamily: "Gaba",
                    color: theme.colors.primary,
                    fontSize: 40,
                    textTransform: 'uppercase',
                 }}
            >
            { title }
            </Text>
        </View>
    )
};

export default TimetableTitle;
