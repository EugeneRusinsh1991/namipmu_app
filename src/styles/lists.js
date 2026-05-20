import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    marginBottom: 12,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingLeft: 16,
    backgroundColor: '#e4dcec',
    borderRadius: 10,
    //borderLeftWidth: 10,
    //borderLeftColor: '#b1b1b1',
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2,
    alignItems: 'flex-start',
  },

  listBullet: {
    fontSize: 22,
    marginRight: 8,
    color: '#555',
    fontWeight: 'normal',
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
  },

  listItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    flex: 1,
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
  },
});
