import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const UserDetails = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const userId = navigation.getParam ? navigation.getParam('userId') : null;

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);
  
  if (!user) return <Text>Загрузка...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Address: {user.address.street}, {user.address.city}</Text>
      <MapView 
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: parseFloat(user.address.geo.lat),
          longitude: parseFloat(user.address.geo.lng),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(user.address.geo.lat),
            longitude: parseFloat(user.address.geo.lng),
          }}
          title={user.address.city}
          description={user.address.street}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    height: 400,
    width: '100%',
    marginTop: 20,
  },
});

export default UserDetails;
