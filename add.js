import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import React, {useEffect,useState} from "react";
import { SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import axios from "axios";

export default Add=()=>{

    const [student_name, setStudent_name] = useState('');
    const [student_regNumber, setStudent_regNumber] = useState();
    
    var navigation=useNavigation();
    const add=async()=>{
        if(student_name==""||student_regNumber==""){
            Alert.alert(
                'Warning',
                'All field is requied',
                [
                    {
                        text:'Ok',
                        onPress:()=>{
                            navigation.navigate('add')
                        }
                        
                    }
                ],
                {cancelable: false}
                )
        }
        else{
            const student=JSON.stringify({
                name:student_name,
                number:student_regNumber,
               
                  });
            const headers={
                headers:{
                    'Content-Type':'application/json'
                }         
            }
        
            await axios.post("https://native-api.vercel.app/student/create",
           student,headers)
            Alert.alert(
                'Success',
                'Task added Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () =>{
                      navigation.navigate('view')
                  }
                  },
                ],
                { cancelable: false}
              )
        }
    }
               
    return(
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View>
                <Text style={styles.text}> Welcome Again to Students panel</Text>
                <TextInput style={styles.textinput} onChangeText={(text)=>setStudent_name(text)}
                placeholder="enter student names"
                value={student_name}/>
                <TextInput keyboardType="numeric" style={styles.textinput} onChangeText={(text)=>setStudent_regNumber(text)}
                placeholder="enter student regNumber"
                value={student_regNumber}/>
                <TouchableOpacity style={styles.add_btn} onPress={()=>add()}>
                    <Text>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.view_btn} onPress={()=>navigation.navigate('view')}>
                    <Text>View</Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
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
        marginLeft: 50,

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
        width:150
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
    },
    text:{
 fontWeight:'800',
 fontSize:20,

    }
});
