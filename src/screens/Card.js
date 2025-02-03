import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
//import AddEditNote from './src/screens/AddEditNote';

export default function Card(props) {
  return (
    // <View style={sty.cardContainer}>
    //   <Text> 5.23 PM</Text>
    //   <Text style={sty.cardHeading}>Today's Note</Text>
    //   <Text style={{marginTop: 10}} multiline={true}>
    //     BBBBBBBBBBBBBBBBBBBBGGGGGGGGGGGGGGGGGGbbbbbbbbbbbbbbbbbbbbbbbbbb
    //   </Text>
    // </View>

    <View style={sty.card}>
      <Text style={sty.title}>{props.title}</Text>
      <Text style={sty.description}>{props.description}</Text>
    </View>
  );
}

export const sty = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: 20,
    borderColor: 'grey',
    borderRadius: 20,
    color: 'black',
    shadowColor: '#fff',
    shadowOpacity: 1, // Shadow transparency
    //shadowOffset: {width: 4, height: 4,},// Right and down shadow
    // shadowRadius: 16, // Shadow blur
    backgroundColor: 'red', // Ensures background for shadow visibility
    elevation: 4, // Android shadow
    flex: 1,
  },
  cardHeading: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: '#F2F2F2',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // Ensure height adjusts to content
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
});
