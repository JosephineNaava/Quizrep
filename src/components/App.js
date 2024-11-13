import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Questions from "./Questions";



const initialState = {
  questions: [],
  status: "Loading",
  // loading, error, ready, active, finished (different states)
  index: 0,
  answer: null,
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
        return {
          ...state,
          answer: action.payload,
        }
      

    default:
      throw new Error("Unknown Action");
  }
}

function App() {

  const [{questions, status, index, answer}, dispatch]= useReducer(reducer, initialState);

  const numQuestions = questions.length
  
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
        {status=== "Loading" &&  <Loader/>}
        {status=== "error" &&  <Error/>}
        {status=== "ready" && <StartScreen numQuestions={numQuestions}
         dispatch={dispatch}/> }
        {status=== "active" && <Questions question={questions[index]} 
         answer={answer} dispatch={dispatch}/> }
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
