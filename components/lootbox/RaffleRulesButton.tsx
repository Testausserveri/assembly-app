import { useTheme, Button } from 'react-native-paper';



const RaffleRulesButton = ({showModal}:{showModal: () => void}) => {
    const theme = useTheme();
    
    return (
        <Button onPress={showModal} rippleColor={'transparent'}>
            Raffle rules
        </Button>
    );
};

export default RaffleRulesButton;