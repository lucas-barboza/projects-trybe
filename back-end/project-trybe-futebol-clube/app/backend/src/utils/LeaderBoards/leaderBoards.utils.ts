import ILeaderBoards from '../../Interfaces/ILeaderBoards';
import IMatches from '../../Interfaces/IMatches';

function matchResultHome(teamId: number, match: IMatches) {
  if (teamId === match.homeTeamId) {
    if (match.homeTeamGoals > match.awayTeamGoals) return 'win';
    if (match.homeTeamGoals < match.awayTeamGoals) return 'loss';
  }
  return 'draw';
}

function matchResultAway(teamId: number, match: IMatches) {
  if (teamId === match.awayTeamId) {
    if (match.homeTeamGoals < match.awayTeamGoals) return 'win';
    if (match.homeTeamGoals > match.awayTeamGoals) return 'loss';
  }
  return 'draw';
}

function matchResults(matches: IMatches[], teamId: number, mode: string) {
  const matchesResults = matches.map((match) => {
    if (mode === 'home') {
      return matchResultHome(teamId, match);
    }
    return matchResultAway(teamId, match);
  });

  const wins = matchesResults.filter((match) => match === 'win').length;
  const losses = matchesResults.filter((match) => match === 'loss').length;
  const draws = matchesResults.filter((match) => match === 'draw').length;
  const points = wins * 3 + draws;
  const totalGames = wins + losses + draws;

  return { points, wins, draws, losses, totalGames };
}

function goalsCount(matches: IMatches[], teamId: number) {
  const goalsFavor = matches.reduce((cont, match) => {
    if (teamId === match.homeTeamId) {
      return cont + match.homeTeamGoals;
    }
    return cont + match.awayTeamGoals;
  }, 0);

  const goalsOwn = matches.reduce((cont, match) => {
    if (teamId === match.homeTeamId) {
      return cont + match.awayTeamGoals;
    }
    return cont + match.homeTeamGoals;
  }, 0);
  const goalsBalance = goalsFavor - goalsOwn;
  return { goalsFavor, goalsOwn, goalsBalance };
}

function updateClassify(teamsStats: ILeaderBoards[]): ILeaderBoards[] {
  const newClassify = teamsStats.sort((teamA, teamB) => {
    if (teamA.totalPoints !== teamB.totalPoints) {
      return teamB.totalPoints - teamA.totalPoints;
    }
    if (teamA.totalVictories !== teamB.totalVictories) {
      return teamB.totalVictories - teamA.totalVictories;
    }
    if (teamA.goalsBalance !== teamB.goalsBalance) {
      return teamB.goalsBalance - teamA.goalsBalance;
    }
    return teamB.goalsFavor - teamA.goalsFavor;
  });
  return newClassify;
}

function formatterForLeaderBoardModel(tName: string, mactch: IMatches[], id: number, mode: string) {
  const { points, wins, draws, losses, totalGames } = matchResults(mactch, id, mode);
  const { goalsFavor, goalsOwn, goalsBalance } = goalsCount(mactch, id);
  const efficiency = (points / (totalGames * 3)) * 100;
  const formatedEfficiency = efficiency.toFixed(2);
  return {
    name: tName,
    totalPoints: points,
    totalGames,
    totalVictories: wins,
    totalDraws: draws,
    totalLosses: losses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency: Number(formatedEfficiency),
  };
}

function sumHomeAndAway(h: ILeaderBoards, a: ILeaderBoards) {
  const efficiency = ((h.totalPoints + a.totalPoints) / ((h.totalGames + a.totalGames) * 3)) * 100;
  const formatedEfficiency = efficiency.toFixed(2);
  const sumHomeAway = {
    name: h.name,
    totalPoints: h.totalPoints + a.totalPoints,
    totalGames: h.totalGames + a.totalGames,
    totalVictories: h.totalVictories + a.totalVictories,
    totalDraws: h.totalDraws + a.totalDraws,
    totalLosses: h.totalLosses + a.totalLosses,
    goalsBalance: h.goalsBalance + a.goalsBalance,
    goalsFavor: h.goalsFavor + a.goalsFavor,
    goalsOwn: h.goalsOwn + a.goalsOwn,
    efficiency: Number(formatedEfficiency),
  };
  return sumHomeAway;
}

function classify(home: ILeaderBoards[], away: ILeaderBoards[]): ILeaderBoards[] {
  const newClassify = home.map((homeTeam) => {
    const findAway = away.find((awayTeam) => awayTeam.name === homeTeam.name);
    return sumHomeAndAway(homeTeam, findAway as ILeaderBoards);
  });
  return updateClassify(newClassify);
}

export default {
  formatterForLeaderBoardModel,
  updateClassify,
  classify,
};
