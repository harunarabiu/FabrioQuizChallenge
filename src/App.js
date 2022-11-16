import { useState, useEffect } from 'react'
import MainNav from './Components/MainNav'
import Quiz from './Components/Quiz'
import Question from './Components/Question'
import AnswerOption from './Components/AnswerOption'
import AnswerOptions from './Components/AnswerOptions'






export default function Example() {
  const [questions, setQuestions] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
 
  

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

  const selectedOption = (option) => {
    if(selectedAnswers.find( x => x === option)){
      
      setSelectedAnswers([...selectedAnswers.filter( x => x !== option)])

    } else {

      setSelectedAnswers([...selectedAnswers, option])

    }
    
  }

 



  if (loading) {
    return <p> loading </p>;
  }


  return (
    <>
   
      <div className="min-h-full">
        
        <MainNav user={user}/>
        <Quiz>
        <Question>
          {question?.questionText}
        </Question>

          <AnswerOptions>
            {question?.answerOptions.map((option, i) => {
                  return <AnswerOption key={i} option={option} selectedOption={selectedOption}/>
              })
            }
          </AnswerOptions>

          
          <div className="pt-5">
            <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Check Answer
                </button>
              </div>
          </div>
      </Quiz>

      </div>

    </>
  )
}
