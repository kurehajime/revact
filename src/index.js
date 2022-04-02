import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import Game from './Components/game.mjs';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <span>
        <canvas id="back"></canvas>
        <div id="app">
            <div id="title">Revact</div>
            <Game />
        </div>
    </span>
);