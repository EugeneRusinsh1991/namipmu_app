import { StyleSheet } from 'react-native';

export const imageStyles = StyleSheet.create({
  squareCenteredImage: {
    width: 300,          // максимум
    height: 300,         // максимум (квадрат)
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },

  responsiveImage: {
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },

  heroImage: {
    width: '100%',
    height: 250,
    position: 'relative',
    marginBottom: -80,
    zIndex: 0,
    overflow: 'hidden',
  },

  heroImageBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },

  videoContainer: {
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
