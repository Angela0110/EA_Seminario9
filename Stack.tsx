/* import React,{useState} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GetUsers from './src/GET/User';
import CreateUser from './src/POST/User';

const HomeStackNavigator=createNativeStackNavigator();

    
    const [usersUpdated, setUsersUpdated] = useState(false);
    const updateUserList = () => {
        setUsersUpdated(!usersUpdated);
    };

function MyStack(){
return(
    <HomeStackNavigator.Navigator>
        <HomeStackNavigator.Screen
        name="Lista de usuarios" component={() => <GetUsers usersUpdated={usersUpdated} />}/>
          <HomeStackNavigator.Screen name="Usuario nuevo" component={() => <CreateUser updateUserList={updateUserList} />} />  
        
    </HomeStackNavigator.Navigator>
)
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>

    )
}; */
