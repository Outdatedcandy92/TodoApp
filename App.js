import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Keyboard,KeyboardAvoidingView, StyleSheet, Text, TextInput, View ,Platform, TouchableOpacity} from 'react-native';
import Task from './components/task';


export default function App() {

  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([
    { text: "Task 1", isCompleted: false },
    { text: "Task 2", isCompleted: false },
    // Add more tasks as needed
  ]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTaskItems(JSON.parse(storedTasks));
    } catch (error) {
      console.error('Failed to load tasks.', error);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (tasks) => {
    try {
      const stringifyTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', stringifyTasks);
    } catch (error) {
      console.error('Failed to save tasks.', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handelAddTask = () => {
    Keyboard.dismiss();
    const newTask = { text: task, isCompleted: false }; // Create a task object
    setTaskItems([...taskItems, newTask]);
    setTask(null);
  };
  
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].isCompleted = !itemsCopy[index].isCompleted;
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item.text} isCompleted={item.isCompleted} />
                </TouchableOpacity>
              );
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
