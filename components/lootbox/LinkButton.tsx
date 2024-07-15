import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface LinkButtonProps {
    text: string;
    href: string;
}

const LinkButton = ({ href, text }: LinkButtonProps) => {
    return (
        <View
            style={{
                height: '12%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Link href={href}>
                <Text style={{ fontWeight: 'bold' }}>{text}</Text>
            </Link>
        </View>
    );
};

export default LinkButton;
