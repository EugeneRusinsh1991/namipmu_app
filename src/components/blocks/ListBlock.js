import { Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function ListBlock({ item, lang, heroOverlapStyle }) {
  return (
    <View style={[globalStyles.listContainer, heroOverlapStyle]}>
      {item.items.map((listItem, itemIndex) => {
        const itemText = getLocalized(listItem.text, lang, '');

        return (
          <View key={itemIndex} style={globalStyles.listItem}>
            <Text style={globalStyles.listBullet}>•</Text>
            <Text style={globalStyles.listItemText}>{itemText}</Text>
          </View>
        );
      })}
    </View>
  );
}
