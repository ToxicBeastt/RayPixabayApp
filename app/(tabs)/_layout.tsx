import {Stack, useRouter} from "expo-router";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabLayout = () => {
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
                <Stack.Screen name="home" options={{ headerShown: false }}/>
            </Stack>
        </>
    );
};

export default TabLayout;