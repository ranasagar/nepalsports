import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Home, Radio, User, Trophy, School } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#E61E2A', // Nepal Red for active
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="live"
                options={{
                    title: 'Live',
                    tabBarIcon: ({ color }) => (
                        <View className="relative">
                            <Trophy size={24} color={color} />
                            <View className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white" />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="schools"
                options={{
                    title: 'Schools',
                    tabBarIcon: ({ color }) => <School size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="radio"
                options={{
                    title: 'Radio',
                    tabBarIcon: ({ color }) => <Radio size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
