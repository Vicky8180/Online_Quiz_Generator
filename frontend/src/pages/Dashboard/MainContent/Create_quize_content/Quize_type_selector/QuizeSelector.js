import React, { useState } from 'react';
import "./QuizeSelector.css";
import QnA from '../QNA/QnA';
import GlowAndShakeEffect from '../../../../../containers/GlowAndShakeEffect';

export default function QuizeSelector({ closeModal }) {
  const [showQnA, setShowQnA] = useState(false);
  
  const [quizName, setQuizName]=useState('');
  const handleContinue = () => {
    if(quizName!=''){
      setShowQnA(true);
    }else {
      
      const emptyInput= document.getElementById('emptyInput')
      GlowAndShakeEffect(emptyInput)
      // ShakeEffect(emptyInput)
    }
    
  };
  const [quizTypeIsQnA,setQuizType]=useState(true);
                                             //  quizType==true ,means its a poll type 
  const handlePollType=()=>{
    setQuizType(false)
  }
  const handleQnAType=()=>{
    setQuizType(true)
  }
  return (
    <>
      {showQnA ? (
        <QnA closeModal={closeModal} quizType={quizTypeIsQnA} quizName={quizName} />
      ) : (
        <div className='quiz_selector_container'>
          <div className='quiz_selector_name'>
            <input type='text' placeholder='Quiz Name' id="emptyInput" value={quizName} onChange={(e)=>setQuizName(e.target.value)}/>
          </div>
          <div className='quiz_selector_type'>
            <p>Quiz Type </p>
            <div className='quiz_selector_type_button' style={{
         backgroundColor: quizTypeIsQnA ? ' rgba(96, 184, 75, 1)' : '',
         color: quizTypeIsQnA ? 'white' : '',
      }} onClick={handleQnAType}>Q & A</div>
            <div className='quiz_selector_type_button'  
            style={{
              backgroundColor: quizTypeIsQnA ? '' : ' rgba(96, 184, 75, 1)',
        color: quizTypeIsQnA ? '' : 'white',
       
      }}
            onClick={handlePollType}>Poll Types</div>
          </div>
          <div className='quiz_selector_btn'>
            <button onClick={closeModal} className='quiz_selector_btn1'>Cancel</button>
            <button onClick={handleContinue} id="continue_btn" className='quiz_selector_btn2'>Continue</button>
          </div>
        </div>
      )}
    </>
  );
}

