import { useTranslation } from 'react-i18next';
import { TextInput, useTheme } from 'react-native-paper';

interface BigTextInputProps {
    onChangeText: (text: string) => void;
    value: string;
    placeholderKey: string;
}

const BigTextInput = ({ onChangeText, value, placeholderKey }: BigTextInputProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={t(placeholderKey)}
            underlineColor='transparent'
            activeUnderlineColor='transparent'
            contentStyle={{ textAlign: 'center' }}
            style={{
                backgroundColor: theme.colors.primaryContainer,
                borderColor: theme.colors.onPrimaryContainer,
                borderWidth: 2,
                borderRadius: 5,
                marginHorizontal: '15%',
                marginBottom: '5%'
            }}
        />
    );
};

export default BigTextInput;
