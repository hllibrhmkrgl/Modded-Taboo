# 🎮 TABOO - Modern Kelime Tahmin Oyunu

React Native ile geliştirilmiş, 4 farklı oyun modu sunan modern ve eğlenceli Taboo oyunu.

## 📁 Proje Yapısı

```
tabu/
├── App.js                      # Ana uygulama kontrolcüsü
├── words.json                  # Klasik oyun kelimeleri
├── categorized_words.json      # Kategorili kelimeler (5 kategori)
├── punishment_jokers.json      # Super Tabu joker/ceza sistemi
├── background.png              # Gradient arka plan
├── logo.png                    # Ana logo
├── play_button.png             # Özel oyun butonu
├── screens/                    # Ekran componentleri
│   ├── WelcomeScreen.js        # Karşılama ekranı + animasyonlar
│   ├── HelpScreen.js           # Oyun rehberi (yeni!)
│   ├── GameModeScreen.js       # 4 oyun modu seçimi (yeni!)
│   ├── CategorySelectionScreen.js # Kategori seçimi
│   ├── TeamCountScreen.js      # Takım sayısı seçimi
│   ├── TeamNamesScreen.js      # Takım adları girişi
│   ├── GameScreen.js           # Ana oyun ekranı + animasyonlar
│   └── ResultsScreen.js        # Gelişmiş sonuç ekranı
├── components/                 # Yardımcı componentler
│   └── GameLogic.js            # Gelişmiş oyun mantığı + Super Tabu
├── styles/                     # Stil dosyaları
│   └── GlobalStyles.js         # Kapsamlı stil sistemi
└── assets/                     # Görsel varlıklar
    ├── icon.png
    ├── splash-icon.png
    ├── adaptive-icon.png
    └── favicon.png
```

## 🎯 Oyun Modları

### 🎯 **KLASİK MOD**
- ⏱️ 90 saniye oyun süresi
- ⏭️ 3 pas hakkı
- 🎲 Karışık kelimeler
- 🏆 Standart puanlama

### 🌟 **SUPER TABU** (Yeni!)
- 🃏 **3 Joker Sistemi:**
  - **Pas Hakkı Eklemesi**: +1 pas hakkı
  - **Ek Süre**: +10 saniye bonus
  - **Çifte Puan**: Sonraki doğru cevap 2 puan
- ⚡ **3 Ceza Sistemi:**
  - **Puan Kaybı**: -1 puan
  - **Süre Kaybı**: -15 saniye
  - **Pas Kaybı**: 1 pas hakkı gider
- 🎲 Her 3 doğru = 1 joker, Her 2 tabu = 1 ceza

### 📚 **KATEGORİLİ MOD** (Yeni!)
- 🎯 5 farklı kategori:
  - 🍎 Yiyecek & İçecek
  - 🏃‍♂️ Spor
  - 🎬 Film & Dizi
  - 🌍 Coğrafya
  - 🔬 Bilim
- ⏱️ 90 saniye oyun süresi
- 🎨 Kategoriye özel kelimeler

### ⚡ **RUSH MOD** (Yeni!)
- 🚀 Otomatik kelime geçişi
- ⚡ Kelime başına 10 saniye
- 🎯 Pas hakkı yok
- 💨 Hızlı tempolu oyun

## ✨ Yeni Özellikler

### 🎨 **Gelişmiş UI/UX**
- 🌈 Modern gradient arka plan
- ✨ Smooth animasyonlar ve geçişler
- 📱 Responsive tasarım iyileştirmeleri
- 🎯 Platform-specific optimizasyonlar
- 👑 Kazanan takım için özel vurgular

### 🎮 **Oyun Mekaniği**
- 📊 Detaylı istatistik sistemi
- 🔄 Gelişmiş state management
- ⏸️ Oyun duraklatma menüsü
- 🎪 Joker/ceza animasyonları
- ❄️ Dondurucu efektleri (Super Tabu)

### 📚 **Yardım ve Rehber**
- 📖 Kapsamlı oyun rehberi
- 🎯 Her mod için detaylı açıklamalar
- 💡 Strateji ipuçları
- 🏆 Puanlama sistemi açıklamaları

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# iOS için
npx expo run:ios

# Android için
npx expo run:android

# Web için
npx expo start --web
```

## 🎮 Nasıl Oynanır

1. **Başlangıç**: Ana ekrandan "OYNA" butonuna tıklayın
2. **Oyun Modu**: 4 moddan birini seçin
3. **Kategori** (Kategorili modda): İstediğiniz kategoriyi seçin
4. **Takım Ayarları**: 
   - Takım sayısı seçin (2-10)
   - Her takım için isim girin
5. **Oyun**: 
   - Ana kelimeyi takım arkadaşlarınıza açıklayın
   - 🚫 Yasaklı kelimeleri kullanmayın
   - ✅ DOĞRU / 🚫 TABU / ⏭️ PAS butonlarını kullanın
   - 🌟 Super Tabu'da joker/ceza efektlerine dikkat edin
6. **Sonuçlar**: Her turun sonunda detaylı istatistikler
7. **Final**: 👑 Kazanan takım belirlenir

## 📊 Puanlama Sistemi

### Temel Puanlama
- ✅ **Doğru**: +1 puan
- 🚫 **Tabu**: -1 puan (yasaklı kelime kullanımı)
- ⏭️ **Pas**: Puan yok

### Super Tabu Özel Durumlar
- 🌟 **Çifte Puan Jokeri**: Sonraki doğru cevap +2 puan
- ⚡ **Puan Kaybı Cezası**: Anlık -1 puan
- ❄️ **Dondurucu**: Rakip takım 1 tur bekler

## 🛠️ Teknik Detaylar

### Component Mimarisi
```javascript
// Ana kontrolcü
App.js - Navigation ve state yönetimi

// Ekranlar
screens/ - Her özellik ayrı component
├── WelcomeScreen.js    # Animasyonlu giriş
├── GameModeScreen.js   # 4 mod seçimi
├── HelpScreen.js       # Detaylı rehber
└── GameScreen.js       # Gelişmiş oyun arayüzü

// Logic
components/GameLogic.js - Custom hook ile state yönetimi
```

### Stil Sistemi
```javascript
import { 
  GlobalStyles,      // Genel stiller
  GameStyles,        // Oyun ekranı
  ResultStyles,      // Sonuç ekranı
  GameModeStyles,    // Mod seçimi
  PauseMenuStyles    // Duraklatma menüsü
} from '../styles/GlobalStyles';
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- 🔴 **Ana Buton**: `#FF6B6B`
- 🔵 **İkincil**: `#45B7D1`
- 🟢 **Doğru/Başarı**: `#4ECDC4`
- 🟣 **Tabu/Kategorili**: `#A855F7`
- 🟡 **Timer/Super Tabu**: `#FFD93D`
- ⚪ **Nötr**: `#2C3E50`

### Mod Renkleri
- 🎯 **Klasik**: Mavi (`#3498DB`)
- 🌟 **Super Tabu**: Altın (`#FFD93D`)
- 📚 **Kategorili**: Mor (`#A855F7`)
- ⚡ **Rush**: Kırmızı (`#FF6B6B`)

## 📱 Platform Optimizasyonları

### iOS
- ✅ Native gölge efektleri
- ✅ Text shadow desteği
- ✅ Haptic feedback

### Android
- ✅ Elevation-based shadows
- ✅ Font weight optimizasyonları
- ✅ Material Design uyumlu

### Web
- ✅ Responsive breakpoints
- ✅ Cross-browser uyumluluk
- ✅ PWA desteği

## 🔮 Gelecek Güncellemeler

### Yakın Dönem
- 🔊 Ses efektleri ve müzik
- 📈 Gelişmiş istatistik ekranı
- 🏆 Başarı rozetleri sistemi
- 📝 Özel kelime listeleri

### Uzun Dönem
- 🌐 Çevrimiçi multiplayer
- 📱 Kişiselleştirilebilir temalar
- 🎮 Turnuva modu
- 📊 Bulut tabanlı skorlar

## 🏗️ Geliştirme Notları

### Code Quality
- 📦 Modüler component yapısı
- 🎣 Custom hooks kullanımı
- 🔄 Efficient state management
- ⚡ Performance optimizasyonları
- 🧪 Error boundary implementasyonu

### Accessibility
- 🔤 Screen reader desteği
- 🎨 Yüksek kontrast modları
- ⌨️ Klavye navigasyonu
- 📱 Touch target boyutları

---

**Geliştirici**: React Native + Expo  
**Framework**: Expo SDK 49+  
**Platform**: iOS, Android, Web  
**Oyun Türü**: Kelime Tahmin / Parti Oyunu  
**Yaş Sınırı**: 8+  

**Son Güncelleme**: Eylül 2025 - Super Tabu modu, Kategorili kelimeler, Rush modu ve kapsamlı UI iyileştirmeleri