import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Animated, Platform } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

// Platform-specific text shadow helper
const createTextShadowStyle = (textShadowProps) => {
  if (Platform.OS === 'ios') {
    return textShadowProps;
  } else {
    return {};
  }
};

// Platform-specific shadow style helper
const createShadowStyle = (shadowProps) => {
  if (Platform.OS === 'ios') {
    return shadowProps;
  } else {
    return {
      elevation: shadowProps.elevation || 8,
    };
  }
};

const HelpScreen = ({ onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(50)).current;
  const slideAnim2 = useRef(new Animated.Value(50)).current;
  const slideAnim3 = useRef(new Animated.Value(50)).current;
  const slideAnim4 = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Sıralı animasyon başlat
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.stagger(150, [
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
        Animated.timing(slideAnim4, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.headerTitle}>🎯 Oyun Rehberi</Text>
        <Text style={styles.headerSubtitle}>Tabu oyunu nasıl oynanır?</Text>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Genel Kurallar */}
        <Animated.View style={[
          styles.sectionCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim1 }],
          }
        ]}>
          <Text style={styles.sectionIcon}>📋</Text>
          <Text style={styles.sectionTitle}>Genel Kurallar</Text>
          <View style={styles.rulesList}>
            <Text style={styles.ruleItem}>• Takımınızın kelimeyi bilmesini sağlayın</Text>
            <Text style={styles.ruleItem}>• Tabu kelimeleri kullanmayın</Text>
            <Text style={styles.ruleItem}>• Jest ve mimik kullanabilirsiniz</Text>
            <Text style={styles.ruleItem}>• Kelimeyi doğrudan söylemek yasak</Text>
            <Text style={styles.ruleItem}>• Bilmediğiniz kelimeleri pas geçebilirsiniz</Text>
          </View>
        </Animated.View>

        {/* Klasik Mod */}
        <Animated.View style={[
          styles.modeCard,
          styles.classicCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim2 }],
          }
        ]}>
          <Text style={styles.modeIcon}>🎯</Text>
          <Text style={styles.modeTitle}>KLASİK MOD</Text>
          <Text style={styles.modeDescription}>Standart tabu oyun deneyimi</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⏱️</Text>
              <Text style={styles.featureText}>90 saniye oyun süresi</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⏭️</Text>
              <Text style={styles.featureText}>3 pas hakkı</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎲</Text>
              <Text style={styles.featureText}>Karışık kelimeler</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏆</Text>
              <Text style={styles.featureText}>Doğru tahmin = 1 puan</Text>
            </View>
          </View>
        </Animated.View>

        {/* Super Tabu Mod */}
        <Animated.View style={[
          styles.modeCard,
          styles.superTabuCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim2 }],
          }
        ]}>
          <Text style={styles.modeIcon}>🌟</Text>
          <Text style={styles.modeTitle}>SUPER TABU</Text>
          <Text style={styles.modeDescription}>Joker ve ceza sistemi ile gelişmiş oyun</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🃏</Text>
              <Text style={styles.featureText}>3 joker hakkı</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureText}>3 ceza sistemi</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎲</Text>
              <Text style={styles.featureText}>Rastgele etkiler</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Strateji gerektiren oyun</Text>
            </View>
          </View>
          
          <View style={styles.superTabuFeatures}>
            <Text style={styles.superTabuTitle}>🃏 Joker Türleri:</Text>
            <Text style={styles.superTabuItem}>• Pas Hakkı Eklemesi: Ekstra 1 pas hakkı</Text>
            <Text style={styles.superTabuItem}>• Ek Süre: +10 saniye ek oyun süresi</Text>
            <Text style={styles.superTabuItem}>• Çifte Puan: Sonraki doğru cevap 2 puan</Text>
          </View>
          
          <View style={styles.superTabuPunishments}>
            <Text style={styles.superTabuTitle}>⚡ Ceza Türleri:</Text>
            <Text style={styles.superTabuItem}>• Puan Kaybı: -1 puan kaybedersiniz</Text>
            <Text style={styles.superTabuItem}>• Süre Kaybı: -15 saniye süre kaybı</Text>
            <Text style={styles.superTabuItem}>• Pas Kaybı: 1 pas hakkınız gider</Text>
          </View>
        </Animated.View>

        {/* Kategorili Mod */}
        <Animated.View style={[
          styles.modeCard,
          styles.categoryCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim3 }],
          }
        ]}>
          <Text style={styles.modeIcon}>📚</Text>
          <Text style={styles.modeTitle}>KATEGORİLİ MOD</Text>
          <Text style={styles.modeDescription}>Belirli kategorilerden kelimeler</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Kategori seçebilirsiniz</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📖</Text>
              <Text style={styles.featureText}>5 farklı kategori</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⏱️</Text>
              <Text style={styles.featureText}>90 saniye oyun süresi</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎨</Text>
              <Text style={styles.featureText}>Temaya odaklanın</Text>
            </View>
          </View>
          
          <View style={styles.categoriesList}>
            <Text style={styles.categoriesTitle}>Mevcut Kategoriler:</Text>
            <Text style={styles.categoryTag}>🍎 Yiyecek & İçecek</Text>
            <Text style={styles.categoryTag}>🏃‍♂️ Spor</Text>
            <Text style={styles.categoryTag}>🎬 Film & Dizi</Text>
            <Text style={styles.categoryTag}>🌍 Coğrafya</Text>
            <Text style={styles.categoryTag}>🔬 Bilim</Text>
          </View>
        </Animated.View>

        {/* Rush Mod */}
        <Animated.View style={[
          styles.modeCard,
          styles.rushCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim4 }],
          }
        ]}>
          <Text style={styles.modeIcon}>⚡</Text>
          <Text style={styles.modeTitle}>RUSH MOD</Text>
          <Text style={styles.modeDescription}>Hızlı tempolu adrenalin dolu oyun</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚀</Text>
              <Text style={styles.featureText}>Otomatik kelime geçişi</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureText}>Kelime başına 10 saniye</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Pas hakkı yok</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💨</Text>
              <Text style={styles.featureText}>Hızlı düşünme gerekir</Text>
            </View>
          </View>
          
          <View style={styles.rushTip}>
            <Text style={styles.rushTipTitle}>💡 İpucu:</Text>
            <Text style={styles.rushTipText}>
              Bu modda hızlı düşünmek ve takım arkadaşlarınızla iyi iletişim kurmak çok önemli!
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View style={[styles.backContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = {
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
    ...createTextShadowStyle({
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    }),
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    ...createTextShadowStyle({
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    }),
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    ...createShadowStyle({
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 10,
    }),
  },
  sectionIcon: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  rulesList: {
    marginTop: 10,
  },
  ruleItem: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 12,
    lineHeight: 24,
    fontWeight: Platform.OS === 'android' ? '500' : '500',
  },
  modeCard: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    ...createShadowStyle({
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 10,
    }),
  },
  classicCard: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    borderLeftWidth: 6,
    borderLeftColor: '#3498DB',
  },
  superTabuCard: {
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
    borderLeftWidth: 6,
    borderLeftColor: '#FFD93D',
  },
  categoryCard: {
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
    borderLeftWidth: 6,
    borderLeftColor: '#9B59B6',
  },
  rushCard: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderLeftWidth: 6,
    borderLeftColor: '#E74C3C',
  },
  modeIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  modeDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 25,
  },
  featureText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
    fontWeight: Platform.OS === 'android' ? '600' : '600',
  },
  categoriesList: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
    borderRadius: 15,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  categoryTag: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 6,
    paddingLeft: 10,
    fontWeight: Platform.OS === 'android' ? '600' : '600',
  },
  rushTip: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 15,
  },
  rushTipTitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  rushTipText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    fontWeight: Platform.OS === 'android' ? '500' : '500',
  },
  superTabuFeatures: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
    borderRadius: 15,
    marginBottom: 10,
  },
  superTabuPunishments: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 15,
  },
  superTabuTitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  superTabuItem: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 6,
    paddingLeft: 10,
    fontWeight: Platform.OS === 'android' ? '500' : '500',
    lineHeight: 20,
  },
  backContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(52, 73, 94, 0.9)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    ...createShadowStyle({
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    }),
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
  },
};

export default HelpScreen; 