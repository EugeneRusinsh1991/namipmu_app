import { View } from 'react-native';
import { getLocalizedAsset } from '../../utils/i18n';
import ResponsiveImage from '../ResponsiveImage';

function MediaBlock({ item, lang, heroOverlapStyle }) {
  const source = getLocalizedAsset(item.src, lang);
  const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
  const maxWidth = isSquareImage ? null : item.width || null;

  return (
    <View style={heroOverlapStyle}>
      <ResponsiveImage
        source={source}
        aspectRatio={item.aspectRatio}
        minWidth={100}
        maxWidth={maxWidth}
        resizeMode={item.resizeMode || 'contain'}
      />
    </View>
  );
}

export function ImageBlock(props) {
  return <MediaBlock {...props} />;
}

export function GifBlock(props) {
  return <MediaBlock {...props} />;
}
