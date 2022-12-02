/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';

const useNativeDriver = true;

const App = () => {
  const animatedValue = useRef(new Animated.Value(0, { useNativeDriver }));

  const animatedStyle = {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
    borderColor: 'black',
    borderWidth: 1,
    transform: [{
      rotateZ: animatedValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }]
  }

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(animatedValue.current, { toValue: 1, useNativeDriver, duration: 500 }),
      Animated.timing(animatedValue.current,  {toValue: 0, useNativeDriver, duration: 500 }),
    ])).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <RotatedView />
      <Animated.View style={animatedStyle} />
    </View>
  );
};

function RotatedView() {
  return (
    <View style={styles.rotated}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        {new Array(50).fill(0).map((_, idx) => (
          <Text key={idx} style={{ fontSize: 32 }}> {idx + 1} </Text>
        ))}
      </View>
      <Seconds />
    </View>
  )
}

function Seconds() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => {
      setSeconds(k => k + 1);
    }, 1000);
    return () => clearInterval(handle);
  }, []);

  return <Text style={{fontSize: 24}}>Seconds: {seconds}</Text>
}

const styles = StyleSheet.create({
  rotated: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    transform: [{ rotateX: '50deg' }]
  },
});

export default App;
