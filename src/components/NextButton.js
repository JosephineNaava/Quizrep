function NextButton({dispatch, answer, index, numQuestions}) {
// If no answer has been selected, don't render the button
    if (answer === null) return null;
   
    if (index < numQuestions - 1) return (
        <div>
            <button className="btn btn-ui" 
             onClick={()=> dispatch({type: "nextQuestion"})}
             >
                Next
            </button>
        </div>
    )
    if (index === numQuestions - 1) return (
        <div>
            <button className="btn btn-ui" 
             onClick={()=> dispatch({type: "End"})}
             >
                Finish
            </button>
        </div>
    )
}

export default NextButton
