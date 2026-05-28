from pathlib import Path
import re
root = Path(r'd:\eugsinsh gmail drive\NA\na_mi_pmu')

# 1. Theme types: remove flat keys
path = root / 'src/styles/design-system/theme/types.ts'
text = path.read_text(encoding='utf-8')
old_block = '''export interface SemanticTokens {
  surface: SurfaceTokens;
  text: TextTokens;
  interactive: InteractiveTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  backgroundLight: string;
  surfaceDefault: string;
  surfaceSecondary: string;
  cardBackground: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textOnAccent: string;
  borderDefault: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  success: string;
  warning: string;
  danger: string;
  bodyText: string;
  secondaryText: string;
  softAccent: string;
  muted: string;
  white: string;
  overlay: string;
  primary: string;
}'''
new_block = '''export interface SemanticTokens {
  surface: SurfaceTokens;
  text: TextTokens;
  interactive: InteractiveTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
}'''
if old_block in text:
    path.write_text(text.replace(old_block, new_block), encoding='utf-8')
else:
    raise SystemExit('Expected semantic types block not found in types.ts')

# 2. Typography: remove legacy interface and legacy section in returned object
path = root / 'src/styles/design-system/typography.ts'
text = path.read_text(encoding='utf-8')
old_iface = '''export interface TypographyStyles {
  heading1: any;
  heading2: any;
  heading3: any;
  bodyLarge: any;
  bodyMedium: any;
  bodySmall: any;
  caption: any;
  label: any;
  labelSmall: any;
  
  // Legacy names (для обратной совместимости)
  title: any;
  subtitle: any;
  text: any;
  spacer: any;
  eyebrow: any;
}'''
new_iface = '''export interface TypographyStyles {
  heading1: any;
  heading2: any;
  heading3: any;
  bodyLarge: any;
  bodyMedium: any;
  bodySmall: any;
  caption: any;
  label: any;
  labelSmall: any;
}'''
text = text.replace(old_iface, new_iface)
old_legacy = '''    // Legacy support (для обратной совместимости с существующим кодом)
    title: {
      fontSize: scale.fontSizeXxl * fontScale,
      fontWeight: scale.fontWeightBold,
      lineHeight: scale.fontSizeXxl * fontScale * scale.lineHeightTight,
      color: colors.textPrimary,
      fontFamily: scale.familyHeading,
    },
    subtitle: {
      fontSize: scale.fontSizeLg * fontScale,
      fontWeight: scale.fontWeightSemibold,
      lineHeight: scale.fontSizeLg * fontScale * scale.lineHeightTight,
      color: colors.textPrimary,
      fontFamily: scale.familyHeading,
    },
    text: {
      fontSize: scale.fontSizeMd * fontScale,
      fontWeight: scale.fontWeightRegular,
      lineHeight: scale.fontSizeMd * fontScale * scale.lineHeightNormal,
      color: colors.bodyText,
      fontFamily: scale.familyMain,
    },
    spacer: {
      fontSize: scale.fontSizeSm * fontScale,
      fontWeight: scale.fontWeightRegular,
      lineHeight: scale.fontSizeSm * fontScale * scale.lineHeightNormal,
      color: colors.muted,
      fontFamily: scale.familyMain,
    },
    eyebrow: {
      fontSize: scale.fontSizeXs * fontScale,
      fontWeight: scale.fontWeightSemibold,
      lineHeight: scale.fontSizeXs * fontScale * scale.lineHeightTight,
      color: colors.white,
      fontFamily: scale.familyHeading,
      textTransform: 'uppercase' as const,
    },
  };'''
if old_legacy in text:
    text = text.replace(old_legacy, '  };')
else:
    raise SystemExit('Expected legacy block not found in typography.ts')
mapping = {
    'color: colors.textPrimary': 'color: colors.text.primary',
    'color: colors.bodyText': 'color: colors.text.primary',
    'color: colors.textSecondary': 'color: colors.text.secondary',
    'color: colors.textTertiary': 'color: colors.text.tertiary',
}
for old, new in mapping.items():
    text = text.replace(old, new)
path.write_text(text, encoding='utf-8')

# 3. lightTheme/darkTheme remove flat key blocks
for rel in ['src/styles/design-system/theme/lightTheme.ts', 'src/styles/design-system/theme/darkTheme.ts']:
    path = root / rel
    text = path.read_text(encoding='utf-8')
    pattern = re.compile(r'(\s*}\n\s*\},\n\s*\n)(  backgroundLight:[\s\S]*?\n\};)$', re.MULTILINE)
    match = pattern.search(text)
    if not match:
        raise SystemExit(f'Expected flat token block not found in {rel}')
    start = match.start(2)
    text = text[:start] + '};\n'
    path.write_text(text, encoding='utf-8')

# 4. ThemeContext updates
path = root / 'src/context/ThemeContext.tsx'
text = path.read_text(encoding='utf-8')
text = text.replace("import { getComponentSpecs } from '../styles/design-system/components';\nimport { getTheme, lightTheme } from '../styles/design-system/theme';\nimport { getTypography } from '../styles/design-system/typography';\nimport { LanguageProvider } from './LanguageContext';",
                    "import { getComponentSpecs } from '../styles/design-system/components';\nimport { getTheme, lightTheme } from '../styles/design-system/theme';\nimport { LanguageProvider } from './LanguageContext';")
old = '''export interface ThemeContextValue {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  
  // Design System exports
  colors: any;
  typography: any;
  componentStyles: any;
  
  // Legacy support
  components?: any;
}'''
new = '''export interface ThemeContextValue {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  
  // Design System exports
  tokens: any;
  componentStyles: any;
}'''
if old not in text:
    raise SystemExit('Expected ThemeContextValue block not found')
text = text.replace(old, new)
old = '''const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  isDark: false,
  toggleTheme: async () => {},
  colors: lightTheme,
  typography: getTypography(lightTheme, 1),
  componentStyles: getComponentSpecs(lightTheme),
});'''
new = '''const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  isDark: false,
  toggleTheme: async () => {},
  tokens: lightTheme,
  componentStyles: getComponentSpecs(lightTheme),
});'''
if old not in text:
    raise SystemExit('Expected ThemeContext createContext block not found')
text = text.replace(old, new)
text = text.replace("  const [theme, setTheme] = useState<'light' | 'dark'>('light');\n  const [fontScale, setFontScale] = useState(1);\n\n  useEffect(() => {",
                    "  const [theme, setTheme] = useState<'light' | 'dark'>('light');\n\n  useEffect(() => {")
text = text.replace("  const designSystem = useMemo(() => {\n    const isDark = theme === 'dark';\n    const colors = getTheme(isDark);\n    const typography = getTypography(colors, fontScale);\n    const componentStyles = getComponentSpecs(colors);\n\n    return {\n      colors,\n      typography,\n      componentStyles,\n    };\n  }, [theme, fontScale]);\n\n  const value: ThemeContextValue = {\n    theme,\n    isDark: theme === 'dark',\n    toggleTheme,\n    colors: designSystem.colors,\n    typography: designSystem.typography,\n    componentStyles: designSystem.componentStyles,\n    components: designSystem.componentStyles,\n  };",
                    "  const designSystem = useMemo(() => {\n    const isDark = theme === 'dark';\n    const tokens = getTheme(isDark);\n    const componentStyles = getComponentSpecs(tokens);\n\n    return {\n      tokens,\n      componentStyles,\n    };\n  }, [theme]);\n\n  const value: ThemeContextValue = {\n    theme,\n    isDark: theme === 'dark',\n    toggleTheme,\n    tokens: designSystem.tokens,\n    componentStyles: designSystem.componentStyles,\n  };"
                    )
if 'components: designSystem.componentStyles' not in text:
    raise SystemExit('Expected componentStyles alias block not found in ThemeContext')
path.write_text(text, encoding='utf-8')

# 5. useDesignTokens update
path = root / 'src/hooks/useDesignTokens.ts'
text = path.read_text(encoding='utf-8')
text = text.replace('export interface DesignTokensHookReturn {\n  /** Семантические токены (цвета, типография, отступы, размеры) */\n  tokens: SemanticTokens;\n  \n  /** Спецификации компонентов (Button, Card, Input, etc.) */\n  specs: ComponentSpecifications;\n  \n  /** Текущая тема (\'light\' или \'dark\') */\n  theme: \'light\' | \'dark\';\n  \n  /** Является ли текущая тема темной */\n  isDark: boolean;\n  \n  /** Функция для переключения темы */\n  toggleTheme: () => Promise<void>;\n}',
                    'export interface DesignTokensHookReturn {\n  /** Семантические токены (цвета, типография, отступы, размеры) */\n  tokens: SemanticTokens;\n  \n  /** Спецификации компонентов (Button, Card, Input, etc.) */\n  specs: ComponentSpecifications;\n  componentStyles: ComponentSpecifications;\n  \n  /** Текущая тема (\'light\' или \'dark\') */\n  theme: \'light\' | \'dark\';\n  \n  /** Является ли текущая тема темной */\n  isDark: boolean;\n  \n  /** Функция для переключения темы */\n  toggleTheme: () => Promise<void>;\n}')
text = text.replace('  const specs = useMemo(\n    () => getComponentSpecs(themeContext.colors as SemanticTokens),\n    [themeContext.colors]\n  );',
                    '  const specs = useMemo(\n    () => getComponentSpecs(themeContext.tokens as SemanticTokens),\n    [themeContext.tokens]\n  );')
text = text.replace('  return {\n    tokens: themeContext.colors as SemanticTokens,\n    specs,\n    theme: themeContext.theme,\n    isDark: themeContext.isDark,\n    toggleTheme: themeContext.toggleTheme,\n  };',
                    '  return {\n    tokens: themeContext.tokens as SemanticTokens,\n    specs,\n    componentStyles: themeContext.componentStyles,\n    theme: themeContext.theme,\n    isDark: themeContext.isDark,\n    toggleTheme: themeContext.toggleTheme,\n  };')
path.write_text(text, encoding='utf-8')

# 6. _layout update
path = root / 'src/app/_layout.tsx'
text = path.read_text(encoding='utf-8')
text = text.replace("import { ThemeProvider, useTheme } from '../context/ThemeContext';\n", "import { ThemeProvider } from '../context/ThemeContext';\nimport { useDesignTokens } from '../hooks/useDesignTokens';\n")
text = text.replace('  const { colors } = useTheme();\n\n  return (\n    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.backgroundLight }]}> \n      <View style={styles.pageWrapper}>\n        <View style={styles.content}>\n          <Stack\n            screenOptions={{\n              contentStyle: [{ flex: 1, backgroundColor: colors.backgroundLight }],\n            }}\n            style={styles.stack}\n          >',
                    '  const { tokens } = useDesignTokens();\n\n  return (\n    <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.surface.background }]}> \n      <View style={styles.pageWrapper}>\n        <View style={styles.content}>\n          <Stack\n            screenOptions={{\n              contentStyle: [{ flex: 1, backgroundColor: tokens.surface.background }],\n            }}\n            style={styles.stack}\n          >')
path.write_text(text, encoding='utf-8')

# 7. Global replacements across src files
paths = list(root.glob('src/**/*.*'))
for path in paths:
    if path.suffix not in {'.ts', '.tsx', '.js', '.jsx'}:
        continue
    if 'node_modules' in path.parts:
        continue
    text = path.read_text(encoding='utf-8')
    orig = text
    text = re.sub(r"import \{ useTheme \} from (['\"][^'\"]*?/context/ThemeContext['\"]);", r"import { useDesignTokens } from \1;", text)
    text = text.replace('useTheme()', 'useDesignTokens()')
    text = text.replace('const { colors, typography, componentStyles } = useDesignTokens();', 'const { tokens, componentStyles } = useDesignTokens();')
    text = text.replace('const { colors, componentStyles } = useDesignTokens();', 'const { tokens, componentStyles } = useDesignTokens();')
    text = text.replace('const { colors, typography } = useDesignTokens();', 'const { tokens } = useDesignTokens();')
    text = text.replace('const { colors, theme, toggleTheme } = useDesignTokens();', 'const { tokens, theme, toggleTheme } = useDesignTokens();')
    text = text.replace('const { theme, toggleTheme, colors: themeColors } = useDesignTokens();', 'const { theme, toggleTheme, tokens: themeTokens } = useDesignTokens();')
    text = text.replace('const { colors: themeColors, theme, toggleTheme } = useDesignTokens();', 'const { tokens: themeTokens, theme, toggleTheme } = useDesignTokens();')
    text = text.replace('const { colors } = useDesignTokens();', 'const { tokens } = useDesignTokens();')
    text = text.replace('const { theme, toggleTheme, colors } = useDesignTokens();', 'const { tokens, theme, toggleTheme } = useDesignTokens();')
    text = text.replace('const { colors: themeColors } = useDesignTokens();', 'const { tokens: themeTokens } = useDesignTokens();')
    text = re.sub(r"import \{([^}]*)\} from (['\"][\.\./]+styles/theme['\"]);", r"import { useDesignTokens } from \2;", text)
    token_replacements = [
        ('color: colors.white', 'color: tokens.text.onAccent'),
        ('backgroundColor: colors.white', 'backgroundColor: tokens.surface.surfacePrimary'),
        ('borderColor: colors.white', 'borderColor: tokens.surface.surfacePrimary'),
        ('themeColors?.white || colors.white', 'tokens.surface.surfacePrimary'),
        ('themeColors?.white', 'tokens.surface.surfacePrimary'),
        ('colors.backgroundLight', 'tokens.surface.background'),
        ('colors.cardBackground', 'tokens.surface.surfaceSecondary'),
        ('colors.surfaceDefault', 'tokens.surface.surfacePrimary'),
        ('colors.secondarySurface', 'tokens.surface.surfaceSecondary'),
        ('colors.textPrimary', 'tokens.text.primary'),
        ('colors.textSecondary', 'tokens.text.secondary'),
        ('colors.textTertiary', 'tokens.text.tertiary'),
        ('colors.textOnAccent', 'tokens.text.onAccent'),
        ('colors.borderDefault', 'tokens.interactive.border'),
        ('colors.border', 'tokens.interactive.border'),
        ('colors.accentHover', 'tokens.interactive.accentHover'),
        ('colors.accentLight', 'tokens.interactive.accentLight'),
        ('colors.inputBorder', 'tokens.interactive.inputBorder'),
        ('colors.inputPlaceholder', 'tokens.text.tertiary'),
        ('colors.success', 'tokens.text.success'),
        ('colors.warning', 'tokens.text.warning'),
        ('colors.danger', 'tokens.text.danger'),
        ('colors.bodyText', 'tokens.text.primary'),
        ('colors.secondaryText', 'tokens.text.secondary'),
        ('colors.softAccent', 'tokens.interactive.accentLight'),
        ('colors.muted', 'tokens.text.tertiary'),
        ('colors.primary', 'tokens.interactive.accent'),
        ('colors.accent', 'tokens.interactive.accent'),
        ('colors.white', 'tokens.surface.surfacePrimary'),
    ]
    for old, new in token_replacements:
        text = text.replace(old, new)

    if text != orig:
        path.write_text(text, encoding='utf-8')

print('Batch edits complete')
