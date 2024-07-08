import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export default function Checkbox({
    value,
    onChange,
    children,
}: {
    value: boolean;
    onChange: (value: boolean) => void;
    children: ReactNode | ReactNode[];
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Pressable
                style={{
                    width: 24,
                    height: 24,
                    borderRadius: 0,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#FFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                }}
                onPress={() => onChange(!value)}
                hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
            >
                {value ? (
                    <View
                        style={{
                            width: 16,
                            height: 16,
                            backgroundColor: '#FFF',
                        }}
                    />
                ) : null}
            </Pressable>
            <View
                style={{
                    flex: 1,
                }}
            >
                {children}
            </View>
        </View>
    );
}
