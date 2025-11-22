import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';

export default function AuthScreen() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />

            {/* Header Image */}
            <View className="h-[35%] bg-[#003087] relative">
                <Image
                    source={{ uri: 'https://img.freepik.com/free-photo/soccer-stadium-night_1150-14609.jpg' }}
                    className="w-full h-full opacity-40"
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-12 left-6 p-2 bg-white/20 rounded-full"
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>

                <View className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-[40px]" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 -mt-10 bg-white rounded-t-[40px]"
            >
                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    <Text className="text-[#003087] font-bold text-2xl text-center mb-2">NepalSports Hub</Text>
                    <Text className="text-gray-900 font-bold text-3xl mb-2">
                        {isLogin ? 'Welcome back!' : 'Create your account'}
                    </Text>
                    <Text className="text-gray-400 text-sm mb-8">
                        {isLogin ? 'Sign in to continue your sports journey' : 'By creating an account you agree to our Terms and Conditions.'}
                    </Text>

                    {/* Form */}
                    <View className="space-y-4">
                        {!isLogin && (
                            <View className="bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100 flex-row items-center gap-3">
                                <User size={20} color="#9CA3AF" />
                                <TextInput
                                    placeholder="Full Name"
                                    className="flex-1 font-medium text-gray-900"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        )}

                        <View className="bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100 flex-row items-center gap-3">
                            <Mail size={20} color="#9CA3AF" />
                            <TextInput
                                placeholder="Email Address"
                                className="flex-1 font-medium text-gray-900"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100 flex-row items-center gap-3">
                            <Lock size={20} color="#9CA3AF" />
                            <TextInput
                                placeholder="Password"
                                className="flex-1 font-medium text-gray-900"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                        className="bg-[#003087] w-full py-4 rounded-2xl shadow-lg shadow-blue-200 mt-8"
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center mt-6 mb-6">
                        <Text className="text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </Text>
                        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                            <Text className="text-[#003087] font-bold">
                                {isLogin ? 'Sign Up' : 'Login'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Social Login */}
                    <View className="space-y-3">
                        <SocialButton icon="https://cdn-icons-png.flaticon.com/512/0/747.png" label="Sign up with Apple" bg="bg-black" text="text-white" />
                        <SocialButton icon="https://cdn-icons-png.flaticon.com/512/300/300221.png" label="Sign up with Google" bg="bg-white" text="text-gray-700" border />
                        <SocialButton icon="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" label="Sign up with Facebook" bg="bg-[#1877F2]" text="text-white" />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const SocialButton = ({ icon, label, bg, text, border }: any) => (
    <TouchableOpacity className={`w-full py-3.5 rounded-2xl flex-row items-center justify-center gap-3 ${bg} ${border ? 'border border-gray-200' : ''}`}>
        <Image source={{ uri: icon }} className="w-5 h-5" resizeMode="contain" />
        <Text className={`font-bold ${text}`}>{label}</Text>
    </TouchableOpacity>
);
