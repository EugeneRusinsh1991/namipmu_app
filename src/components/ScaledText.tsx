import { StyleSheet, Text } from 'react-native';
import { useTextSize } from '../context/TextSizeContext';

export default function ScaledText({ style, children, ...props }) {
  const { fontScale } = useTextSize();
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const scaledStyle = {
    ...flattenedStyle,
    ...(flattenedStyle.fontSize ? { fontSize: Math.round(flattenedStyle.fontSize * fontScale) } : null),
    ...(flattenedStyle.lineHeight ? { lineHeight: Math.round(flattenedStyle.lineHeight * fontScale) } : null),
  };

  return (
    <Text {...props} style={scaledStyle}>
      {children}
    </Text>
  );
}
