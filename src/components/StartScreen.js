function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start">
            <h3>Welcome To The React Quiz</h3>
            <h4>{numQuestions} questions to test your React mastery</h4>
            <button className=" btn btn-ui" onClick={()=>dispatch({type:"startQuiz"})}>Let's Start</button>
        </div>
    )
}

export default StartScreen
