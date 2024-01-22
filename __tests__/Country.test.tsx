// Country.test.tsx
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import {Alert} from 'react-native';
import Country from '../src/Screens/Country';

const mockDataToPass = {
  name: {
    common: 'India',
    official: 'Republic of India',
    nativeName: {
      eng: {
        official: 'Republic of India',
        common: 'India',
      },
      hin: {
        official: 'भारत गणराज्य',
        common: 'भारत',
      },
      tam: {
        official: 'இந்தியக் குடியரசு',
        common: 'இந்தியா',
      },
    },
  },
  tld: ['.in'],
  cca2: 'IN',
  ccn3: '356',
  cca3: 'IND',
  cioc: 'IND',
  independent: true,
  status: 'officially-assigned',
  unMember: true,
  currencies: {
    INR: {
      name: 'Indian rupee',
      symbol: '₹',
    },
  },
  idd: {
    root: '+9',
    suffixes: ['1'],
  },
  capital: ['New Delhi'],
  altSpellings: [
    'IN',
    'Bhārat',
    'Republic of India',
    'Bharat Ganrajya',
    'இந்தியா',
  ],
  region: 'Asia',
  subregion: 'Southern Asia',
  languages: {
    eng: 'English',
    hin: 'Hindi',
    tam: 'Tamil',
  },
  translations: {
    ara: {
      official: 'جمهورية الهند',
      common: 'الهند',
    },
    bre: {
      official: 'Republik India',
      common: 'India',
    },
    ces: {
      official: 'Indická republika',
      common: 'Indie',
    },
    cym: {
      official: 'Republic of India',
      common: 'India',
    },
    deu: {
      official: 'Republik Indien',
      common: 'Indien',
    },
    est: {
      official: 'India Vabariik',
      common: 'India',
    },
    fin: {
      official: 'Intian tasavalta',
      common: 'Intia',
    },
    fra: {
      official: "République de l'Inde",
      common: 'Inde',
    },
    hrv: {
      official: 'Republika Indija',
      common: 'Indija',
    },
    hun: {
      official: 'Indiai Köztársaság',
      common: 'India',
    },
    ita: {
      official: "Repubblica dell'India",
      common: 'India',
    },
    jpn: {
      official: 'インド共和国',
      common: 'インド',
    },
    kor: {
      official: '인도 공화국',
      common: '인도',
    },
    nld: {
      official: 'Republiek India',
      common: 'India',
    },
    per: {
      official: 'جمهوری هندوستان',
      common: 'هند',
    },
    pol: {
      official: 'Republika Indii',
      common: 'Indie',
    },
    por: {
      official: 'República da Índia',
      common: 'Índia',
    },
    rus: {
      official: 'Республика Индия',
      common: 'Индия',
    },
    slk: {
      official: 'Indická republika',
      common: 'India',
    },
    spa: {
      official: 'República de la India',
      common: 'India',
    },
    srp: {
      official: 'Република Индија',
      common: 'Индија',
    },
    swe: {
      official: 'Republiken Indien',
      common: 'Indien',
    },
    tur: {
      official: 'Hindistan Cumhuriyeti',
      common: 'Hindistan',
    },
    urd: {
      official: 'جمہوریہ بھارت',
      common: 'بھارت',
    },
    zho: {
      official: '印度共和国',
      common: '印度',
    },
  },
  latlng: [20.0, 77.0],
  landlocked: false,
  borders: ['BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK'],
  area: 3287590.0,
  demonyms: {
    eng: {
      f: 'Indian',
      m: 'Indian',
    },
    fra: {
      f: 'Indienne',
      m: 'Indien',
    },
  },
  flag: '🇮🇳',
  maps: {
    googleMaps: 'https://goo.gl/maps/WSk3fLwG4vtPQetp7',
    openStreetMaps: 'https://www.openstreetmap.org/relation/304716',
  },
  population: 1380004385,
  gini: {
    '2011': 35.7,
  },
  fifa: 'IND',
  car: {
    signs: ['IND'],
    side: 'left',
  },
  timezones: ['UTC+05:30'],
  continents: ['Asia'],
  flags: {
    png: 'https://flagcdn.com/w320/in.png',
    svg: 'https://flagcdn.com/in.svg',
    alt: 'The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band.',
  },
  coatOfArms: {
    png: 'https://mainfacts.com/media/images/coats_of_arms/in.png',
    svg: 'https://mainfacts.com/media/images/coats_of_arms/in.svg',
  },
  startOfWeek: 'monday',
  capitalInfo: {
    latlng: [28.6, 77.2],
  },
  postalCode: {
    format: '######',
    regex: '^(\\d{6})$',
  },
};

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('Country Component', () => {
  it('fetches weather data on button press', async () => {
    const mockWeatherData = {
      main: {temp: 300, humidity: 50},
      wind: {speed: 5},
    };

    // Mock the fetch response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData), // this is the response that contains all the astroid information
      }),
    );

    const {getByTestId} = render(
      <Country route={{params: {dataToPass: mockDataToPass}}} />,
    );

    const fetchWeatherButton = getByTestId('fetchWetherbutton');
    fireEvent.press(fetchWeatherButton);

    // Wait for the fetch to occur
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
  it('displays an error on fetch error', async () => {
    // Mock the fetch error
    const mockError = new Error('API call failed');
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockError), // this is the response that contains all the astroid information
      }),
    );
    // const mockConsoleLog = jest.spyOn(console, 'log');
    const mockAlert = jest.spyOn(Alert, 'alert');

    const {getByTestId} = render(
      <Country route={{params: {dataToPass: mockDataToPass}}} />,
    );

    const fetchWeatherButton = getByTestId('fetchWetherbutton');
    fireEvent.press(fetchWeatherButton);

    // Wait for the alert to appear
    await waitFor(() => {
      // expect(mockConsoleLog).toHaveBeenCalledWith(mockError);
      expect(mockAlert).toHaveBeenCalledWith('Error', 'Something Went Wrong');
    });
  });
});
