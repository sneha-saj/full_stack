import { useState } from 'react'
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
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+bad+neutral}</p>
    </div>
  )
}

export default App