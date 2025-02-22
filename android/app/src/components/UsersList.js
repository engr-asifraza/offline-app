import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Button } from 'react-native';
import { fetchUsers } from '../database/Database'; // Make sure this is the correct path

const UsersList = () => {
  const [users, setUsers] = useState([]); // Users will be stored here

  const handleGetUsers = () => {
    getUsers();
  };

  const getUsers = async () => {
    try {
      const usersData = await new Promise((resolve) => {
        fetchUsers(resolve);
      });
      setUsers(usersData);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Fetch the users when the component is mounted
 

    getUsers(); // Call the function to fetch users
  }, []); // Empty dependency array means this runs only once after the component mounts

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={{ flex: 1, padding: 20 }}> */}
        {/* <Text>Refresh User Lsit</Text> */}
        <Button title="User List" onPress={handleGetUsers} />

      {/* </View> */}

      <Text>Users List:</Text>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No users found</Text>
      )}
      
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UsersList;
