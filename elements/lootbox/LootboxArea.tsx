import BigButton from '@/components/lootbox/BigButton';
import BigTextInput from '@/components/lootbox/BigTextInput';
import LinkButton from '@/components/lootbox/LinkButton';
import LootboxBox from '@/elements/lootbox/LootboxBox';
import React, { useState } from 'react';
import { Surface } from 'react-native-paper';

const LootboxArea = () => {
    const [text, setText] = useState('');

    const onClaim = () => {};

    return (
        <Surface
            style={{
                gap: 16,
            }}
        >
            <LootboxBox />
            <BigTextInput
                value={text}
                onChangeText={(text) => setText(text.toUpperCase())}
                placeholderKey='insert-code'
            />
            <BigButton textKey='claim' onPress={onClaim} />
            <LinkButton />
        </Surface>
    );
};

export default LootboxArea;
