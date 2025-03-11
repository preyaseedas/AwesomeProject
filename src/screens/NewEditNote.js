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

import {commonStyles} from '../common/CommonStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SaveButton} from '../components/SaveButton';

import Reminder from './Reminder';
import {useSelector, useDispatch} from 'react-redux';
import {updateNote} from '../redux/NoteSlice';

export default function NewEditNote() {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

  //  Check if navigating with an existing note
  const existingNote = route.params.note;
  const previousTheme = route.params.theme;
  console.log('Received Note:', route.params.note);
  console.log('Received theme:', route.params.theme);

  const categories = useSelector(state => state.noteReducer.categories);

  //const [theme, setTheme] = useState(require('../asset/image/Frame_60.png'));
  //const [selectedTheme, setSelectedTheme] = useState(require('../asset/image/Frame_60.png'), );
  const [isThemeModalVisible, setThemeModalVisible] = useState(false); // MODEL TO CHOOSE THEME
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false); //TO SET THEME IN WHICH CATEGORY
  const [isReminderModalVisible, setReminderModalVisible] = useState(true);

  const [selectedId, setSelectedId] = useState(null); //for radio box selection

  const [addCategoryTxt, setAddCategoryTxt] = useState('');

  //usestate for title                 3
  const [title, setTitle] = useState(existingNote.title);
  //usestate  for description
  const [description, setDescription] = useState(existingNote.content);

  const [transformedCategories, setTransformedCategories] = useState([]);

  const [component, setComponent] = useState(null);

  const [tempTheme, setTempTheme] = useState();
  const [selectedTheme, setSelectedTheme] = useState(
    previousTheme?.theme?.value || '',
  );

  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };

  const toggleReminderModal = () => {
    setReminderModalVisible(!isReminderModalVisible);
  };

  const chooseTheme = c => {
    setTempTheme(c);
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

  /**
   * postNote method is used to create note from user input using POST API
   */
  const updateNotebyId = async () => {
    let api = `http://localhost:3000/api/notes/${existingNote._id}`;

    let body = {
      title: title, // Pass the title from state
      content: description, // Pass the description from state
      categories: [selectedId],
      theme: {
        type: 'color',
        value: selectedTheme,
      },
    };

    console.log('Put Api body', body);
    console.log('Put Api ', api);

    const response = await fetch(api, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    console.log('apiOut after updating', json);

    //TODO: get all notes again or update note list in reducer
    dispatch(updateNote(json.result));
    navigation.goBack();
  };

  // to execute get all categories 1st time and once when screen is opened
  useEffect(() => {
    let tempCat = handleTransformCates(categories);

    setTransformedCategories(tempCat);
  }, [categories]);

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
    <View style={[{flex: 1}, {backgroundColor: selectedTheme}]}>
      <View style={styles.container}>
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
            updateNotebyId();
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
                  setThemeModalVisible(false);
                  setSelectedTheme(tempTheme);
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
  tickIcon: {
    height: 22,
    width: 22,
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
});
