import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'

var db = openDatabase({name:'Userdatabase.db'});


const ViewAllUser = ({navigation}) => {
    let [data ,setData ] = useState([]);

    useEffect(() => {
        
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_user',[],
            (tx,results)=>{
                var temp = [];
                for(let i=0;i<results.rows.length;i++){
                    temp.push(results.rows.item(i))
                    setData(temp)
                }
            }
            )
        })

    }, [])
    function ItemSeparator (){
        return(
            <View style={{height:0.5,width:350,backgroundColor:'darkgrey'}} />
        )
    }
    return(
        <SafeAreaView>
            <View style={styles.container}>

        <FlatList
        data={data}
        keyExtractor = {(item)=>item.user_id}
        renderItem = {({item})=>(
            <ScrollView>
            <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-start',height:50,paddingTop:25,borderBottomColor:'darkgrey'}}>
            <Text> ID : {item.user_id}   </Text>
            <Text>NAME : {item.user_name}  </Text>
            <Text>CONTACT : {item.user_contact}  </Text>
            <Text>ADDRESS : {item.user_address}  </Text>
            </View>
            </ScrollView>
        )}
        ItemSeparatorComponent = {ItemSeparator}

        />

                  
            </View>
        </SafeAreaView>
    )
}
export default ViewAllUser;

const styles = StyleSheet.create({

    container:{
        marginTop:50,
        alignItems:'center',
    }
})