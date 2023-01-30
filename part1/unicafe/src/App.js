import { useState } from 'react'
const Statistics = (props) => {
  if(props.good || props.bad || props.neutral)
  return (
    
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good+props.bad+props.neutral}</p>
      <p>average {(props.good-props.bad)/(props.good+props.bad+props.neutral)}</p>
      <p>positive {props.good/(props.good+props.bad+props.neutral)*100}%</p>
    </div>
  )
  return (
    <div>
    <h1>statistics</h1>

    <p>No feedback given</p>
    
  </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => {
    
   
    setGood(good+1);
    
  }
  const incNeutral = () => {
    
    
    setNeutral(neutral+1);
   
  }
  const incBad = () => {
    
   
    setBad(bad+1);
  }

 

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incGood}>good</button> 
      <button onClick={incNeutral}>neutral</button>
      <button onClick={incBad}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}/>
  
    </div>
  )
}

export default App