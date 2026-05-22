import { Link } from 'expo-router';
import { Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function LinkBlock({ item, lang, heroOverlapStyle }) {
  if (!item.href) return null;

  const text = getLocalized(item.text, lang, '');
  const normalizedHref = typeof item.href === 'string' ? (item.href.startsWith('/') ? item.href : `/${item.href}`) : item.href;

  return (
    <Link href={normalizedHref} style={heroOverlapStyle}>
      <Text style={globalStyles.textLink}>{text}</Text>
    </Link>
  );
}
