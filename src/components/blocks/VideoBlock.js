import { Platform, StyleSheet, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalizedAsset } from '../../utils/i18n';

const RICKROLL_VIDEO_ID = 'dQw4w9WgXcQ';
const RICKROLL_EMBED_URL = `https://www.youtube.com/embed/${RICKROLL_VIDEO_ID}?rel=0`;

const isWeb = Platform.OS === 'web';

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  console.log('VideoBlock module loaded', { isWeb });
}

function getYoutubeEmbedUrl(source) {
  if (!source) return null;
  const normalized = String(source).trim();
  const match = normalized.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}

function isHttpUrl(source) {
  return /^https?:\/\//i.test(String(source || '').trim());
}

function createHtmlVideoPage(videoUrl) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
    <style>body{margin:0;background:#000;display:flex;justify-content:center;align-items:center;height:100%;}</style>
  </head>
  <body>
    <video controls autoplay style="width:100%;height:100%;background:#000;" src="${videoUrl}"></video>
  </body>
</html>`;
}

export function VideoBlock({ item, lang, heroOverlapStyle }) {
  const WebView = isWeb ? null : require('react-native-webview').WebView;
  const Video = !isWeb ? require('expo-av').Video : null;
  const localizedSrc = getLocalizedAsset(item.src, lang);
  const assetSource = typeof localizedSrc === 'object' || typeof localizedSrc === 'number' ? localizedSrc : null;
  const sourceLocation = assetSource || item.url || localizedSrc;
  const sourceText = typeof sourceLocation === 'string' ? sourceLocation.trim() : '';
  const embedUrl = getYoutubeEmbedUrl(sourceText);
  const remoteVideoUrl = sourceText && isHttpUrl(sourceText) ? sourceText : null;
  const canRenderExpoVideo = !!(Video && assetSource);

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.log('VideoBlock render', { assetSource, sourceText, embedUrl, remoteVideoUrl, hasNativeVideo: !!(Video && assetSource) });
  }

  if (canRenderExpoVideo) {
    return (
      <View style={[styles.container, heroOverlapStyle]}>
        <Video
          source={assetSource}
          useNativeControls
          resizeMode="contain"
          style={styles.video}
        />
      </View>
    );
  }

  if (embedUrl) {
    return (
      <View style={[styles.container, heroOverlapStyle]}>
        {isWeb ? (
          <iframe
            style={styles.webview}
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          />
        ) : (
          <WebView style={styles.webview} source={{ uri: embedUrl }} />
        )}
      </View>
    );
  }

  if (remoteVideoUrl) {
    return (
      <View style={[styles.container, heroOverlapStyle]}>
        {isWeb ? (
          <video style={styles.webview} controls src={remoteVideoUrl} />
        ) : (
          <WebView style={styles.webview} source={{ html: createHtmlVideoPage(remoteVideoUrl) }} />
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, heroOverlapStyle]}>
      {isWeb ? (
        <iframe
          style={styles.webview}
          src={RICKROLL_EMBED_URL}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Rickroll video"
        />
      ) : (
        <WebView style={styles.webview} source={{ uri: RICKROLL_EMBED_URL }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.videoContainer,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
