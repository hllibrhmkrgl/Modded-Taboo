import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';

// Import Screens
import WelcomeScreen from './screens/WelcomeScreen';
import GameModeScreen from './screens/GameModeScreen';
import TeamCountScreen from './screens/TeamCountScreen';
import TeamNamesScreen from './screens/TeamNamesScreen';
import GameScreen from './screens/GameScreen';
import ResultsScreen from './screens/ResultsScreen';

// Import Game Logic
import { useGameLogic } from './components/GameLogic';

// Import Styles
import { GlobalStyles } from './styles/GlobalStyles';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [gameMode, setGameMode] = useState('classic');
  const [teamCount, setTeamCount] = useState(2);
  const [teamNames, setTeamNames] = useState(['', '']);

  // Game logic hook
  const gameLogic = useGameLogic();

  // Navigation handlers
  const handlePlayPress = () => {
    setCurrentScreen('gameMode');
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setCurrentScreen('teamCount');
  };

  const handleTeamCountContinue = () => {
    // Initialize team names array
    const newTeamNames = Array(teamCount).fill('').map((_, index) => 
      teamNames[index] || ''
    );
    setTeamNames(newTeamNames);
    setCurrentScreen('teamNames');
  };

  const handleTeamNameChange = (index, name) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = name;
    setTeamNames(newTeamNames);
  };

  const handleStartGame = () => {
    gameLogic.initializeGame(teamNames, gameMode);
    setCurrentScreen('game');
    gameLogic.startNewRound();
  };

  const handleGameAnswer = (type) => {
    gameLogic.handleAnswer(type);
  };

  const handleRoundComplete = () => {
    setCurrentScreen('results');
  };

  const handleNextTeam = () => {
    const hasMoreTeams = gameLogic.nextTeam();
    if (hasMoreTeams) {
      setCurrentScreen('game');
      gameLogic.startNewRound();
    }
  };

  const handleFinishGame = () => {
    // Just show the final results alert
    gameLogic.finishGame();
  };

  const handleBackToMenu = () => {
    gameLogic.resetGame();
    setCurrentScreen('welcome');
    setGameMode('classic');
    setTeamCount(2);
    setTeamNames(['', '']);
  };

  // Auto-navigate to results when time is up
  React.useEffect(() => {
    if (!gameLogic.isGameActive && gameLogic.timeLeft === 0 && currentScreen === 'game') {
      setTimeout(() => {
        handleRoundComplete();
      }, 500);
    }
  }, [gameLogic.isGameActive, gameLogic.timeLeft, currentScreen]);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onPlayPress={handlePlayPress} />;
      
      case 'gameMode':
        return (
          <GameModeScreen
            onModeSelect={handleModeSelect}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      
      case 'teamCount':
        return (
          <TeamCountScreen
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            onContinue={handleTeamCountContinue}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      
      case 'teamNames':
        return (
          <TeamNamesScreen
            teamNames={teamNames}
            onTeamNameChange={handleTeamNameChange}
            onStartGame={handleStartGame}
            onBack={() => setCurrentScreen('teamCount')}
          />
        );
      
      case 'game':
        return (
          <GameScreen
            currentTeam={gameLogic.currentTeam}
            timeLeft={gameLogic.timeLeft}
            passCount={gameLogic.passCount}
            currentWord={gameLogic.currentWord}
            gameStats={gameLogic.currentTeamStats}
            isGameActive={gameLogic.isGameActive}
            isPaused={gameLogic.isPaused}
            gameMode={gameLogic.gameMode}
            rushTimer={gameLogic.rushTimer}
            onAnswer={handleGameAnswer}
            formatTime={gameLogic.formatTime}
            onPause={gameLogic.pauseGame}
            onResume={gameLogic.resumeGame}
            onBackToMenu={handleBackToMenu}
          />
        );
      
      case 'results':
        return (
          <ResultsScreen
            currentTeam={gameLogic.currentTeam}
            allTeamsStats={gameLogic.getAllTeamsStats()}
            isLastTeam={gameLogic.isLastTeam}
            onNextTeam={handleNextTeam}
            onFinishGame={handleFinishGame}
            onBackToMenu={handleBackToMenu}
          />
        );
      
      default:
        return <WelcomeScreen onPlayPress={handlePlayPress} />;
    }
  };

  return (
    <ImageBackground 
      source={require('./background.png')} 
      style={GlobalStyles.backgroundImage}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      {renderCurrentScreen()}
    </ImageBackground>
  );
}
