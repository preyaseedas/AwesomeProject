import React, {useState} from 'react';
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
} from 'react-native';
import {RoundButton} from '../components/RoundButton';
import {commonStyles} from '../common/CommonStyles';
import {useNavigation} from '@react-navigation/native';

export default function AddEditNote() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(false);
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState();

  //usestate for title
  const [title, setTitle] = useState('');
  //usestate  for description
  const [description, setDescription] = useState('');

  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };

  const selectTheme = selectedTheme => {
    setTheme(selectedTheme);
    setThemeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'transparent',
        }}>
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
        <TouchableOpacity>
          <Image
            source={require('../asset/image/bell.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
          //transparent={true}
          onRequestClose={toggleThemeModal}
          modalPosition="buttom">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Choose Theme</Text>
              <View style={styles.themeContainer}>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_54.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTheme('dark')}>
                  <Image
                    source={require('../asset/image/Frame_55.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_56.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_57.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_58.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.themeContainer}>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_59.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_60.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_61.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectTheme('light')}>
                  <Image
                    source={require('../asset/image/Frame_62.png')}
                    style={styles.themeSize}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={commonStyles.fabButton(0, 0, 'none')}
          onPress={() => {
            navigation.navigate('AddNote');
          }}>
          <Image
            source={require('../asset/image/check.png')}
            style={commonStyles.iconSize()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {fontSize: 20, marginBottom: 10},
  para: {fontSize: 16, flex: 1, textAlignVertical: 'top'},
  iconbar: {
    width: '100%',
    height: 88,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 40,
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
  flatListContent: {marginLeft: '45%'},
  chip: {
    marginVertical: 0,
    marginTop: 30,
    marginHorizontal: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 22,
    borderColor: '#0B162B',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
