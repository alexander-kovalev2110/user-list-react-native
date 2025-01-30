import React, { useEffect, useState } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('Details', { userId: item.id })}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text></Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserList;
