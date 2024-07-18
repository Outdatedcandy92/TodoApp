import { StyleSheet, Text, View , ScrollView, Pressable} from "react-native";
import React, {useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  return (
    <ScrollView style={{flex:1, backgroundColor:"white",padding:20}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Ionicons name="logo-flickr" size={30} color="black" />
        <Feather onPress={()=> router.push("/home/create")}  name="plus-circle" size={30} color="black" />
      </View>  

      <Text style={{fontSize:23,fontWeight:500,marginTop:5}}>Habits</Text>
      <View style={{flexDirection:"row",alignItems:"center",gap:15, marginVertical:10}}>
        <Pressable
        onPress={()=>setOption("Today")}

        style={{
          backgroundColor: option== "Today" ? "#E0FFFF" : "transparent", 
          paddingHorizontal:10, 
          paddingVertical:10,
          borderRadius:25}}>

          <Text style={{textAlign:"center",color:"gray",fontSize:15}}>Today</Text>
        </Pressable>
        <Pressable 
        onPress={()=>setOption("Weekly")}
        style={{
          backgroundColor: option== "Weekly" ? "#E0FFFF" : "transparent",  
          paddingHorizontal:10, 
          paddingVertical:10,
          borderRadius:25}}>

          <Text style={{textAlign:"center",color:"gray",fontSize:15}}>Weekly</Text>
        </Pressable>
        <Pressable 
        onPress={()=>setOption("Overall")}
        style={{
          backgroundColor: option== "Overall" ? "#E0FFFF" : "transparent", 
          paddingHorizontal:10, 
          paddingVertical:10,
          borderRadius:25}}>

          <Text style={{textAlign:"center",color:"gray",fontSize:15}}>Overall</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default index;

const styles = StyleSheet.create({});