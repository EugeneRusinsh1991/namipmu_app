import { StyleSheet } from 'react-native';

export const languageStyles = StyleSheet.create({
  langWrap: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },

  langBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff3eb',
    backgroundColor: '#fff3eb',
  },

  langBtnActive: {
    backgroundColor: '#fce8da',
    borderColor: '#fce8da',
  },

  langText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },

  langTextActive: {
    color: '#000',
  },
});
