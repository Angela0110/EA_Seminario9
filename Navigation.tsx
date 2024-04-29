import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import GetUsers from './src/GET/User';
import CreateUser from './src/POST/User';
import GetPosts from './src/GET/Post';


const Tab = createBottomTabNavigator();
export default function Navigation() {
    const [usersUpdated, setUsersUpdated] = useState(false);
    const [postsUpdated, setPostsUpdated] = useState(false);

    const updateUserList = () => {
        setUsersUpdated(!usersUpdated);
    };

    const updatePostList = () => {
        setPostsUpdated(!postsUpdated);
    };

    function MyTabs() {
        return (
            <Tab.Navigator initialRouteName='Home'>
                <Tab.Screen name="Lista de usuarios">
                    {() => <GetUsers usersUpdated={usersUpdated} updatePostList={updatePostList} />}
                </Tab.Screen>
                <Tab.Screen name="Usuario nuevo">
                    {() => <CreateUser updateUserList={updateUserList} />}
                </Tab.Screen>
                <Tab.Screen name="Lista de posts">
                    {() => <GetPosts postsUpdated={postsUpdated} />}
                </Tab.Screen>
            </Tab.Navigator>
        );
    }


    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>

    );
}
