import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
//import {FloatingAction} from 'react-native-floating-action';
import {commonStyles, fabButton, fabIcon} from '../common/CommonStyles';
import {RoundButton} from '../components/RoundButton';

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState([]);
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
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          {backgroundColor: isSelected ? '#0B162B' : 'transparent'},
        ]}
        onPress={() => toggleChip(item.id)}>
        <Text
          style={[styles.chipText, {color: isSelected ? '#fff' : '#0B162B'}]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      {/* Centered No Task Text */}
      <View style={styles.centerContent}>
        <Text style={styles.noTask}>No task to show</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
  noTask: {
    fontSize: 28,
    fontWeight: '600',
    color: '#0B162B',
    textAlign: 'center',
  },
});
