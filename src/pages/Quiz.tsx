import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { QuizQuestion, QuizResult, QuizAttempt } from '../types';
import { getRandomQuizQuestions } from '../data/mockData';
import { Brain, CheckCircle2, XCircle, Timer, Award, ArrowRight, RotateCcw } from 'lucide-react';

const Quiz: React.FC = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const newQuestions = getRandomQuizQuestions(5);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAttempts([]);
    setStartTime(new Date());
    setQuizCompleted(false);
    setResult(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    const attempt: QuizAttempt = {
      questionId: currentQuestion.id,
      selectedAnswer: answerIndex,
      isCorrect,
      timeSpent: startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0
    };

    setAttempts([...attempts, attempt]);

    if (currentQuestionIndex === questions.length - 1) {
      // Quiz completed
      const correctAnswers = [...attempts, attempt].filter(a => a.isCorrect).length;
      const totalPoints = [...attempts, attempt].reduce((sum, a, index) => {
        return sum + (a.isCorrect ? questions[index].points : 0);
      }, 0);

      const quizResult: QuizResult = {
        userId: user?.id || '',
        score: Math.round((correctAnswers / questions.length) * 100),
        totalPoints,
        correctAnswers,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
        timeSpent: startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0
      };

      setResult(quizResult);
      setQuizCompleted(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setStartTime(new Date());
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  if (quizCompleted && result) {
    return (
      <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Quiz Completed!</h2>
            <p className="text-gray-600 mt-2">Great job on completing the energy quiz!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <div className="text-emerald-600 font-bold text-2xl">{result.score}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-blue-600 font-bold text-2xl">{result.totalPoints}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-purple-600 font-bold text-2xl">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={startNewQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <RotateCcw size={18} />
              Try Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-800">Energy Quiz</h2>
            </div>
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </span>
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                {currentQuestion.points} points
              </span>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-4">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : index === selectedAnswer
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                      : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && (
                      index === currentQuestion.correctAnswer ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : index === selectedAnswer ? (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ) : null
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {isAnswered && (
            <div className="mt-6">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="font-medium mb-2">{
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'Correct! 🎉'
                    : 'Not quite right'
                }</div>
                <p className="text-gray-600">{currentQuestion.explanation}</p>
              </div>

              {currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  Next Question
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz; 