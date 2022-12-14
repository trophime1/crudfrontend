import { useIsFocused, useNavigation } from "@react-navigation/native";
import React,{useState,useEffect} from "react";
import { Text, View,SafeAreaView,FlatList,TouchableOpacity,StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite'
export default function Views(){
var db=SQLite.openDatabase('school.db')
const navigation=useNavigation()
  const [items, setItems] = useState([]);
  const isFocused= useIsFocused()
  const url='https://native-api.vercel.app/'

  const getData=async ()=>{
    try{
      const response=await fetch(url);
      const data=await response.json();
      setItems(data)
    }
    catch(error){
      console.log(error)
    }
  } 

  useEffect(() => {
    getData()
  }, [isFocused]);
 
 
  const EditScreen = (id, name, snumbers) => {
 
    navigation.navigate('edit', {
      id: id,
      name: name,
      snumber: snumbers,
      
    });
  }
  

    return(
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
 
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View key={item._id} style={{ padding: 20 }}>
                
                  {/* <Text style={styles.itemsStyle}> Id: {item._id} </Text> */}
                  <Text style={styles.itemsStyle}> student_name: {item.name} </Text>
                  <Text style={styles.itemsStyle}> student_regNumber: {item.number} </Text>
                <TouchableOpacity onPress={()=> navigation.navigate("edit",{id:item._id, name:item.name, snumber:item.number}) }>
                <AntDesign name="edit" style={{fontSize:24,color:'green',position:'relative',left:'90%'}}></AntDesign>
                </TouchableOpacity> 
               
              </View>
            }
          />
         <TouchableOpacity
          style={styles.view_btn}
          onPress={()=> navigation.navigate('add')}>
 
 <AntDesign name="adduser" size={26} color="blue" />
 
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
}
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
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
  },
 
  itemsStyle: {
    fontSize: 22,
    color: '#000'
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


