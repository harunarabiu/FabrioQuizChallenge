import { useState, useEffect } from 'react'
import MainNav from './Components/MainNav'
import Quiz from './Components/Quiz'
import Question from './Components/Question'
import AnswerOption from './Components/AnswerOption'
import AnswerOptions from './Components/AnswerOptions'
import Modal from './Components/Modal'






export default function App() {
  const [questions, setQuestions] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [resultMessage, setResultMessage] = useState({type:"incorrect", text:""})
  const [revealAnswers, setRevealAnswers] = useState(false)
 
  

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

  const checkAnswer = () => {
    
    if(selectedAnswers === "undefined" || selectedAnswers.length<=0){
      setShowResult(true)
      resultMessage.type = "incorrect"
      resultMessage.text = "No Answers is Selected"
      setResultMessage({...resultMessage})
      return;
    }
    if(question.answerOptions.filter((option) => option.isCorrect === "true" ).length !== selectedAnswers.length){
      setShowResult(true)
      resultMessage.type = "incorrect"
      resultMessage.text = "Answers not complete"
      setResultMessage({...resultMessage})
      return;
    }

    if(selectedAnswers.filter((option) => option.isCorrect === "true" ).length !== selectedAnswers.length){
      setShowResult(true)
      resultMessage.type = "incorrect"
      resultMessage.text = "Some Answers are wrong"
      setResultMessage({...resultMessage})
      return;
    }

    setResultMessage({type:"correct", text:""})
    setShowResult(true)


  }

  const handleClose = () => {
    setShowResult(false)
  }

  const reveal = (option) => {
    setShowResult(false)
    setRevealAnswers(option);
    
  }

  const nextQuestion= () => {

    if(activeQuestionIndex ===  -1) {
      setActiveQuestionIndex(0)
      return;
    }

    if(questions.length < activeQuestionIndex+1 ){
      setActiveQuestionIndex(activeQuestionIndex+1)
    } else {
      setActiveQuestionIndex(-1)
    }

  }

  const previousQuestion= () => {

    activeQuestionIndex === -1 ? setActiveQuestionIndex(0) : setActiveQuestionIndex(activeQuestionIndex-1)

  }

 



  if (loading) {
    return <p> loading </p>;
  }


  return (
    <>
   
      <div className="min-h-full">
        
        <MainNav user={user}/>
        <Quiz>
        {
            activeQuestionIndex >= 0 ? (
              <>
              <Question>
                {question?.questionText}
              </Question>

                <AnswerOptions>
                  {question?.answerOptions.map((option, i) => {
                        return <AnswerOption key={i} option={option} revealAnswers={revealAnswers} selectedOption={selectedOption}/>
                    })
                  }
                </AnswerOptions>

                
                <div className="pt-5">
                  <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={checkAnswer}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Check Answer
                      </button>
                    </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="mt-2 text-sm font-medium text-gray-900">Quiz Completed</h3>
                <div className="mt-6">
                  <button
                    onClick={previousQuestion}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  
                    Retake Quiz
                  </button>
                </div>
              </div>
            )

          }
          
      </Quiz>

      <Modal status={showResult} message={resultMessage} close={handleClose} revealAnswers={reveal}/>

      </div>

      <div className="px-6 py-4 bg-gray-700 shadow">

        <div className="flex justify-end ">
            <button  onClick={nextQuestion} className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Next
            </button>
        </div>
      </div>

    </>
  )
}
