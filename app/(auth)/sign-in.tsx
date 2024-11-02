import {View, Text, TextInput, Button, SafeAreaView, Animated} from "react-native";
import {useRouter} from "expo-router";
import React, {useState} from "react";
import ScrollView = Animated.ScrollView;
import TextField from "@/components/TextField";

const SignIn = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        username: "",
        password: "",
    })


    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            // Redirect to home page
            router.push('/');
        } else {
            alert('Username atau password salah');
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <TextField
                        title="Username"
                        value={form.username}
                        handleChange={setForm}
                        keyboardType="username"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignIn;