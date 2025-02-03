import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Card, {sty} from './Card.js';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
//import {FloatingAction} from 'react-native-floating-action';
import {commonStyles, fabButton, fabIcon} from '../common/CommonStyles';
import {RoundButton} from '../components/RoundButton';
//import CheckBox from 'react-native-check-box';
import CheckBox from '@react-native-community/checkbox';

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();
  const data = [
    {id: '1', title: 'All'},
    {id: '2', title: 'Work'},
    {id: '3', title: 'Personal'},
  ];

  //const actions = [];

  const toggleChip = id => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item._id);
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          {backgroundColor: isSelected ? '#0B162B' : 'transparent'},
        ]}
        onPress={() => toggleChip(item._id)}>
        <Text
          style={[styles.chipText, {color: isSelected ? '#fff' : '#0B162B'}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNotes = ({item}) => {
    return <Card title={item.title} description={item.content} />;
  };

  // UseEffect to do a get api call to fetch all notes
  useEffect(() => {
    getNotes();
    getCategory();
  }, []);

  const getNotes = async () => {
    console.log('Start Api Call');
    const response = await fetch('http://localhost:3000/api/notes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    console.log('Get Note apiOut', json);

    setNotes(json.result);
  };

  const getCategory = async () => {
    const response = await fetch('http://localhost:3000/api/categories', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log('Category apiOut', json);

    setCategories(json);
  };

  return (
    <ImageBackground
      source={require('../asset/image/Frame_60.png')}
      style={[styles.container]}>
      <View>
        <View style={styles.nav}>
          <TouchableOpacity>
            <Image
              source={require('../asset/image/Search.png')}
              style={[commonStyles.iconSize()]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../asset/image/threeDot.png')}
              style={[commonStyles.iconSize()]}
            />
          </TouchableOpacity>
        </View>

        {/* Horizontal FlatList */}
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      {/* <View style={sty.cardContainer}>
        <Text> 5.23 PM</Text>
        <Text style={sty.cardHeading}>Today's Note</Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </View>
      <View style={sty.cardContainer}>
        <Text> 5.23 PM</Text>
        <Text style={sty.cardHeading}>Today's Note</Text>
        <Text style={{marginTop: 10}} multiline={true}>
          BBBBBBBBBBBBBBBBBBBBGGGGGGGGGGGGGGGGGGbbbbbbbbbbbbbbbbbbbbbbbbbb
        </Text>
      </View> */}

      {/* Centered No Task Text */}
      <View style={styles.centerContent}>
        {notes.length === 0 && (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={styles.noTask}>No task to show</Text>
          </View>
        )}

        <FlatList
          data={notes}
          renderItem={renderNotes}
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.noteFlatList}
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={commonStyles.fabButton(30, 40)}
        onPress={() => {
          navigation.navigate('AddNote');
        }}>
        <Image
          source={require('../asset/image/plusIcon.png')}
          style={commonStyles.iconSize()}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  nav: {
    width: '100%',
    //backgroundColor: 'blue',
    height: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  flatListContent: {
    paddingHorizontal: 1,
    //backgroundColor: 'yellow',
    marginBottom: 16, // Adjust spacing below FlatList
  },
  noteFlatList: {
    marginBottom: 16, // Adjust spacing below FlatList
  },
  chip: {
    marginVertical: 16,
    marginHorizontal: 5,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: '#0B162B',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#0B162B',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: 30,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  centerContent: {
    // backgroundColor: 'red',
    flex: 1,
  },
  noTask: {
    fontSize: 28,
    fontWeight: '600',
    color: '#0B162B',
    textAlign: 'center',
  },
  checkbox: {
    borderRadius: '50%',
    borderColor: 'red',
  },
});
