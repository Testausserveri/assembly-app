import Lootbox from '@/elements/lootbox/Lootbox';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Title from '@/components/lootbox/Title'

export default function TimetableScreen() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Surface
            style={{
                height: '100%',
                paddingTop: insets.top,
            }}
        >
            <ImageBackground source={require('@/assets/images/haze.png')} style={styles.image} >
                <View
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        flex: 1,
                    }}
                >
                    <Title text="LOOT" />
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
})
