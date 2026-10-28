const allowHttp = !process.env.EXPO_PUBLIC_API_URL?.startsWith('https://')

module.exports = {
  expo: {
    name: 'LevelUP',
    slug: 'levelup-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'dark',
    platforms: ['android', 'ios', 'web'],
    web: { bundler: 'metro', name: 'LevelUP', output: 'single' },
    ios: {
      bundleIdentifier: 'com.levelup.mobile',
      supportsTablet: true,
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: allowHttp,
          NSAllowsLocalNetworking: allowHttp,
        },
      },
    },
    android: { package: 'com.levelup.mobile' },
    plugins: [
      'expo-secure-store',
      ['expo-build-properties', { android: { usesCleartextTraffic: allowHttp } }],
    ],
  },
}
