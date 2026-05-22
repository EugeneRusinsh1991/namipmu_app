import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { globalStyles } from '../../styles/globalStyles';

export function VideoBlock({ item, lang, heroOverlapStyle }) {
  if (!item.url) return null;

  return (
    <View style={[globalStyles.videoContainer, heroOverlapStyle]}>
      <WebView style={{ flex: 1 }} source={{ uri: item.url }} />
    </View>
  );
}
