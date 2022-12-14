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
  const [empty, setEmpty] = useState([]);
  const isFocused= useIsFocused()
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM students',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
 
          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true)
          }
 
        }
      );
 
    });
  }, [isFocused]);
  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };
 
  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
 
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          No Record Inserted Database is Empty...
          </Text>
 
      </View>
    );
  }
 
  const EditScreen = (id, name, phoneNumber, address) => {
 
    navigation.navigate('edit', {
      id: id,
      student_name: name,
      student_regNumber: phoneNumber,
      
    });
  }
  

    return(
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {empty ? emptyMSG(empty) :
 
          <FlatList
            data={items}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View key={item.id} style={{ padding: 20 }}>
                
                  <Text style={styles.itemsStyle}> Id: {item.id} </Text>
                  <Text style={styles.itemsStyle}> student_name: {item.student_name} </Text>
                  <Text style={styles.itemsStyle}> student_regNumber: {item.student_regNumber} </Text>
                <TouchableOpacity onPress={()=> EditScreen(item.id, item.student_name, item.student_regNumber) }>
                <AntDesign name="edit" style={{fontSize:24,color:'green',position:'relative',left:'90%'}}></AntDesign>
                </TouchableOpacity> 
               
              </View>
            }
          />
        }
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


