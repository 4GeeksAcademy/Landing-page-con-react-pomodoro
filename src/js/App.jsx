import React, { useState, useEffect } from 'react';
import './App.css'; 

const App = () => {
    const [timeLeft, setTimeLeft] = useState(0); 
    const [running, setRunning] = useState(false); 

    useEffect(() => {
        let timer;
        if (running && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && running) {
            alert('¡Tiempo de cocción ha terminado!');
            setRunning(false);
        }
        return () => clearInterval(timer); 
    }, [running, timeLeft]);

    const handleStart = (minutes) => {
        const totalSeconds = minutes * 60; 
        setTimeLeft(totalSeconds);
        setRunning(true);
    };

    const handleExtraMinute = () => {
        setTimeLeft(prev => prev + 60); 
    };

    const handleToggle = () => {
        setRunning(prev => !prev); 
    };

    const handleReset = () => {
        setTimeLeft(0); 
        setRunning(false); 
    };

    return (
        <div className="container">
            <h1>¡A cocinar!</h1>
            <div className="controls">
                <div className="pomodoro">
                    <div 
                        className="time-display" 
                        style={{ color: timeLeft <= 10 ? 'yellow' : 'white' }} 
                    >
                        {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => handleStart(10)} disabled={running}>10 min (Pasta) 🍝</button>
                    <button onClick={() => handleStart(15)} disabled={running}>15 min (Carne) 🍖</button>
                    <button onClick={() => handleStart(20)} disabled={running}>20 min (Galletas) 🍪</button>
                    <button onClick={handleExtraMinute} disabled={!running}>Minuto Extra ⏰</button>
                    <button onClick={handleToggle}>{running ? 'Parar ⏸️' : 'Continuar ▶️'}</button>
                    <button onClick={handleReset}>Borrar 🚫</button>
                </div>
            </div>
        </div>
    );
};

export default App;

