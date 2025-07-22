import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated, ScrollView } from 'react-native';
import { GlobalStyles, GameModeStyles } from '../styles/GlobalStyles';

const CategorySelectionScreen = ({ onCategorySelect, onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnims = useRef([
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
  ]).current;

  const categories = [
    {
      id: 'daily_life',
      name: 'Günlük Yaşam ve Nesneler',
      icon: '🏠',
      color: '#4A90E2',
      description: 'Evdeki eşyalar ve günlük yaşam'
    },
    {
      id: 'nature',
      name: 'Doğa ve Dünya',
      icon: '🌍',
      color: '#27AE60',
      description: 'Coğrafya, bitki, hayvancılık'
    },
    {
      id: 'food',
      name: 'Yiyecek ve İçecekler',
      icon: '🍎',
      color: '#E67E22',
      description: 'Meyve, sebze, yemekler'
    },
    {
      id: 'entertainment',
      name: 'Eğlence ve Hobiler',
      icon: '🎮',
      color: '#9B59B6',
      description: 'Spor, oyun, sanat'
    },
    {
      id: 'society',
      name: 'İnsan ve Toplum',
      icon: '👥',
      color: '#E74C3C',
      description: 'Meslek, duygu, sosyal hayat'
    }
  ];

  useEffect(() => {
    // Animasyonları başlat
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.stagger(150, 
        slideAnims.map(anim => 
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          })
        )
      ),
    ]).start();
  }, []);

  const handleCategorySelect = (categoryName) => {
    onCategorySelect(categoryName);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Animated.View style={[GameModeStyles.header, { opacity: fadeAnim }]}>
        <Text style={GameModeStyles.headerTitle}>Kategori Seç</Text>
        <Text style={[GameModeStyles.modeDescription, { textAlign: 'center', marginTop: 10 }]}>
          Hangi kategoriden kelimeler çıksın?
        </Text>
      </Animated.View>

      <ScrollView 
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <Animated.View 
            key={category.id}
            style={[
              GameModeStyles.modeCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnims[index] }],
                marginVertical: 8,
              }
            ]}
          >
            <TouchableOpacity 
              style={[
                GameModeStyles.modeButton,
                { backgroundColor: category.color }
              ]}
              onPress={() => handleCategorySelect(category.name)}
              activeOpacity={0.8}
            >
              <Text style={[GameModeStyles.modeIcon, { fontSize: 40 }]}>
                {category.icon}
              </Text>
              <Text style={[GameModeStyles.modeTitle, { fontSize: 18 }]}>
                {category.name}
              </Text>
              <Text style={[GameModeStyles.modeDescription, { color: 'rgba(255,255,255,0.9)' }]}>
                {category.description}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <Animated.View style={[GameModeStyles.backContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={GameModeStyles.backButton} onPress={onBack}>
          <Text style={GameModeStyles.backButtonText}>← Geri Dön</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default CategorySelectionScreen; 