# Nando - Application de Transfert d'Argent Mondial

Nando est une application mobile moderne permettant de transférer de l'argent dans le monde entier en toute sécurité.

## 🌟 Fonctionnalités

- **Transferts internationaux** : Envoyez de l'argent dans plus de 195 pays
- **Taux de change en temps réel** : Obtenez les meilleurs taux du marché
- **Sécurité avancée** : Chiffrement bancaire et authentification biométrique
- **Gestion multi-devises** : Portefeuilles numériques pour différentes devises
- **Historique complet** : Suivez toutes vos transactions
- **Interface intuitive** : Design moderne et facile à utiliser

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- Expo CLI
- Compte Expo (pour les builds)

### Installation
```bash
npm install
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur Web
npm run web
```

## 📱 Builds de production

### Configuration EAS
```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à Expo
eas login

# Configurer le projet
eas build:configure
```

### Créer des builds
```bash
# Build Android (APK pour test)
npm run build:android

# Build iOS
npm run build:ios

# Build pour les deux plateformes
npm run build:all
```

## 🏪 Publication sur les stores

### Google Play Store
1. Créer un compte développeur Google Play (25$ unique)
2. Générer un build AAB : `eas build --platform android --profile production`
3. Télécharger et publier via Google Play Console

### Apple App Store
1. Compte développeur Apple (99$/an)
2. Générer un build iOS : `eas build --platform ios --profile production`
3. Télécharger et publier via App Store Connect

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env` :
```
EXPO_PUBLIC_API_URL=https://api.nando-it.fr
EXPO_PUBLIC_WEBSITE_URL=https://nando-it.fr
```

### Personnalisation
- **Logo** : Remplacez `assets/images/icon.png`
- **Couleurs** : Modifiez les couleurs dans les styles
- **Domaine** : Configuré pour `nando-it.fr`

## 📋 Fonctionnalités à implémenter

### Backend requis
- [ ] API REST sécurisée
- [ ] Base de données (PostgreSQL/MongoDB)
- [ ] Authentification JWT
- [ ] Intégration services de paiement (Stripe, Wise)
- [ ] Conformité KYC/AML
- [ ] Notifications push

### Sécurité
- [ ] Authentification biométrique
- [ ] Chiffrement end-to-end
- [ ] Détection de fraude
- [ ] Audit de sécurité

### Conformité
- [ ] Licence services financiers
- [ ] RGPD
- [ ] Réglementations locales

## 🌐 Site web
[nando-it.fr](https://nando-it.fr)

## 📞 Support
support@nando-it.fr

## 📄 Licence
Propriétaire - Nando IT © 2025# Nando-app
