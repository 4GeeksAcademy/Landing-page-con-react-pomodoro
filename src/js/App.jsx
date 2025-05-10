import React, { useState, useEffect } from 'react';
import './App.css'; // Importa el archivo CSS

const App = () => {
    const [timeLeft, setTimeLeft] = useState(0); // Estado para el tiempo restante
    const [running, setRunning] = useState(false); // Estado para manejar si está corriendo

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
        return () => clearInterval(timer); // Limpia el intervalo al finalizar
    }, [running, timeLeft]);

    const handleStart = (minutes) => {
        const totalSeconds = minutes * 60; // Convertir a segundos
        setTimeLeft(totalSeconds);
        setRunning(true);
    };

    const handleExtraMinute = () => {
        setTimeLeft(prev => prev + 60); // Agrega un minuto extra
    };

    const handleToggle = () => {
        setRunning(prev => !prev); // Alterna entre corriendo y detenido
    };

    const handleReset = () => {
        setTimeLeft(0); // Restablece el tiempo a cero
        setRunning(false); // Asegúrate de que esté detenido
    };

    const getDegrees = () => {
        // Ajustar el cálculo de grados
        if (timeLeft > 0) {
            return (360 * timeLeft) / (timeLeft); // Grados del círculo
        }
        return 0; // Si el tiempo es 0, el círculo está completamente rojo
    };

    return (
        <div className="container">
            <h1>¡A cocinar!</h1>
            <div className="kitchen-table">
                <div className="pomodoro">
                    <div
                        className="progress-circle"
                        // style={{
                        //     background: `conic-gradient(green ${getDegrees()}deg, red 0deg)`
                        // }}
                    ></div>
                    <div className="time-display">
                        {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                    </div>
                    <div className="green-circle"></div> {/* Círculo verde en la parte superior */}
                </div>
                <div className="buttons">
                    <button onClick={() => handleStart(10)} disabled={running}>10 min (Pasta) 🍝</button>
                    <button onClick={() => handleStart(15)} disabled={running}>15 min (Carne) 🍖</button>
                    <button onClick={() => handleStart(20)} disabled={running}>20 min (Galletas) 🍪</button>
                    <button onClick={handleExtraMinute} disabled={!running}>Minuto Extra ⏰</button> {/* Botón de minuto extra */}
                    <button onClick={handleToggle}>{running ? 'Parar ⏸️' : 'Continuar ▶️'}</button> {/* Botón de pausar/reanudar */}
                    <button onClick={handleReset}>Borrar 🚫</button> {/* Botón de borrar */}
                </div>
            </div>
        </div>
    );
};

export default App;
