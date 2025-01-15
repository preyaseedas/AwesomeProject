import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  fabButton: (
    right = 20,
    bottom = 20, position = 'absolute',
    backgroundColor = '#000',
    height = 56,
    width = 56,
  
  ) => ({
    position: position,
    right: right,
    bottom: bottom,
    backgroundColor: backgroundColor,
    borderRadius: 30,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: backgroundColor,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 5, // Adds shadow for Android
  }),
  fabIcon: {
    height: 24,
    width: 24,
  },
  iconSize: (height = 24, width = 24) => ({
    height: height,
    width: width,
  }),
});
