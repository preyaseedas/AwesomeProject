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
import {useNavigation} from '@react-navigation/native';
import {SaveButton} from '../components/SaveButton';
import {style} from './Reminder';
import Reminder from './Reminder';

export default function AddEditNote() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(require('../asset/image/Frame_60.png'));
  const [selectedTheme, setSelectedTheme] = useState(
    require('../asset/image/Frame_60.png'),
  );
  const [isThemeModalVisible, setThemeModalVisible] = useState(false); // MODEL TO CHOOSE THEME
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false); //TO SET THEME IN WHICH CATEGORY
  const [selectedId, setSelectedId] = useState(null); //for radio box selection

  const [addCategory, setAddCategory] = useState('Add Category');

  const [isReminderModalVisible, setReminderModalVisible] = useState(true);

  //usestate for title                 3
  const [title, setTitle] = useState('');
  //usestate  for description
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState([]);

  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };
  const toggleReminderModal = () => {
    setReminderModalVisible(!isReminderModalVisible);
  };
  const categoryControl = () => {
    // Temporarily store the selected theme
    setCategoryModalVisible(false);
  };

  const themesFrame = {
    Frame_59: require('../asset/image/Frame_59.png'),
    Frame_60: require('../asset/image/Frame_60.png'),
    Frame_61: require('../asset/image/Frame_61.png'),
    Frame_62: require('../asset/image/Frame_62.png'),
    // Add all other themes
  };

  const selectTheme = select => {
    setSelectedTheme(select);
  };
  const selectThemeCategoryBack = () => {
    // Apply the selected theme as the background for category
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
    setThemeModalVisible(false);
  };

  const BackgroundThemeControl = () => {
    // Apply the selected theme as the background finally
    setCategoryModalVisible(false);
  };

  const postNote = async () => {
    console.log('Start Api Calling');

    let body = {
      title: title, // Pass the title from state
      content: description, // Pass the description from state
      categories: [selectedId],
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

    navigation.navigate('Home');
  };
  useEffect(() => {
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
    console.log(' AddNote Page Category apiOut actual', json);

    let tempCat = transformCategoryData(json);
    console.log('after trans data', tempCat);
    setCategories(tempCat);
  };

  const transformCategoryData = data => {
    return data.map(item => ({
      id: item._id, // Generates unique string ID based on index
      label: item.name, // Use name if available, otherwise fallback
      value: item.name,
    }));
  };

  return (
    <ImageBackground source={theme} resizeMode="cover" style={{flex: 1}}>
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
        <TouchableOpacity onPress={() => navigation.navigate('Remind')}>
          <Image
            source={require('../asset/image/bell.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>

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
        <Modal
          visible={isThemeModalVisible}
          animationType="slide"
          onRequestClose={toggleThemeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Choose Theme</Text>
              <View style={styles.themeContainer}>
                <TouchableOpacity
                  onPress={() =>
                    selectTheme(require('../asset/image/Frame_54.png'))
                  }>
                  <Image
                    source={require('../asset/image/Frame_54.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    selectTheme(require('../asset/image/Frame_55.png'))
                  }>
                  <Image
                    source={require('../asset/image/Frame_55.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    selectTheme(require('../asset/image/Frame_56.png'))
                  }>
                  <Image
                    source={require('../asset/image/Frame_56.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    selectTheme(require('../asset/image/Frame_57.png'))
                  }>
                  <Image
                    source={require('../asset/image/Frame_57.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    selectTheme(require('../asset/image/Frame_58.png'))
                  }>
                  <Image
                    source={require('../asset/image/Frame_58.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.themeContainer}>
                <TouchableOpacity
                  onPress={() => selectTheme(themesFrame.Frame_59)}>
                  <Image
                    source={require('../asset/image/Frame_59.png')}
                    style={styles.themeSize}
                  />

                  <Image />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => selectTheme(themesFrame.Frame_60)}>
                  <Image
                    source={require('../asset/image/Frame_60.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectTheme(themesFrame.Frame_61)}>
                  <Image
                    source={require('../asset/image/Frame_61.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectTheme(themesFrame.Frame_62)}>
                  <Image
                    source={require('../asset/image/Frame_62.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
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
                  onPress={selectThemeCategoryBack}>
                  <Text style={SaveButton.text}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
                  radioButtons={categories}
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
                style={styles.addCategory}
                onPress={() => {
                  // setAddCategory(text);
                }}>
                <Image
                  source={require('../asset/image/plus-01.png')}
                  style={commonStyles.iconSize()}
                />

                <TextInput placeholder={addCategory} />
              </TouchableOpacity>

              <View style={styles.flatListContent}>
                <TouchableOpacity
                  // style={SaveButton.structure}
                  onPress={() => {
                    setCategoryModalVisible(false);
                    selectedId(null);
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
    </ImageBackground>
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
  themeSize: {
    height: 58,
    width: 58,
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
  addCategory: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
  },
});
