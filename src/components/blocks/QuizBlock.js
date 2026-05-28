import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

export function QuizBlock({ item, lang, heroOverlapStyle }) {
  const questions = Array.isArray(item.questions) ? item.questions : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { colors, typography } = useTheme();
  const { tokens, specs } = useDesignTokens();

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

  const dynamicStyles = StyleSheet.create({
    quizContainer: {
      borderRadius: specs.quiz.borderRadius,
      padding: specs.quiz.padding,
      marginVertical: specs.quiz.marginVertical,
      backgroundColor: specs.quiz.backgroundColor,
      borderWidth: specs.quiz.borderWidth,
      borderColor: specs.quiz.borderColor,
    },
    quizDescription: {
      fontSize: tokens.typography.fontSizeSm,
      marginBottom: 12,
      color: tokens.text.tertiary,
      marginTop: 8,
    },
    quizQuestionBlock: {
      marginVertical: 12,
    },
    quizOption: {
      borderRadius: specs.quiz.answerBorderRadius,
      padding: specs.quiz.answerPadding,
      marginVertical: specs.quiz.answerMargin,
      borderWidth: 1,
      borderColor: colors.borderDefault,
      backgroundColor: colors.surfaceDefault,
    },
    quizOptionSelected: {
      borderColor: specs.quiz.selectedBorderColor,
      backgroundColor: specs.quiz.selectedBgColor,
    },
    quizOptionCorrect: {
      borderColor: specs.quiz.correctBorderColor,
      backgroundColor: specs.quiz.correctBgColor,
      opacity: 0.1,
    },
    quizOptionWrong: {
      borderColor: specs.quiz.wrongBorderColor,
      backgroundColor: specs.quiz.wrongBgColor,
      opacity: 0.1,
    },
    quizSubmitButton: {
      borderRadius: specs.quiz.answerBorderRadius,
      padding: specs.quiz.answerPadding,
      marginTop: 16,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quizSubmitText: {
      color: tokens.text.onAccent,
      fontWeight: tokens.typography.fontWeightBold,
      fontSize: tokens.typography.fontSizeMd,
    },
    quizEmpty: {
      color: tokens.text.tertiary,
      fontSize: tokens.typography.fontSizeSm,
      marginTop: 8,
    },
  });

  if (!questions.length) {
    return (
      <View style={[dynamicStyles.quizContainer, heroOverlapStyle]}>
        {title ? <ScaledText style={typography.title}>{title}</ScaledText> : null}
        {description ? <ScaledText style={typography.text}>{description}</ScaledText> : null}
        <ScaledText style={dynamicStyles.quizEmpty}>
          {getLocalized(item.title, lang, '') ? 'Quiz content is not available.' : 'Quiz not found.'}
        </ScaledText>
      </View>
    );
  }

  return (
    <View style={[dynamicStyles.quizContainer, heroOverlapStyle]}>
      {title ? <ScaledText style={typography.title}>{title}</ScaledText> : null}
      {description ? <ScaledText style={typography.text}>{description}</ScaledText> : null}
      <ScaledText style={dynamicStyles.quizDescription}>{progressText}</ScaledText>

      {finished ? (
        <View style={dynamicStyles.quizQuestionBlock}>
          <ScaledText style={typography.subtitle}>{getLocalized(item.title, lang, 'Quiz complete')}</ScaledText>
          <ScaledText style={typography.text}>{`Score: ${score} / ${questions.length}`}</ScaledText>
        </View>
      ) : (
        <View style={dynamicStyles.quizQuestionBlock}>
          <ScaledText style={typography.subtitle}>{`${currentIndex + 1}. ${getLocalized(currentQuestion.question, lang, '')}`}</ScaledText>
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
                  dynamicStyles.quizOption,
                  isSelected ? dynamicStyles.quizOptionSelected : null,
                  isCorrect ? dynamicStyles.quizOptionCorrect : null,
                  showWrong ? dynamicStyles.quizOptionWrong : null,
                ]}
              >
                <ScaledText style={typography.text}>{optionText}</ScaledText>
              </Pressable>
            );
          })}

          {isAnswered ? (
            <ScaledText style={[typography.text, { marginTop: 12 }]}> 
              {String(selectedOption).trim() === correctAnswer
                ? lang === 'eng' ? 'Correct' : 'Правильно'
                : lang === 'eng' ? 'Incorrect' : 'Неправильно'}
            </ScaledText>
          ) : null}

          <Pressable
            onPress={handleNext}
            style={[
              dynamicStyles.quizSubmitButton,
              !isAnswered ? { opacity: 0.6 } : null,
            ]}
            disabled={!isAnswered}
          >
            <ScaledText style={dynamicStyles.quizSubmitText}>{currentIndex + 1 >= questions.length ? (finished ? 'Finished' : lang === 'eng' ? 'Finish' : 'Закончить') : (lang === 'eng' ? 'Next' : 'Далее')}</ScaledText>
          </Pressable>
        </View>
      )}
    </View>
  );
}
