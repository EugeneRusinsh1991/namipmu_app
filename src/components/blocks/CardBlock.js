import { View } from 'react-native';
import { getLocalized } from '../../utils/i18n';
import Card from '../Card';

export function CardBlock({ item, lang, heroOverlapStyle }) {
  const cardTitle = getLocalized(item.title, lang, '');
  const cardDescription = getLocalized(item.description, lang, '');

  // Определяем размер карточки
  const cardSize = item.type === 'cardSmall' ? 'small' : 'big';

  return (
    <View style={heroOverlapStyle}>
      <Card
        image={item.image}
        title={cardTitle}
        description={cardDescription}
        href={item.href}
        size={cardSize}
      />
    </View>
  );
}
