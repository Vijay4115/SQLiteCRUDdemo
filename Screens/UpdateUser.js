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

const UpdateUser = ({navigation}) =>{
    let [userid,setUserid] = useState('');
    let [username,setUsername] = useState('');
    let [usernumber,setUsernumber] = useState('');
    let [useradd,setUseradd] = useState('');

    function updateAllStates(user_name,user_contact,user_address){
        setUsername(user_name);
        setUsernumber(user_contact);
        setUseradd(user_address);
    }

    function searchUser (){

        console.log(userid);

        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM table_user WHERE user_id = ?',[userid],
            (tx,results) =>{

                console.log("result " ,results.rows.length);

                if(results.rows.length > 0){
                    let res = results.rows.item(0);
                        updateAllStates(
                            res.user_name,
                            res.user_contact,
                            res.user_address
                        )
                }
                else{
                    alert("User Not Found")
                }
            }
            )
        })
    }

    function updateUser (){
        console.log(userid,username,usernumber,useradd);

        if(!userid){
            alert("Enter User id");
            return
        }
        else if(!username){
            alert("Enter User Name");
            return
        }
        else if(!usernumber){
            alert("Enter User Number");
            return
        }
        else if(!useradd){
            alert("Enter User address");
            return
        }
        else{
            db.transaction((tx)=>{
                tx.executeSql('UPDATE table_user  set user_name = ? ,user_contact = ? , user_address = ? where user_id = ?',
                [username,usernumber,useradd,userid],
                (tx,results) =>{
                    console.log(results.rowsAffected);
                    if(results.rowsAffected > 0 )
                    {
                        Alert.alert(
                            'Success',
                            'Record Update SuccessFully',
                            [{
                                text:'OK',
                                onPress:()=>navigation.navigate('HomeScreen')
                            }],
                            {cancelable:false}
                        )
                    }else{
                        alert("Updation Failed");
                    }
                }
                )
            })
        }
    }
return(
    <SafeAreaView>
         <View style={styles.container}>
              
            <TextInput placeholder="Enter User ID" keyboardType="number-pad"
             placeholderTextColor="darkgrey" style={styles.txtinput}
             onChangeText = {(nm) => setUserid(nm)}
             />

            <TouchableOpacity style={styles.touch} onPress={()=>searchUser()}>
                <Text style={styles.touchtext}>Search User</Text>
            </TouchableOpacity>

            <View style={styles.container2}>
            <TextInput placeholder="Enter  Name"  placeholderTextColor="darkgrey" 
            value={username}
            style={styles.txtinput}
            onChangeText={(nm)=> setUsername(nm)}
            />
            <TextInput placeholder="Enter  Number"
              placeholderTextColor="darkgrey" style={styles.txtinput}
              value={''+usernumber}
              onChangeText={(nm)=> setUsernumber(nm)}
              />
            <TextInput placeholder="Enter  Address" multiline 
            placeholderTextColor="darkgrey" style={styles.txtinput2}
            value={useradd}
            onChangeText={(nm)=> setUseradd(nm)}
            />

            <TouchableOpacity style={styles.touch} onPress={()=>updateUser()}>
                <Text style={styles.touchtext}>Update User</Text>
            </TouchableOpacity>

            </View>
         </View>
    </SafeAreaView>
    )
}
export default UpdateUser;

const styles = StyleSheet.create({

    container2:{
        marginTop:50,
        alignItems:'center'
    },
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
    txtinput2:{
        borderWidth:1,
        width:320,
        height:100,
        paddingLeft:15,
        borderRadius:10,
        marginTop:25,
        fontSize:17,
        borderColor:'#334756'
    },
})