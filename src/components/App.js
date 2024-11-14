import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";



const initialState = {
  questions: [],
  status: "Loading",
  // loading, error, ready, active, finished (different states)
  index: 0,
  answer: null,
  points: 0,
  
}

function reducer( state, action){
  switch(action.type){
    case "dataRecieved":
      return {
        ...state, 
        questions: action.payload,
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }
      case "startQuiz":
        return {
          ...state,
          status: "active",
        }
      case "newAnswer":
        
      const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
              action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        }
      case "nextQuestion":
        return {
          ...state,
          index: state.index +1,
          answer: null
        }

      case "End":
        return {
          ...state,
         status:"finish",
        }

      case "Reset":
        return {
          ...initialState,
          questions: state.questions,
          status:"ready",
  
        }
        
      

    default:
      throw new Error("Unknown Action");
  }
}

function App() {

  const [{questions, status, index, answer, points }, dispatch]= useReducer(reducer, initialState);

  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, cur)=> prev + cur.points, 0)
  
  // asynchronous data fetching and error handling 
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then((data) => dispatch({ type: "dataRecieved", payload : data}))
    .catch((err) => dispatch ({type: "dataFailed"}))
  }, []);
  
  return (
    <div className="app">

      <Header/>

      <Main>
        {status=== "Loading" && ( <> dispatch={dispatch} <Loader/></>)}
        {status=== "error" &&  <Error/>}

        {status=== "ready" && <StartScreen numQuestions={numQuestions}
         dispatch={dispatch}/> }

        {status=== "active" && (
          <>   
          <Progress 
            numQuestions={numQuestions} 
            points={points} 
            index={index} 
            maxPoints={maxPoints}
            answer={answer}
            />
          <Questions 
            question={questions[index]} 
            dispatch={dispatch} 
            answer={answer}
           />
          
          <NextButton 
            dispatch={dispatch} 
            answer={answer} 
            numQuestions={numQuestions} 
            index={index} 
          />
          </>
        )}

        {status === "finish" && (
          <Finished points = {points} maxPoints = {maxPoints} dispatch={dispatch} 
          />        
            ) }
        
      
      </Main>

      

    </div>
  ) 
}

export default App







// import DateCounter from "./DateCounter";
// function App() {
//   return (
//     <div>
//        <DateCounter/>
//     </div>
//   );
// }
// export default App;
