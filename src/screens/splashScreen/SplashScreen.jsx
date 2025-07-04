import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedLetter = ({ letter, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    const delay = index * 150;
    setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.Text style={[styles.letter, animatedStyle]}>
      {letter}
    </Animated.Text>
  );
};

const SplashScreen = () => {
  const text = 'Uber';
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('GetStarted');
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        {text.split('').map((letter, index) => (
          <AnimatedLetter key={index} letter={letter} index={index} />
        ))}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow: {
    flexDirection: 'row',
  },
  letter: {
    fontSize: 60,
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
  },
});
