import React from 'react';
import { View, Image } from 'react-native';

const LootboxBox = () => {
    return (
        <View
            style={{
                height: "60%",
                justifyContent: 'center',
            }}
        >
            <Image source={require("@/assets/images/box.png")} style={{ margin: 'auto', width: "50%", resizeMode: "contain" }} />
        </View>
    );
};

export default LootboxBox;
