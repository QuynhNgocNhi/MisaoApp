
// import dependencies
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import components
import TabBadgeIcon from '../component/TabbarIcon';

// import Home screen
import Home from '../screen/HomeScreen';

// import Posts screen
import Posts from '../screen/PostsScreen';

// import Add screen
import AddItem from '../screen/AddScreen';

// import Chat screen
import Chat from '../screen/ChatScreen';

// import Profile screen
import Profile from '../screen/ProfileScreen';

// import colors
import Colors from '../theme/color';

import { Platform, StyleSheet } from 'react-native';

// TabNavigation Config

type Props = {
    color: string,
    focused: string,
    size: number,
    name: string,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// TabNavigation
function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="initialRoute"
            screenOptions={{ headerShown: false }}
            /* screenOptions={({ route }) => ({
                TabBadgeIcon: ({ color, focused, size }: Props) => {
                    let iconName;
                    if (route.name === 'Post') {
                        iconName = `rocket-launch${focused ? '' : '-outline'}`
                    }
                    else if (route.name === 'AddItem') {
                        iconName = 'plus-box';
                    } else if (route.name === 'Chat') {
                        iconName = `chat-processing${focused ? '' : '-outline'}`;
                    }
                    else if (route.name === 'Profile') {
                        iconName = `account-settings${focused ? '' : '-outline'}`;
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })} */
            screenOptions={{
                headerShown: false,
                "tabBarHideOnKeyboard": true,
                "tabBarActiveTintColor": "#006623",
                "tabBarInactiveTintColor": "#010203",
                "tabBarShowLabel": false,
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}
        >

            <Tab.Screen name="Home" component={Home}

                options={{
                    tabBarIcon: props => (
                        <TabBadgeIcon
                            name={`home${props.focused ? '' : '-outline'}`}

                            {...props}
                            size={30}
                            style={styles.generalIcon}

                        />
                    ),
                }}
            />
            <Tab.Screen name="Post" component={Posts}
                options={{
                    tabBarIcon: props => (
                        <TabBadgeIcon
                            name={`rocket${props.focused ? '' : '-outline'}`}

                            {...props}
                            size={30}
                            style={styles.rocketIcon}
                        />
                    ),
                }}
            />
            <Tab.Screen name="AddItem" component={AddItem}
                options={{
                    tabBarStyle: {
                        display: "none"
                    },
                    tabBarIcon: props => (
                        <TabBadgeIcon
                            name={'plus-box'}

                            size={55}
                            color={Colors.primaryColor}


                        />
                    ),
                }}
            />



            <Tab.Screen name="Chat" component={Chat}
                options={{
                    tabBarStyle: {
                        display: "none"
                    },
                    tabBarIcon: props => (
                        <TabBadgeIcon
                            name={`chat-processing${props.focused ? '' : '-outline'}`}
                            badgeCount={5}
                            {...props}
                            size={30}
                        />
                    ),
                }}
            />

            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: props => (
                        <TabBadgeIcon
                            name={`account${props.focused ? '' : '-outline'}`}

                            {...props}
                            size={30}
                        />
                    ),
                }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    rocketIcon: {
        transform: [{ rotate: "45deg" }],

    }
})

export default TabNavigation;
