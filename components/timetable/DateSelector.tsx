import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fi';
import weekday from 'dayjs/plugin/weekday';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';

dayjs.extend(weekday);

interface DateSelectorProps {
    date: Date;
    nextVisible?: boolean;
    previousVisible?: boolean;
}

const DateSelector = ({ date, nextVisible = true, previousVisible = true }: DateSelectorProps) => {
    const theme = useTheme();

    const { i18n } = useTranslation();
    dayjs.locale(i18n.language);

    let title = dayjs(date).format('dddd DD/MM');
    title = title.charAt(0).toUpperCase() + title.slice(1);

    return (
        <Surface
            style={{
                position: 'relative',
                width: '100%',
                paddingHorizontal: 6,
            }}
            elevation={0}
        >
            {previousVisible && (
                <View style={{ zIndex: 1 }}>
                    <IconButton
                        icon='arrow-left'
                        style={{
                            backgroundColor: theme.colors.purpleHighlight,
                            borderRadius: 50,
                            alignSelf: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 6,
                        }}
                    />
                </View>
            )}
            {nextVisible && (
                <View style={{ zIndex: 1 }}>
                    <IconButton
                        icon='arrow-right'
                        style={{
                            backgroundColor: theme.colors.purpleHighlight,
                            borderRadius: 50,
                            alignSelf: 'center',
                            position: 'absolute',
                            top: 0,
                            right: 6,
                        }}
                    />
                </View>
            )}
            <Surface
                style={{
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginHorizontal: 24,
                    backgroundColor: theme.colors.primaryContainer,
                }}
            >
                <Text variant='headlineSmall'>{title}</Text>
            </Surface>
        </Surface>
    );
};

export default DateSelector;
