module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@config': './src/config',
            '@services': './src/services',
            '@utils': './src/utils',
            '@api': './src/api',
            '@assets': './assets',
          },
        },
      ],

      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          blocklist: null,
          allowlist: null,
          verbose: false,
        },
      ],

      // ⚠️ Ce plugin doit être en **dernier**, seul dans la liste
      'react-native-worklets/plugin',
    ],
  };
};
