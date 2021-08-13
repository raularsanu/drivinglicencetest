import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Result({
  renderMistakesOrResult,
  setRenderMistakesOrResult,
  correctAnswers,
  wrongAnswers,
  wrongAnswersArray,
  result
}) {
    
    const [ svgStyles, setSvgStyles ] = useState(window.innerWidth > 400 ? {cy: 162, cx: 162, r: 148} : {cy: 148, cx: 148, r: 134});
    const [ changeStyle, setChangeStyle ] = useState(wrongAnswersArray.length > 0 ? { background:'#54a0ff', borderColor:'#54a0ff' } : { background:'#D1D1D1', borderColor:'#D1D1D1' })
    const correctPercentage = Math.floor(20 * correctAnswers);
    const strokePercentage = 929 - (correctPercentage / 100) * 929;
    const style = {
        strokeDashoffset:strokePercentage
    };
    
    return (
      <div>
        {renderMistakesOrResult === 'result' ? 
          <div className='result-container'>
              <div className='circle-container'>
                <svg className='circle'>
                  <circle style={style} className='circle-svg' cx={svgStyles.cx} cy={svgStyles.cy} r={svgStyles.r} stroke="#54a0ff" strokeWidth="28" fill="transparent" /> 
                </svg> 
                <div className='background'>

                </div>
                <div className='interior'>

                </div>
                <p>{correctPercentage}%</p>
              </div>
              {wrongAnswers < 3 && correctAnswers > 2 ? <div className='failorsuccess'>You passed! Congratulations!</div> : <div className='failorsuccess'>You failed. Good luck next time!</div> }
              <h1>Your results</h1>
              <p>Wrong Answers : {wrongAnswers}</p>
              <p>Correct Answers : {correctAnswers}</p>
              <div className='result-buttons'>
                <div className='result-buttons-middle'>
                    <Link to='/'><button className='try'>Try Again</button></Link>
                    <button style={changeStyle} onClick={()=>{
                    if(wrongAnswersArray.length > 0){
                      setRenderMistakesOrResult('mistakes');
                    } 
                    }}>See Wrong Answers</button>
                </div>
              </div>
          </div> : <div className='wrong-answers-container'>
              {wrongAnswersArray.map((answer, index) => {
                  return (
                    <div className='wrong-answer' key={index + 10}>
                        <h1>{result[answer.questionIndex].question}</h1>
                        {result[answer.questionIndex].answers.map((a, index) => {
                          if(a.isCorrect === 'true') {
                            return (<p key={index + 20} className='correct'>{a.value}</p>);
                          } else if( index === answer.yourAnswer ){
                            return(<p key={index + 20} className='wrong'>{a.value}</p>)
                          } else {
                            return (<p key={index + 20} >{a.value}</p>);
                          };
                        })}
                    </div>
                        )
              })}
              <button onClick={()=>setRenderMistakesOrResult('result')}>Go Back</button>
          </div>}
      </div>
    )
}

export default Result
