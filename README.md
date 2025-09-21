# 🎮 TABOO - Modern Word Guessing Game

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2049+-black.svg)](https://expo.dev/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey.svg)](https://github.com/hllibrhmkrgl/tabuu)

A modern, feature-rich Taboo word guessing game built with React Native and Expo. Experience 4 unique game modes with stunning animations and engaging gameplay mechanics.

## 🌟 Features

### 🎯 **4 Game Modes**
- **🎯 Classic Mode**: Traditional 90-second rounds with 3 skip passes
- **🌟 Super Tabu**: Advanced mode with jokers and penalties system
- **📚 Categorized Mode**: Play with 5 themed categories (Food, Sports, Movies, Geography, Science)
- **⚡ Rush Mode**: Fast-paced automatic word switching with 10-second timers

### 🎨 **Modern UI/UX**
- Beautiful gradient backgrounds and smooth animations
- Platform-specific optimizations (iOS, Android, Web)
- Responsive design with accessibility features
- Winner celebrations and visual feedback

### 🎮 **Advanced Game Mechanics**
- Comprehensive statistics tracking
- Pause menu with game state preservation
- Joker/penalty animation system
- Freezing effects and special power-ups

## 📱 Screenshots

*Add your game screenshots here*

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/hllibrhmkrgl/tabuu.git

# Navigate to project directory
cd tabuu

# Install dependencies
npm install

# Start the development server
npx expo start

# Run on specific platform
npx expo run:ios     # iOS
npx expo run:android # Android
npx expo start --web # Web
```

## 🎮 How to Play

1. **Start**: Tap "PLAY" on the welcome screen
2. **Choose Mode**: Select from 4 exciting game modes
3. **Setup Teams**: 
   - Choose number of teams (2-10)
   - Enter team names
4. **Gameplay**: 
   - Describe the main word to your teammates
   - 🚫 Avoid using forbidden words
   - Use ✅ CORRECT / 🚫 TABOO / ⏭️ SKIP buttons
   - 🌟 In Super Tabu mode, watch for jokers and penalties
5. **Results**: View detailed statistics after each round
6. **Victory**: 👑 Winner is determined by highest score

## 🎯 Game Modes Explained

### 🎯 Classic Mode
- ⏱️ 90-second rounds
- ⏭️ 3 skip passes per team
- 🎲 Random word selection
- 🏆 Standard scoring system

### 🌟 Super Tabu Mode
**3 Joker Types:**
- **Extra Pass**: +1 additional skip
- **Bonus Time**: +10 seconds
- **Double Points**: Next correct answer = 2 points

**3 Penalty Types:**
- **Point Loss**: -1 point penalty
- **Time Loss**: -15 seconds
- **Pass Loss**: Lose 1 skip pass

*Earn 1 joker every 3 correct answers, get 1 penalty every 2 taboo violations*

### 📚 Categorized Mode
Choose from 5 themed categories:
- 🍎 **Food & Drinks**
- 🏃‍♂️ **Sports**
- 🎬 **Movies & TV Shows**
- 🌍 **Geography**
- 🔬 **Science**

### ⚡ Rush Mode
- 🚀 Automatic word progression
- ⚡ 10 seconds per word
- 🎯 No skip passes
- 💨 High-intensity gameplay

## 📊 Scoring System

### Basic Scoring
- ✅ **Correct**: +1 point
- 🚫 **Taboo**: -1 point (forbidden word used)
- ⏭️ **Skip**: No points

### Super Tabu Special Cases
- 🌟 **Double Points Joker**: Next correct answer = +2 points
- ⚡ **Point Loss Penalty**: Instant -1 point
- ❄️ **Freeze Effect**: Opponent team skips next turn

## 🛠️ Technical Stack

- **Framework**: React Native with Expo
- **State Management**: React Hooks + Custom Logic
- **Animations**: React Native Reanimated
- **Styling**: StyleSheet with Platform-specific optimizations
- **Data**: JSON-based word libraries

## 📁 Project Structure

```
tabu/
├── App.js                      # Main app controller
├── words.json                  # Classic game words
├── categorized_words.json      # Category-based words
├── punishment_jokers.json      # Super Tabu system
├── screens/                    # Screen components
│   ├── WelcomeScreen.js        # Animated welcome screen
│   ├── GameModeScreen.js       # Game mode selection
│   ├── HelpScreen.js           # Game guide
│   ├── GameScreen.js           # Main gameplay
│   └── ResultsScreen.js        # Results & statistics
├── components/                 # Utility components
│   └── GameLogic.js            # Game mechanics
├── styles/                     # Styling system
│   └── GlobalStyles.js         # Comprehensive styles
└── assets/                     # Visual assets
```

## 🎨 Design System

### Color Palette
- 🔴 **Primary**: `#FF6B6B` (Action buttons)
- 🔵 **Secondary**: `#45B7D1` (Info elements)
- 🟢 **Success**: `#4ECDC4` (Correct answers)
- 🟣 **Purple**: `#A855F7` (Categorized mode)
- 🟡 **Warning**: `#FFD93D` (Super Tabu)

### Mode-Specific Colors
- 🎯 **Classic**: Blue (`#3498DB`)
- 🌟 **Super Tabu**: Gold (`#FFD93D`)
- 📚 **Categorized**: Purple (`#A855F7`)
- ⚡ **Rush**: Red (`#FF6B6B`)

## 📱 Platform Support

| Platform | Status | Features |
|----------|---------|----------|
| iOS | ✅ Full Support | Native shadows, haptic feedback |
| Android | ✅ Full Support | Material Design, elevation |
| Web | ✅ Full Support | Responsive, PWA ready |

## 🔮 Roadmap

### Coming Soon
- 🔊 Sound effects and background music
- 📈 Advanced statistics dashboard
- 🏆 Achievement system
- 📝 Custom word lists

### Future Plans
- 🌐 Online multiplayer
- 📱 Customizable themes
- 🎮 Tournament mode
- 📊 Cloud-based leaderboards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ibrahim Koroglu** - [GitHub](https://github.com/hllibrhmkrgl)

## 🙏 Acknowledgments

- React Native and Expo teams for the amazing framework
- The open-source community for inspiration and resources
- All beta testers who helped improve the game

---

**⭐ If you enjoyed this project, please consider giving it a star!**

**📱 Download and play with friends for the ultimate party game experience!**

*Last Updated: September 2025 - Added Super Tabu mode, categorized words, Rush mode, and comprehensive UI improvements*