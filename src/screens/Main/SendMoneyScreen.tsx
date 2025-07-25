// Intégration du fichier send.tsx existant, avec les corrections précédentes
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft, Plus, Globe, ArrowRightLeft } from 'lucide-react-native';
import Header from '@components/Header';
import Button from '@components/Button';
import InputField from '@components/InputField';
import { theme } from '@config/theme';
import { useNavigation } from '@react-navigation/native';

export default function SendMoneyScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(655);
  const [recipients, setRecipients] = useState([
    { id: 1, name: 'Aminata Diallo', country: 'Sénégal', avatar: '🇸🇳', paymentMethods: ['Wave', 'Orange Money'] },
    { id: 2, name: 'Koffi Asante', country: 'Côte d\'Ivoire', avatar: '🇨🇮', paymentMethods: ['Wave', 'Orange Money', 'MTN Mobile Money'] },
    { id: 3, name: 'Fatou Camara', country: 'Mali', avatar: '🇲🇱', paymentMethods: ['Orange Money', 'Moov Money'] },
    { id: 4, name: 'Jean-Baptiste Nkomo', country: 'Cameroun', avatar: '🇨🇲', paymentMethods: ['Orange Money', 'MTN Mobile Money'] },
    { id: 5, name: 'Aisha Mwangi', country: 'Kenya', avatar: '🇰🇪', paymentMethods: ['M-Pesa', 'Airtel Money'] },
  ]);
  const [newRecipientName, setNewRecipientName] = useState('');
  const [newRecipientCountry, setNewRecipientCountry] = useState('');
  const [newRecipientMethods, setNewRecipientMethods] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVC, setNewCardCVC] = useState('');

  const countries = [
    'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Cameroun', 'Kenya', 'Nigeria',
    'Ghana', 'Burkina Faso', 'Niger', 'Ouganda', 'Rwanda', 'Tanzanie',
    'Mozambique', 'Lesotho', 'Afrique du Sud', 'Madagascar', 'Zambie'
  ];

  const paymentMethods = [
    { id: 'wave', name: 'Wave', logo: '🌊', countries: ['Sénégal', 'Côte d\'Ivoire', 'Burkina Faso', 'Mali'], color: '#00D4AA' },
    { id: 'orange', name: 'Orange Money', logo: '🍊', countries: ['Sénégal', 'Mali', 'Burkina Faso', 'Niger', 'Cameroun', 'Madagascar'], color: '#FF4500' },
    { id: 'mtn', name: 'MTN Mobile Money', logo: '📱', countries: ['Ghana', 'Uganda', 'Rwanda', 'Zambie', 'Cameroun'], color: '#FFCC00' },
    { id: 'mpesa', name: 'M-Pesa', logo: '💚', countries: ['Kenya', 'Tanzanie', 'Mozambique', 'Lesotho'], color: '#00A651' },
    { id: 'flutterwave', name: 'Flutterwave', logo: '🦋', countries: ['Nigeria', 'Ghana', 'Kenya', 'Ouganda', 'Rwanda'], color: '#F5A623' },
    { id: 'paystack', name: 'Paystack', logo: '💳', countries: ['Nigeria', 'Ghana', 'Afrique du Sud'], color: '#011B33' },
  ];

  const [availablePaymentMethods, setAvailablePaymentMethods] = useState(paymentMethods);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}?apiKey=${process.env.EXCHANGE_RATE_API_KEY}`
        );
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency] || 655);
      } catch (error) {
        console.error('Erreur taux de change:', error);
        Alert.alert('Erreur', 'Impossible de récupérer le taux de change. Utilisation du taux par défaut.');
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const convertedAmount = amount && !isNaN(parseFloat(amount)) ? (parseFloat(amount) * exchangeRate) : 0;
  const fee = amount && !isNaN(parseFloat(amount)) ? (parseFloat(amount) * 0.015) : 0;

  const addRecipient = () => {
    if (!newRecipientName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer le nom du bénéficiaire.');
      return;
    }
    if (!newRecipientCountry) {
      Alert.alert('Erreur', 'Veuillez sélectionner le pays du bénéficiaire.');
      return;
    }
    if (!newRecipientMethods.trim()) {
      Alert.alert('Erreur', 'Veuillez spécifier au moins une méthode de paiement.');
      return;
    }
    const newMethodsArray = newRecipientMethods.split(',').map(method => method.trim());
    const validMethods = newMethodsArray.filter(method =>
      paymentMethods.some(pm => pm.name.toLowerCase().includes(method.toLowerCase()))
    );
    if (validMethods.length === 0) {
      Alert.alert('Erreur', 'Aucune méthode de paiement valide n\'a été saisie.');
      return;
    }
    const newId = recipients.length > 0 ? Math.max(...recipients.map(r => r.id)) + 1 : 1;
    setRecipients([
      ...recipients,
      { id: newId, name: newRecipientName.trim(), country: newRecipientCountry, avatar: '🇺🇳', paymentMethods: validMethods },
    ]);
    setNewRecipientName('');
    setNewRecipientCountry('');
    setNewRecipientMethods('');
    Alert.alert('Succès', 'Bénéficiaire ajouté avec succès.');
  };

  const addPaymentMethod = () => {
    if (!newCardNumber || !newCardExpiry || !newCardCVC) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs de la carte.');
      return;
    }
    if (!/^\d{16}$/.test(newCardNumber)) {
      Alert.alert('Erreur', 'Le numéro de carte doit contenir 16 chiffres.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(newCardExpiry)) {
      Alert.alert('Erreur', 'La date d\'expiration doit être au format MM/AA.');
      return;
    }
    if (!/^\d{3}$/.test(newCardCVC)) {
      Alert.alert('Erreur', 'Le CVC doit contenir 3 chiffres.');
      return;
    }
    const newMethod = {
      id: `card_${Date.now()}`,
      name: `Carte bancaire (...${newCardNumber.slice(-4)})`,
      logo: '💳',
      countries: countries,
      color: '#011B33',
    };
    setAvailablePaymentMethods([...availablePaymentMethods, newMethod]);
    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCVC('');
    Alert.alert('Succès', 'Carte bancaire ajoutée avec succès.');
  };

  const handleContinue = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide (nombre positif).');
      return;
    }
    if (!selectedRecipient) {
      Alert.alert('Erreur', 'Veuillez sélectionner un bénéficiaire.');
      return;
    }
    if (!selectedPaymentMethod) {
      Alert.alert('Erreur', 'Veuillez sélectionner une méthode de paiement.');
      return;
    }
    navigation.navigate('ConfirmationScreen', {
      amount,
      recipient: selectedRecipient,
      paymentMethod: selectedPaymentMethod,
      convertedAmount,
      fee,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Envoyer de l'argent" onBack={() => navigation.goBack()} />
        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>Montant à envoyer</Text>
          <View style={styles.amountCard}>
            <View style={styles.currencySelector}>
              <View style={styles.currencyButton}>
                <Text style={styles.currencyText}>{fromCurrency}</Text>
                <ArrowRightLeft size={16} color={theme.colors.gray} />
                {Platform.OS === 'web' ? (
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    style={styles.currencyPicker}
                  >
                    <option value="XOF">XOF</option>
                    <option value="GHS">GHS</option>
                    <option value="NGN">NGN</option>
                    <option value="KES">KES</option>
                  </select>
                ) : (
                  <Picker
                    selectedValue={toCurrency}
                    onValueChange={(itemValue) => setToCurrency(itemValue)}
                    style={styles.currencyPicker}
                  >
                    <Picker.Item label="XOF" value="XOF" />
                    <Picker.Item label="GHS" value="GHS" />
                    <Picker.Item label="NGN" value="NGN" />
                    <Picker.Item label="KES" value="KES" />
                  </Picker>
                )}
              </View>
            </View>
            <InputField
              value={amount}
              onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.exchangeInfo}>
            <View style={styles.exchangeRow}>
              <Globe size={16} color={theme.colors.gray} />
              <Text style={styles.exchangeText}>
                1 {fromCurrency} = {exchangeRate.toFixed(0)} {toCurrency}
              </Text>
            </View>
            <View style={styles.conversionResult}>
              <Text style={styles.conversionText}>
                Le destinataire recevra: {convertedAmount.toFixed(0)} {toCurrency}
              </Text>
              <Text style={styles.feeText}>
                Frais inclus: 1.5% (soit {fee.toFixed(2)} EUR) | Taux garanti 24h
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destinataires en Afrique</Text>
            <TouchableOpacity onPress={() => {}}>
              <Plus size={20} color={theme.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.recipients}>
            {recipients.map((recipient) => (
              <TouchableOpacity
                key={recipient.id}
                style={[
                  styles.recipientItem,
                  selectedRecipient?.id === recipient.id && styles.selectedRecipient,
                ]}
                onPress={() => setSelectedRecipient(recipient)}
              >
                <View style={styles.recipientAvatar}>
                  <Text style={styles.avatarText}>{recipient.avatar}</Text>
                </View>
                <View style={styles.recipientInfo}>
                  <Text style={styles.recipientName}>{recipient.name}</Text>
                  <Text style={styles.recipientCountry}>{recipient.country}</Text>
                  <View style={styles.paymentMethodsContainer}>
                    {recipient.paymentMethods.slice(0, 2).map((method, index) => (
                      <Text key={index} style={styles.paymentMethodTag}>{method}</Text>
                    ))}
                  </View>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedRecipient?.id === recipient.id && styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajouter un nouveau bénéficiaire</Text>
          <InputField
            value={newRecipientName}
            onChangeText={setNewRecipientName}
            placeholder="Nom"
          />
          {Platform.OS === 'web' ? (
            <select
              value={newRecipientCountry}
              onChange={(e) => setNewRecipientCountry(e.target.value)}
              style={styles.amountInput}
            >
              <option value="">Sélectionnez un pays</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          ) : (
            <Picker
              selectedValue={newRecipientCountry}
              onValueChange={(itemValue) => setNewRecipientCountry(itemValue)}
              style={styles.amountInput}
            >
              <Picker.Item label="Sélectionnez un pays" value="" />
              {countries.map((country, index) => (
                <Picker.Item key={index} label={country} value={country} />
              ))}
            </Picker>
          )}
          <InputField
            value={newRecipientMethods}
            onChangeText={setNewRecipientMethods}
            placeholder="Méthodes de paiement (séparées par des virgules)"
          />
          <Button title="Ajouter" onPress={addRecipient} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajouter une carte bancaire</Text>
          <InputField
            value={newCardNumber}
            onChangeText={(text) => setNewCardNumber(text.replace(/[^0-9]/g, ''))}
            placeholder="Numéro de carte (16 chiffres)"
            keyboardType="numeric"
            maxLength={16}
          />
          <InputField
            value={newCardExpiry}
            onChangeText={setNewCardExpiry}
            placeholder="Date d'expiration (MM/AA)"
            maxLength={5}
          />
          <InputField
            value={newCardCVC}
            onChangeText={(text) => setNewCardCVC(text.replace(/[^0-9]/g, ''))}
            placeholder="CVC (3 chiffres)"
            keyboardType="numeric"
            maxLength={3}
          />
          <Button title="Ajouter la carte" onPress={addPaymentMethod} />
        </View>
        {selectedRecipient && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Méthode de paiement</Text>
            <View style={styles.paymentMethods}>
              {availablePaymentMethods
                .filter(method =>
                  selectedRecipient.paymentMethods.some(recipientMethod =>
                    method.name.toLowerCase().includes(recipientMethod.toLowerCase()) ||
                    recipientMethod.toLowerCase().includes(method.name.toLowerCase())
                  ) || method.name.includes('Carte bancaire')
                )
                .map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentMethodItem,
                      selectedPaymentMethod?.id === method.id && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setSelectedPaymentMethod(method)}
                  >
                    <View style={styles.paymentMethodIcon}>
                      <Text style={styles.paymentMethodLogo}>{method.logo}</Text>
                    </View>
                    <View style={styles.paymentMethodInfo}>
                      <Text style={styles.paymentMethodName}>{method.name}</Text>
                      <Text style={styles.paymentMethodDesc}>
                        Disponible dans {method.countries.length} pays
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioButton,
                        selectedPaymentMethod?.id === method.id && styles.radioButtonSelected,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}
        {amount && selectedRecipient && selectedPaymentMethod && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé de la transaction</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Montant envoyé</Text>
                <Text style={styles.summaryValue}>{amount} {fromCurrency}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frais de transfert</Text>
                <Text style={styles.summaryValue}>{fee.toFixed(2)} {fromCurrency}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total à débiter</Text>
                <Text style={styles.summaryTotalValue}>
                  {(parseFloat(amount) + fee).toFixed(2)} {fromCurrency}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Montant reçu</Text>
                <Text style={styles.summaryValue}>
                  {convertedAmount.toFixed(0)} {toCurrency}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Via</Text>
                <Text style={styles.summaryValue}>{selectedPaymentMethod.name}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {amount && selectedRecipient && selectedPaymentMethod && (
        <View style={styles.footer}>
          <Button title="Continuer" onPress={handleContinue} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  amountSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  currencySelector: {
    marginBottom: 16,
    width: '100%',
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  currencyPicker: {
    flex: 1,
    height: 40,
    color: theme.colors.text,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    border: '1px solid #E5E7EB',
  },
  amountInput: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    ...(Platform.OS === 'web' && { outline: 'none' }),
  },
  exchangeInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exchangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  exchangeText: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  conversionResult: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  conversionText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  feeText: {
    fontSize: 12,
    color: theme.colors.gray,
    marginTop: 8,
  },
  recipients: {
    gap: 12,
    marginBottom: 16,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedRecipient: {
    borderColor: theme.colors.secondary,
    backgroundColor: '#E6F0FA',
  },
  recipientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  recipientCountry: {
    fontSize: 14,
    color: theme.colors.gray,
    marginBottom: 4,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  paymentMethodTag: {
    fontSize: 10,
    color: theme.colors.secondary,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  radioButtonSelected: {
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.secondary,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedPaymentMethod: {
    borderColor: theme.colors.primary,
    backgroundColor: '#FFF3E6',
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodLogo: {
    fontSize: 20,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  paymentMethodDesc: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.gray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
