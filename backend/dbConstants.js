const DB_NAME = "COP4331Cards";
const COLLECTIONS = {
  QUIZZES: "Quizzes", // Stores quiz description information, questions, and answers
  QUIZ_GAMES: "QuizzGames", // Stores active quiz games that people play via access codes
  QUIZ_SESSIONS: "QuizzSessions", // Stores individual responses from players
  USERS: "Users", // Stores login information for permanent users
};

module.exports = {
  DB_NAME,
  COLLECTIONS,
};
