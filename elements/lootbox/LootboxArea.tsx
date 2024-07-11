import React from 'react';
import { View } from 'react-native';
import LootboxBox from '@/elements/lootbox/LootboxBox';
import CodeBox from '@/components/lootbox/CodeBox';
import ClaimButton from '@/components/lootbox/ClaimButton';
import RaffleRulesButton from '@/components/lootbox/RaffleRulesButton';

const LootboxArea = () => {
    return (
        <View
            style={{
                height: "90%",
            }}
        >
            <LootboxBox />
            <CodeBox />
            <ClaimButton />
            <RaffleRulesButton />
        </View>
    );
};

export default LootboxArea;
