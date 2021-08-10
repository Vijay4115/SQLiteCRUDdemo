import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DeleteUser from '../Screens/DeleteUser';
import HomeScreen from '../Screens/HomeScreen';
import RegisterUser from '../Screens/RegisterUser';
import UpdateUser from '../Screens/UpdateUser';
import ViewAllUser from '../Screens/ViewAllUser';
import ViewUser from '../Screens/ViewUser';


const Stack = createNativeStackNavigator();

const StackNavigator = () =>{

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen  name= "HomeScreen" component={HomeScreen} />
                <Stack.Screen  name= "RegisterUser" component={RegisterUser} />
                <Stack.Screen  name= "UpdateUser" component={UpdateUser} />
                <Stack.Screen  name= "DeleteUser" component={DeleteUser} />
                <Stack.Screen  name= "ViewAllUser" component={ViewAllUser} />
                <Stack.Screen  name= "ViewUser" component={ViewUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigator;