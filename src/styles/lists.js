import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    marginBottom: 12,
    marginHorizontal: ,
    paddingHorizontal: 0,
    paddingLeft: 16,
    backgroundColor: '#e4dcec',
    borderRadius: 10,
    // Тень (как в Card)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Тень для Android
    // shadowOpacity: 0.2, // Сделать тень темнее
    // shadowRadius: 4,   // Сделать тень четче
    // marginHorizontal: 5, // Добавь, если тень обрезается краями экрана
    // borderLeftWidth: 10,
    // borderLeftColor: '#b1b1b1',
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2,
    alignItems: 'flex-start',
    // paddingVertical: 4,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },

  listBullet: {
    fontSize: 22,
    marginRight: 8,
    color: '#555',
    fontWeight: 'normal',
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
    // fontFamily: 'YourCustomFontName', 
    // color: '#826cff',
  },

  listItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    flex: 1,
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
    // fontFamily: 'YourCustomFontName',
    // fontWeight: '500',
    // letterSpacing: 0.3,
  },
});
