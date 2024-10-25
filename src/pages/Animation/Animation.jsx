// BallComponent.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Animation.css'; //

const Animation = () => {
    const [running, setRunning] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [ballType, setBallType] = useState('none');

    const fieldWidth = 600;
    const fieldHeight = 400;
    const diameter = 50;
    const vx = 5;
    const vy = 5;

    
    useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setPosition((prev) => {
                const newX = goRight ? prev.x + vx : prev.x - vx;
                const newY = goDown ? prev.y + vy : prev.y - vy;
                setGoRight(newX >= fieldWidth - diameter || newX <= 0 ? !goRight : goRight);
                setGoDown(newY >= fieldHeight - diameter || newY <= 0 ? !goDown : goDown);
                return { x: newX, y: newY };
            });
            setRotation((prev) => prev + 2);
        }, 25);

        return () => clearInterval(interval);
    }, [running, goRight, goDown]);

    const handleToggleRun = () => {
        setRunning((prev) => !prev);
    };

    const handleBallType = (type) => {
        setBallType(type);
    };

    return (
        <div className="animation-container">
            <div className="container">
                <div className='field' style={{ width: `${fieldWidth}px`, height: `${fieldHeight}px`, position: 'relative', }}>
                    <div
                        className={`ball ${ballType}`}
                        style={{
                            position: 'absolute',
                            top: `${position.y}px`,
                            left: `${position.x}px`,
                            width: `${diameter}px`,
                            height: `${diameter}px`,
                            transform: `rotate(${rotation}deg)`,
                        }}
                    ></div>
                </div>

                <div className="control mt-3">
                    <button id="run" className={`btn ${running ? 'btn-danger' : 'btn-success'}`} onClick={handleToggleRun}>
                        <span className={`bi ${running ? 'bi-pause' : 'bi-play'}`}></span> {running ? 'PAUSE' : 'RUN'}
                    </button>
                    <button className="btn btn-info" onClick={() => handleBallType('none')}>None</button>
                    <button className="btn btn-info" onClick={() => handleBallType('basketball')}>Basketball</button>
                    <button className="btn btn-info" onClick={() => handleBallType('football')}>Football</button>
                    <button className="btn btn-info" onClick={() => handleBallType('volleyball')}>Volleyball</button>
                    <button className="btn btn-info" onClick={() => handleBallType('human')}>Human</button>
                    <button className="btn btn-info" onClick={() => handleBallType('cartoon')}>Cartoon</button>
                    <button className="btn btn-info" onClick={() => handleBallType('logo')}>Logo</button>
                </div>
            </div>
            </div>
            );
        
};

            export default Animation;
