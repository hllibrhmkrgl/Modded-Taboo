import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { GlobalStyles, GameModeStyles } from '../styles/GlobalStyles';

const GameModeScreen = ({ onModeSelect, onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(50)).current;
  const slideAnim2 = useRef(new Animated.Value(50)).current;
  const slideAnim3 = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Sıralı animasyon başlat
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.stagger(200, [
        Animated.timing(slideAnim1, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim2, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim3, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleModeSelect = (mode) => {
    onModeSelect(mode);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Animated.View style={[GameModeStyles.header, { opacity: fadeAnim }]}>
        <Text style={GameModeStyles.headerTitle}>Oyun Modu Seç</Text>
      </Animated.View>

      <View style={GameModeStyles.modesContainer}>
        {/* Klasik Mod */}
        <Animated.View style={[
          GameModeStyles.modeCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim1 }],
          }
        ]}>
          <TouchableOpacity 
            style={[GameModeStyles.modeButton, GameModeStyles.classicMode]}
            onPress={() => handleModeSelect('classic')}
            activeOpacity={0.8}
          >
            <Text style={GameModeStyles.modeIcon}>🎯</Text>
            <Text style={GameModeStyles.modeTitle}>KLASİK</Text>
            <Text style={GameModeStyles.modeDescription}>
              Standart taboo oyunu
            </Text>
            <View style={GameModeStyles.modeFeatures}>
              <Text style={GameModeStyles.featureText}>⏱️ 90 saniye</Text>
              <Text style={GameModeStyles.featureText}>⏭️ 3 pas hakkı</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Kategorili Mod */}
        <Animated.View style={[
          GameModeStyles.modeCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim2 }],
          }
        ]}>
          <TouchableOpacity 
            style={[GameModeStyles.modeButton, GameModeStyles.categoryMode]}
            onPress={() => {}} // Disabled
            activeOpacity={0.8}
            disabled={true}
          >
            <Text style={GameModeStyles.modeIcon}>📚</Text>
            <Text style={GameModeStyles.modeTitle}>KATEGORİLİ</Text>
            <Text style={GameModeStyles.modeDescription}>
              Kategorili kelimeler
            </Text>
            <View style={GameModeStyles.modeFeatures}>
              <Text style={GameModeStyles.featureText}>🎲 Kategoriler</Text>
              <Text style={GameModeStyles.featureText}>🎉 Çeşitlilik</Text>
            </View>
            <View style={GameModeStyles.comingSoon}>
              <Text style={GameModeStyles.comingSoonText}>Yakında!</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Rush Mod */}
        <Animated.View style={[
          GameModeStyles.modeCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim3 }],
          }
        ]}>
          <TouchableOpacity 
            style={[GameModeStyles.modeButton, GameModeStyles.rushMode]}
            onPress={() => handleModeSelect('rush')}
            activeOpacity={0.8}
          >
            <Text style={GameModeStyles.modeIcon}>⚡</Text>
            <Text style={GameModeStyles.modeTitle}>RUSH</Text>
            <Text style={GameModeStyles.modeDescription}>
              Hızlı tempo oyunu
            </Text>
            <View style={GameModeStyles.modeFeatures}>
              <Text style={GameModeStyles.featureText}>🚀 Otomatik</Text>
              <Text style={GameModeStyles.featureText}>⚡ 10 saniye</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View style={[GameModeStyles.backContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={GameModeStyles.backButton} onPress={onBack}>
          <Text style={GameModeStyles.backButtonText}>← Geri Dön</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default GameModeScreen; 