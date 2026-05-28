import React, { FC } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalizedAsset } from '../../utils/i18n';

const RICKROLL_VIDEO_ID = 'dQw4w9WgXcQ';
const RICKROLL_EMBED_URL = `https://www.youtube.com/embed/${RICKROLL_VIDEO_ID}?rel=0`;

const isWeb = Platform.OS === 'web';

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  console.log('VideoBlock module loaded', { isWeb });
}

/**
 * Props для VideoBlock
 */
interface VideoBlockProps {
  item: {
    src?: any;
    url?: string;
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Извлекает YouTube ID из разных форматов URL
 */
function getYoutubeEmbedUrl(source: string): string | null {
  if (!source) return null;
  const normalized = String(source).trim();
  const match = normalized.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}

/**
 * Проверяет, является ли строка HTTP URL
 */
function isHttpUrl(source: any): boolean {
  return /^https?:\/\//i.test(String(source || '').trim());
}

/**
 * Создает HTML страницу для встраивания видео
 */
function createHtmlVideoPage(videoUrl: string, backgroundColor: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
    <style>body{margin:0;background:${backgroundColor};display:flex;justify-content:center;align-items:center;height:100%;}</style>
  </head>
  <body>
    <video controls autoplay style="width:100%;height:100%;background:${backgroundColor};" src="${videoUrl}"></video>
  </body>
</html>`;
}

/**
 * Block компонент для встраивания видео
 * Поддерживает YouTube, удаленные видео и локальные видеофайлы
 */
export const VideoBlock: FC<VideoBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  const { tokens, specs } = useDesignTokens();

  try {
    const WebViewModule = isWeb ? null : require('react-native-webview');
    const WebView = WebViewModule?.WebView ?? WebViewModule?.default?.WebView ?? WebViewModule?.default ?? WebViewModule ?? null;
    const AV = isWeb ? null : require('expo-av');
    const Video = AV?.Video ?? AV?.default?.Video ?? AV?.default ?? AV ?? null;
    
    const localizedSrc = getLocalizedAsset(item?.src, lang);
    const assetSource = (localizedSrc && (typeof localizedSrc === 'object' || typeof localizedSrc === 'number')) 
      ? localizedSrc 
      : null;
    const sourceLocation = assetSource || item?.url || localizedSrc;
    const sourceText = typeof sourceLocation === 'string' 
      ? sourceLocation.trim() 
      : (sourceLocation?.uri || '');
    const embedUrl = getYoutubeEmbedUrl(sourceText);
    const remoteVideoUrl = sourceText && isHttpUrl(sourceText) ? sourceText : null;
    const canRenderExpoVideo = !!(Video && assetSource);

    const dynamicStyles = StyleSheet.create({
      container: {
        height: specs.image.video.height,
        borderRadius: specs.image.video.borderRadius,
        overflow: 'hidden' as any,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        backgroundColor: tokens.surface.surfacePrimary,
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
        color: colors.white,
        fontSize: 14,
        textAlign: 'center',
      },
    });

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
        item,
      });
    }

    if (canRenderExpoVideo) {
      return (
        <View style={[dynamicStyles.container, heroOverlapStyle]}>
          {React.createElement(Video, {
            source: assetSource,
            useNativeControls: true,
            resizeMode: 'contain',
            style: dynamicStyles.video,
          })}
        </View>
      );
    }

    const webviewAvailable = !!WebView;

    if (embedUrl) {
      return (
        <View style={[dynamicStyles.container, heroOverlapStyle]}>
          {isWeb ? (
            <iframe
              style={dynamicStyles.webview as any}
              src={embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            />
          ) : webviewAvailable ? (
            React.createElement(WebView, {
              style: dynamicStyles.webview,
              source: { uri: embedUrl },
            })
          ) : (
            <View style={dynamicStyles.fallbackContainer}>
              <Text style={dynamicStyles.fallbackText}>Видеоплеер недоступен</Text>
            </View>
          )}
        </View>
      );
    }

    if (remoteVideoUrl) {
      return (
        <View style={[dynamicStyles.container, heroOverlapStyle]}>
          {isWeb ? (
            <video
              style={dynamicStyles.webview as any}
              controls
              src={remoteVideoUrl}
            />
          ) : webviewAvailable ? (
            React.createElement(WebView, {
              style: dynamicStyles.webview,
              source: { html: createHtmlVideoPage(remoteVideoUrl, tokens.surface.surfacePrimary) },
            })
          ) : (
            <View style={dynamicStyles.fallbackContainer}>
              <Text style={dynamicStyles.fallbackText}>Видео недоступно</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <View style={[dynamicStyles.container, heroOverlapStyle]}>
        {isWeb || !embedUrl ? (
          <iframe
            style={dynamicStyles.webview as any}
            src={RICKROLL_EMBED_URL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Rickroll video"
          />
        ) : webviewAvailable ? (
          React.createElement(WebView, {
            style: dynamicStyles.webview,
            source: { uri: RICKROLL_EMBED_URL },
          })
        ) : (
          <View style={dynamicStyles.fallbackContainer}>
            <Text style={dynamicStyles.fallbackText}>Видео недоступно</Text>
          </View>
        )}
      </View>
    );
  } catch (err) {
    const fallbackStyles = StyleSheet.create({
      container: {
        height: specs.image.video.height,
        borderRadius: specs.image.video.borderRadius,
        overflow: 'hidden' as any,
        width: '100%',
      },
      fallbackContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacing.lg,
        backgroundColor: tokens.surface.surfacePrimary,
      },
      fallbackText: {
        color: tokens.text.primary,
        fontSize: tokens.typography.fontSizeSm,
        textAlign: 'center',
      },
    });

    console.error('VideoBlock error', err, { item, lang });
    return (
      <View style={[fallbackStyles.container, heroOverlapStyle]}>
        <View style={fallbackStyles.fallbackContainer}>
          <Text style={fallbackStyles.fallbackText}>Ошибка воспроизведения видео</Text>
        </View>
      </View>
    );
  }
};
