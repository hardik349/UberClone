import React from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const SearchComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Maps')}
      >
        <FontAwesome name="search" size={28} />
        <Text style={styles.text}>Where to?</Text>
        <View style={styles.searchContainer2}>
          <FontAwesome6 name="calendar" size={20} />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 15,
              fontFamily: 'Raleway-Bold',
            }}
          >
            Later
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  searchContainer: {
    height: 70,
    width: 350,
    borderRadius: 35,
    backgroundColor: '#EAEAEA',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  searchContainer2: {
    height: 40,
    width: 90,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 21,
    fontFamily: 'Raleway-Bold',
    color: 'grey',
    marginRight: 40,
  },
});
