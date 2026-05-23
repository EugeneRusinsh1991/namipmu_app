import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

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
      {title ? <ScaledText style={globalStyles.title}>{title}</ScaledText> : null}
      {description ? <ScaledText style={globalStyles.text}>{description}</ScaledText> : null}
      <ScaledText style={[globalStyles.text, styles.progressLabel]}>{`${doneCount} / ${items.length} ${lang === 'eng' ? 'done' : lang === 'ger' ? 'erledigt' : 'выполнено'}`}</ScaledText>
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
              {checked ? <ScaledText style={styles.checkmark}>✓</ScaledText> : null}
            </View>
            <ScaledText style={[globalStyles.text, styles.itemText, checked ? styles.itemTextChecked : null]}>{itemText}</ScaledText>
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
    color: '#7d6c63',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#fbf7f3',
    borderWidth: 1,
    borderColor: '#e6ddd6',
    marginBottom: 10,
  },
  itemRowChecked: {
    backgroundColor: '#f2f0ec',
    borderColor: '#d8d0c7',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d8d0c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: '#8d9b7a',
    backgroundColor: '#e6eedf',
  },
  checkmark: {
    color: '#4d6b4c',
    fontSize: 14,
    lineHeight: 18,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#2b2520',
  },
  itemTextChecked: {
    color: '#7d8a75',
    textDecorationLine: 'line-through',
  },
});
