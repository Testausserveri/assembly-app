import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';


const ClaimButton = () => {
    const theme = useTheme();

    return (
        <View style={{
            marginHorizontal: "20%",
            height: "12%",
            paddingTop: "5%",
        }}>
            <Button 
            mode="contained" 
            onPress={() => console.log('Pressed')}
            buttonColor={ theme.colors.primary }
            textColor={ theme.colors.secondaryContainer }
            rippleColor="transparent"
            style={{
                borderColor: theme.colors.onPrimaryContainer,
                borderWidth: 2,
            }}
            labelStyle={{
                fontFamily: "RobotoBold",
                fontSize: 20,
            }}
            >
                CLAIM
            </Button>
        </View>
    );
};

export default ClaimButton;