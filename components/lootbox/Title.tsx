import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const Title = ({ text }: { text: string }) => {
    const { t } = useTranslation();
    return (
        <View
            style={{
                height: '10%',
                top: 0,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text variant='displaySmall' style={{ textTransform: 'uppercase' }}>
                {t(text)}
            </Text>
        </View>
    );
};

export default Title;
