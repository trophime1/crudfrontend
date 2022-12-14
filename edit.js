 import { useNavigation, useRoute } from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import * as SQLite from 'expo-sqlite'
import { StyleSheet,SafeAreaView,Text,TextInput,View,TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
 
 const Edit=({route})=>{
  const [student_name, setName] = useState(route.params.name);
  const [snumber, setNumber] = useState(route.params.snumber);
  const id=route.params.id;
  const navigation=useNavigation();
  const confirm=()=>{
    Alert.alert(
      'Warning',
      'Do you want to delete student?',
      [
        {
          text:'Yes',
          onPress:()=>{
            Delete(id);
          }
        },
        {
          text:'No'
        }
      ])
  }
  const  Update=async(id)=>{
    try{
      if(student_name=="" ||snumber==""){
        Alert.alert(
          'Warning',
          'All field are required!',
          [
            {
              text: 'Ok',
              onPress: () =>{
                navigation.navigate('edit')
            }
            },
          ],
          { cancelable: false}
        )
      }else{
        const response=await fetch(`https://native-api.vercel.app/student/update/${id}`,{
        method:'PATCH',
        headers:{
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          name:student_name,
          number:snumber,
         
            })
      
      })
      Alert.alert(
        'Success',
         'Student Updated Successfully',
           [
             {
              text: 'Ok',
                     onPress: () => navigation.navigate('view'),
                     },
                    ],
                    { cancelable: false }
              )

      }
        }
        catch(error){
         // console.log(error)
        }
  
          }

const Delete=async(id)=>{
  try{
    
    await fetch(`https://native-api.vercel.app/student/delete/${id}`,
    {method:'DELETE',
      headers:{
      'Content-Type':'application/json'
    }});
    Alert.alert(
      'Success',
      'Student removed Successfully',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('view'),
        },
      ],
      { cancelable: false }
      )
    }
    catch(error){
      console.log(error)
    }

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
            (text) => setName(text)
          }
          placeholder="Enter Student Name"
          defaultValue={student_name} />
 
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setNumber(text)
          }
          placeholder="Enter Student Reg_Number"
          keyboardType={'numeric'}
          defaultValue={snumber} />

 <View style={styles.btnCard}>
        <TouchableOpacity
          style={styles.add_btn}
          onPress={()=>Update(id)}>
 
 <AntDesign name="edit" size={26} color="black" />

 
        </TouchableOpacity>
 
        <TouchableOpacity
          style={styles.view_btn}
          onPress={()=>confirm()}>
 
 <AntDesign name="delete" size={26} color="red" />

 
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.view_btn}
          onPress={()=>navigation.navigate('add')}
          >
 
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
        width:50,
        height:50,
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