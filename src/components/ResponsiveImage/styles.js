import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../styles/theme';
const componentDefaults = require('../../styles/componentDefaults').componentStyles;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  image: {
    alignSelf: 'center',
    borderRadius: componentDefaults.image?.borderRadius ?? radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
  },
});
