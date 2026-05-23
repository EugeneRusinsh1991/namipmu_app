import { Platform, StyleSheet, Text, View } from 'react-native';
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
  try {
    const WebViewModule = isWeb ? null : require('react-native-webview');
    const WebView = WebViewModule?.WebView ?? WebViewModule?.default?.WebView ?? WebViewModule?.default ?? WebViewModule ?? null;
    const AV = isWeb ? null : require('expo-av');
    const Video = AV?.Video ?? AV?.default?.Video ?? AV?.default ?? AV ?? null;
    const localizedSrc = getLocalizedAsset(item?.src, lang);
    const assetSource = (localizedSrc && (typeof localizedSrc === 'object' || typeof localizedSrc === 'number')) ? localizedSrc : null;
    const sourceLocation = assetSource || item?.url || localizedSrc;
    const sourceText = typeof sourceLocation === 'string' ? sourceLocation.trim() : (sourceLocation?.uri || '');
    const embedUrl = getYoutubeEmbedUrl(sourceText);
    const remoteVideoUrl = sourceText && isHttpUrl(sourceText) ? sourceText : null;
    const canRenderExpoVideo = !!(Video && assetSource);

    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log('VideoBlock render', {
        assetSource,
        sourceText,
        embedUrl,
        remoteVideoUrl,
        hasNativeVideo: !!(Video && assetSource),
        AVExists: !!AV,
        VideoExport: !!Video,
        WebViewExists: !!WebView,
        item
      });
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

    const webviewAvailable = !!WebView;

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
          ) : webviewAvailable ? (
            <WebView style={styles.webview} source={{ uri: embedUrl }} />
          ) : (
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>Видеоплеер недоступен</Text>
            </View>
          )}
        </View>
      );
    }

    if (remoteVideoUrl) {
      return (
        <View style={[styles.container, heroOverlapStyle]}>
          {isWeb ? (
            <video style={styles.webview} controls src={remoteVideoUrl} />
          ) : webviewAvailable ? (
            <WebView style={styles.webview} source={{ html: createHtmlVideoPage(remoteVideoUrl) }} />
          ) : (
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>Видео недоступно</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <View style={[styles.container, heroOverlapStyle]}>
        {isWeb || !embedUrl ? (
          <iframe
            style={styles.webview}
            src={RICKROLL_EMBED_URL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Rickroll video"
          />
        ) : webviewAvailable ? (
          <WebView style={styles.webview} source={{ uri: RICKROLL_EMBED_URL }} />
        ) : (
          <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>Видео недоступно</Text>
          </View>
        )}
      </View>
    );
  } catch (err) {
    console.error('VideoBlock error', err, { item, lang });
    return (
      <View style={[styles.container, heroOverlapStyle]}>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>Ошибка воспроизведения видео</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...(globalStyles.videoContainer || { height: 220, width: '100%' }),
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fallbackText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
