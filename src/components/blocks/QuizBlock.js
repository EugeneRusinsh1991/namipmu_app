import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function QuizBlock({ item, lang, heroOverlapStyle }) {
  const questions = Array.isArray(item.questions) ? item.questions : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const title = getLocalized(item.title, lang, '');
  const description = getLocalized(item.description, lang, '');

  const currentQuestion = questions[currentIndex];
  const progressText = `${currentIndex + 1}/${questions.length}`;

  const correctAnswer = useMemo(() => {
    if (!currentQuestion) return '';
    return String(currentQuestion.correctAnswer ?? '').trim();
  }, [currentQuestion]);

  const selectedText = useMemo(() => {
    if (!currentQuestion || selectedOption == null) return '';
    const found = (currentQuestion.options || []).find(opt => String(opt.value) === String(selectedOption));
    return found ? getLocalized(found.text, lang, '') : '';
  }, [currentQuestion, selectedOption, lang]);

  const handleSelect = optionValue => {
    if (isAnswered || finished) return;
    setSelectedOption(optionValue);
    setIsAnswered(true);
    if (String(optionValue).trim() === correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (!questions.length) {
    return (
      <View style={[globalStyles.quizContainer, heroOverlapStyle]}>
        {title ? <Text style={globalStyles.title}>{title}</Text> : null}
        {description ? <Text style={globalStyles.text}>{description}</Text> : null}
        <Text style={globalStyles.quizEmpty}>
          {getLocalized(item.title, lang, '') ? 'Quiz content is not available.' : 'Quiz not found.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[globalStyles.quizContainer, heroOverlapStyle]}>
      {title ? <Text style={globalStyles.title}>{title}</Text> : null}
      {description ? <Text style={globalStyles.text}>{description}</Text> : null}
      <Text style={globalStyles.quizDescription}>{progressText}</Text>

      {finished ? (
        <View style={globalStyles.quizQuestionBlock}>
          <Text style={globalStyles.subtitle}>{getLocalized(item.title, lang, 'Quiz complete')}</Text>
          <Text style={globalStyles.text}>{`Score: ${score} / ${questions.length}`}</Text>
        </View>
      ) : (
        <View style={globalStyles.quizQuestionBlock}>
          <Text style={globalStyles.subtitle}>{`${currentIndex + 1}. ${getLocalized(currentQuestion.question, lang, '')}`}</Text>
          {(currentQuestion.options || []).map(option => {
            const optionText = getLocalized(option.text, lang, '');
            const isSelected = String(option.value) === String(selectedOption);
            const isCorrect = isAnswered && String(option.value) === correctAnswer;
            const showWrong = isAnswered && isSelected && String(option.value) !== correctAnswer;

            return (
              <Pressable
                key={option.value}
                onPress={() => handleSelect(option.value)}
                style={[
                  globalStyles.quizOption,
                  isSelected ? globalStyles.quizOptionSelected : null,
                  isCorrect ? globalStyles.quizOptionCorrect : null,
                  showWrong ? globalStyles.quizOptionWrong : null,
                ]}
              >
                <Text style={globalStyles.text}>{optionText}</Text>
              </Pressable>
            );
          })}

          {isAnswered ? (
            <Text style={[globalStyles.text, { marginTop: 12 }]}> 
              {String(selectedOption).trim() === correctAnswer
                ? lang === 'eng' ? 'Correct' : 'Правильно'
                : lang === 'eng' ? 'Incorrect' : 'Неправильно'}
            </Text>
          ) : null}

          <Pressable
            onPress={handleNext}
            style={[
              globalStyles.quizSubmitButton,
              !isAnswered ? { opacity: 0.6 } : null,
            ]}
            disabled={!isAnswered}
          >
            <Text style={globalStyles.quizSubmitText}>{currentIndex + 1 >= questions.length ? (finished ? 'Finished' : lang === 'eng' ? 'Finish' : 'Закончить') : (lang === 'eng' ? 'Next' : 'Далее')}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
