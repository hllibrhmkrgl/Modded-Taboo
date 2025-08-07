import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { GlobalStyles, WelcomeStyles } from '../styles/GlobalStyles';

const WelcomeScreen = ({ onPlayPress, onHelpPress }) => {
  const logoAnimation = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;
  const subtitleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Logo giriş animasyonu - dramatic entrance
    Animated.parallel([
      Animated.timing(logoAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Sıralı animasyon devam et
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(subtitleAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnimation, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    // Logo pulse animasyonu - sürekli büyüyüp küçülme
    const startLogoPulse = () => {
      Animated.sequence([
        Animated.timing(logoPulse, {
          toValue: 1.08,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(logoPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => startLogoPulse());
    };

    // Buton pulse animasyonu
    const startButtonPulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => startButtonPulse());
    };
    
    setTimeout(startLogoPulse, 1500);
    setTimeout(startButtonPulse, 2000);
  }, []);

  return (
    <View style={GlobalStyles.container}>
      {/* Floating Elements */}
      <View style={WelcomeStyles.floatingElements}>
        <View style={[WelcomeStyles.floatingDot, WelcomeStyles.dot1]} />
        <View style={[WelcomeStyles.floatingDot, WelcomeStyles.dot2]} />
        <View style={[WelcomeStyles.floatingDot, WelcomeStyles.dot3]} />
        <View style={[WelcomeStyles.floatingDot, WelcomeStyles.dot4]} />
      </View>

      {/* Animated Logo */}
      <Animated.View style={[
        WelcomeStyles.logoContainer,
        {
          opacity: logoAnimation,
          transform: [
            { 
              scale: Animated.multiply(logoScale, logoPulse)
            },
            {
              rotate: logoRotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['-10deg', '0deg'],
              }),
            },
            {
              translateY: logoAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            }
          ],
        }
      ]}>
        <Image 
          source={require('../logo.png')} 
          style={WelcomeStyles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Animated Subtitle */}
      <Animated.View style={[
        WelcomeStyles.subtitleContainer,
        {
          opacity: subtitleAnimation,
          transform: [{
            translateY: subtitleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          }],
        }
      ]}>
        <Text style={WelcomeStyles.subtitle}>Tabooya Hoş Geldiniz! 🃏 </Text>
        <Text style={WelcomeStyles.description}>
          Arkadaşlarınızla değişik modlar deneyebilir,eğlenceli zaman geçirebilirsiniz.
        </Text>
      </Animated.View>

      {/* Animated Play Button */}
      <Animated.View style={[
        {
          opacity: buttonAnimation,
          transform: [
            { scale: pulseAnimation },
            {
              translateY: buttonAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            }
          ],
        }
      ]}>
        <TouchableOpacity 
          style={WelcomeStyles.playButtonContainer} 
          onPress={onPlayPress}
          activeOpacity={0.85}
        >
          <Image 
            source={require('../play_button.png')} 
            style={WelcomeStyles.playButtonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Animated Help Button */}
      <Animated.View style={[
        {
          opacity: buttonAnimation,
          transform: [
            {
              translateY: buttonAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0],
              }),
            }
          ],
        }
      ]}>
        <TouchableOpacity 
          style={WelcomeStyles.helpButtonContainer} 
          onPress={onHelpPress}
          activeOpacity={0.8}
        >
          <Text style={WelcomeStyles.helpButtonText}>🎯 Oyun Rehberi</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Features */}
      <Animated.View style={[
        WelcomeStyles.featuresContainer,
        { opacity: buttonAnimation }
      ]}>
        <Text style={WelcomeStyles.featureText}>⏱️ 90 saniye adrenalin</Text>
        <Text style={WelcomeStyles.featureText}>👥 Çok oyunculu eğlence</Text>
        <Text style={WelcomeStyles.featureText}>🏆 Sınırsız kelime hazinesi</Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen; 