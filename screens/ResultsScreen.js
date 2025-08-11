import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { GlobalStyles, ResultStyles } from '../styles/GlobalStyles';

const ResultsScreen = ({ 
  currentTeam, 
  allTeamsStats = [], // Default to empty array
  onNextTeam, 
  onFinishGame, 
  onBackToMenu 
}) => {
  // Sort teams by score for leaderboard display - with safety checks
  const sortedTeams = Array.isArray(allTeamsStats) 
    ? [...allTeamsStats].sort((a, b) => (b.stats?.correct || 0) - (a.stats?.correct || 0))
    : [];

  // If no teams, show loading or error state
  if (!sortedTeams || sortedTeams.length === 0) {
    return (
      <SafeAreaView style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Yükleniyor...</Text>
        <TouchableOpacity style={GlobalStyles.backButton} onPress={onBackToMenu}>
          <Text style={GlobalStyles.backButtonText}>Ana Menü</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={[GlobalStyles.title, { fontSize: 32, marginBottom: 25 }]}>🏆 Tur Sonucu</Text>
      
      {/* Current team highlight */}
      {currentTeam && (
        <View style={ResultStyles.currentTeamHighlight}>
          <Text style={ResultStyles.currentTeamText}>
            {currentTeam} takımının turu bitti!
          </Text>
          <Text style={ResultStyles.countdownText}>
            Hazır olduğunuzda sonraki takıma geçebilirsiniz
          </Text>
        </View>
      )}

      {/* All teams statistics */}
      <ScrollView style={ResultStyles.teamsContainer} showsVerticalScrollIndicator={false}>
        {sortedTeams.map((team, index) => {
          // Safety check for team and stats
          if (!team || !team.stats) return null;
          
          return (
            <View 
              key={`team-${index}-${team.name || 'unnamed'}`}
              style={[
                ResultStyles.teamCard,
                team.name === currentTeam && ResultStyles.currentTeamCard,
                index === 0 && ResultStyles.winnerCard
              ]}
            >
              {/* Team position and name */}
              <View style={ResultStyles.teamHeader}>
                <View style={ResultStyles.teamPosition}>
                  <Text style={[
                    ResultStyles.positionText,
                    index === 0 && ResultStyles.winnerText
                  ]}>
                    {index + 1}.
                  </Text>
                  {index === 0 && (
                    <Text style={ResultStyles.crownEmoji}>👑</Text>
                  )}
                </View>
                <Text style={[
                  ResultStyles.teamName,
                  index === 0 && ResultStyles.winnerTeamName
                ]}>
                  {team.name || `Takım ${index + 1}`}
                </Text>
                <Text style={[
                  ResultStyles.teamScore,
                  index === 0 && ResultStyles.winnerScore
                ]}>
                  {team.stats.correct || 0} puan
                </Text>
              </View>

              {/* Team statistics */}
              <View style={ResultStyles.teamStatsRow}>
                <View style={ResultStyles.miniStatItem}>
                  <Text style={ResultStyles.miniStatNumber}>{team.stats.correct || 0}</Text>
                  <Text style={ResultStyles.miniStatLabel}>Doğru</Text>
                </View>
                <View style={ResultStyles.miniStatItem}>
                  <Text style={ResultStyles.miniStatNumber}>{team.stats.taboo || 0}</Text>
                  <Text style={ResultStyles.miniStatLabel}>Tabu</Text>
                </View>
                
                <View style={ResultStyles.miniStatItem}>
                  <Text style={ResultStyles.miniStatNumber}>{team.stats.pass || 0}</Text>
                  <Text style={ResultStyles.miniStatLabel}>Pas</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Action buttons */}
      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity style={ResultStyles.nextTeamButton} onPress={onNextTeam}>
          <Text style={ResultStyles.nextTeamButtonText}>
            Sonraki Takım
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={GlobalStyles.backButton} onPress={onBackToMenu}>
          <Text style={GlobalStyles.backButtonText}>Oyunu Bitir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultsScreen; 