import {Stack, useRouter} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    router.push('/home');
                } else {
                    router.push('/sign-in');
                }
            } catch (error) {
                console.error('Failed to retrieve token:', error);
            }
        };

        checkToken();
    }, [router]);
    return (
        <>
            <Stack>
                <Stack.Screen name="sign-in" options={{ headerShown: false }}/>
            </Stack>

            <StatusBar style="light" />
        </>
    )
}

export default AuthLayout;
