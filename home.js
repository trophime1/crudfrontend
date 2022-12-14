import React, { useState } from "react";
import { Text,TextInput,View, StyleSheet, Keyboard, Alert } from "react-native";
import * as SQLite from "expo-sqlite"
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

 const Home =()=>{
    var navigation=useNavigation();
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const Loging=()=>{
        if(name==""||password==""){
            Alert.alert(
                'Warning',
                'Please all fields are required',
            )
        }
        else if(name=="Admin" & password=="Admin"){
            navigation.navigate('add');

        }
        else{
            Alert.alert('incorrect password or username')
        }
    }
    return(
        <View style={styles.login_container}>
            <TextInput style={styles.textinput} placeholder="enter username" onChangeText={setName}/>
            <TextInput style={styles.textinput} secureTextEntry={true}  placeholder="password" onChangeText={setPassword}/>
            <TouchableOpacity style={styles.login_btn} onPress={()=> Loging()} >
                <Text>Login</Text>
            </TouchableOpacity>

        </View>
    )
 } 

const styles=StyleSheet.create({
    textinput:{
       borderWidth: 1,
       padding: 10,
       margin:20,
       borderColor: '#2bd9d9',
       borderRadius: 50,
        
    },
    login_container:{
        display:"flex",
        justifyContent: "center",
        position: 'relative',
        top:'20%',
        // marginLeft:0,

    },
    login_btn:{
        alignItems: "center",
        borderColor:'#2bd9d9',
        borderWidth:1,
        backgroundColor: '#2bd9d9',
        padding: 10,
        marginEnd: 100,
        marginStart: 100,
        borderRadius:50,
    }


});
export default Home
 