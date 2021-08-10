    //  yarn add react-native-sqlite-storage

//  import { openDatabase } from 'react-native-sqlite-storage';

// var db = openDatabase({ name: 'UserDatabase.db' });


// for creation of Database in SQLite at Runtime .

//     db.transaction(function (txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
//         [],
//         function (tx, res) {
//           console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             txn.executeSql('DROP TABLE IF EXISTS table_user', []);
//             txn.executeSql(
//               'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//                      user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
//               []
//             );
//           }
//         }
//       );
//     });


// insert Data into Table in Database .

//     db.transaction(function (tx) {
//         tx.executeSql(
//           'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
//           [userName, userContact, userAddress],
//           (tx, results) => {
//             console.log('Results', results.rowsAffected);
//             if (results.rowsAffected > 0) {
//               Alert.alert(
//                 'Success',
//                 'You are Registered Successfully',
//                 [
//                   {
//                     text: 'Ok',
//                     onPress: () => navigation.navigate('HomeScreen'),
//                   },
//                 ],
//                 { cancelable: false }
//               );
//             } else alert('Registration Failed');
//           }
//         );
//       });

//       Update Data 

//       db.transaction((tx) => {
//         tx.executeSql(
//           'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
//           [userName, userContact, userAddress, inputUserId],
//           (tx, results) => {
//             console.log('Results', results.rowsAffected);
//             if (results.rowsAffected > 0) {
//               Alert.alert(
//                 'Success',
//                 'User updated successfully',
//                 [
//                   {
//                     text: 'Ok',
//                     onPress: () => navigation.navigate('HomeScreen'),
//                   },
//                 ],
//                 { cancelable: false }
//               );
//             } else alert('Updation Failed');
//           }
//         );
//       });


//  search Specific Data in table from database . 

//       db.transaction((tx) => {
//         tx.executeSql(
//           'SELECT * FROM table_user where user_id = ?',
//           [inputUserId],
//           (tx, results) => {
//             var len = results.rows.length;
//             if (len > 0) {
//               let res = results.rows.item(0);
//               updateAllStates(
//                 res.user_name,
//                 res.user_contact,
//                 res.user_address
//               );
//             } else {
//               alert('No user found');
//               updateAllStates('', '', '');
//             }
//           }
//         );
//       });

    

// View All Data from table 

//       db.transaction((tx) => {
//         tx.executeSql(
//           'SELECT * FROM table_user',
//           [],
//           (tx, results) => {
//             var temp = [];
//             for (let i = 0; i < results.rows.length; ++i)
//               temp.push(results.rows.item(i));
//             setFlatListItems(temp);
//           }
//         );
//       });

// View Specific Data from table 

//       db.transaction((tx) => {
//         tx.executeSql(
//           'SELECT * FROM table_user where user_id = ?',
//           [inputUserId],
//           (tx, results) => {
//             var len = results.rows.length;
//             console.log('len', len);
//             if (len > 0) {
//               setUserData(results.rows.item(0));
//             } else {
//               alert('No user found');
//             }
//           }
//         );
//       });

// Delete Data from Table 

//       db.transaction((tx) => {
//         tx.executeSql(
//           'DELETE FROM  table_user where user_id=?',
//           [inputUserId],
//           (tx, results) => {
//             console.log('Results', results.rowsAffected);
//             if (results.rowsAffected > 0) {
//               Alert.alert(
//                 'Success',
//                 'User deleted successfully',
//                 [
//                   {
//                     text: 'Ok',
//                     onPress: () => navigation.navigate('HomeScreen'),
//                   },
//                 ],
//                 { cancelable: false }
//               );
//             } else {
//               alert('Please insert a valid User Id');
//             }
//           }
//         );
//       });