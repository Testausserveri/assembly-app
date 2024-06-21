import { useTranslation } from 'react-i18next';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';

interface DateSelectorProps {
    date: string;
    next: () => void;
    previous: () => void;
}

const DateSelector = ({ date, next, previous }: DateSelectorProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Surface
            style={{
                position: 'relative',
                width: '100%',
                paddingHorizontal: 6,
            }}
        >
            <IconButton
                icon='arrow-left'
                style={{
                    backgroundColor: theme.colors.purpleHighlight,
                    borderRadius: 50,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 6,
                    zIndex: 1,
                }}
                onPress={previous}
            />
            <Surface
                style={{
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginHorizontal: 24,
                    backgroundColor: theme.colors.primaryContainer,
                }}
            >
                <Text variant='headlineSmall'>{t(date)}</Text>
            </Surface>
            <IconButton
                icon='arrow-right'
                style={{
                    backgroundColor: theme.colors.purpleHighlight,
                    borderRadius: 50,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: 0,
                    right: 6,
                    zIndex: 1,
                }}
                onPress={next}
            />
        </Surface>
    );
};

export default DateSelector;
