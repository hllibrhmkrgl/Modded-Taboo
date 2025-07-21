import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const TeamNamesScreen = ({ teamNames, onTeamNameChange, onStartGame, onBack }) => {
  const handleStartGame = () => {
    // Check if all team names are filled
    const emptyNames = teamNames.filter(name => name.trim() === '');
    if (emptyNames.length > 0) {
      Alert.alert('Uyarı', 'Lütfen tüm takım adlarını giriniz!');
      return;
    }
    
    // Check for duplicate names
    const uniqueNames = new Set(teamNames.map(name => name.trim().toLowerCase()));
    if (uniqueNames.size !== teamNames.length) {
      Alert.alert('Uyarı', 'Takım adları farklı olmalıdır!');
      return;
    }

    onStartGame();
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Takım Adları</Text>
      
      <ScrollView style={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {teamNames.map((name, index) => (
          <View key={index} style={GlobalStyles.inputContainer}>
            <Text style={GlobalStyles.inputLabel}>{index + 1}. Takım:</Text>
            <TextInput
              style={GlobalStyles.textInput}
              value={name}
              onChangeText={(text) => onTeamNameChange(index, text)}
              placeholder={`Takım ${index + 1} adını giriniz`}
              placeholderTextColor="#rgba(255,255,255,0.6)"
              maxLength={20}
            />
          </View>
        ))}
      </ScrollView>
      
      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity style={GlobalStyles.startButton} onPress={handleStartGame}>
          <Text style={GlobalStyles.startButtonText}>Oyunu Başlat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={GlobalStyles.backButton} onPress={onBack}>
          <Text style={GlobalStyles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TeamNamesScreen; 