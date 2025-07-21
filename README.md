# 🎮 TABOO - Kelime Tahmin Oyunu

React Native ile geliştirilmiş modern ve eğlenceli Taboo oyunu.

## 📁 Proje Yapısı

```
tabu/
├── App.js                    # Ana uygulama kontrolcüsü
├── words.json               # Oyun kelimeleri ve yasaklı kelimeler
├── background.png           # Arka plan görseli
├── screens/                 # Ekran componentleri
│   ├── WelcomeScreen.js     # Karşılama ekranı
│   ├── TeamCountScreen.js   # Takım sayısı seçimi
│   ├── TeamNamesScreen.js   # Takım adları girişi
│   ├── GameScreen.js        # Ana oyun ekranı
│   └── ResultsScreen.js     # Sonuç ekranı
├── components/              # Yardımcı componentler
│   └── GameLogic.js         # Oyun mantığı ve state yönetimi
├── styles/                  # Stil dosyaları
│   └── GlobalStyles.js      # Tüm stiller organize edilmiş
└── assets/                  # Görsel varlıklar
    ├── icon.png
    ├── splash-icon.png
    └── ...
```

## 🎯 Özellikler

### 🎮 Oyun Mekaniği
- ⏱️ 90 saniye süre sınırı
- 🎯 Random kelime seçimi
- 🚫 Yasaklı kelimeler sistemi
- ⏭️ 3 pas hakkı
- 📊 Anlık skor takibi
- 👥 Çoklu takım desteği (2-10 takım)

### 🎨 Tasarım
- 🌈 Modern renk paleti
- ✨ Gölge efektleri
- 📱 Responsive tasarım
- 🖼️ Custom arka plan
- 🎯 Kullanıcı dostu arayüz

### 🏗️ Mimari
- 📦 Modüler component yapısı
- 🎣 Custom hooks (useGameLogic)
- 🎨 Organize stil yönetimi
- 🔄 State management
- 📊 Temiz kod pratikleri

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start
```

## 🎮 Nasıl Oynanır

1. **Başlangıç**: "OYNA" butonuna tıklayın
2. **Takım Sayısı**: 2-10 arasında takım sayısı seçin
3. **Takım Adları**: Her takım için isim girin
4. **Oyun**: 
   - Ana kelimeyi takım arkadaşlarınıza açıklayın
   - Yasaklı kelimeleri kullanmayın
   - DOĞRU/YANLIŞ/TABU/PAS butonlarını kullanın
5. **Sonuç**: Her turun sonunda detaylı istatistikler
6. **Final**: Tüm takımlar oynadıktan sonra kazanan belirlenir

## 📊 Puanlama Sistemi

- ✅ **Doğru**: +1 puan
- ❌ **Yanlış**: Puan yok
- 🚫 **Tabu**: Puan yok (yasaklı kelime kullanımı)
- ⏭️ **Pas**: Puan yok (3 hak sınırı)

## 🛠️ Geliştirme

### Component Yapısı

- **App.js**: Ana kontrolcü, navigation yönetimi
- **Screens**: Her ekran ayrı component
- **GameLogic**: Oyun mantığı ve state yönetimi
- **GlobalStyles**: Merkezi stil yönetimi

### Stil Sistemi

```javascript
import { GlobalStyles, GameStyles, ResultStyles } from '../styles/GlobalStyles';
```

### State Yönetimi

```javascript
const gameLogic = useGameLogic();
// Tüm oyun state'i ve metodları bu hook içinde
```

## 🎨 Renk Paleti

- 🔴 Ana Buton: `#FF6B6B`
- 🔵 İkincil: `#45B7D1`
- 🟢 Doğru: `#4ECDC4`
- 🟣 Tabu: `#A855F7`
- 🟡 Timer: `#FFD93D`

## 📱 Platform Desteği

- ✅ iOS
- ✅ Android
- ✅ Web (Expo Web)

## 🎯 Gelecek Geliştirmeler

- 🔊 Ses efektleri
- 🎵 Arka plan müziği
- 📈 İstatistik ekranı
- 🏆 Başarı sistemi
- 🌐 Çevrimiçi multiplayer
- 📝 Custom kelime listeleri

---

**Geliştirici**: React Native & Expo ile geliştirilmiştir.
**Oyun Türü**: Kelime Tahmin / Parti Oyunu
**Yaş Sınırı**: 12+ 