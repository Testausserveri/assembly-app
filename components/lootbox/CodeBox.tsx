import { useState } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';


const CodeBox = () => {
    const theme = useTheme();

    const [text, setText] = useState("")

    return (
        <View style={{
                marginHorizontal: "15%",
                height: "10%",
            }}>
                <TextInput 
                value="" 
                onChangeText={text => setText(text)} 
                placeholder="Insert code" 
                underlineColor='transparent'
                activeUnderlineColor='transparent'
                contentStyle={{textAlign: 'center'}}
                style={{ 
                    backgroundColor: theme.colors.primaryContainer, 
                    borderColor: theme.colors.onPrimaryContainer,
                    borderWidth: 2,
                    borderRadius: 5,
                }}
                />
            </View>
    );
};

export default CodeBox;