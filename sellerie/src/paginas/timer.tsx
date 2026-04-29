import { useState, useEffect } from 'react'
import '../style/timer.css'

function Timer() {
    const [totalSeconds, setTotalSeconds] = useState(300)
    const [remainingSeconds, setRemainingSeconds] = useState(300)
    const [isRunning, setIsRunning] = useState(false)
    const [inputMinutes, setInputMinutes] = useState('5')
    const [inputSeconds, setInputSeconds] = useState('0')

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null

        if (isRunning && remainingSeconds > 0) {
            interval = setInterval(() => {
                setRemainingSeconds((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, remainingSeconds])

    // Formata tempo para MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Handler: Inicia/Pausa
    const handlePlayPause = () => {
        if (remainingSeconds > 0) {
            setIsRunning(!isRunning)
        }
    }

    // Handler: Para e reseta
    const handleStop = () => {
        setIsRunning(false)
        setRemainingSeconds(totalSeconds)
    }

    // Handler: Define novo tempo
    const handleSetTime = () => {
        const mins = parseInt(inputMinutes) || 0
        const secs = parseInt(inputSeconds) || 0
        const total = mins * 60 + secs

        if (total > 0) {
            setTotalSeconds(total)
            setRemainingSeconds(total)
            setIsRunning(false)
        }
    }

    // Handler: Incrementar 1 minuto
    const handleAddMinute = () => {
        const newTotal = totalSeconds + 60
        setTotalSeconds(newTotal)
        setRemainingSeconds(newTotal)
        setIsRunning(false)
    }

    // Handler: Decrementar 1 minuto
    const handleSubtractMinute = () => {
        const newTotal = Math.max(0, totalSeconds - 60)
        setTotalSeconds(newTotal)
        setRemainingSeconds(newTotal)
        setIsRunning(false)
    }

    return (
        <div className='Timer'>
            <h1>Cronômetro da Receita</h1>

            {/* Display do tempo */}
            <div className="timer-display">
                <span className={remainingSeconds <= 60 && remainingSeconds > 0 ? 'alert' : ''}>
                    {formatTime(remainingSeconds)}
                </span>
            </div>

            {/* Barra de progresso */}
            <div className="timer-progress-bar">
                <div
                    className="timer-progress-fill"
                    style={{
                        width: `${totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0}%`,
                    }}
                ></div>
            </div>

            {/* Controles principais */}
            <div className="timer-controls">
                <button className="btn btn-play-pause" onClick={handlePlayPause} disabled={remainingSeconds === 0}>
                    {isRunning ? '⏸ Pausar' : '▶ Iniciar'}
                </button>
                <button className="btn btn-stop" onClick={handleStop}>
                    ⏹ Parar
                </button>
            </div>

            {/* Edição de tempo */}
            <div className="timer-input-section">
                <h2>Definir Tempo</h2>
                <div className="timer-input-group">
                    <div className="input-field">
                        <label htmlFor="minutes">Minutos</label>
                        <input
                            id="minutes"
                            type="number"
                            value={inputMinutes}
                            onChange={(e) => setInputMinutes(e.target.value)}
                            min="0"
                            max="99"
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="seconds">Segundos</label>
                        <input
                            id="seconds"
                            type="number"
                            value={inputSeconds}
                            onChange={(e) => setInputSeconds(e.target.value)}
                            min="0"
                            max="59"
                        />
                    </div>
                </div>
                <button className="btn btn-set-time" onClick={handleSetTime}>
                    ✓ Confirmar Tempo
                </button>
            </div>

            {/* Botões de ajuste rápido */}
            <div className="timer-quick-adjust">
                <h2>Ajuste Rápido</h2>
                <div className="quick-buttons">
                    <button className="btn btn-adjust" onClick={handleSubtractMinute}>
                        ➖ -1 min
                    </button>
                    <button className="btn btn-adjust" onClick={handleAddMinute}>
                        ➕ +1 min
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timer;