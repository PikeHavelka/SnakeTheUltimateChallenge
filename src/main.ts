"use strict";
import "./style.css";
import { Game } from "./game/index";

const game = new Game(300, 300);
game.loop();