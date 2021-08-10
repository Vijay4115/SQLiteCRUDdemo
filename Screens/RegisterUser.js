import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'Userdatabase.db' });

const RegisterUser = ({ navigation }) => {

    let [username, setUsername] = useState('');
    let [usernumber, setUsernumber] = useState('');
    let [useradd, setUseradd] = useState('');

   let registerUser = () => {

        console.log(username, usernumber, useradd);

        if (!username) {
            alert("Enter Username ");
            return
        }
        else if (!usernumber) {
            alert("Enter Number ");
            return
        }
        else if (!useradd) {
            alert("Enter Address ");
            return
        }
        else {}

            db.transaction(function (tx) {
             
                tx.executeSql(

                    'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                    [username, usernumber, useradd],
                    
                    (tx, results) => {
                      
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Success',
                                'You are Registered Successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('HomeScreen'),
                                    },
                                ],
                                { cancelable: false }
                            );
                        } else{ alert('Registration Failed');}
                    }
                );
            });

        

    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TextInput style={styles.txtinput} placeholder="Enter Name "
                    placeholderTextColor="darkgrey"
                    onChangeText={(nm) => setUsername(nm)}
                />
                <TextInput style={styles.txtinput} placeholder="Enter Number "
                    keyboardType="number-pad" maxLength={10} placeholderTextColor="darkgrey"
                    onChangeText={(nm) => setUsernumber(nm)}
                />
                <TextInput style={styles.txtinput2} placeholder="Enter Address "
                    multiline numberOfLines={2} placeholderTextColor="darkgrey"
                    onChangeText={(nm) => setUseradd(nm)}
                />

                <TouchableOpacity style={styles.touch}
                    onPress={() => registerUser()}
                >
                    <Text style={styles.touchtext}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default RegisterUser;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center'
    },
    touch: {
        borderWidth: 1,
        marginTop: 150,
        width: 200,
        height: 40,
        backgroundColor: '#2C394B',
        borderRadius: 15,
    },
    touchtext: {
        color: 'white',
        alignSelf: 'center',
        padding: 5,
        fontSize: 20,

    },
    txtinput: {
        borderWidth: 1,
        width: 320,
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        marginTop: 25,
        borderColor: '#334756',
        fontSize: 17,
    },
    txtinput2: {
        borderWidth: 1,
        width: 320,
        height: 100,
        paddingLeft: 15,
        borderRadius: 10,
        marginTop: 25,
        fontSize: 17,
        borderColor: '#334756'
    },
})