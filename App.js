import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard,KeyboardAvoidingView, StyleSheet, Text, TextInput, View ,Platform, TouchableOpacity} from 'react-native';
import Task from './components/task';


export default function App() {

  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  const handelAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }
  
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity 
                key={index} 
                onPress={() => completeTask(index)}>

                <Task key={index} text={item}/>
                </TouchableOpacity>
              )


         
              
            })
          }
        </View>

      </View>


      {/* Write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
      <TextInput style={styles.input} placeholder={'Write a task'} placeholderTextColor= '#fff' value = {task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={()=>handelAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#333333',
    borderRadius: 60,
    borderColor: '#FFA500',
    borderWidth: 1,
    color: 'white',

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#333333',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFA500',
    borderWidth: 1,
  },
  addText: {
    color: 'white',
  },

});
