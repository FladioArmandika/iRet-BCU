module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.ts','.android.ts','.ts', '.ios.tsx', '.android.tsx', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@assets': './src/assets',
            '@type': './src/types',
            '@stores': './src/stores',
            '@styles': './src/styles',
            '@components': './src/components',
            '@screens': './src/screens'
          },
        },
      ],
    ],
  };
};
