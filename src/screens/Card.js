import React from 'react';
import {Image, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {commonStyles} from '../common/CommonStyles';
import moment from 'moment';
//import AddEditNote from './src/screens/AddEditNote';

export default function Card(props) {
  const formattedTime = moment.utc(props.createdAt).local().format('hh:mm A');
  return (
    <View
      style={[sty.card, {backgroundColor: props.theme?.value || '#ffffff'}]}>
      <View style={sty.remindCardStyle}>
        <Text style={{color: 'grey', fontSize: 12, fontFamily: 'quickstand'}}>
          {formattedTime}
        </Text>
        <Image
          source={require('../asset/image/clock-01.png')}
          style={commonStyles.iconSize()}
        />
      </View>
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
    borderRadius: 12,
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
    marginBottom: 4,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
  remindCardStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
