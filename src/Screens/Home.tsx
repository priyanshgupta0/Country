import React from 'react';
import {View, Text} from 'react-native';

const Home: React.FC = () => {
  const API = process.env.API;

  return (
    <View>
      <Text>Home</Text>
      <Text>{API}</Text>
    </View>
  );
};

export default Home;
