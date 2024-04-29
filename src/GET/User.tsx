import React, { useState, useEffect } from "react";
import { User } from '../models/user';
import axios from "axios";
import { View, Text, TouchableOpacity, RefreshControl, FlatList, StyleSheet, SafeAreaView, ScrollView, Button } from "react-native";
import CreatePost from "../POST/Post";


interface GetUsersProps {
    usersUpdated: boolean;
    updatePostList: () => void;
}

const GetUsers: React.FC<GetUsersProps> = ({ usersUpdated, updatePostList}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [showCreatePost, setShowCreatePost] = useState(false); // Estado para controlar si se muestra la pantalla CreatePost
    const [refreshing, setRefreshing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);



    const fetchData = () => {
        //axios.get('http://10.0.2.2:3000/user')//para android
        axios.get('http://localhost:3000/user')//para web
            .then((result) => {
                console.clear();
                console.log(result.data);
                setUsers(result.data);
                setRefreshing(false);
            })
            .catch((err) => console.log(err));
        setRefreshing(false);
    };


    useEffect(() => {

        fetchData();

    }, [usersUpdated])

    const handleRefresh = () => {
        setRefreshing(true); // Se establece refreshing en true al iniciar la actualización
        fetchData(); // Llama a la función fetchData para obtener los datos actualizados
    };

    const handleEmpty = () => {
        console.log("los usuarios son:", users);
        return <Text> No Users!</Text>;
    };

    const handleCreatePost = (userId: string) => {
        setSelectedUserId(userId);
        setShowCreatePost(true);
    };

    const handlePostCreated = () => {
        setShowCreatePost(false); // Cerrar el componente CreatePost
        fetchData(); // Actualizar la lista de usuarios
        updatePostList();
    };

    const handleToggleCreatePost = (userId: string) => {
        // Toggle para abrir o cerrar el componente CreatePost
        if (showCreatePost && selectedUserId === userId) {
            setShowCreatePost(false);
            setSelectedUserId(null);
        } else {
            setShowCreatePost(true);
            setSelectedUserId(userId);
        }
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
                        data={users}
                        renderItem={({ item, index }) => (
                            <View style={styles.userContainer}>
                                <Text>Name: {item.name.first_name} {item.name.middle_name} {item.name.last_name}</Text>
                                <Text>Email: {item.email}</Text>
                                <Text>Phone Number: {item.phone_number}</Text>
                                <Text>Gender: {item.gender}</Text>
                                <Text>Posts: </Text>
                                {item.posts?.map((post, index) => (
                                    <View key={index} style={styles.postContainer}>
                                        <Text> - {post.title}</Text>
                                    </View>
                                ))}
                                <Button title={showCreatePost && selectedUserId === item._id ? "Close" : "Create Post"} onPress={() => handleToggleCreatePost(item._id || '')} />
                                {showCreatePost && selectedUserId == item._id && (
                                    <View>
                                        <CreatePost
                                            author={selectedUserId}
                                            onPostCreated={handlePostCreated} // Pasar la función para cerrar el componente y actualizar la lista de usuarios
                                        />
                                    </View>
                                )}
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

export default GetUsers;


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