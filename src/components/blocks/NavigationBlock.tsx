import { Link } from 'expo-router';
import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import AppButton from '../AppButton';

/**
 * Props для NavigationBlock
 */
interface NavigationBlockProps {
  item: {
    backText?: string | { [key: string]: string };
    nextText?: string | { [key: string]: string };
    backHref?: string;
    href?: string;
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для навигационных кнопок (Назад/Далее)
 */
export const NavigationBlock: FC<NavigationBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  const { tokens } = useDesignTokens();
  const styles = useMemo(
    () => ({
      navigationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: tokens.spacing.standard,
      },
      navigationButton: {
        flex: 1,
      },
      primaryButton: {
        marginLeft: tokens.spacing.standard,
      },
    }),
    [tokens.spacing.standard]
  );

  const backText = getLocalized(item.backText, lang, 'Назад');
  const nextText = getLocalized(item.nextText, lang, '');
  const nextHref = (item.href || '/') as any;
  const backHref = (item.backHref || '/') as any;
  const backButtonStyle = StyleSheet.flatten(styles.navigationButton);
  const nextButtonStyle = StyleSheet.flatten([styles.navigationButton, styles.primaryButton]);

  return (
    <View style={[styles.navigationRow, heroOverlapStyle]}>
      <Link href={backHref} asChild>
        <AppButton
          title={backText}
          variant="primary"
          accessibilityLabel={`Кнопка ${backText}`}
          style={backButtonStyle}
        />
      </Link>
      <Link href={nextHref} asChild>
        <AppButton
          title={nextText}
          variant="primary"
          accessibilityLabel={`Кнопка ${nextText}`}
          style={nextButtonStyle}
        />
      </Link>
    </View>
  );
};
