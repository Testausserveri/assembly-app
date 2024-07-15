import BigButton from '@/components/lootbox/BigButton';
import BigTextInput from '@/components/lootbox/BigTextInput';
import LinkButton from '@/components/lootbox/LinkButton';
import LootboxBox from '@/elements/lootbox/LootboxBox';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Surface } from 'react-native-paper';

const LootboxArea = () => {
    const [text, setText] = useState('');
    const { t } = useTranslation();

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
            <LinkButton text={t('raffle-rules')} href='/raffle/rules' />
        </Surface>
    );
};

export default LootboxArea;
