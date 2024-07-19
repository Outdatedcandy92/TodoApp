import { StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { set } from "mongoose";


const create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169EE"]
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  
  const [title,setTitle] = useState("");
  async function addHabit() {
    try {
      const habitDetials = {
        title: "title",
        color: selectedColor,
        repeatMode: "Daily",
        reminder: true,
      };

      const response = await axios.post("http://localhost:3000/habit", habitDetials);
      if(Response.status === 200){
        setTitle("");
        Alert.alert("Habit Created");
      } else {
        console.log("Error", response);
      }
    } catch (error) {
      console.log("error", error);
      
    }
  }


  return (
    <View style={{ padding: 15 }}>
      <Entypo name="back" size={24} color="black" />

      <Text style={{ fontSize: 20, marginTop: 10 }}>Create<Text style={{ fontSize: 20, fontWeight: 500 }}> Habit</Text> </Text>

      <TextInput
       style={{ width: "80%", marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: "#E1EBEE" }} 
       placeholder="Title"
       value={title}
       onChangeText={(text)=>setTitle(text)}
       >

      </TextInput>

      <View style={{ marginVertical: 15 }}>

        <Text style={{ fontSize: 18, fontWeight: 500 }}>Color</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
          {colors.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedColor(item)}>
              {selectedColor === item ? (
                <AntDesign name="pluscircleo" size={24} color="black" />
              ) : (
                <Feather name="square" size={35} color={item} />
              )}

            </TouchableOpacity>
          ))}
        </View>
      </View>


      <Text style={{ fontSize: 20, fontWeight: 500 }}>Repeat</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
        <Pressable style={{ backgroundColor: "#AFDBF5", padding: 10, borderRadius: 5, flex: 1 }}>
          <Text style={{ textAlign: "center" }}> Daily</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: "#AFDBF5", padding: 10, borderRadius: 5, flex: 1 }}>
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>


      <Text style={{ fontSize: 20, fontWeight: 500 }}>On These Days</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
        {days.map((item, index) => (
          <Pressable key={index} style={{ width: 40, height: 40, backgroundColor: "#e0e0e0", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ textAlign: "center" }}>{item}</Text>
          </Pressable>

        ))}
      </View>



      <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Reminder</Text>
        <Text style={{ fontSize: 20, fontWeight: 500, color: "#2774ae" }}>Yes</Text>
      </View>


      <Pressable style={{ marginTop: 25, backgroundColor: "#00428c", padding: 10, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>SAVE</Text>
      </Pressable>
    </View>
  );
};



export default create;

const styles = StyleSheet.create({});