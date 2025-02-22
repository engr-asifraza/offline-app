import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { createTable, insertUser,fetchUsers } from './android/app/src/database/Database';
import UsersList from './android/app/src/components/UsersList';

const App = () => {
  useEffect(() => {
    createTable(); // Create the table when the app starts
  }, []);

  const handleInsertUser = () => {
    insertUser('Aisf Raza', 'engr.asifrazapanhwar@gmail.com');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* <Text>SQLite Example</Text> */}
      <Button title="Insert User" onPress={handleInsertUser} />

      <UsersList />
    </View>
  );
};

export default App;
