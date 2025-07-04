import React from 'react';
import { Text, View } from 'react-native';
import SearchComponent from './components/SearchComponent';
import SuggestionSComponent from './components/SuggestionsComponent';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SearchComponent />
      <SuggestionSComponent />
    </View>
  );
};

export default HomeScreen;
