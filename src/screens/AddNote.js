import React, {useState, useMemo, useEffect} from 'react';
import {
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import moment from 'moment';

import {commonStyles} from '../common/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {SaveButton} from '../components/SaveButton';
import {style} from './Reminder';
import Reminder from './Reminder';
import {useSelector, useDispatch} from 'react-redux';

import {addNote} from '../redux/NoteSlice';

export default function AddNote() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const categories = useSelector(state => state.noteReducer.categories);

  const [tempTheme, setTempTheme] = useState('#FFFFFF');
  const [selectedTheme, setSelectedTheme] = useState('#FFFFFF');

  //const formattedTime = moment(timeString).format('hh:mm A');

  const [isThemeModalVisible, setThemeModalVisible] = useState(false); // MODEL TO CHOOSE THEME
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false); //TO SET THEME IN WHICH CATEGORY
  {
    /**
  const [isReminderModalVisible, setReminderModalVisible] = useState(true);
   */
  }

  const [selectedId, setSelectedId] = useState(null); //for radio box selection

  const [addCategoryTxt, setAddCategoryTxt] = useState('');

  //usestate for title                 3
  const [title, setTitle] = useState('');
  //usestate  for description
  const [description, setDescription] = useState('');

  const [transformedCategories, setTransformedCategories] = useState([]);

  const [component, setComponent] = useState(null);

  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };

  const chooseTheme = selectedColor => {
    //select the color from the theme model when we press on a particular color
    setTempTheme(selectedColor);
  };

  /**
   * This method will create a new category using a POST API
   */
  const postCategory = async () => {
    let body = {
      name: addCategoryTxt,
      description: addCategoryTxt,
    };

    const response = await fetch('http://localhost:3000/api/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const outPut = await response.json();
    console.log('output', outPut);

    // To clear the typed category text from the user input
    setAddCategoryTxt('');

    //Get updated category list after creating a new category
  };

  const currentTime = moment().format('hh:mm A'); //To get the current time
  /**
   * postNote method is used to create note from user input using POST API
   */
  const postNote = async () => {
    console.log('Start Api Calling');

    let body = {
      title: title, // Pass the title from state
      content: description, // Pass the description from state
      categories: [selectedId],
      theme: {
        type: 'color',
        value: selectedTheme,
      },
      createdAt: currentTime,
    };

    console.log('Post Api body', body);

    const response = await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log('apiOut', json);
    dispatch(addNote(json.result));
    //TODO: get all notes again or update note list in reducer

    navigation.goBack();
  };

  // to execute get all categories 1st time and once when screen is opened
  useEffect(() => {
    let tempCat = handleTransformCates(categories);

    setTransformedCategories(tempCat);
  }, [categories]);

  /**
   * Function to get all category list using a GET API
   */
  // const getAllCategory = async () => {
  // const response = await fetch('http://localhost:3000/api/categories', {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const json = await response.json();
  // console.log(' AddNote Page Category apiOut actual', json);
  // if (json.error === false && json.result !== null) {
  // let tempCat = handleTransformCates(json.result);
  // console.log('after trans data', tempCat);
  // setCategories(tempCat);
  // } else {
  //   console.error('error found');
  // }
  // };

  /**
   * This function is used to transform category data to a specific format
   * @param {*} data
   * @returns {id:"",label:"", value:""}
   */
  const handleTransformCates = data => {
    return data.map(item => ({
      id: item._id, // Generates unique string ID based on index
      label: item.name, // Use name if available, otherwise fallback
      value: item.name,
    }));
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.container, {backgroundColor: selectedTheme}]}>
        <TextInput
          style={styles.title}
          placeholder="Title"
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <TextInput
          style={styles.para}
          value={description}
          placeholder="Write Something"
          multiline={true}
          onChangeText={x => {
            setDescription(x);
          }}
        />
      </View>
      <View style={styles.iconbar}>
        <TouchableOpacity onPress={() => setComponent(<Reminder />)}>
          <Image
            source={require('../asset/image/bell.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
        {component}
        <TouchableOpacity
          onPress={() => {
            setCategoryModalVisible(true);
          }}>
          <Image
            source={require('../asset/image/tag.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../asset/image/thumbtack.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../asset/image/sliders-h.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleThemeModal}>
          <Image
            source={require('../asset/image/Theme.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={commonStyles.fabButton(0, 0, 'none')}
          onPress={() => {
            postNote();
          }}>
          <Image
            source={require('../asset/image/check.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
      </View>
      {/** Model UI for Theme */}
      <Modal
        visible={isThemeModalVisible}
        animationType="slide"
        onRequestClose={toggleThemeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Choose Theme</Text>
            <View style={styles.themeContainer}>
              {[
                '#FFEA9E',
                '#8EC8DA',
                '#C6C6C6',
                '#9486FD',
                '#FFA29D',
                '#96E6A1',
                '#FFFFFF',
                '#5f9ea0',
                '#ffe4c4',
                '#b0c4de',
              ].map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.backgroundContainer, {backgroundColor: color}]}
                  onPress={() => chooseTheme(color)}>
                  {tempTheme === color && (
                    <Image
                      style={styles.tickIcon}
                      source={require('../asset/image/check-contained.png')}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.flatListContent}>
              <TouchableOpacity
                onPress={() => {
                  setThemeModalVisible(false);
                }}>
                <Text style={{marginTop: 10}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SaveButton.structure}
                onPress={() => {
                  setSelectedTheme(tempTheme); // to finally save the selected theme as background
                  setThemeModalVisible(false);
                }}>
                <Text style={SaveButton.text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/** Modal UI for Category choose*/}
      <Modal
        visible={isCategoryModalVisible}
        onRequestClose={() => {
          setCategoryModalVisible(false);
        }}
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add to a category </Text>
            <View>
              <RadioGroup
                radioButtons={transformedCategories}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={{
                  marginTop: 10,
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.addCategoryTxt}
              onPress={() => {
                postCategory();
              }}>
              <Image
                source={require('../asset/image/plus-01.png')}
                style={commonStyles.iconSize()}
              />
              <TextInput
                placeholder="Add Category"
                value={addCategoryTxt}
                onChangeText={text => {
                  setAddCategoryTxt(text);
                }}
              />
            </TouchableOpacity>
            <View style={styles.flatListContent}>
              <TouchableOpacity
                // style={SaveButton.structure}
                onPress={() => {
                  setCategoryModalVisible(false);
                  setSelectedId(null);
                }}>
                <Text style={{marginTop: 10}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SaveButton.structure}
                onPress={() => {
                  setCategoryModalVisible(false);
                }}>
                <Text style={SaveButton.text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {fontSize: 20, marginBottom: 10, color: 'black'},
  para: {fontSize: 16, flex: 1, textAlignVertical: 'top'},
  iconbar: {
    width: '100%',
    height: 88,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',

    backgroundColor: '#fff',
    shadowColor: 'red',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
  },
  icon: {width: 24, height: 24},
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',

    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 16},
  themeOption: {fontSize: 16, padding: 10},
  closeButton: {fontSize: 16, color: 'red', textAlign: 'center', marginTop: 10},
  themeContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },

  flatListContent: {
    marginLeft: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    gap: 12,
    textAlign: 'center',
  },
  addCategoryTxt: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
  },
  backgroundContainer: {
    width: 58,
    height: 58,
    gap: 32,
    borderRadius: 21,
  },
  selectThemeBorder: {
    color: 'black',
    borderWidth: 2,
    height: 58,
    width: 58,
  },
  tickIcon: {
    height: 22,
    width: 22,
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
});
