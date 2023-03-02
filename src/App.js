import { useEffect, useState } from "react";
import FormComponent from "./components/FormComponent";
import { gameService } from "./services/GameService";
import UserFormComponent from "./components/UserComponent";

function App() {
  const [user, setUser] = useState("");
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [badWord, setBadWord] = useState("");

  useEffect(() => {
    handleGetHighScores();
  }, []);

  const handleCreateUser = async (data) => {
    setUser(data.user);
  };

  const handleSubmitWord = async (data) => {
    const response = await gameService.sendWord({ word: data.word, user: user });
    if (response.error) {
      return setBadWord(response.error);
    }

    setBadWord(null);
    setScore(response.data.points);
  };

  async function handleGetHighScores() {
    const response = await gameService.getHighSchores();
    setHighScores(response);
  }

  return (
    <>
      <div className="introduction">
        <h1 className="main-heading">Word Game</h1>
        <div className="instruction-list">
          <h3>The rules are simple:</h3>
          <h3>Rule #1: Write an english word..</h3>
          <h3>Rule #2: You get 1 point for each unique letter</h3>
          <h3>Rule #3: You get 3 points if the word is a palindrome</h3>
          <h3>
            Rule #4: You get 2 points if the word is almost a palindrome (1
            letter give or take, we wil take care of it)
          </h3>
          <h3>Rule #5: Enjoy</h3>
        </div>
      </div>
      {!user ? (
        <div className="user-container">
          <UserFormComponent onSubmit={handleCreateUser} />
        </div>
      ) : (
        <>
          <div className="user-container">
            <h1 className="user-heading">Hello, {user}</h1>
          </div>
          <div className="grid-container">
            <div className="word-container">
              <h1 className="main-heading">WRITE YOUR WORD</h1>
              <FormComponent onSubmit={handleSubmitWord} />
              {badWord ? <h5 className="badword">{badWord}</h5> : ""}
            </div>
            <div className="score-container">
              <h1 className="main-heading">SCORE</h1>
              {score ? <h5 className="points">{score}</h5> : ""}
            </div>
            <div className="score-container">
              <h1 className="main-heading">HIGH SCORES</h1>
              <div className="highscore-container">
                <h3 className="highscore">Name:</h3>
                <h3 className="highscore">Points:</h3>
                {highScores &&
                  highScores.map((hScore) => (
                    <>
                      <h5 className="highscore">{hScore.name}</h5>
                      <h5 className="highscore">{hScore.points}</h5>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
