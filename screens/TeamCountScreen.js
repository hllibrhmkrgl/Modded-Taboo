import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GlobalStyles, TeamCountStyles } from '../styles/GlobalStyles';

const TeamCountScreen = ({ teamCount, setTeamCount, onContinue, onBack }) => {
  const handleContinue = () => {
    if (teamCount < 2) {
      Alert.alert('Uyarı', 'En az 2 takım olmalıdır!');
      return;
    }
    if (teamCount > 10) {
      Alert.alert('Uyarı', 'En fazla 10 takım olabilir!');
      return;
    }
    onContinue();
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Kaç Takım?</Text>
      
      <View style={TeamCountStyles.teamCountContainer}>
        <TouchableOpacity 
          style={TeamCountStyles.countButton} 
          onPress={() => setTeamCount(Math.max(2, teamCount - 1))}
        >
          <Text style={TeamCountStyles.countButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={TeamCountStyles.countText}>{teamCount}</Text>
        
        <TouchableOpacity 
          style={TeamCountStyles.countButton} 
          onPress={() => setTeamCount(Math.min(10, teamCount + 1))}
        >
          <Text style={TeamCountStyles.countButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={GlobalStyles.subtitle}>({teamCount} takım seçildi)</Text>
      
      <TouchableOpacity style={GlobalStyles.continueButton} onPress={handleContinue}>
        <Text style={GlobalStyles.continueButtonText}>Devam Et</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={GlobalStyles.backButton} onPress={onBack}>
        <Text style={GlobalStyles.backButtonText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamCountScreen; 