import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

function LocalizedTextBlock({ item, lang, heroOverlapStyle, style }) {
  const text = getLocalized(item.text, lang, '');

  return (
    <ScaledText style={[style, heroOverlapStyle]}>
      {text}
    </ScaledText>
  );
}

export function TitleBlock(props) {
  return <LocalizedTextBlock {...props} style={globalStyles.title} />;
}

export function EyebrowBlock(props) {
  return <LocalizedTextBlock {...props} style={globalStyles.eyebrow} />;
}

export function SubtitleBlock(props) {
  return <LocalizedTextBlock {...props} style={globalStyles.subtitle} />;
}

export function TextContentBlock(props) {
  return <LocalizedTextBlock {...props} style={globalStyles.text} />;
}

