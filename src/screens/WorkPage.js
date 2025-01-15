import React from 'react';
import { useState,useNavigation } from 'react';
import {styles} from './AddEditNote';
import {Text, FlatList, View,  Modal,TouchableOpacity} from 'react-native';

export default function WorkPage() {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(false);
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(); 

  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };

  const selectTheme = selectedTheme => {
    setTheme(selectedTheme);
    setThemeModalVisible(false);
  };


  const data = [
    {id: '1', title: 'Cancel'},
    {id: '2', title: 'Save'},
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
    <Modal
      visible={isThemeModalVisible}
      animationType="slide"
      //transparent={true}

      modalPosition="buttom">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Choose Theme</Text>
          <View style={styles.themeContainer}>rrrrrrrrrrrrrrr</View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
    </Modal>
  );
}
