import { Alert, View, SafeAreaView, Animated, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import ScrollView = Animated.ScrollView;
import TextField from "@/components/TextField";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "@/components/Button";
import {useLoginMutation} from "@/store/api";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

const SignIn = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            const { token } = await login(form).unwrap();
            await AsyncStorage.setItem('token', token);
            router.push('/');
        }  catch (error: unknown) {
            let errorMessage = "Login failed. Please try again.";
            if (error && typeof error === 'object') {
                if ('status' in error) {
                    const fetchError = error as FetchBaseQueryError;
                    if (fetchError.data) {
                        errorMessage = typeof fetchError.data === 'string'
                            ? fetchError.data
                            : JSON.stringify(fetchError.data);
                    }
                } else if ('message' in error) {
                    const serializedError = error as SerializedError;
                    errorMessage = serializedError.message || errorMessage;
                }
            }

            console.error('Login failed:', error);
            Alert.alert("Error", errorMessage);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
                        <TextField
                            title="Username"
                            value={form.username}
                            handleChange={(e: string) => setForm((prev) => ({ ...prev, username: e }))}
                            type="text"
                        />
                        <TextField
                            title="Password"
                            value={form.password}
                            handleChange={(e: string) => setForm({ ...form, password: e })}
                            type="password"
                        />
                        <Button title="Login" handlePress={handleLogin} className="mt-4" isLoading={isLoading}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignIn;
