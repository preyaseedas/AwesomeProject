import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CommonColor} from '../common/Color';
import {useNavigation} from '@react-navigation/native';
function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../asset/image/app_logo.png')}
        style={styles.logoImg}
      />
       <Image
        source={require('../asset/image/app_logo.png')}
        style={styles.logoImg}
      />
       <Image
        source={require('../asset/image/app_logo.png')}
        style={styles.logoImg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColor.splashBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 116,
    height: 132,
  },
});

export default SplashScreen;
