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




const DeleteUser = ({navigation}) =>{
    let [userid,setUserid] = useState('');

    function deleteUser(){

        console.log(userid);

        db.transaction((tx)=>{
            tx.executeSql('DELETE  FROM table_user WHERE user_id = ?', 
            [userid],
            (tx,results) =>{
                console.log("Results ",results.rowsAffected);

                if(results.rowsAffected > 0){
                    Alert.alert(
                        'Success',
                        "User Deleted SuccessFully ",
                        [{
                            text:'OK',
                            onPress:()=>navigation.navigate('HomeScreen'),
                        }],
                        {cancelable:false},
                    )
                }
                else{
                    alert("User Not Found..!!!");
                }
            }
            )
        })

    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
            <TextInput placeholder="Enter User ID" keyboardType="number-pad" 
            placeholderTextColor="darkgrey" style={styles.txtinput}
            onChangeText = {(nm)=>setUserid(nm)}
            />

            <TouchableOpacity style={styles.touch} onPress={()=>deleteUser()}>
                <Text style={styles.touchtext}>Delete User</Text>
            </TouchableOpacity>
             </View>
        </SafeAreaView>
    )
}

export default DeleteUser;

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        alignItems:'center'
    },
    touch:{
        marginTop:50,
        width:280,
        height:40,
        borderRadius:10,
        backgroundColor:'#2C394B'
    },
    touchtext:{
        color:"white",
        alignSelf:'center',
        fontSize:20,
        padding:5
    },
    txtinput:{
        borderWidth:1,
        width:320,
        height:46,
        paddingLeft:15,
        borderRadius:10,
        borderColor:'#334756',
        fontSize:15,
        marginTop:20
    },
})