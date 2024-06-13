import { Button } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';

export default function HomeScreen() {
    return (
        <Surface
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: 16,
            }}
        >
            <Text>Not home</Text>
            <Divider />
            <Button title='THIS STILL DOES ABSOLUTELY NOTHING' onPress={() => {}} />
        </Surface>
    );
}
