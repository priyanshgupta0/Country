import React, {Component} from 'react';
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

class Home extends Component<any> {
  state = {
    countryName: '',
  };
  API = process.env.API;
  //   const [weatherData, setWeatherData] = useState({});

  fetchData = async () => {
    try {
      const response = await fetch(
        this.API + this.state.countryName + '?fullText=true',
      );
      const data = await response.json();
      console.log(data);
      if (data?.status != 404) {
        this.props.navigation.navigate('Country', {
          data: data[0],
        });
      } else {
        Alert.alert('Alert', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Heading}>Country Pedia 🌍</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Country Name"
          value={this.state.countryName}
          onChangeText={text => {
            if (text.trim() !== '' || text == '') {
              this.setState({countryName: text});
            }
          }}
          testID="countryInput"
        />
        <TouchableOpacity
          style={
            this.state.countryName == ''
              ? styles.disabledButton
              : styles.activeButton
          }
          onPress={this.fetchData}
          testID="nextButton"
          disabled={this.state.countryName == ''}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
