import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import DestinationSheetComp from './components/DestinationSheetComp';

const SHEET_MAX_HEIGHT = 700;
const SHEET_MIN_HEIGHT = 240;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const startHeight = useRef(0);

  const heightAnim = useRef(new Animated.Value(SHEET_MIN_HEIGHT)).current;

  const expandSheet = () => {
    Animated.timing(heightAnim, {
      toValue: SHEET_MAX_HEIGHT,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const collapseSheet = () => {
    Animated.timing(heightAnim, {
      toValue: SHEET_MIN_HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const panResponders = useRef(
    PanResponder.create({
      onPanResponderGrant: (evt, gestureState) => {
        startHeight.current = heightAnim._value;
      },
      onPanResponderMove: (evt, gestureState) => {
        // gestureState.dy is the accumulated change in y
        // A negative dy means dragging up
        let newHeight = startHeight.current - gestureState.dy;

        // Clamp the height to not go beyond our limits
        if (newHeight > SHEET_MAX_HEIGHT) newHeight = SHEET_MAX_HEIGHT;
        if (newHeight < SHEET_MIN_HEIGHT) newHeight = SHEET_MIN_HEIGHT;

        // Set the new height directly
        heightAnim.setValue(newHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Get the final height and velocity
        const finalHeight = heightAnim._value;
        const velocityY = gestureState.vy;

        // Condition 1: Fast flick up
        if (velocityY < -0.5) {
          expandSheet();
        }
        // Condition 2: Fast flick down
        else if (velocityY > 0.5) {
          collapseSheet();
        }
        // Condition 3: No flick, decide based on position
        else {
          if (finalHeight > SHEET_MIN_HEIGHT + 100) {
            expandSheet();
          } else {
            collapseSheet();
          }
        }
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only activate if the vertical movement is more significant
        return Math.abs(gestureState.dy) > 5;
      },
    }),
  ).current;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to use this feature',
          );
          return;
        }
      }
      getCurrentLocation();
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.error('Location error:', error);
        Alert.alert('Error', 'Failed to get your location');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
        showLocationDialog: true,
        useSignificantChanges: true,
      },
    );
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : null}

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: heightAnim,
          },
        ]}
      >
        <DestinationSheetComp
          onExpand={expandSheet}
          onCollapse={collapseSheet}
          {...panResponders.panHandlers}
        />
      </Animated.View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
