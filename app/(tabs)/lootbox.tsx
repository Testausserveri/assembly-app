import AppBar from '@/elements/AppBar';
import Lootbox from '@/elements/lootbox/Lootbox';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LootboxScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Surface
            style={{
                height: '100%',
                backgroundColor: theme.colors.background,
            }}
        >
            <ImageBackground source={require('@/assets/images/haze.png')} style={styles.image}>
                <View
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',

                        paddingTop: insets.top,
                        flex: 1,
                    }}
                >
                    <AppBar title='loot' transparent />
                    <Lootbox />
                </View>
            </ImageBackground>
        </Surface>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
    },
});
