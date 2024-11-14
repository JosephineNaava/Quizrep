function Options({question, dispatch, answer }) {

    const hasAnswered = answer !== null;

    return (
        <div className="options">
        {question.options.map ((option, index) => (

            <button 
             className={`btn btn-option ${index===answer ? "answer":""} //conditional css, use the ternary operator.
             ${hasAnswered?
                 index === question.correctOption ? 
                 "correct"
                 : "wrong"
                 :""}`}

            key={option}
                // disabled= {answer}
                disabled={hasAnswered}
                onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >
                {option}
            </button>
        ))}

    </div>
    )
}

export default Options
