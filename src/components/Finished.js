function Finished({points, maxPoints, dispatch}) {

    const percentage = (points / maxPoints) * 100;
    return (
        <div >
        <p className="result">
             <span>👌</span> You scored {points} out of {maxPoints}
            ({Math.ceil(percentage)}%)
        </p>
        <button className=" btn btn-ui" onClick={()=>dispatch({type: "Reset"})}>Restart Quiz</button>
        </div>
    )
}

export default Finished
