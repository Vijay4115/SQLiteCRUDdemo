import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'Userdatabase.db' });

const ViewUser = ({ navigation }) => {

    let [userid, setUserId] = useState('');
    let [userData, setUserdata] = useState()

    function viewuser() {

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_user WHERE user_id = ?', [userid],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        setUserdata(results.rows.item(0))

                    }
                    else {
                        alert("No user Found");
                    }
                }
            )
        })
    }


    return (

        <SafeAreaView>
            <View style={styles.container}>

                <TextInput style={styles.txtinput} placeholder="Enter User ID" placeholderTextColor="darkgrey"
                    onChangeText={(nm) => setUserId(nm)}
                />
                <TouchableOpacity style={styles.touch} onPress={() => viewuser()}>
                    <Text style={styles.touchtext}>Search</Text>
                </TouchableOpacity>

        { userData  ? (
                <View style={{marginTop:100}}>
            <Text>User  Id:  {userData.user_id}</Text>
            <Text>User  Name:  {userData.user_name}</Text>
            <Text>User  Contact:  {userData.user_contact}</Text>
            <Text>User  Address:  {userData.user_address}</Text>
          </View>)
          :(
              <Text></Text>
          )
}
            </View>
        </SafeAreaView>
    )
}
export default ViewUser;
const styles = StyleSheet.create({

    container: {
        marginTop: 50,
        alignItems: 'center',
    },
    txtinput: {
        borderWidth: 1,
        width: 300,
        height: 45,
        borderRadius: 10,
        paddingLeft: 15,
        borderColor: '#334756'
    },
    touch: {
        borderWidth: 1,
        marginTop: 50,
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

})