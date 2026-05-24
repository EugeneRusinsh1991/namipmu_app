import { useTheme } from '../../context/ThemeContext';
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
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.title} />;
}

export function EyebrowBlock(props) {
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.eyebrow} />;
}

export function SubtitleBlock(props) {
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.subtitle} />;
}

export function TextContentBlock(props) {
  const { typography } = useTheme();
  return <LocalizedTextBlock {...props} style={typography.text} />;
}

