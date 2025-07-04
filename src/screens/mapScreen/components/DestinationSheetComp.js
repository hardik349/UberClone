import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const DestinationSheetComp = ({ onExpand, onCollapse, ...panHandlers }) => {
  return (
    <View style={styles.container}>
      <View {...panHandlers} hitSlop={{ top: 20, bottom: 20 }}>
        <TouchableOpacity onPress={onExpand} activeOpacity={0.8}>
          <View style={styles.grabber} />
          <Text style={styles.title}>Set your Destination</Text>
          <Text style={styles.titleDesc}>Drag up to expand</Text>

          <View style={styles.content}>
            <View style={styles.enterText}>
              <Text style={styles.description}>Where to?</Text>
              <Feather name="search" size={20} />
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onCollapse}>
              <Text style={styles.closeButtonText}>Confirm destination</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DestinationSheetComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  grabber: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 19,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Raleway-Bold',
  },
  titleDesc: {
    fontSize: 16,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
  },
  content: {
    paddingTop: 20,
  },
  description: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Raleway-Bold',
  },
  closeButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  enterText: {
    backgroundColor: '#EAEAEA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    padding: 4,
  },
});
