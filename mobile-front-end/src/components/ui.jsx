import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { Image as ExpoImage } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, styles } from '../styles/theme'
import { useState } from 'react'

export function Button({ title, onPress, pending = false, disabled = false, secondary = false, style }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled: pending || disabled, busy: pending }} disabled={pending || disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.secondary, (pending || disabled || pressed) && styles.disabled, style]}>
      {pending ? <ActivityIndicator color={secondary ? colors.primary : colors.background} /> : <Text style={[styles.buttonText, secondary && styles.secondaryText]}>{title}</Text>}
    </Pressable>
  )
}

export function Field({ label, onFocus, onBlur, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor={colors.muted} style={[styles.input, focused && { borderBottomColor: colors.primary }]} autoCapitalize="none" autoCorrect={false} {...props} onFocus={(event) => { setFocused(true); onFocus?.(event) }} onBlur={(event) => { setFocused(false); onBlur?.(event) }} />
    </View>
  )
}

export function Avatar({ user, large = false }) {
  const avatarStyle = [styles.avatar, large && styles.largeAvatar]
  if (user?.avatarUrl) return <Image accessibilityLabel={`Foto de ${user.nome}`} source={{ uri: user.avatarUrl }} style={avatarStyle} />
  return <View style={avatarStyle}><Text style={styles.avatarText}>{user?.nome?.slice(0, 1).toUpperCase() || 'L'}</Text></View>
}

export function ErrorText({ children }) {
  return children ? <Text accessibilityRole="alert" style={styles.error}>{children}</Text> : null
}

export function Logo({ style }) {
  return <ExpoImage source={require('../assets/logo.svg')} style={style} contentFit="contain" accessibilityLabel="Logo LevelUp" />
}

export function AuthLink({ title, onPress, disabled }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={styles.authLink}><Text style={styles.muted}>{title}</Text></Pressable>
}

export function AuthScreen({ children }) {
  return (
    <ImageBackground source={require('../assets/capainicial.png')} style={styles.authBackground}>
      <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
      <SafeAreaView style={styles.authOverlay}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={styles.authContent} keyboardShouldPersistTaps="handled">
            <View style={styles.authCard}><Logo style={styles.authLogo} />{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  )
}
