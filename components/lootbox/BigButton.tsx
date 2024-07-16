import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';


const BigButton = ({text, onPress, disabled}:{text:string, onPress: () => void, disabled:boolean}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <View style={{
            marginHorizontal: "20%",
            justifyContent: 'center',
            zIndex: 50
        }}>
            <Button 
            mode="contained" 
            onPress={onPress}
            buttonColor={ theme.colors.primary }
            textColor={ theme.colors.secondaryContainer }
            rippleColor="transparent"
            disabled={disabled}
            style={{
                borderColor: theme.colors.onPrimaryContainer,
                borderWidth: 2,
            }}
            labelStyle={{
                fontFamily: "RobotoBold",
                fontSize: 20,
                textTransform: 'uppercase',
            }}
            >
                {t(text)}
            </Button>
        </View>
    );
};

export default BigButton;