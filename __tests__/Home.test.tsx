import 'react-native';
import {Alert} from 'react-native';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import Home from '../src/Screens/Home';

jest.mock('react-native/Libraries/Network/fetch', () => jest.fn());

afterEach(() => {
  // Additional cleanup or reset code if needed
  jest.clearAllMocks(); // Reset all mocks
});
jest.useFakeTimers();

describe('Home screeen', () => {
  it('updates state when typing in TextInput', () => {
    const {getByPlaceholderText} = render(<Home />);
    const input = getByPlaceholderText('Enter Country Name');

    fireEvent.changeText(input, 'India');

    expect(input.props.value).toBe('India');

    // Simulate typing 'Test' into the TextInput
    fireEvent.changeText(input, 'Test');

    // Ensure that the state has been updated correctly
    expect(input.props.value).toBe('Test');

    // Simulate typing spaces into the TextInput
    fireEvent.changeText(input, '   ');

    // Ensure that the state has not been updated because of the condition
    expect(input.props.value).toBe('Test');

    // Simulate clearing the TextInput
    fireEvent.changeText(input, '');

    // Ensure that the state has been updated correctly when the TextInput is cleared
    expect(input.props.value).toBe('');
  });

  test('fetchData function navigates to Country screen on successful API response', async () => {
    const mockData = [{name: {common: 'TestCountry'}}];

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData), // this is the response that contains all the astroid information
      }),
    );

    const mockNavigation = {
      navigate: jest.fn(),
    };

    const {getByTestId} = render(<Home navigation={mockNavigation} />);

    const inputElement = getByTestId('countryInput');
    fireEvent.changeText(inputElement, 'TestCountry');

    const buttonElement = getByTestId('nextButton');
    fireEvent.press(buttonElement);

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Expect navigation to be called with the correct parameters
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Country', {
      data: mockData[0],
    });
  });

  test('fetchData function shows alert on unsuccessful API response', async () => {
    const mockErrorResponse = {
      status: 404,
      message: 'Country not found',
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockErrorResponse), // this is the response that contains all the astroid information
      }),
    );

    const mockNavigation = {
      navigate: jest.fn(),
    };

    const mockAlert = jest.spyOn(Alert, 'alert');

    const {getByTestId} = render(<Home navigation={mockNavigation} />);

    const inputElement = getByTestId('countryInput');
    fireEvent.changeText(inputElement, 'NonExistentCountry');

    const buttonElement = getByTestId('nextButton');
    fireEvent.press(buttonElement);

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Expect Alert to be called with the correct parameters
    expect(mockAlert).toHaveBeenCalledWith('Alert', mockErrorResponse.message);
  });

  test('fetchData function logs error on API call failure', async () => {
    const mockError = new Error('API call failed');

    global.fetch = jest.fn(() => Promise.reject(mockError));

    const mockConsoleLog = jest.spyOn(console, 'log');

    const {getByTestId} = render(<Home navigation={{navigate: jest.fn()}} />);

    const inputElement = getByTestId('countryInput');
    fireEvent.changeText(inputElement, 'TestCountry');

    const buttonElement = getByTestId('nextButton');
    fireEvent.press(buttonElement);

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Expect console.log to be called with the error
    expect(mockConsoleLog).toHaveBeenCalledWith(mockError);
  });
});
