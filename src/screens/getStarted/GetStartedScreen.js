import React, { useEffect } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Image1 from '../../assets/images/drivingMan.png';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeModules } from 'react-native';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const { Biometric } = NativeModules;
  const { NotificationPermission } = NativeModules;

  useEffect(() => {
    console.log('🔍 useEffect triggered on GetStartedScreen');
    NotificationPermission.requestPermission();
  }, []);

  const handleBiometricLogin = async () => {
    try {
      const result = await Biometric.authenticate();
      if (result) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          }),
        );
      }
    } catch (error) {
      ToastAndroid.show(
        error?.message || 'Authentication failed',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uber </Text>
      <View
        style={{
          height: 250,
          width: 250,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -230,
          marginBottom: -100,
        }}
      >
        <Image
          source={Image1}
          style={{ height: 190, width: 190, resizeMode: 'contain' }}
        />
      </View>
      <Text style={styles.text1}>Move with Safety</Text>

      <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
        <Text style={styles.text2}>Get started</Text>
        <Feather name="arrow-right" color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C6CF5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    marginTop: 90,
  },
  text1: {
    fontSize: 35,
    fontFamily: 'Raleway-Bold',
    color: 'white',
    marginTop: -90,
  },
  text2: {
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    marginStart: 115,
  },
  button: {
    height: 55,
    width: 340,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#000',
    marginBottom: 20,
    flexDirection: 'row',
    paddingEnd: 10,
  },
});
