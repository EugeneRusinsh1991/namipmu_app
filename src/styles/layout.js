import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  appBackground: {
    flex: 1,
    backgroundColor: '#fff3eb',
  },

  container: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
});
