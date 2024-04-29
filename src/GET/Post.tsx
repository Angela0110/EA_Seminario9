import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, RefreshControl, FlatList, StyleSheet, SafeAreaView, ScrollView, Button } from "react-native";
import { Post } from "../models/post";
import CreatePost from "../POST/Post";


interface GetPostsProps {
    postsUpdated: boolean;
}

const GetPosts: React.FC<GetPostsProps> = ({ postsUpdated }) => {
    const [posts, setPost] = useState<Post[]>([]);

    const [refreshing, setRefreshing] = useState(false);

    const fetchData = () => {
        //axios.get('http://10.0.2.2:3000/user')//para android
        axios.get('http://localhost:3000/post')//para web
            .then((result) => {
                console.clear();
                console.log(result.data);
                setPost(result.data);
                setRefreshing(false);
            })
            .catch((err) => console.log(err));
        setRefreshing(false);
    };


    useEffect(() => {

        fetchData();

    }, [postsUpdated])

    const handleRefresh = () => {
        setRefreshing(true); // Se establece refreshing en true al iniciar la actualización
        fetchData(); // Llama a la función fetchData para obtener los datos actualizados
    };

    const handleEmpty = () => {
        return <Text> No Posts!</Text>;
    };


    const handlePostCreated = () => {
        fetchData(); 
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }>
                <View style={styles.container}>
                    <FlatList
                        data={posts}
                        renderItem={({ item, index }) => (
                            <View style={styles.userContainer}>
                                <Text>Title: {item.title}</Text>
                                <Text>Content: {item.content}</Text>
                                <Text>Author: {item.author.name.first_name} {item.author.name.middle_name} {item.author.name.last_name}</Text>                       
                            </View>
                        )}
                        ListEmptyComponent={handleEmpty}
                        showsVerticalScrollIndicator
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GetPosts;


const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    userContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    postContainer: {
        marginLeft: 10,
        paddingLeft: 7,
        marginBottom: 5,
    }
});