import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "How satisfied are you with our products?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    question: "How fair are the prices compared to similar retailers?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    question:
      "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    question:
      "On a scale of 1-10, how likely are you to recommend us to your friends and family?",
    type: "rating",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 5,
    question: "What could we do to improve our service?",
    type: "text",
    options: [],
  },
];

const Survey = () => {
    // All state 
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [surveyCompleted, setSurveyCompleted] = useState(false);


  // Start Handle 
  const handleStart = () => {
    setCurrentQuestion(0);
  };



  const handleAnswer = (answer) => {
    // Check if an answer for the current question already exists
    const existingAnswer = answers.find(
      (ans) => ans.questionId === questions[currentQuestion].id
    );

    // If an answer already exists, remove it
    if (existingAnswer) {
      setAnswers((prevAnswers) =>
        prevAnswers.filter(
          (ans) => ans.questionId !== questions[currentQuestion].id
        )
      );
    }
    // Add the selected answer to the answers state
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestion].id, answer },
    ]);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleTextAnswer = (e) => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestion].id, answer: e.target.value },
    ]);
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const unansweredQuestions = questions.filter(
      (question) => !answers.some((answer) => answer.questionId === question.id)
    );

    if (unansweredQuestions.length > 0) {
      // Show an error toast notification if there are unanswered questions
      toast.error("Please answer all questions before submitting!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }


    
    if (currentQuestion === questions.length - 1) {
      // Display confirmation dialog
      if (window.confirm("Are you sure you want to submit the survey?")) {
        // Set survey completion flag
        setSurveyCompleted(true);

        // Display success toast notification
        toast.success("Survey submitted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Delay rendering to the thank you screen
        setTimeout(() => {
          setSurveyCompleted(false);
          setCurrentQuestion(-1);
          setAnswers([]);
        }, 2000);
      }
    } else {
      // Show a success toast notification
      toast.success("Survey submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
   
  };

  return (
    <div className="flex justify-center items-center h-screen">
       <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
    />
      {currentQuestion === -1 ? (
        surveyCompleted ? (
          <div>
            <h2>Thank you for your time!</h2>
            <p>You have successfully completed the survey.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Survey!</h2>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/welcome-board-3688623-3231454.png"
              alt="Welcome"
              className="mb-4"
            />
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        )
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          {questions[currentQuestion].type === "rating" ? (
            <div className="flex items-center gap-2">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  className={`${
                    answers.find(
                      (answer) =>
                        answer.questionId === questions[currentQuestion].id &&
                        answer.answer === option
                    )
                      ? "bg-blue hover:bg-mint text-white px-4 py-2 rounded"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  <FaStar
                    className={`text-yellow-500 ${
                      answers.find(
                        (answer) =>
                          answer.questionId === questions[currentQuestion].id &&
                          answer.answer === option
                      )
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          ) : (
            <textarea
              className="border border-gray-300 rounded p-2 w-full"
              rows={4}
              placeholder="Enter your answer..."
              onChange={handleTextAnswer}
            />
          )}
          <div className="flex justify-between mt-4">
            {currentQuestion > 0 && (
              <button
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {currentQuestion < questions.length - 1 && (
              <button
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentQuestion === questions.length - 1 && (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;
