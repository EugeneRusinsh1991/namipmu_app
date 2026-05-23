import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';

export function ChecklistBlock({ item, lang, heroOverlapStyle }) {
  const items = Array.isArray(item.items) ? item.items : [];
  const [checkedItems, setCheckedItems] = useState({});

  const handleToggle = index => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const title = getLocalized(item.title, lang, 'Checklist');
  const description = getLocalized(item.description, lang, '');
  const doneCount = items.filter((_, index) => checkedItems[index]).length;

  return (
    <View style={[globalStyles.quizContainer, heroOverlapStyle, styles.container]}>
      {title ? <Text style={globalStyles.quizTitle}>{title}</Text> : null}
      {description ? <Text style={globalStyles.quizDescription}>{description}</Text> : null}
      <Text style={styles.progressLabel}>{`${doneCount} / ${items.length} ${lang === 'eng' ? 'done' : lang === 'ger' ? 'erledigt' : 'выполнено'}`}</Text>
      {items.map((itemData, index) => {
        const itemText = getLocalized(itemData.text, lang, '');
        const checked = Boolean(checkedItems[index]);
        return (
          <Pressable
            key={String(index)}
            onPress={() => handleToggle(index)}
            style={[styles.itemRow, checked ? styles.itemRowChecked : null]}
            android_ripple={{ color: '#f1f1f1' }}
          >
            <View style={[styles.checkbox, checked ? styles.checkboxChecked : null]}>
              {checked ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={[styles.itemText, checked ? styles.itemTextChecked : null]}>{itemText}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 12,
    color: '#6a5c4f',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#f8f5f1',
    marginBottom: 10,
  },
  itemRowChecked: {
    backgroundColor: '#e7f1e8',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#b8b0a4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: '#4d8f67',
    backgroundColor: '#4d8f67',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#2b2520',
  },
  itemTextChecked: {
    color: '#4d8f67',
    textDecorationLine: 'line-through',
  },
});
