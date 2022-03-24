import React, { useEffect, useState } from "react";
import "./app.scss";
import { Timer } from "./timer";

enum SceneID {
  Title,
  Game,
  End,
}

const Colors = ["red", "black", "yellow", "green", "blue", "white"];

function getRandomElement<T>(arr: Array<T>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [scene, setScene] = useState(SceneID.Title);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [currentColor, setCurrentColor] = useState("black");

  const getColorText = (actualColor: string) => {
    let myPossibleColors = [...Colors].filter((x) => x !== actualColor);
    return (
      <p
        style={{
          color: getRandomElement(myPossibleColors),
          marginLeft: `${Math.random() * 40}vmin`,
          marginTop: `${Math.random() * 30}vmin`,
          position: "absolute",
        }}
      >
        {actualColor}
      </p>
    );
  };

  let rainbow = (
    <img
      src="./rainbow.jpeg"
      alt="!"
      style={{ width: "50vmin", height: "37.5vmin" }}
    />
  );

  let sceneJSX: any = "";

  if (scene === SceneID.Title) {
    sceneJSX = (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ position: "absolute" }}>Color Clicker</h1>
        </div>
        {rainbow}
        <div className="__below_rainbow__">
          <p>PLAYER NAME:</p>
          <input
            style={{
              width: "75%",
              height: "5vmin",
            }}
            type="text"
            onChange={(a) => {
              setPlayerName(a.target.value);
            }}
          />
          <button
            style={{
              width: "100%",
              height: "30%",
              margin: "3%",
              backgroundColor: "green",
            }}
            onClick={() => {
              if (playerName !== "") setScene(SceneID.Game);
            }}
          >
            <p>PLAY!</p>
          </button>
        </div>
      </div>
    );
  }

  const makeColorButton = (color: string) => {
    return (
      <button
        style={{ backgroundColor: color, borderWidth: "1vmin" }}
        key={color}
        onClick={() => {
          setScore(score + (currentColor === color ? 1 : -1));
          setCurrentColor(getRandomElement(Colors));
        }}
      >
        <p style={{ color: "gray" }}>{color}</p>
      </button>
    );
  };

  if (scene === SceneID.Game) {
    sceneJSX = (
      <div>
        {getColorText(currentColor)}
        {rainbow}{" "}
        <div className="__below_rainbow__">
          <div
            style={{
              width: "100%",
              height: "70%",
              display: "grid",
              gridTemplateColumns: `repeat(${3},1fr)`,
              gridTemplateRows: `repeat(${2},1fr)`,
            }}
          >
            {Colors.map((x) => makeColorButton(x))}
          </div>
          <Timer
            startTime={30}
            endTime={0}
            stepDuration={1000}
            onDone={() => {
              setScene(SceneID.End);
            }}
            timeText={(time) => `Time Remaining: ${time}`}
          />{" "}
          <p>{`Score: ${score}`}</p>
        </div>
      </div>
    );
  }

  if (scene === SceneID.End) {
    sceneJSX = (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{ position: "absolute" }}
          >{`Congratulations ${playerName.toUpperCase()}!`}</p>
          <p
            style={{ position: "absolute", marginTop: "10vmin" }}
          >{`You got a score of ${score}.`}</p>
        </div>
        {rainbow}{" "}
        <div className="__below_rainbow__">
          <button
            onClick={() => {
              setScene(SceneID.Title);
              setScore(0);
              setPlayerName("");
            }}
          >
            <p>Play Again?</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "50vmin", height: "75vmin", backgroundColor: "gray" }}>
      {sceneJSX}
    </div>
  );
}

export default App;
