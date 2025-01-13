

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';


interface Vendor {
  name: string;
  location: string;
  services: string[];
}

const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');
  const [results, setResults] = useState<Vendor[]>([]);

  const searchVendors = async () => {
    try {
  
      
      const response = await axios.get('http://192.168.255.100:5000/api/vendors', {
        params: { location, service },
      });
     
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Service"
        value={service}
        onChangeText={setService}
      />

      <Button title="Search" onPress={searchVendors} />
     {results.length>0?<FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>Name: {item.name}</Text>
            <Text style={styles.resultText}>Location: {item.location}</Text>
            <Text style={styles.resultText}>Services: {item.services.join(', ')}</Text>
          </View>
        )}
      />:"no data found"}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  resultItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
  },
});

export default App;
