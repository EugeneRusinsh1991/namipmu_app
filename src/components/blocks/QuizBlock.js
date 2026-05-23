import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function QuizBlock({ item, lang, heroOverlapStyle }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const title = getLocalized(item.title, lang, '');
  const description = getLocalized(item.description, lang, '');
  const questions = Array.isArray(item.questions) ? item.questions : [];

  const handleSelect = (questionIndex, optionValue) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: optionValue }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const selected = answers[index];
      const correct = String(question.correctAnswer ?? '').trim();
      if (selected != null && String(selected).trim() === correct) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  if (!questions.length) {
    return (
      <View style={[globalStyles.quizContainer, heroOverlapStyle]}>
        {title ? <Text style={globalStyles.quizTitle}>{title}</Text> : null}
        {description ? <Text style={globalStyles.quizDescription}>{description}</Text> : null}
        <Text style={globalStyles.quizEmpty}>{getLocalized(item.title, lang, '') ? 'Quiz content is not available.' : 'Quiz not found.'}</Text>
      </View>
    );
  }

  return (
    <View style={[globalStyles.quizContainer, heroOverlapStyle]}>
      {title ? <Text style={globalStyles.quizTitle}>{title}</Text> : null}
      {description ? <Text style={globalStyles.quizDescription}>{description}</Text> : null}

      {questions.map((question, questionIndex) => {
        const questionText = getLocalized(question.question, lang, '');
        const selectedAnswer = answers[questionIndex];
        const correctAnswer = String(question.correctAnswer ?? '').trim();

        return (
          <View key={String(questionIndex)} style={globalStyles.quizQuestionBlock}>
            <Text style={globalStyles.quizQuestion}>{`${questionIndex + 1}. ${questionText}`}</Text>
            {(question.options || []).map(option => {
              const optionText = getLocalized(option.text, lang, '');
              const isSelected = String(option.value) === String(selectedAnswer);
              const isCorrect = submitted && String(option.value) === correctAnswer;
              const showWrong = submitted && isSelected && !isCorrect;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(questionIndex, option.value)}
                  style={[
                    globalStyles.quizOption,
                    isSelected ? globalStyles.quizOptionSelected : null,
                    isCorrect ? globalStyles.quizOptionCorrect : null,
                    showWrong ? globalStyles.quizOptionWrong : null,
                  ]}
                >
                  <Text style={globalStyles.quizOptionText}>{optionText}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}

      <Pressable onPress={handleSubmit} style={globalStyles.quizSubmitButton}>
        <Text style={globalStyles.quizSubmitText}>{submitted ? 'Submit Again' : 'Submit Answers'}</Text>
      </Pressable>

      {submitted ? (
        <Text style={globalStyles.quizResultText}>
          {`Score: ${score} / ${questions.length}`}
        </Text>
      ) : null}
    </View>
  );
}
