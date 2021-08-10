import React, { useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'Userdatabase.db' });


const HomeScreen = ({ navigation }) => {

    useEffect(() => {

        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name from sqlite_master WHERE type='table' AND name= 'table_user'",
                [],
                function (tx, res) {
                    console.log('item: ', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql('CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT ,user_name VARCHAR(20) , user_contact INT(10), user_address VARCHAR(255))', []);
                            
                    }
                }

            )
        })

    }, [])
    return (
        <SafeAreaView>
            <Text style={styles.txtheading}>SQLite Example</Text>
            <View style={styles.container}>

                <View style={styles.buttonview}>

                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("RegisterUser")}>
                        <Text style={styles.touchtext}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("UpdateUser")}>
                        <Text style={styles.touchtext}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("ViewUser")}>
                        <Text style={styles.touchtext}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("ViewAllUser")}>
                        <Text style={styles.touchtext}>ViewAll</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate("DeleteUser")}>
                        <Text style={styles.touchtext}>Delete</Text>
                    </TouchableOpacity>



                </View>
            </View>


        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center'
    },
    txtheading: {
        fontSize: 20,
        fontWeight: '500',
    },
    buttonview: {
        marginTop: 10,
    },
    touch: {
        borderWidth: 1,
        marginTop: 30,
        width: 300,
        height: 40,
        backgroundColor: '#2C394B',
    },
    touchtext: {
        color: 'white',
        alignSelf: 'center',
        padding: 5,
        fontSize: 20,
    },
})