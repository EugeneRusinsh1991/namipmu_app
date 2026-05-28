import React, { FC, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

/**
 * Структура опции в квизе
 */
interface QuizOption {
  value: string | number;
  text: string | { [key: string]: string };
}

/**
 * Структура вопроса в квизе
 */
interface QuizQuestion {
  question: string | { [key: string]: string };
  options: QuizOption[];
  correctAnswer: string | number;
}

/**
 * Props для QuizBlock
 */
interface QuizBlockProps {
  item: {
    title?: string | { [key: string]: string };
    description?: string | { [key: string]: string };
    questions: QuizQuestion[];
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для интерактивного квиза
 */
export const QuizBlock: FC<QuizBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  const questions = Array.isArray(item.questions) ? item.questions : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
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
    const found = (currentQuestion.options || []).find(
      opt => String(opt.value) === String(selectedOption)
    );
    return found ? getLocalized(found.text, lang, '') : '';
  }, [currentQuestion, selectedOption, lang]);

  const handleSelect = (optionValue: string | number) => {
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

  const styles = useMemo(
    () => ({
      quizContainer: {
        borderRadius: specs.quiz.borderRadius,
        padding: specs.quiz.containerPadding,
        marginVertical: specs.quiz.marginVertical,
        backgroundColor: tokens.surface.surfaceSecondary,
        borderWidth: specs.quiz.borderWidth,
        borderColor: tokens.interactive.border,
      },
      quizHeaderTitle: {
        fontSize: tokens.typography.fontSizeXl,
        fontWeight: tokens.typography.fontWeightBold,
        color: tokens.text.primary,
      },
      quizHeaderDescription: {
        fontSize: tokens.typography.fontSizeMd,
        color: tokens.text.secondary,
        marginTop: tokens.spacing.sm,
      },
      quizDescription: {
        fontSize: tokens.typography.fontSizeSm,
        marginBottom: tokens.spacing.sm,
        color: tokens.text.tertiary,
        marginTop: tokens.spacing.sm,
      },
      quizQuestionBlock: {
        marginVertical: tokens.spacing.md,
      },
      quizQuestionTitle: {
        fontSize: tokens.typography.fontSizeLg,
        fontWeight: tokens.typography.fontWeightBold,
        color: tokens.text.primary,
        marginBottom: tokens.spacing.sm,
      },
      quizOption: {
        borderRadius: specs.quiz.answerBorderRadius,
        padding: specs.quiz.answerPadding,
        marginVertical: specs.quiz.answerMargin,
        borderWidth: 1,
        borderColor: tokens.interactive.border,
        backgroundColor: tokens.surface.surfacePrimary,
      },
      quizOptionSelected: {
        borderColor: tokens.interactive.accent,
        backgroundColor: tokens.interactive.accentLight,
      },
      quizOptionCorrect: {
        borderColor: tokens.text.success,
        backgroundColor: tokens.text.success,
        opacity: 0.08,
      },
      quizOptionWrong: {
        borderColor: tokens.text.danger,
        backgroundColor: tokens.text.danger,
        opacity: 0.08,
      },
      quizOptionText: {
        color: tokens.text.primary,
        fontSize: tokens.typography.fontSizeMd,
      },
      quizOptionTextCorrect: {
        color: tokens.text.success,
      },
      quizOptionTextWrong: {
        color: tokens.text.danger,
      },
      quizSubmitButton: {
        borderRadius: specs.quiz.answerBorderRadius,
        padding: specs.quiz.answerPadding,
        marginTop: tokens.spacing.lg,
        backgroundColor: tokens.interactive.accent,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      },
      quizSubmitText: {
        color: tokens.text.onAccent,
        fontWeight: tokens.typography.fontWeightBold,
        fontSize: tokens.typography.fontSizeMd,
      },
      quizEmpty: {
        color: tokens.text.tertiary,
        fontSize: tokens.typography.fontSizeSm,
        marginTop: tokens.spacing.sm,
      },
      quizStatusText: {
        marginTop: tokens.spacing.sm,
        color: tokens.text.primary,
        fontSize: tokens.typography.fontSizeMd,
      },
    }),
    [tokens, specs]
  );

  if (!questions.length) {
    return (
      <View style={[styles.quizContainer, heroOverlapStyle]}>
        {title ? <ScaledText style={styles.quizHeaderTitle}>{title}</ScaledText> : null}
        {description ? <ScaledText style={styles.quizHeaderDescription}>{description}</ScaledText> : null}
        <ScaledText style={styles.quizEmpty}>
          {getLocalized(item.title, lang, '') ? 'Quiz content is not available.' : 'Quiz not found.'}
        </ScaledText>
      </View>
    );
  }

  return (
    <View style={[styles.quizContainer, heroOverlapStyle]}>
      {title ? <ScaledText style={styles.quizHeaderTitle}>{title}</ScaledText> : null}
      {description ? <ScaledText style={styles.quizHeaderDescription}>{description}</ScaledText> : null}
      <ScaledText style={styles.quizDescription}>{progressText}</ScaledText>

      {finished ? (
        <View style={styles.quizQuestionBlock}>
          <ScaledText style={styles.quizQuestionTitle}>
            {getLocalized(item.title, lang, 'Quiz complete')}
          </ScaledText>
          <ScaledText style={styles.quizStatusText}>
            {`Score: ${score} / ${questions.length}`}
          </ScaledText>
        </View>
      ) : (
        <View style={styles.quizQuestionBlock}>
          <ScaledText style={styles.quizQuestionTitle}>
            {`${currentIndex + 1}. ${getLocalized(currentQuestion.question, lang, '')}`}
          </ScaledText>
          {(currentQuestion.options || []).map(option => {
            const optionText = getLocalized(option.text, lang, '');
            const isSelected = String(option.value) === String(selectedOption);
            const isCorrect = isAnswered && String(option.value) === correctAnswer;
            const showWrong = isAnswered && isSelected && String(option.value) !== correctAnswer;

            return (
              <Pressable
                key={String(option.value)}
                onPress={() => handleSelect(option.value)}
                style={[
                  styles.quizOption,
                  isSelected ? styles.quizOptionSelected : null,
                  isCorrect ? styles.quizOptionCorrect : null,
                  showWrong ? styles.quizOptionWrong : null,
                ]}
              >
                <ScaledText
                  style={[
                    styles.quizOptionText,
                    isCorrect ? styles.quizOptionTextCorrect : null,
                    showWrong ? styles.quizOptionTextWrong : null,
                  ]}
                >
                  {optionText}
                </ScaledText>
              </Pressable>
            );
          })}

          {isAnswered ? (
            <ScaledText style={styles.quizStatusText}>
              {String(selectedOption).trim() === correctAnswer
                ? lang === 'eng' ? 'Correct' : 'Правильно'
                : lang === 'eng' ? 'Incorrect' : 'Неправильно'}
            </ScaledText>
          ) : null}

          <Pressable
            onPress={handleNext}
            style={[
              styles.quizSubmitButton,
              !isAnswered ? { opacity: 0.6 } : null,
            ]}
            disabled={!isAnswered}
          >
            <ScaledText style={styles.quizSubmitText}>
              {currentIndex + 1 === questions.length
                ? lang === 'eng'
                  ? 'Finish'
                  : 'Закончить'
                : lang === 'eng'
                ? 'Next'
                : 'Далее'}
            </ScaledText>
          </Pressable>
        </View>
      )}
    </View>
  );
};
