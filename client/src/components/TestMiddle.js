import React, { useState, useEffect, use } from 'react'

function TestMiddle({
    minutes,
    seconds,
    wrongAnswersArray,
    setWrongAnswersArray,
    correctAnswerIndex,
    checkAnswer,
    wrongAnswers,
    changeQuestion, 
    currentQuestion,
    usedQuestions, 
    setLoading,
    setComebackQuestions,
    comebackQuestions,
    answeredQuestions,
    setAnsweredQuestions,
    result }) {

    const [ step, setStep ] = useState(0);
    const [ answerIndex, setAnswerIndex ] = useState(undefined);
    const [ circleStyles, setCircleStyles ] = useState([{}, {}, {}]);
    const [ buttonStyle, setButtonStyle ] = useState({});
    const barStyle = {
       width: 20*answeredQuestions + '%'
    }
 
    const changeStyles = index => {
        if(answerIndex != index){
            const newStyle = { display:'block' };
            const oldStyles = [{}, {}, {}];
            oldStyles[index] = {...newStyle};
            setCircleStyles(oldStyles);
            setButtonStyle({background: '#54A0FF'});
            setAnswerIndex(index);
        } else if(answerIndex === index) {
            const oldStyles = [{}, {}, {}];
            setCircleStyles(oldStyles);
            setButtonStyle({background: '#d1d1d1'});
            setAnswerIndex(undefined);
        }
    }

    const addComebackQuestion = () => {
        const newQuestions = comebackQuestions;
        newQuestions.push(currentQuestion);
        setComebackQuestions(newQuestions);
        changeQuestion();
    }

    const giveResult = () => {
        if(answerIndex === undefined){
            return;
        };
        let newStep = step;
        newStep++;
        setStep(newStep);
        if(newStep === 1) {
            checkAnswer(answerIndex);
            if(answerIndex != correctAnswerIndex) {
                const newWrongAnswers = wrongAnswersArray;
                const newObj = {
                    questionIndex: currentQuestion,
                    yourAnswer: answerIndex
                }
                newWrongAnswers.push(newObj);
                setWrongAnswersArray(newWrongAnswers);
            }
        } else {
            setAnsweredQuestions(q => q + 1);
            setAnswerIndex(undefined);
            changeQuestion();
            setCircleStyles([{}, {}, {}]);
            setButtonStyle({background:'#d1d1d1'});
            setStep(0);
        }
    }

    useEffect(()=>{
        if(result.length > 0){
            setLoading(false);
        }
    }, [ result ]);

    return (
        <div>
            <div className='test-info'>
               { wrongAnswers > 0 ? <p className='wrong'>Wrong answers: {wrongAnswers}</p> : '' }
               <p className='time'>Time left <span>{minutes} : {seconds < 10? '0'+seconds : seconds}</span></p>
            </div>
            <div className='test-container'>
               <div className='loading-bar'>
                 <div className='progress' style={barStyle}>

                 </div>
               </div>
               <h1>{result[currentQuestion] ? result[currentQuestion].question : ''}</h1>
               {result[currentQuestion]  ? result[currentQuestion].answers.map((question, index) => {
                   return (
                    <div className='answer' key={index} onClick={()=>changeStyles(index)}>
                        <div className='left'>
                                <div className='circle'>
                                   <div style={circleStyles[index]}></div>
                                </div>
                        </div>
                        <p className='value'>{question.value}</p>
                        {correctAnswerIndex === index && step === 1 ? <p className='result correct'>Correct</p> : ''}
                        {correctAnswerIndex != answerIndex && answerIndex === index && step === 1 ? <p className='result wrong'>Incorrect</p> : ''} 
                    </div>
                   )
               }) : '' }

               <div className='buttons'>
                   <button className='comeback' onClick={addComebackQuestion}>Come Back Later</button>
                   <button className='next' 
                     onClick={giveResult}
                     style={buttonStyle}>{ step < 1 ? 'Give Answer' : 'Next Question'}</button>
               </div>
            </div>
        </div>
    )
}

export default TestMiddle
