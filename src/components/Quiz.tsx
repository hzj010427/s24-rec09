// import React, { useState } from 'react'
// import './Quiz.css'
// import QuizQuestion from '../core/QuizQuestion';

// interface QuizState {
//   questions: QuizQuestion[]
//   currentQuestionIndex: number
//   selectedAnswer: string | null
//   score: number
// }

// const Quiz: React.FC = () => {
//   const initialQuestions: QuizQuestion[] = [
//     {
//       question: 'What is the capital of France?',
//       options: ['London', 'Berlin', 'Paris', 'Madrid'],
//       correctAnswer: 'Paris',
//     },
//   ];
//   const [state, setState] = useState<QuizState>({
//     questions: initialQuestions,
//     currentQuestionIndex: 0,  // Initialize the current question index.
//     selectedAnswer: null,  // Initialize the selected answer.
//     score: 0,  // Initialize the score.
//   });

//   const handleOptionSelect = (option: string): void => {
//     setState((prevState) => ({ ...prevState, selectedAnswer: option }));
//   }


//   const handleButtonClick = (): void => {
//     // Task3: Implement the logic for button click, such as moving to the next question.
//   } 

//   const { questions, currentQuestionIndex, selectedAnswer, score } = state;
//   const currentQuestion = questions[currentQuestionIndex];

//   if (!currentQuestion) {
//     return (
//       <div>
//         <h2>Quiz Completed</h2>
//         <p>Final Score: {score} out of {questions.length}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Quiz Question:</h2>
//       <p>{currentQuestion.question}</p>
    
//       <h3>Answer Options:</h3>
//       <ul>
//         {currentQuestion.options.map((option) => (
//           <li
//             key={option}
//             onClick={() => handleOptionSelect(option)}
//             className={selectedAnswer === option ? 'selected' : ''}
//           >
//             {option}
//           </li>
//         ))}
//       </ul>

//       <h3>Selected Answer:</h3>
//       <p>{selectedAnswer ?? 'No answer selected'}</p>

//       <button onClick={handleButtonClick}>Next Question</button>
//     </div>
//   );
// };

// export default Quiz;

import React, { useState } from 'react';
import QuizCore from '../core/QuizCore';
import './Quiz.css'

const Quiz = () => {
  const [quizCore] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleButtonClick = () => {
    if (!selectedAnswer) return;
    quizCore.answerQuestion(selectedAnswer);
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null);
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
      <div>
        <h2>Quiz Question:</h2>
        <p>{currentQuestion.question}</p>
      
        <h3>Answer Options:</h3>
        <ul>
          {currentQuestion.options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={selectedAnswer === option ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>

        <h3>Selected Answer:</h3>
        <p>{selectedAnswer ?? 'No answer selected'}</p>

        {!quizCore.hasNextQuestion() ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleButtonClick}>Next Question</button>
        )}

      </div>
    );
  };

export default Quiz;
