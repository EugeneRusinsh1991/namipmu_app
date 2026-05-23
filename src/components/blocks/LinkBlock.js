import { Link } from 'expo-router';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

export function LinkBlock({ item, lang, heroOverlapStyle }) {
  if (!item.href) return null;

  const text = getLocalized(item.text, lang, '');
  const normalizedHref = typeof item.href === 'string' ? (item.href.startsWith('/') ? item.href : `/${item.href}`) : item.href;

  return (
    <Link href={normalizedHref} style={heroOverlapStyle}>
      <ScaledText style={globalStyles.textLink}>{text}</ScaledText>
    </Link>
  );
}
