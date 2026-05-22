import { Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function ListBlock({ item, lang, heroOverlapStyle }) {
  if (!item || !Array.isArray(item.items) || item.items.length === 0) return null;

  return (
    <View style={[globalStyles.listContainer, heroOverlapStyle]}>
      {item.items.map((listItem, itemIndex) => {
        const maybeText = listItem?.text ?? listItem;
        const itemText = getLocalized(maybeText, lang, '');

        return (
          <View key={String(itemIndex)} style={globalStyles.listItem}>
            <Text style={globalStyles.listBullet}>•</Text>
            <Text style={globalStyles.listItemText}>{itemText}</Text>
          </View>
        );
      })}
    </View>
  );
}
