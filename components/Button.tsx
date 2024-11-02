import {ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity} from "react-native";

interface ButtonProps {
    title: string,
    handlePress: (event: GestureResponderEvent) => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
    className?: string;
}
const Button = (props: ButtonProps) => {
    const {
        title,
        handlePress,
        containerStyles = '',
        textStyles = '',
        isLoading = false,
        className = '',
    } = props;

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-blue-500 rounded-xl min-h-[62px] w-full flex flex-row justify-center items-center ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            } ${className}`}
            disabled={isLoading}
        >
            <Text className={`text-white text-lg ${textStyles}`}>
                {title}
            </Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    );
};

export default Button;