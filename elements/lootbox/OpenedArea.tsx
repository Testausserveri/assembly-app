import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { getLootboxes, LootboxType } from '@/api/lootboxService';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import LootboxItem from '@/components/lootbox/LootboxItem';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';

type Lootboxes = {
    opened: LootboxType[],
    unopened: LootboxType[]
};

//{selectLoot, setBoxID, setIsOpen}:{selectLoot: () => void, setBoxID: () => void, setIsOpen: () => void}

const OpenedArea = ({selectLoot, setBoxID, setIsOpen, setSkin, setIsOpened}:{selectLoot: () => void, setBoxID: (id:number) => void, setIsOpen: (state:boolean) => void, setSkin: (name:string) => void, setIsOpened: (state:boolean) => void}) => {
    const [lootboxes, setLootboxes] = useState<Lootboxes>({opened: [], unopened: []});

    const {
        state: { login },
    } = useGlobalState();

    useEffect(() => {
        if (!login) {
            return
        }
        getLootboxes(login.token).then((lootboxes) => {
            // Group boxes by opened status
            const sortedLootboxes : Lootboxes = lootboxes
                .reduce((result: Lootboxes, lootbox: LootboxType) => {
                    return (lootbox.status === 2) ? 
                        { ...result, opened: [...result.opened, lootbox] }
                        : { ...result, unopened: [...result.unopened, lootbox] }
                },
                {opened: [], unopened: []});
            setLootboxes(sortedLootboxes)
        });
    }, [login]);

    return (
        <Animated.View
        entering={SlideInRight}
        exiting={SlideOutRight}
            style={{
                height: "90%",
            }}
        >
            <ScrollView
                style={{ paddingHorizontal: 30, paddingBottom: 16 }}
                contentContainerStyle={{ gap: 16 }}
            >
                {lootboxes.unopened.map((lootbox) => (
                    <LootboxItem
                        key={lootbox.id}
                        code={lootbox.code}
                        id={lootbox.id}
                        skin={lootbox.skin}
                        lootbox_id={lootbox.lootbox_id}
                        lootbox_name={lootbox.lootbox_name}
                        item_won_details={lootbox.status === 2 ? lootbox.item_won_details : undefined}
                        status={lootbox.status}
                        token={lootbox.token}
                        selectLoot={selectLoot}
                        setBoxID={setBoxID}
                        setIsOpen={setIsOpen}
                        setSkin={setSkin}
                        setIsOpened={setIsOpened}
                    />
                ))}
                {lootboxes.opened.map((lootbox) => (
                    <LootboxItem
                        key={lootbox.id}
                        code={lootbox.code}
                        id={lootbox.id}
                        skin={lootbox.skin}
                        lootbox_id={lootbox.lootbox_id}
                        lootbox_name={lootbox.lootbox_name}
                        item_won_details={lootbox.status === 2 ? lootbox.item_won_details : undefined}
                        status={lootbox.status}
                        token={lootbox.token}
                        selectLoot={selectLoot}
                        setBoxID={setBoxID}
                        setIsOpen={setIsOpen}
                        setSkin={setSkin}
                        setIsOpened={setIsOpened}
                    />
                ))}
            </ScrollView>
        </Animated.View>
    );
};

export default OpenedArea;
