import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { getLocalized } from '../../utils/i18n';
import AppButton from '../AppButton';

export function NavigationBlock({ item, lang, heroOverlapStyle }) {
  const backText = getLocalized(item.backText, lang, 'Назад');
  const nextText = getLocalized(item.nextText, lang, '');
  const nextHref = item.href || '/';

  return (
    <View style={StyleSheet.flatten([styles.navigationRow, heroOverlapStyle])}>
      <Link href={item.backHref || '/'} asChild>
        <AppButton
          title={backText}
          variant="secondary"
          accessibilityLabel={`Кнопка ${backText}`}
          style={styles.navigationButton}
        />
      </Link>
      <Link href={nextHref} asChild>
        <AppButton
          title={nextText}
          variant="primary"
          accessibilityLabel={`Кнопка ${nextText}`}
          style={StyleSheet.flatten([
            styles.navigationButton,
            styles.primaryButton,
          ])}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navigationButton: {
    flex: 1,
  },
  primaryButton: {
    marginLeft: 12,
  },
});
