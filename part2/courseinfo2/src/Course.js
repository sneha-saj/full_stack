import React from 'react';

const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const sum = props.parts.reduce((total, part) => total + part.exercises, 0);
  return <p><strong>total of {sum} exercises</strong></p>;
};

const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
