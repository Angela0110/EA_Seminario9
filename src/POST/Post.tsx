import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Post } from '../models/post';

interface CreatePostProps {
    author: string; 
    onPostCreated: () => void; // Declarar la propiedad onPostCreated en CreatePostProps
 }
 
 function CreatePost({author, onPostCreated }: CreatePostProps) {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [error, setError] = React.useState('');

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    setError('');
    return true;
  }

  const Submit = () => {
    if (!validateForm()) return;
    
    const post = {
      title: title,
      content: content,
      author: author
    };

    axios.post("http://localhost:3000/post", post)//para web
    //axios.post('http://10.60.144.140:3000/user', user)//para android
      .then(response => {
        Alert.alert("Success", "Post added successfully");
        onPostCreated();
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error("Failed to add user", error);
        Alert.alert("Error", "Failed to add post");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Title"
        value={title} 
        onChangeText={setTitle} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Content"
        value={content} 
        onChangeText={setContent} 
        style={styles.input} 
      />
    
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title="Añadir post" onPress={Submit} color="#007bff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default CreatePost;


