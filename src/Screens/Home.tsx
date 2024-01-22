import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

function Home({navigation, route}: any) {
  const API = process.env.API;
  const [countryName, setCountryName] = useState<string>('');
  //   const [weatherData, setWeatherData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(API + countryName + '?fullText=true');
      const data = await response.json();
      console.log(data);
      if (data?.status != 404) {
        navigation.navigate('Country', {
          data: data[0],
        });
      } else {
        Alert.alert('Alert', data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Country Pedia 🌍</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Country Name"
        value={countryName}
        onChangeText={text => setCountryName(text)}
        testID="countryInput"
      />
      <TouchableOpacity
        style={countryName == '' ? styles.disabledButton : styles.activeButton}
        onPress={fetchData}
        testID="nextButton"
        disabled={countryName == ''}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: mobileW * 0.1,
  },
  Heading: {
    fontSize: mobileW * 0.08,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: mobileW * 0.05,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: mobileW * 0.25,
    alignSelf: 'center',
    marginHorizontal: mobileW * 0.05,
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: mobileW * 0.25,
    alignSelf: 'center',
    marginHorizontal: mobileW * 0.05,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
