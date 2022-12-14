 import { useNavigation, useRoute } from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import * as SQLite from 'expo-sqlite'
import { StyleSheet,SafeAreaView,Text,TextInput,View,TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
 
 const Edit=()=>{
  const [id, setID] = useState('');
  const [student_name, setStudent_name] = useState('');
  const [student_regNumber, setStudent_regNumber] = useState();
const route= useRoute()
const db=SQLite.openDatabase('school.db')
const navigation=useNavigation()
const confirm=()=>{
  Alert.alert(
    'Warning',
    'Do you want to Delete student',
    [
      {
        text:'Yes',
        onPress:()=> deleteRecord()
      },
      {
        text:"No",
    
      }
    ]
  )
}
 
  useEffect(() => {
 
    setID(route.params.id);
    setStudent_name(route.params.student_name);
    setStudent_regNumber(route.params.student_regNumber.toString());
  
 
  }, []);
 
  const editData = () => {
 
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE students set student_name=?, student_regNumber=? where id=?',
        [student_name, student_regNumber,id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Done',
              'Record Updated Successfully...',
            [
                {
                    text:'Ok',
                    onPress: ()=> navigation.navigate('view'),
                },
            ],
            {cancelable: false}
            )
            
          } else Alert.alert('Error');
        }
      );
    });
  }
 
  const deleteRecord = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM students where id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Done',
              'Record Deleted Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('view'),
                },
                
              ],
              { cancelable: false }
            );
          }
        }
      );
    });
 
  }
 
  return (
    <SafeAreaView style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
      <View style={styles.mainContainer}>
 
        <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>
          Update or delete a Record
        </Text>
 <View style={styles.card}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setStudent_name(text)
          }
          placeholder="Enter Student Name"
          value={student_name} />
 
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setStudent_regNumber(text)
          }
          placeholder="Enter Student Phone Number"
          keyboardType={'numeric'}
          value={student_regNumber} />

 <View style={styles.btnCard}>
        <TouchableOpacity
          style={styles.add_btn}
          onPress={editData}>
 
 <AntDesign name="edit" size={26} color="black" />

 
        </TouchableOpacity>
 
        <TouchableOpacity
          style={styles.view_btn}
          onPress={confirm}>
 
 <AntDesign name="delete" size={26} color="red" />

 
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.view_btn}
          onPress={()=> navigation.navigate('add')}>
 
 <AntDesign name="adduser" size={26} color="blue" />
 
        </TouchableOpacity>
        </View>
        </View>
      </View>
 
    </SafeAreaView>
  );
};


const styles= StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
   
    touchableOpacity: {
      backgroundColor: '#0091EA',
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
   
    touchableOpacityText: {
      color: '#FFFFFF',
      fontSize: 23,
      textAlign: 'center',
      padding: 8
    },
   
    textInputStyle: {
      height: 45,
      width: 300,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: '#00B8D4',
      borderRadius: 7,
      marginTop: 15,
      marginBottom:30
    },
   
    itemsStyle: {
      fontSize: 22,
      color: '#000'
    },
    add_btn:{
        alignItems: "center",
        borderColor:'#2bd9d9',
        borderWidth:1,
        backgroundColor: '#2bd9d9',
        padding: 10,
        marginEnd: 100,
        marginStart: 100,
        borderRadius:50,
    },
    card:{
      flex:0.3,
      justifyContent:"center",
      marginLeft:30,
      marginTop:"50%",
    },
    btnCard:{
      display:'flex',
      flexDirection:'row',
      justifyContent:"space-around"
    },
    view_btn:{
        alignItems: "center",
        borderColor:'#2bd9d9',
        borderWidth:1,
        backgroundColor: '#2bd9d9',
        padding: 10,
        marginEnd: 100,
        marginStart: 100,
        borderRadius:50,
        marginTop:10,
    }
  
  })
  
export default Edit;