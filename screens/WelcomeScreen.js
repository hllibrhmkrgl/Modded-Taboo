import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const WelcomeScreen = ({ onPlayPress }) => {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>TABOO</Text>
      <Text style={GlobalStyles.subtitle}>Kelime Tahmin Oyunu</Text>
      
      <TouchableOpacity style={GlobalStyles.playButton} onPress={onPlayPress}>
        <Text style={GlobalStyles.playButtonText}>OYNA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen; 