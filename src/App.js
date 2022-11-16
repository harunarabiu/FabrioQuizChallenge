import { useState, useEffect } from 'react'
import MainNav from './Components/MainNav'




export default function Example() {
  const [questions, setQuestions] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
 
  

  useEffect(()=> {
    
    fetchData()

  }, [])

  const ENDPOINT = "http://127.0.0.1:3030";
  const question = questions[activeQuestionIndex]?.data.getStep.stepQuiz


  const fetchData = () => {

    setLoading(true)
    fetch(`${ENDPOINT}/questions`)
    .then(res => res.json())
    .then(result => {
        setQuestions([...result])

    })

    fetch(`${ENDPOINT}/users`)
    .then(res => res.json())
    .then(result => {
        setUser(result[0])
        setLoading(false)
    })
  }

 



  if (loading) {
    return <p> loading </p>;
  }


  return (
    <>
   
      <div className="min-h-full">
        
        <MainNav user={user}/>

      </div>

    </>
  )
}
