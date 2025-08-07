import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import wordsData from '../words.json';
import categorizedWordsData from '../categorized_words.json';
import punishmentJokersData from '../punishment_jokers.json';

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rushTimer, setRushTimer] = useState(10);
  
  // Super Tabu mode states
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [tabooCount, setTabooCount] = useState(0);
  const [activeJoker, setActiveJoker] = useState(null);
  const [activePunishment, setActivePunishment] = useState(null);
  const [jokerPunishmentEffect, setJokerPunishmentEffect] = useState(null);
  const [isWordFrozen, setIsWordFrozen] = useState(false);
  const [freezeTimer, setFreezeTimer] = useState(0);

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

  // Freeze timer effect
  useEffect(() => {
    let freezeInterval = null;
    if (isWordFrozen && freezeTimer > 0) {
      freezeInterval = setInterval(() => {
        setFreezeTimer(timer => {
          if (timer <= 1) {
            setIsWordFrozen(false);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(freezeInterval);
  }, [isWordFrozen, freezeTimer]);

  const getRandomWord = (mode = gameMode, category = selectedCategory) => {
    let wordSource;
    
    if (mode === 'category' && category) {
      // Kategorili modda seçilen kategoriden kelime al
      wordSource = categorizedWordsData.filter(wordObj => 
        wordObj.category === category && !usedWords.includes(wordObj.word)
      );
    } else {
      // Klasik modda normal kelimelerden al
      wordSource = wordsData.filter(wordObj => !usedWords.includes(wordObj.word));
    }

    if (wordSource.length === 0) {
      // Reset used words if all are used
      setUsedWords([]);
      if (mode === 'category' && category) {
        const categoryWords = categorizedWordsData.filter(wordObj => wordObj.category === category);
        return categoryWords[Math.floor(Math.random() * categoryWords.length)];
      } else {
        return wordsData[Math.floor(Math.random() * wordsData.length)];
      }
    }
    return wordSource[Math.floor(Math.random() * wordSource.length)];
  };

  const initializeGame = (teams, mode = 'classic', category = null) => {
    // Initialize game stats
    const stats = {};
    teams.forEach(team => {
      stats[team] = { correct: 0, wrong: 0, taboo: 0, pass: 0 };
    });
    setGameStats(stats);
    setTeamNames(teams);
    setGameMode(mode);
    setSelectedCategory(category);
    setCurrentTeamIndex(0);
    setUsedWords([]);
    setRushTimer(10); // Reset rush timer
    
    // Reset Super Tabu states
    setCorrectAnswersCount(0);
    setTabooCount(0);
    setActiveJoker(null);
    setActivePunishment(null);
    setJokerPunishmentEffect(null);
    setIsWordFrozen(false);
    setFreezeTimer(0);
  };

  const startNewRound = (mode = gameMode, category = selectedCategory) => {
    const newWord = getRandomWord(mode, category);
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

  // Super Tabu mode functions
  const getRandomJoker = () => {
    const jokers = punishmentJokersData.jokers;
    return jokers[Math.floor(Math.random() * jokers.length)];
  };

  const getRandomPunishment = () => {
    const punishments = punishmentJokersData.punishments;
    return punishments[Math.floor(Math.random() * punishments.length)];
  };

  const applyJokerEffect = (joker) => {
    switch (joker.effect) {
      case 'time_bonus':
        setTimeLeft(prev => prev + joker.value);
        break;
      case 'skip_word':
        // This will be handled in the UI as extra pass rights
        setPassCount(prev => prev + joker.value);
        break;
      case 'double_points':
        // This will be handled when scoring the next correct answer
        break;
      default:
        break;
    }
  };

  const applyPunishmentEffect = (punishment) => {
    const currentTeam = teamNames[currentTeamIndex];
    const newStats = { ...gameStats };
    
    switch (punishment.effect) {
      case 'time_penalty':
        setTimeLeft(prev => Math.max(0, prev + punishment.value));
        break;
      case 'score_penalty':
        newStats[currentTeam].correct = Math.max(0, newStats[currentTeam].correct + punishment.value / 10);
        setGameStats(newStats);
        break;
      case 'freeze_word':
        setIsWordFrozen(true);
        setFreezeTimer(punishment.value);
        break;
      default:
        break;
    }
  };

  const checkSuperTabuTriggers = (answerType) => {
    if (gameMode !== 'super_tabu') return;

    if (answerType === 'correct') {
      const newCorrectCount = correctAnswersCount + 1;
      setCorrectAnswersCount(newCorrectCount);
      
      // Her 3 doğru cevap = 1 joker
      if (newCorrectCount % 3 === 0) {
        const joker = getRandomJoker();
        setActiveJoker(joker);
        setJokerPunishmentEffect({ type: 'joker', item: joker });
        applyJokerEffect(joker);
      }
    } else if (answerType === 'taboo') {
      const newTabooCount = tabooCount + 1;
      setTabooCount(newTabooCount);
      
      // Her 2 tabu = 1 ceza
      if (newTabooCount % 2 === 0) {
        const punishment = getRandomPunishment();
        setActivePunishment(punishment);
        setJokerPunishmentEffect({ type: 'punishment', item: punishment });
        applyPunishmentEffect(punishment);
      }
    }
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
      // Super Tabu mode: Apply double points if joker is active
      if (gameMode === 'super_tabu' && type === 'correct' && activeJoker?.effect === 'double_points') {
        newStats[currentTeam][type] += 2; // Double points
        setActiveJoker(null); // Use joker
      } else {
        newStats[currentTeam][type]++;
      }
    }
    
    setGameStats(newStats);

    // Super Tabu mode: Check for joker/punishment triggers after stats update
    if (gameMode === 'super_tabu') {
      requestAnimationFrame(() => {
        checkSuperTabuTriggers(type);
      });
    }

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
    setSelectedCategory(null);
    setRushTimer(10);
    
    // Reset Super Tabu states
    setCorrectAnswersCount(0);
    setTabooCount(0);
    setActiveJoker(null);
    setActivePunishment(null);
    setJokerPunishmentEffect(null);
    setIsWordFrozen(false);
    setFreezeTimer(0);
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
    
    // Super Tabu states
    correctAnswersCount,
    tabooCount,
    activeJoker,
    activePunishment,
    jokerPunishmentEffect,
    isWordFrozen,
    freezeTimer,
    
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
    
    // Super Tabu actions
    setJokerPunishmentEffect,
    
    // Computed values
    currentTeam: teamNames[currentTeamIndex] || '',
    currentTeamStats: gameStats[teamNames[currentTeamIndex]] || { correct: 0, wrong: 0, taboo: 0, pass: 0 },
    isLastTeam: currentTeamIndex >= teamNames.length - 1,
  };
}; 