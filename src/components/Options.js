function Options({question,answer,dispatch}) {
    return (
        <div className="options">
        {question.options.map ((options, index)=>(

            <button 
             className={`btn btn-options ${index===answer ? "answer":''}
             ${index === question.correctOption? "correct": "wrong"}`}
            key={options}
                disabled= {answer}
                onClick={()=> dispatch({type: "newAnswer",payload: index})}
                >
                {options}
            </button>
        ))}

    </div>
    )
}

export default Options
