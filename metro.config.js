const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('wasm');
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = config;