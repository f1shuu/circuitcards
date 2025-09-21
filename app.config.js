export default {
  expo: {
    name: 'CircuitCards',
    slug: 'CircuitCards',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'dark',
    newArchEnabled: true,
    splash: {
      'image': './assets/images/splash.png',
      'resizeMode': 'contain',
      'backgroundColor': '#16141F'
    },
    android: {
      'package': 'com.f1shu.circuitcards'
    },
    extra: {
      'eas': {
        'projectId': '029ea93e-e19a-4463-89bf-642e0985c0d6'
      }
    }
  }
}
