import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {CountryInfo} from '../App';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

interface WeatherInfo {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function Country({navigation, route}: any) {
  const dataToPass = route.params.data;
  console.log(dataToPass);
  const API_key = process.env.Wether_API_key;
  const [apiData, setApiData] = useState<WeatherInfo | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${dataToPass?.capitalInfo.latlng[0]}&lon=${dataToPass?.capitalInfo.latlng[1]}&appid=${API_key}`,
      );
      const data = await response.json();
      console.log(data);
      setApiData(data);
    } catch (error) {
      Alert.alert('Error', 'Something Went Wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>{dataToPass?.name.common}</Text>
      <Image
        source={{uri: dataToPass?.flags.png}} // Replace with the actual URL
        style={styles.flagstyle}
        alt={dataToPass?.flags.alt}
      />
      <Text style={styles.text}>Population : {dataToPass?.population}</Text>
      <Text style={styles.text}>Latitude : {dataToPass?.latlng[0]}</Text>
      <Text style={styles.text}>Longitude : {dataToPass?.latlng[1]}</Text>
      {/* <Text style={styles.text}>{dataToPass?.capitalInfo.latlng[0]}</Text>
      <Text style={styles.text}>{dataToPass?.capitalInfo.latlng[1]}</Text> */}
      {/* <Text style={styles.text}>{API_key}</Text> */}
      <TouchableOpacity
        style={styles.activeButton}
        onPress={fetchWeather}
        testID="fetchWetherbutton">
        <Text style={styles.buttonText}>Weather</Text>
      </TouchableOpacity>
      {apiData ? (
        <View>
          <Text style={styles.text}>
            Temperature : {(apiData?.main.temp - 273.15).toFixed(2)}°C
          </Text>
          <Text style={styles.text}>Wind Speed : {apiData?.wind.speed}m/s</Text>
        </View>
      ) : null}
    </View>
  );
}

export default Country;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  flagstyle: {
    width: mobileW * 0.8,
    height: mobileW * 0.4,
    resizeMode: 'contain',
    margin: mobileW * 0.02,
    alignSelf: 'center',
  },
  Heading: {
    fontSize: mobileW * 0.08,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: mobileW * 0.04,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: mobileW * 0.25,
    alignSelf: 'center',
    marginHorizontal: mobileW * 0.05,
    margin: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
