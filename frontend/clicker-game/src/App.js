import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState('123'); // Замените на реальный идентификатор пользователя

  useEffect(() => {
    // Загрузка текущего счета пользователя при загрузке приложения
    axios.get(`/get_score?user_id=${userId}`)
      .then(response => {
        setScore(response.data.score);
      })
      .catch(error => {
        console.error('There was an error fetching the score!', error);
      });
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Отправка текущего счета на сервер каждые 3 секунды
      axios.post('/update_score', {
        user_id: userId,
        score: score
      }).catch(error => {
        console.error('There was an error updating the score!', error);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [score, userId]);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Clicker Game</h1>
        <p>Ваш счет: {score}</p>
        <button onClick={handleClick}>Клик!</button>
      </header>
    </div>
  );
}

export default App;
