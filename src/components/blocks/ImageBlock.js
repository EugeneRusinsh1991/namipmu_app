import { View } from 'react-native';
import { getLocalizedAsset } from '../../utils/i18n';
import ResponsiveImage from '../ResponsiveImage';

export function ImageBlock({ item, lang, heroOverlapStyle }) {
  const imageSrc = getLocalizedAsset(item.src, lang);

  const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
  const imageMaxWidth = isSquareImage ? null : item.width || null;
  
  return (
    <View style={heroOverlapStyle}>
      <ResponsiveImage
        source={imageSrc}
        aspectRatio={item.aspectRatio}
        minWidth={100}
        maxWidth={imageMaxWidth}
        padding={16}
        resizeMode={item.resizeMode || 'contain'}
      />
    </View>
  );
}

export function GifBlock({ item, lang, heroOverlapStyle }) {
  const gifSrc = getLocalizedAsset(item.src, lang);

  const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
  const gifMaxWidth = isSquareImage ? null : item.width || null;
  
  return (
    <View style={heroOverlapStyle}>
      <ResponsiveImage
        source={gifSrc}
        aspectRatio={item.aspectRatio}
        minWidth={100}
        maxWidth={gifMaxWidth}
        padding={16}
        resizeMode={item.resizeMode || 'contain'}
      />
    </View>
  );
}
