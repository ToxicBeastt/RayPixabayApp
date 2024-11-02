import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
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

    return null;
};

export default Index;
