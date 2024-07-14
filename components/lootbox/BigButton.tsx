import { useTranslation } from 'react-i18next';
import { Button, Text, useTheme } from 'react-native-paper';

interface BigButtonProps {
    textKey: string;
}

const BigButton = ({ textKey }: BigButtonProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Button
            mode='contained'
            onPress={() => console.log('Pressed')}
            buttonColor={theme.colors.primary}
            rippleColor='transparent'
            style={{
                borderColor: theme.colors.onPrimaryContainer,
                borderWidth: 2,
                marginHorizontal: '20%',
            }}
        >
            <Text
                style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    color: theme.colors.secondaryContainer,
                    fontFamily: 'RobotoBold',
                    fontSize: 20,
                }}
            >
                {t(textKey).toUpperCase()}
            </Text>
        </Button>
    );
};

export default BigButton;
