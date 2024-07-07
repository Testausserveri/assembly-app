import AppBar from '@/elements/AppBar';
import { logInUsernamePassword } from '@/api/authService';
import { Surface } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TimetableScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Surface
            style={{
                height: '100%',
                backgroundColor: theme.colors.background,
                paddingTop: insets.top,
            }}
        >
            <AppBar title='login' />
            <Button
                onPress={() => logInUsernamePassword('onni.bit2@gmail.com','testausserveri')}
                title="Log in!"
                color="#841584"
            />
        </Surface>
    );
}
