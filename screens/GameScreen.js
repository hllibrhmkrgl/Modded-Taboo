import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { GlobalStyles, GameStyles } from '../styles/GlobalStyles';

const GameScreen = ({ 
  currentTeam, 
  timeLeft, 
  passCount, 
  currentWord, 
  gameStats, 
  isGameActive, 
  onAnswer,
  formatTime 
}) => {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      {/* Header with team and timer */}
      <View style={GameStyles.gameHeader}>
        <Text style={GameStyles.currentTeam}>{currentTeam} TAKIMI</Text>
        <Text style={GameStyles.timer}>{formatTime(timeLeft)}</Text>
        <Text style={GameStyles.passInfo}>Pas Hakkı: {passCount}</Text>
      </View>

      {/* Word card */}
      {currentWord && (
        <View style={GameStyles.wordCard}>
          <Text style={GameStyles.mainWord}>{currentWord.word}</Text>
          
          <View style={GameStyles.forbiddenWordsContainer}>
            {currentWord.forbidden_words.map((word, index) => (
              <Text key={index} style={GameStyles.forbiddenWord}>{word.toUpperCase()}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Action buttons */}
      <View style={GameStyles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[GameStyles.actionButton, GameStyles.correctButton]} 
          onPress={() => onAnswer('correct')}
          disabled={!isGameActive}
        >
          <Text style={GameStyles.actionButtonText}>DOĞRU</Text>
          <Text style={GameStyles.buttonSubText}>+1 Puan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[GameStyles.actionButton, GameStyles.wrongButton]} 
          onPress={() => onAnswer('wrong')}
          disabled={!isGameActive}
        >
          <Text style={GameStyles.actionButtonText}>YANLIŞ</Text>
          <Text style={GameStyles.buttonSubText}>Puan Yok</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[GameStyles.actionButton, GameStyles.tabooButton]} 
          onPress={() => onAnswer('taboo')}
          disabled={!isGameActive}
        >
          <Text style={GameStyles.actionButtonText}>TABU</Text>
          <Text style={GameStyles.buttonSubText}>-1 Puan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            GameStyles.actionButton, 
            GameStyles.passButton, 
            passCount <= 0 && GameStyles.disabledButton
          ]} 
          onPress={() => onAnswer('pass')}
          disabled={!isGameActive || passCount <= 0}
        >
          <Text style={GameStyles.actionButtonText}>PAS</Text>
          <Text style={GameStyles.buttonSubText}>Geç</Text>
        </TouchableOpacity>
      </View>

      {/* Current scores */}
      <View style={GameStyles.currentScores}>
        <Text style={GameStyles.scoresTitle}>Anlık Skor:</Text>
        <Text style={GameStyles.scoreText}>
          Doğru: {gameStats?.correct || 0} | 
          Yanlış: {gameStats?.wrong || 0} | 
          Tabu: {gameStats?.taboo || 0}
        </Text>
        <Text style={GameStyles.scoreSubText}>
          💡 Tabu yaparsanız doğru sayınızdan 1 düşer!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GameScreen; 