import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Card from './Card.js';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  ImageBackground,
  Modal,
} from 'react-native';

import {commonStyles} from '../common/CommonStyles';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories, setNotes} from '../redux/NoteSlice.js';
import {deleteNotes} from '../redux/NoteSlice.js';
import moment from 'moment';

//import CheckBox from '@react-native-community/checkbox';

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  //const [toggleCheckBox, setToggleCheckBox] = useState(false);
  //const [categories, setCategories] = useState([]);
  // const [notes, setNotes] = useState([]);

  // noteReducer is the name of store reducer variable which is initialized by the exported reducer of noteSlice
  // where last notes is a state of reducer slice and first notes is just a variable name
  const notes = useSelector(state => state.noteReducer.notes);
  const categories = useSelector(state => state.noteReducer.categories);

  const [optionModelVisible, setOptionModelVisible] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleOnChipClick = catId => {
    let updatedItems = selectedItems; //Just setting the previous state of selectedItems to a variable named updateItems

    //Now here doing the same operation like we did before
    updatedItems = updatedItems.includes(catId)
      ? updatedItems.filter(item => item !== catId)
      : [...updatedItems, catId];

    console.log('updated items', updatedItems);

    //Now just set the updatedItems which is now updated with add or delete as per above logics
    setSelectedItems(updatedItems);

    //Get Notes by selected category ids
    getNoteByCategories(updatedItems);

    //when there is no category selected, it will show all the card(notes)
    if (updatedItems.length === 0) {
      getNotes();
    }
  };

  const renderItem = ({item}) => {
    //include in javascript return boolean
    //which checks the value inside the variable
    const isSelected = selectedItems.includes(item._id);

    return (
      <TouchableOpacity
        style={[
          styles.chip,
          {backgroundColor: isSelected ? '#0B162B' : 'transparent'},
        ]}
        onPress={() => {
          handleOnChipClick(item._id);
        }}>
        <Text
          style={[styles.chipText, {color: isSelected ? '#fff' : '#0B162B'}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  {
    /*
  const handleOnLongPress = id => {
    setSelectedCard(prevSelected => {
      prevSelected.includes(id)
        ? prevSelected.filter(noteId => noteId !== noteId) // Remove if already selected
        : [...prevSelected, id]; //add if selected
    });
  };

  const renderNotes = ({item}) => {
    //include in javascript return boolean
    //which checks the value inside the variable
    const isSelectedCard = selectedCard.includes(item._id);
    return (
      <TouchableOpacity
        style={{backgroundColor: isSelectedCard ? 'green' : 'transparent'}}
        onPress={() =>
          navigation.navigate('NewEdit', {
            note: item,
            // onNoteUpdated: updateSingleNote, // Pass update function
          })
        }
        onLongPress={() => {
          handleOnLongPress(item._id);
        }}>
        <Card title={item.title} description={item.content} />
      </TouchableOpacity>
    );
  };
*/
  }

  const handleOnLongPress = id => {
    setSelectedCard(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(noteId => noteId !== id)
        : [...prevSelected, id],
    );
    console.log('selected card', setSelectedCard);
  };

  const renderNotes = ({item}) => {
    const isSelectedCard =
      Array.isArray(selectedCard) && selectedCard.includes(item._id);
    return (
      <TouchableOpacity
        style={
          isSelectedCard ? styles.cardSelect : {backgroundColor: 'transparent'}
        }
        onPress={() => {
          navigation.navigate('NewEdit', {note: item, theme: item});
        }}
        onLongPress={() => handleOnLongPress(item._id)}>
        <Card
          title={item.title}
          description={item.content}
          theme={item.theme}
          createdAt={item.createdAt}
        />
      </TouchableOpacity>
    );
  };

  // UseEffect to do a get api call to fetch all notes
  useEffect(() => {
    getNotes();
    getCategory();
  }, []);

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
    if (json.error === false && json.result !== null) {
      dispatch(setCategories(json.result));
      //setCategories(json.result);
    } else {
      console.error(json.message);
    }
  };

  const getNotes = async () => {
    const response = await fetch('http://localhost:3000/api/notes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    console.log('Get Note api json', json);

    const formattedTime = moment(json.result.createdAt);
    console.log('time conversion', formattedTime);

    if (json.error === false && json.result !== null) {
      console.log('Notes: ', json.result);

      dispatch(setNotes(json.result));

      // setNotes(json.result);
    } else {
      console.error(json.message);
    }
  };

  // Function to update only the edited note in Redux store

  /**
   * method to create the note in a specific category
   */
  const getNoteByCategories = async selectedCatId => {
    let body = {
      categoryIds: selectedCatId, //SelectedItem itself is an array like [ 2, 3 , 56], so don't need to wrap inside []
    };
    console.log('selected items body', body);

    const response = await fetch('http://localhost:3000/api/notes/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (json.error === false && json.result !== null) {
      console.log('visible in specific category', json.result);
      dispatch(setNotes(json.result));
      // setNotes(json.result);
    } else {
    }

    //postNote();
  };

  const handleDeleteNote = async () => {
    const response = await fetch(
      `http://localhost:3000/api/notes/${selectedCard[0]}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();
    console.log('deleted api', json);

    if (json.error === false) {
      console.log('Notes: ', json.result);

      dispatch(deleteNotes(selectedCard));
      console.log('selected card', selectedCard);

      setSelectedCard([]); // Clear selection after deletion
      setOptionModelVisible(false);
    } else {
      console.error(json.message);
    }
  };
  const handleArchiveNote = () => {};

  return (
    <View style={[styles.container]}>
      <View>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../asset/image/Search.png')}
              style={[commonStyles.iconSize()]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOptionModelVisible(!optionModelVisible);
            }}>
            <Image
              source={require('../asset/image/threeDot.png')}
              style={[commonStyles.iconSize()]}
            />
          </TouchableOpacity>
          <Modal
            visible={optionModelVisible}
            onRequestClose={() => {
              setOptionModelVisible(false);
            }}
            transparent={true}>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={{display: 'flex', flexDirection: 'row', gap: 10}}
                onPress={() => {
                  handleArchiveNote();
                }}>
                <Image
                  source={require('../asset/image/folder.png')}
                  style={{height: 20, width: 20}}
                />
                <Text>Archive</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 10,
                }}
                onPress={() => handleDeleteNote()}>
                <Image
                  source={require('../asset/image/trash.png')}
                  style={{height: 20, width: 20}}
                />
                <Text>trash</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    </View>
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
  optionContainer: {
    display: 'flex',

    width: 149,
    borderColor: 'grey',

    borderWidth: 1,
    height: 80,
    top: '7%',
    backgroundColor: 'white',
    marginLeft: '60%',
    //paddingRight: 20,
    padding: 12,
    borderRadius: 20,
  },
  cardSelect: {
    backgroundColor: 'green',
    border: 1,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: 'none',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.0,
    shadowRadius: 0,
    elevation: 0,
  },
});
