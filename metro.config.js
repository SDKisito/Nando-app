// Fichier: metro.config.js (créer à la racine)
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Ensure that Metro is watching the correct platforms
config.resolver.platforms = ['native', 'web', 'ios', 'android'];

module.exports = config;
