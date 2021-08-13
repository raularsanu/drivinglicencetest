import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import TestMiddle from './TestMiddle';
import Result from './Result'

function Test({ params, setLoading }) {

    const returnRandom = () => Math.floor(Math.random() * 10);

    const returnUniqueQuestion = arr => {
         let result = returnRandom();
         let isDuplicate = false;

         arr.forEach(el => {
            if(el === result) isDuplicate = true;
         });
         if(!isDuplicate) {
            return result;
         } else { 
            return returnUniqueQuestion(arr);
         };
    }

    const removeFromArray = (arr, index) => {
       const length = arr.length;
       for(let i = index; i < length; i++){
            arr[i] = arr[i + 1];
       }
       arr.pop();
    }

    const findIndexInArray = (arr, el) => {
      const length = arr.length;
      let result;
      for(let i = 0; i < length; i++){
           if(arr[i] === el) result = i;
      }
      return result;
    }

    const changeQuestion = () => {
         const newArray = usedQuestions;
         const newComeback = comebackQuestions;
         const usedLength = usedQuestions.length;
         const comebackLength = comebackQuestions.length;
         let newQuestion;
         if(comebackLength > 0 && usedLength === 5) {
            const random = Math.floor(Math.random() * comebackLength );
            newQuestion = newComeback[random];
            const index = findIndexInArray(newComeback, newQuestion);
            removeFromArray(newComeback, index);
            setComebackQuestions(newComeback);
         } else {
            newQuestion = returnUniqueQuestion(newArray);
            newArray.push(newQuestion);
            setUsedQuestions(newArray);
         }
         setCurrentQuestion(newQuestion);
         setCorrectAnswerIndex(returnAnswerIndex(result[newQuestion].answers))
    };

    const returnAnswerIndex = arr => {
         let res;
         arr.forEach((el, index) => {
            if(el.isCorrect === 'true') {
               res = index;
            };
         });
         return res;
    }

    const [ answeredQuestions, setAnsweredQuestions ] = useState(0);
    const [ renderMistakesOrResult, setRenderMistakesOrResult ] = useState('result')
    const [ minutes, setMinutes ] = useState(5);
    const [ seconds, setSeconds ] = useState(0);
    const [ correctAnswerIndex, setCorrectAnswerIndex ] = useState();
    const [ result, setResult ] = useState([]);
    const [ usedQuestions, setUsedQuestions ] = useState([]);
    const [ currentQuestion, setCurrentQuestion ] = useState(returnRandom());
    const [ comebackQuestions, setComebackQuestions ] = useState([]);
    const [ wrongAnswersArray, setWrongAnswersArray ] = useState([]);
    const [ wrongAnswers, setWrongAnswers ] = useState(0);
    const [ correctAnswers, setCorrectAnswers ] = useState(0);

    const deductTime = () => {
      let mins = 5;
      let secs = 0;
      const timer = setInterval(()=>{
         if(secs === 0) {
            secs = 59;
            mins--;
            setSeconds(secs);
            setMinutes(mins);
         } else {
            secs--;
            setSeconds(secs);
         }
      }, 1000)

      if(mins === 0 && secs ===0){
         clearInterval(timer);
         mins = undefined;
         secs = undefined;
      }
      return timer;
    }

    const fetchTest = async () => {
       const path = '/server/tests/' + params.category;
       try { 
            const res = await axios.get(path);
            const newUsedQuestions = [currentQuestion];
            setCorrectAnswerIndex(returnAnswerIndex(res.data[currentQuestion].answers));
            setUsedQuestions(newUsedQuestions);
            setResult(res.data);
       } catch (err) {
            console.log(err);
       };
    };

    const checkAnswer = index => {
       if(result[currentQuestion].answers[index].isCorrect === 'true'){
           setCorrectAnswers(answers => answers + 1);
       } else {
           setWrongAnswers(answers => answers + 1);
       };
    };

    useEffect(()=>{
       fetchTest();
       const timer = deductTime();
       
       return () => clearInterval(timer);
    }, []);

    return (
        <div>
            {((wrongAnswers < 3) && (wrongAnswers + correctAnswers) != 5) && (minutes >= 0 && seconds >= 0) ? 
            <TestMiddle 
               answeredQuestions={answeredQuestions}
               setAnsweredQuestions={setAnsweredQuestions}
               setLoading={setLoading}
               minutes={minutes}
               seconds={seconds}
               comebackQuestions={comebackQuestions}
               setComebackQuestions={setComebackQuestions}
               wrongAnswersArray={wrongAnswersArray}
               setWrongAnswersArray={setWrongAnswersArray}
               correctAnswerIndex={correctAnswerIndex}
               wrongAnswers={wrongAnswers}
               checkAnswer={checkAnswer}
               changeQuestion={changeQuestion} 
               currentQuestion={currentQuestion} 
               result={result}
               usedQuestions={usedQuestions} /> : 
            <Result 
                  renderMistakesOrResult={renderMistakesOrResult}
                  setRenderMistakesOrResult={setRenderMistakesOrResult}
                  wrongAnswers={wrongAnswers}
                  correctAnswers={correctAnswers}
                  wrongAnswersArray={wrongAnswersArray}
                  result={result}
            /> }
        </div>
    );
};

export default Test;
