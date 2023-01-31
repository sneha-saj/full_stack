import { useState } from 'react'

const StatisticLine =  (props) => {
  
  
  
    return(
      <table >
        <tr>
          <td width="55">
            {props.text}
          </td>
          <td>
          {props.value}
          </td>
          
          </tr>
      </table>
    )
}
const Statistics = (props) => {
  if(props.good || props.bad || props.neutral)
  return (
    
    <div>
      <h1>statistics</h1>
     
        
        <StatisticLine text= "good" value = {props.good}/>
        <StatisticLine text= "neutral" value = {props.neutral}/>
        <StatisticLine text= "bad" value = {props.bad}/>
        <StatisticLine text= "all" value = {props.good+props.bad+props.neutral}/>
        <StatisticLine text= "average" value = {(props.good-props.bad)/(props.good+props.bad+props.neutral)}/>
        <StatisticLine text= "positive" value = {props.good/(props.good+props.bad+props.neutral)*100}/>


      
    </div>
  )
  return (
    <div>
    <h1>statistics</h1>

    <p>No feedback given</p>
    
  </div>
  )
}
const Button = (props) => {
  return (
    <div>
      <button onClick={props.incGood}>good</button> 
      <button onClick={props.incNeutral}>neutral</button>
      <button onClick={props.incBad}>bad</button>
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
      <Button incGood = {incGood} incBad={incBad} incNeutral={incNeutral}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
  
    </div>
  )
}

export default App