import { useState } from "react";

import "./App.css";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const initialState = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(initialState);
  const [maxVoteIndex, setMaxVoteIndex] = useState(0);

  const randomAnecdote = () => {
    return () => setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteHandler = (at) => {
    return () => {
      const copy = [...vote];
      copy[at] += 1;
      setVote(copy);
      setMaxVoteIndex(copy.indexOf(Math.max(...copy)));
    };
  };

  return (
    <div className='App'>
      <h1>Anecdotes of the day</h1>
      <blockquote>{anecdotes[selected]}</blockquote>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={voteHandler(selected)} name='Vote' />
      <Button handleClick={randomAnecdote()} name='Next' />

      <h1>Anecdote with most votes</h1>
      <blockquote>{anecdotes[maxVoteIndex]}</blockquote>
      <p>has {vote[maxVoteIndex]} votes</p>
    </div>
  );
};

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

export default App;
