import { useState } from 'react';
import './calculator.css';
export default function MyApp() {

  const [count, setCount] = useState("");

  let audiom ;

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

  function PlayHope() {
    if (audiom) {
    audiom.pause();
    audiom.currentTime = 0;
  }
    audiom = new Audio(`${process.env.PUBLIC_URL}/Hope.mp3`);
    audiom.volume = 0.5; // Set volume to 50%
    audiom.loop = true; // Loop the audio
    audiom.playbackRate = 1.0; // Set playback speed to normal
    audiom.play();
  }

  function PlayWorld() {
    if (audiom) {
    audiom.pause();
    audiom.currentTime = 0;
  }
    audiom = new Audio(`${process.env.PUBLIC_URL}/World.mp3`);
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
      return result;
    } catch (error) {
      console.error("Invalid expression", error);
      setCount("Error");
    }

  }
  return (
    <>
      <div>
        <h1>Hand-up Calculator</h1>
        <div className='ShowResult'>
          <h1>{count}</h1>
        </div>
      </div>
      <div>
        <button className="MyButton" onClick={PlayHope} >Hope</button>
        <button className="MyButton" onClick={PlayWorld}>World</button>
        <MyButton onClick={DeleteLast} name={'AC'} />
        <MyButton onClick={DeleteAll} name={'DEL'} />
      </div>
      <div>
        <MyButton onClick={ClickOnce} name={'1'} />
        <MyButton onClick={ClickOnce} name={'2'} />
        <MyButton onClick={ClickOnce} name={'3'} />
        <MyButton onClick={ClickOnce} name={'+'} />
      </div>
      <div>
        <MyButton onClick={ClickOnce} name={'4'} />
        <MyButton onClick={ClickOnce} name={'5'} />
        <MyButton onClick={ClickOnce} name={'6'} />
        <MyButton onClick={ClickOnce} name={'/'} />
      </div>
      <div>
        <MyButton onClick={ClickOnce} name={'7'} />
        <MyButton onClick={ClickOnce} name={'8'} />
        <MyButton onClick={ClickOnce} name={'9'} />
        <MyButton onClick={ClickOnce} name={'x'} />
      </div>
      <div>
        <MyButton onClick={ClickOnce} name={'.'} />
        <MyButton onClick={ClickOnce} name={'0'} />
        <MyButton onClick={Equals} name={'='} />
        <MyButton onClick={ClickOnce} name={'/'} />
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