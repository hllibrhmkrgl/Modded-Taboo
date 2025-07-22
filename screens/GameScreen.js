import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, Animated } from 'react-native';
import { GlobalStyles, GameStyles, PauseMenuStyles } from '../styles/GlobalStyles';

const GameScreen = ({ 
  currentTeam, 
  timeLeft, 
  passCount, 
  currentWord, 
  gameStats, 
  isGameActive, 
  isPaused,
  gameMode,
  selectedCategory,
  rushTimer,
  onAnswer,
  formatTime,
  onPause,
  onResume,
  onBackToMenu
}) => {
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;
  const timerPulse = useRef(new Animated.Value(1)).current;

  // Timer pulse animation when low
  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0 && isGameActive) {
      const startPulse = () => {
        Animated.sequence([
          Animated.timing(timerPulse, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(timerPulse, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (timeLeft <= 10 && timeLeft > 0) startPulse();
        });
      };
      startPulse();
    } else {
      timerPulse.setValue(1);
    }
  }, [timeLeft, isGameActive]);

  const showFeedback = (action) => {
    setLastAction(action);
    
    // Reset and start feedback animation
    feedbackAnim.setValue(0);
    Animated.sequence([
      Animated.timing(feedbackAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(feedbackAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setLastAction(null));
  };

  const handleAnswerWithAnimation = (type) => {
    if (!isGameActive || isPaused) return;
    
    // Show feedback
    showFeedback(type);
    
    // Card animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    
    // Call original handler
    onAnswer(type);
  };

  const handlePausePress = () => {
    onPause();
    setShowPauseMenu(true);
  };

  const handleResumePress = () => {
    setShowPauseMenu(false);
    onResume();
  };

  const handleQuitPress = () => {
    setShowPauseMenu(false);
    onBackToMenu();
  };

  const getFeedbackStyle = () => {
    const colors = {
      correct: '#4ECDC4',
      taboo: '#A855F7',
      pass: '#45B7D1',
    };
    
    const icons = {
      correct: '✅',
      taboo: '🚫',
      pass: '⏭️',
    };

    return {
      color: colors[lastAction] || '#FFFFFF',
      icon: icons[lastAction] || '',
    };
  };
  return (
    <SafeAreaView style={GlobalStyles.container}>
      {/* Pause Button */}
      <TouchableOpacity 
        style={PauseMenuStyles.pauseButton} 
        onPress={handlePausePress}
        disabled={!isGameActive}
      >
        <Text style={PauseMenuStyles.pauseButtonText}>⏸</Text>
      </TouchableOpacity>

      {/* Header with team and timer */}
      <View style={GameStyles.gameHeader}>
        <Text style={GameStyles.currentTeam}>
          {currentTeam} TAKIMI {gameMode === 'rush' && '⚡'}
        </Text>
        <Animated.Text style={[
          GameStyles.timer, 
          isPaused && { color: '#FF6B6B' },
          timeLeft <= 10 && { color: '#FF6B6B' },
          { transform: [{ scale: timerPulse }] }
        ]}>
          {formatTime(timeLeft)} {isPaused && '(DURAKLATILDI)'}
        </Animated.Text>
        {gameMode === 'rush' && (
          <Text style={[
            GameStyles.rushTimer,
            rushTimer <= 3 && { color: '#FF6B6B' }
          ]}>
            🚀 Kelime değişir: {rushTimer}s
          </Text>
        )}
        <Text style={GameStyles.passInfo}>
         {gameMode === 'Klasik' ? '' : ` ${gameMode.toUpperCase()}`}
        </Text>
      </View>

      {/* Word card with animation */}
      {currentWord && (
        <Animated.View style={[
          GameStyles.wordCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}>
          {/* Kategori gösterimi - sadece kategorili modda */}
          {gameMode === 'category' && selectedCategory && (
            <View style={GameStyles.categoryContainer}>
              <Text style={GameStyles.categoryLabel}>KATEGORİ</Text>
              <Text style={GameStyles.categoryName}>{selectedCategory}</Text>
            </View>
          )}
          
          <Text style={GameStyles.mainWord}>{currentWord.word}</Text>
          
          <View style={GameStyles.forbiddenWordsContainer}>
            {currentWord.forbidden_words.map((word, index) => (
              <Text key={index} style={GameStyles.forbiddenWord}>{word.toUpperCase()}</Text>
            ))}
          </View>

          {/* Compact Skor Göstergesi - Word card'ın altında */}
          <View style={GameStyles.compactScores}>
            <View style={GameStyles.scoreItem}>
              <Text style={GameStyles.scoreIcon}>✅</Text>
              <Text style={GameStyles.scoreValue}>{gameStats?.correct || 0}</Text>
              <Text style={GameStyles.scoreLabel}>Doğru</Text>
            </View>
            <View style={GameStyles.scoreItem}>
              <Text style={GameStyles.scoreIcon}>⏭️</Text>
              <Text style={GameStyles.scoreValue}>{passCount}</Text>
              <Text style={GameStyles.scoreLabel}>Pas Hakkı</Text>
            </View>
            <View style={GameStyles.scoreItem}>
              <Text style={GameStyles.scoreIcon}>🚫</Text>
              <Text style={GameStyles.scoreValue}>{gameStats?.taboo || 0}</Text>
              <Text style={GameStyles.scoreLabel}>Tabu</Text>
            </View>
          </View>

          {/* Feedback Overlay */}
          {lastAction && (
            <Animated.View style={[
              GameStyles.feedbackOverlay,
              { 
                opacity: feedbackAnim,
                backgroundColor: getFeedbackStyle().color + '20',
              }
            ]}>
              <Animated.Text style={[
                GameStyles.feedbackText,
                { 
                  color: getFeedbackStyle().color,
                  transform: [{ 
                    scale: feedbackAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    })
                  }]
                }
              ]}>
                {getFeedbackStyle().icon}
              </Animated.Text>
            </Animated.View>
          )}
        </Animated.View>
      )}

      {/* Action buttons */}
      <View style={GameStyles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[GameStyles.actionButton, GameStyles.correctButton]} 
          onPress={() => handleAnswerWithAnimation('correct')}
          disabled={!isGameActive || isPaused}
          activeOpacity={0.7}
        >
          <Text style={GameStyles.actionButtonText}>✅ DOĞRU</Text>
          <Text style={GameStyles.buttonSubText}>+1 Puan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[GameStyles.actionButton, GameStyles.tabooButton]} 
          onPress={() => handleAnswerWithAnimation('taboo')}
          disabled={!isGameActive || isPaused}
          activeOpacity={0.7}
        >
          <Text style={GameStyles.actionButtonText}>🚫 TABU</Text>
          <Text style={GameStyles.buttonSubText}>-1 Puan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            GameStyles.actionButton, 
            GameStyles.passButton, 
            (passCount <= 0 || isPaused) && GameStyles.disabledButton
          ]} 
          onPress={() => handleAnswerWithAnimation('pass')}
          disabled={!isGameActive || isPaused || passCount <= 0}
          activeOpacity={0.7}
        >
          <Text style={GameStyles.actionButtonText}>⏭️ PAS</Text>
          <Text style={GameStyles.buttonSubText}>Geç</Text>
        </TouchableOpacity>
      </View>

      {/* Pause Menu Modal */}
      <Modal
        visible={showPauseMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPauseMenu(false)}
      >
        <View style={PauseMenuStyles.overlay}>
          <View style={PauseMenuStyles.menuContainer}>
            <Text style={PauseMenuStyles.menuTitle}>Oyun Duraklatıldı</Text>
            
            <TouchableOpacity 
              style={[PauseMenuStyles.menuButton, PauseMenuStyles.resumeButton]} 
              onPress={handleResumePress}
            >
              <Text style={PauseMenuStyles.menuButtonText}>Devam Et</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[PauseMenuStyles.menuButton, PauseMenuStyles.quitButton]} 
              onPress={handleQuitPress}
            >
              <Text style={PauseMenuStyles.menuButtonText}>Ana Menüye Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GameScreen; 