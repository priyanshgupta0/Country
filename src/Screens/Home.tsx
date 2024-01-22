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
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  route: HomeScreenNavigationProp;
}

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const Home: React.ComponentType<Props> = ({route}) => {
  const API = process.env.API;
  const [countryName, setCountryName] = useState<string>('');
  const navigation = useNavigation();
  //   const [weatherData, setWeatherData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(API + countryName + '?fullText=true');
      const data = await response.json();
      console.log(data);
      if (data?.status != 404) {
        const navigationParams: RootStackParamList['Country'] = {
          dataToPass: data[0],
        };
        (navigation as unknown as HomeScreenNavigationProp).navigate(
          'Country',
          navigationParams,
        );
      } else {
        Alert.alert('Alert', data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>CountryPedia</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Country Name"
        value={countryName}
        onChangeText={text => setCountryName(text)}
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
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    height: mobileH,
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
    flex: 1,
  },
  box: {
    margin: 10,
    borderWidth: 2,
    padding: 4,
    borderRadius: 5,
    borderColor: 'black',
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
  randomButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: mobileW * 0.25,
    alignSelf: 'center',
    marginHorizontal: mobileW * 0.05,
  },
});
