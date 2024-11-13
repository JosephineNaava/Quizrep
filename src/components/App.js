import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";


const initialState = {
  questions: [],
  status: "Loading"
  // loading, error, ready, active, finished (different states)
}

function reducer( state, action){
  switch(action.type){
    case "dataRecieved":
      return {
        ...state, 
        question: action.payload,
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }

    default:
      throw new Error ("Unknown Action")
  }
}

function App() {

  const [state, dispatch]= useReducer(reducer, initialState);

  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then((data) => dispatch({ type: "dataRecieved", payload : data}))
    .catch((err) => dispatch ({type: "dateFailed"}))
  }, []);
  
  return (
    <div className="app">

      <Header/>

      <Main>
        <p>1/15</p>
        <p>Question?</p>
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
