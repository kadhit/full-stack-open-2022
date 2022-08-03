import "./App.css";

const App = () => {
  const courseName = "Half Stack Application Development";
  const data = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];
  return (
    <div className="App">
      <Header course={courseName}/>
      {data.map((item) => (
        <Content part={item.part} exercises={item.exercises} />
      ))}
      <Total
        total={data.reduce((result, item) => result + item.exercises, 0)}
      />
    </div>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.part}, {props.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <h4>Number of Exercises: {props.total}</h4>
    </>
  );
};

export default App;
