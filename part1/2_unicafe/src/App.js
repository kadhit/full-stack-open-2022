import { useState } from "react";

import "./App.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addOne = (state, setState) => {
    return () => setState(state + 1);
  };

  const average = (good - bad) / (good + bad + neutral);
  const positivePercentage = `${(good / (good + bad + neutral)) * 100} %`;

  return (
    <div className='App'>
      <h1>Give Feedback</h1>
      <Button handleClick={addOne(good, setGood)} name='good' />
      <Button handleClick={addOne(neutral, setNeutral)} name='neutral' />
      <Button handleClick={addOne(bad, setBad)} name='bad' />

      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positives={positivePercentage}
      />
    </div>
  );
};

const Statistics = ({ good, neutral, bad, average, positives }) => {
  if (good || neutral || bad) {
    return (
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Positive' value={positives} />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

export default App;
