import { Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function TitleBlock({ item, lang, heroOverlapStyle }) {
  const text = getLocalized(item.text, lang, '');
  return (
    <Text style={[globalStyles.title, heroOverlapStyle]}>
      {text}
    </Text>
  );
}

export function EyebrowBlock({ item, lang, heroOverlapStyle }) {
  const text = getLocalized(item.text, lang, '');
  return (
    <Text style={[globalStyles.eyebrow, heroOverlapStyle]}>
      {text}
    </Text>
  );
}

export function SubtitleBlock({ item, lang, heroOverlapStyle }) {
  const text = getLocalized(item.text, lang, '');
  return (
    <Text style={[globalStyles.subtitle, heroOverlapStyle]}>
      {text}
    </Text>
  );
}

export function TextContentBlock({ item, lang, heroOverlapStyle }) {
  const text = getLocalized(item.text, lang, '');
  return (
    <Text style={[globalStyles.text, heroOverlapStyle]}>
      {text}
    </Text>
  );
}
