function Progress({ points, numQuestions, index, maxPoints, answer}) {
    return (
        <div className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}/>
            <p>Question {index +1}/{numQuestions} </p> <p>{points}/{maxPoints}</p>
            
        </div>
    )
}

export default Progress
