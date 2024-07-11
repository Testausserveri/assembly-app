import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';


const Title = ({ text } : {text:string}) => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    return (
        <View style={{
            height: "10%",
            top: 0,
            alignItems: "center",
            justifyContent: 'center',
        }}>
            <Text variant="displaySmall" style={{ textTransform: "uppercase" }}>
                {t(text)}
            </Text>
        </View>
    );
};

export default Title;