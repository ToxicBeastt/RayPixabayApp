import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import { useState } from "react";

interface TextFieldProps {
    title: string,
    value: string,
    placeholder?: string,
    handleChange?: (value: string) => void,
    type?: "text" | "password" | "email"
}

const TextField = (props: TextFieldProps) => {
    const {
        title,
        value,
        placeholder = '',
        handleChange = () => {},
        type = "text",
    } = props

    const [showPasssword, setShowPassword] = useState(false)

    return (
        <View className="space-y-2 w-full">
            <Text className="text-gray-900">{title}</Text>
            <View className="w-full h-16 px-4 rounded-2xl border-2 border-gray-900 flex flex-row items-center">
                <TextInput
                    className="flex-1 text-base outline-none"
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChange}
                    secureTextEntry={type === 'password' && !showPasssword}
                />

                {type === 'password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPasssword)}>
                        <Image
                            source={!showPasssword ? require('../assets/icons/eye.png') : require('../assets/icons/eye-hide.png')}
                            className="w-8 h-8"
                            style={{ aspectRatio: 1 }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default TextField;
