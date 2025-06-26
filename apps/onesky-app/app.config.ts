import { ConfigContext, ExpoConfig } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.onesky.oneskyapp.dev';
  }

  if (IS_PREVIEW) {
    return 'com.onesky.oneskyapp.preview';
  }

  return 'com.onesky.oneskyapp';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'onesky-app (Dev)';
  }

  if (IS_PREVIEW) {
    return 'onesky-app (Preview)';
  }

  return 'onesky';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: 'onesky-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'oneskyapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: 'metro',
    output: 'server',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splashscreen.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#C4EFF7',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: '0e3d9225-a919-4938-ad82-ac76fa8921d0',
    },
  },
  owner: 'onesky',
});
