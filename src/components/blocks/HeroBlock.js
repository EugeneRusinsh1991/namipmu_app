import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/theme';
import { getLocalizedAsset } from '../../utils/i18n';
import ImageWithFallback from '../ImageWithFallback';

export function HeroBlock({ content, lang = 'ru' }) {
  const heroItem = content.find(item => item.type === 'heroImage');
  
  if (!heroItem) return null;

  const heroImageSrc = getLocalizedAsset(heroItem.image, lang);
  
  return (
    <View style={globalStyles.heroImage}>
      <ImageWithFallback
        source={heroImageSrc}
        style={globalStyles.heroImageBackground}
        width={heroItem.width}
        height={heroItem.height}
        aspectRatio={heroItem.aspectRatio}
        resizeMode={heroItem.resizeMode}
      />
      <LinearGradient
        colors={['transparent', colors.backgroundLight]}
        style={globalStyles.heroGradient}
      />
    </View>
  );
}
