import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SuggestionSComponent = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-center',
        }}
      >
        <Text style={styles.textTitle}>Suggestions</Text>
        <Text style={styles.text}>See all</Text>
      </View>
    </View>
  );
};

export default SuggestionSComponent;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    marginRight: 140,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    opacity: 0.6,
  },
});
