const Course = ({ courses }) => {
  return (
    <>
      <ul>
        <h1>Web Development Curriculum</h1>
      </ul>
      {courses.map((course, i) => {
        const total = course.parts.reduce(
          (result, item) => result + item.exercises,
          0
        );
        return (
          <ul key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map((item) => (
              <p key={item.id}>
                {item.name} {item.exercises}
              </p>
            ))}
            <h4>total of {total} exercises</h4>
          </ul>
        );
      })}
    </>
  );
};

export default Course;
