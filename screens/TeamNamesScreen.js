import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { GlobalStyles, TeamNamesStyles } from '../styles/GlobalStyles';

const TeamNamesScreen = ({ teamNames, onTeamNameChange, onStartGame, onBack }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleStartGame = () => {
    // Boş isimleri otomatik "Takım X" yap
    const finalTeamNames = teamNames.map((name, index) => {
      const trimmedName = name.trim();
      return trimmedName === '' ? `Takım ${index + 1}` : trimmedName;
    });

    // Duplicate name kontrolü
    const uniqueNames = new Set(finalTeamNames.map(name => name.toLowerCase()));
    if (uniqueNames.size !== finalTeamNames.length) {
      Alert.alert('Uyarı', 'Takım adları farklı olmalıdır!');
      return;
    }

    // Final isimleri güncelle ve oyunu başlat
    finalTeamNames.forEach((name, index) => {
      if (teamNames[index].trim() === '') {
        onTeamNameChange(index, name);
      }
    });

    onStartGame();
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={TeamNamesStyles.header}>
        <Text style={GlobalStyles.title}>Takım Adları</Text>
        <Text style={TeamNamesStyles.subtitle}>
          Boş bırakılan isimler otomatik olarak "Takım X" olacak
        </Text>
      </View>
      
      <ScrollView style={TeamNamesStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {teamNames.map((name, index) => (
          <View key={index} style={TeamNamesStyles.teamCard}>
            <View style={TeamNamesStyles.teamHeader}>
              <Text style={TeamNamesStyles.teamNumber}>{index + 1}</Text>
              <Text style={TeamNamesStyles.teamLabel}>. TAKIM</Text>
            </View>
            <TextInput
              style={[
                TeamNamesStyles.teamInput,
                focusedInput === index && TeamNamesStyles.teamInputFocused
              ]}
              value={name}
              onChangeText={(text) => onTeamNameChange(index, text)}
              onFocus={() => setFocusedInput(index)}
              onBlur={() => setFocusedInput(null)}
              placeholder={`Takım ${index + 1}`}
              placeholderTextColor="rgba(0,0,0,0.4)"
              maxLength={20}
              returnKeyType="next"
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