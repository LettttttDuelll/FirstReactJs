import { useState } from 'react';
import './calculator.css';
export default function MyApp() {

  const [count, setCount] = useState("");

  const [history, setHistory] = useState([]);

  let audiom;

  function ClickOnce(MyButton) {
    return (
      setCount(count + MyButton.name)
    );
  }

  function DeleteLast() {
    if (count.length > 0) {
      setCount(count.slice(0, -1));
    }
  }

  function DeleteAll() {
    return (
      setCount(" ")
    );
  }

  function PlayMusic({ MusicName }) {
    if (audiom) {
      audiom.pause();
      audiom.currentTime = 0;
    }
    audiom = new Audio(`${process.env.PUBLIC_URL}/${MusicName}.mp3`);
    audiom.volume = 0.5; // Set volume to 50%
    audiom.loop = true; // Loop the audio
    audiom.playbackRate = 1.0; // Set playback speed to normal
    audiom.play();
  }

  function Equals() {
    try {
      // eslint-disable-next-line
      const expression = count.replace(/x/g, '*');
      const rawResult = eval(expression);
      const result = parseFloat(rawResult.toFixed(9)).toString();
      setCount(result.toString());
      setHistory([history, `${count} = ${result}`]);
      return result;
    } catch (error) {
      console.error("Invalid expression", error);
      setCount("Error");
    }

  }
  const FirstLine = ["1", "2", "3", "+"];
  const SecondLine = ["4", "5", "6", "/"];
  const ThirdLine = ["7", "8", "9", "x"];
  const FourthLine = [".", "0", "=", "/"];
  return (
    <>
      <div>
        <h1>Hand-up Calculator</h1>
        <div className='ShowResult'>
          <h1>{count}</h1>
        </div>
      </div>
      <div>
        <button className="MyButton" onClick={() => PlayMusic({ MusicName: "Hope" })}>Hope</button>
        <button className="MyButton" onClick={() => PlayMusic({ MusicName: "World" })}>World</button>
        <MyButton onClick={DeleteLast} name={'AC'} />
        <MyButton onClick={DeleteAll} name={'DEL'} />
      </div>
      <div>
        {FirstLine.map((value, index) => (
          <MyButton key={index} onClick={ClickOnce} name={value} />
        ))}
      </div>
      <div>
        {SecondLine.map((value,index)=>(
          <MyButton key={index} onClick={ClickOnce} name={value} />
        ))}
      </div>
      <div>
        {ThirdLine.map((value,index)=> (
          <MyButton key = {index} onClick={ClickOnce} name={value} />
        ))}
      </div>
      <div>
        {FourthLine.map((value,index)=> (
          <MyButton key = {index} onClick={value === "=" ? Equals : ClickOnce} name={value} />
        ))}
      </div>
      <div>
        <h2>History</h2>
        <div className="history">
          {history.map((item, index) => (
            <div key={index} className="history">{item}</div>
          ))}
        </div>
      </div>
    </>
  );
}

function MyButton({ name, onClick }) {
  return (
    <button className="MyButton" onClick={() => onClick({ name })}
    >{name}</button>
  );
}