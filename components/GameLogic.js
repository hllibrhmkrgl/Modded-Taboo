import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import wordsData from '../words.json';

export const useGameLogic = () => {
  // Game states
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [passCount, setPassCount] = useState(3);
  const [gameStats, setGameStats] = useState({});
  const [usedWords, setUsedWords] = useState([]);
  const [teamNames, setTeamNames] = useState(['', '']);
  const [gameMode, setGameMode] = useState('classic');
  const [rushTimer, setRushTimer] = useState(10);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isGameActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      showRoundResults();
    }
    return () => clearInterval(interval);
  }, [isGameActive, isPaused, timeLeft]);

  // Rush mode timer effect
  useEffect(() => {
    let rushInterval = null;
    if (gameMode === 'rush' && isGameActive && !isPaused && rushTimer > 0) {
      rushInterval = setInterval(() => {
        setRushTimer(timer => timer - 1);
      }, 1000);
         } else if (gameMode === 'rush' && rushTimer === 0 && isGameActive) {
       // Auto-change word in rush mode
       const newWord = getRandomWord();
       setCurrentWord(newWord);
       setUsedWords(prev => [...prev, newWord.word]);
       setRushTimer(10); // Reset rush timer
    }
    return () => clearInterval(rushInterval);
  }, [gameMode, isGameActive, isPaused, rushTimer]);

  const getRandomWord = () => {
    const availableWords = wordsData.filter(wordObj => !usedWords.includes(wordObj.word));
    if (availableWords.length === 0) {
      // Reset used words if all are used
      setUsedWords([]);
      return wordsData[Math.floor(Math.random() * wordsData.length)];
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  const initializeGame = (teams, mode = 'classic') => {
    // Initialize game stats
    const stats = {};
    teams.forEach(team => {
      stats[team] = { correct: 0, wrong: 0, taboo: 0, pass: 0 };
    });
    setGameStats(stats);
    setTeamNames(teams);
    setGameMode(mode);
    setCurrentTeamIndex(0);
    setUsedWords([]);
    setRushTimer(10); // Reset rush timer
  };

  const startNewRound = () => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setUsedWords(prev => [...prev, newWord.word]);
    setTimeLeft(90);
    setPassCount(3);
    setIsGameActive(true);
  };

  const pauseGame = () => {
    setIsPaused(true);
  };

  const resumeGame = () => {
    setIsPaused(false);
  };

  const handleAnswer = (type) => {
    if (!isGameActive || isPaused) return;

    const currentTeam = teamNames[currentTeamIndex];
    const newStats = { ...gameStats };
    
    if (type === 'taboo') {
      // Tabu olunca hem tabu sayısını artır hem de doğru sayısını düşür (minimum 0)
      newStats[currentTeam].taboo++;
      if (newStats[currentTeam].correct > 0) {
        newStats[currentTeam].correct--;
      }
    } else if (type === 'pass') {
      newStats[currentTeam].pass++;
      setPassCount(prev => prev - 1);
      if (passCount <= 1) {
        Alert.alert('Uyarı', 'Pas hakkınız bitti!');
        setGameStats(newStats);
        return;
      }
    } else {
      // Normal correct/wrong handling
      newStats[currentTeam][type]++;
    }
    
    setGameStats(newStats);

    // Get new word
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setUsedWords(prev => [...prev, newWord.word]);
    
    // Reset rush timer if in rush mode
    if (gameMode === 'rush') {
      setRushTimer(10);
    }
  };

  const showRoundResults = () => {
    return true; // Signal to show results screen
  };

  const nextTeam = () => {
    const nextIndex = (currentTeamIndex + 1) % teamNames.length;
    setCurrentTeamIndex(nextIndex);
    return nextIndex < teamNames.length;
  };

  const finishGame = () => {
    // Calculate final scores
    const finalScores = teamNames.map(team => ({
      team,
      score: gameStats[team]?.correct || 0,
      ...gameStats[team]
    }));
    
    finalScores.sort((a, b) => (b.score || 0) - (a.score || 0));
    
    Alert.alert(
      'Oyun Bitti!',
      `🏆 Kazanan: ${finalScores[0].team} (${finalScores[0].score || 0} puan)\n\n` +
      finalScores.map((team, index) => 
        `${index + 1}. ${team.team}: ${team.score || 0} puan`
      ).join('\n'),
      [
        { text: 'Tamam' }
      ]
    );
  };

  const resetGame = () => {
    setCurrentTeamIndex(0);
    setCurrentWord(null);
    setTimeLeft(90);
    setIsGameActive(false);
    setIsPaused(false);
    setPassCount(3);
    setGameStats({});
    setUsedWords([]);
    setTeamNames(['', '']);
    setGameMode('classic');
    setRushTimer(10);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get all teams stats for display - with better error handling
  const getAllTeamsStats = () => {
    // Return empty array if no team names
    if (!teamNames || teamNames.length === 0) {
      return [];
    }

    return teamNames.map((teamName, index) => {
      // Create default stats object
      const defaultStats = { correct: 0, wrong: 0, taboo: 0, pass: 0 };
      
      // Get stats safely with fallback
      const teamStats = (gameStats && gameStats[teamName]) ? gameStats[teamName] : defaultStats;
      
      return {
        name: teamName || `Takım ${index + 1}`,
        stats: {
          correct: teamStats.correct || 0,
          wrong: teamStats.wrong || 0,
          taboo: teamStats.taboo || 0,
          pass: teamStats.pass || 0
        }
      };
    });
  };

  return {
    // States
    currentTeamIndex,
    currentWord,
    timeLeft,
    isGameActive,
    isPaused,
    passCount,
    gameStats,
    teamNames,
    gameMode,
    rushTimer,
    
    // Actions
    initializeGame,
    startNewRound,
    handleAnswer,
    nextTeam,
    finishGame,
    resetGame,
    formatTime,
    getAllTeamsStats,
    pauseGame,
    resumeGame,
    
    // Computed values
    currentTeam: teamNames[currentTeamIndex] || '',
    currentTeamStats: gameStats[teamNames[currentTeamIndex]] || { correct: 0, wrong: 0, taboo: 0, pass: 0 },
    isLastTeam: currentTeamIndex >= teamNames.length - 1,
  };
}; 