import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {commonStyles} from '../common/CommonStyles';
import {Calendar} from 'react-native-calendars';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {styles} from './AddNote';
import {SaveButton} from '../components/SaveButton';

import ToggleSwitch from 'toggle-switch-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import Card from './Card';

{
  /*LocaleConfig.locales['fr'] = {dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
dayNamesShort: ['D', 'L', 'M', 'M.', 'J', 'V', 'S'],};
LocaleConfig.defaultLocale = 'fr';*/
}

export default function Reminder() {
  const navigation = useNavigation();
  const [isReminderModalVisible, setReminderModalVisible] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(new Date()); // Initial time value

  const [calModal, setCalModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);

  const [isOn, setIsOn] = useState(false);
  const [repeat, setRepeat] = useState('DO not repeat');

  const handleToggle = () => {
    setIsOn(prevState => !prevState);
    isOn ? setRepeat('DO not repeat') : setRepeat('Repeat');
  };

  const dateShowing = day => {
    setSelectedDate(day.dateString);
  };

  const handleReminder = () => {
    setReminderModalVisible(false);
  };

  return (
    <View>
      <Modal transparent={true} visible={isReminderModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 14, color: 'black', marginBottom: 20}}>
              Add Reminder
            </Text>
            <View style={style.container}>
              <Text>{selectedDate}</Text>
              <TouchableOpacity
                onPress={() => {
                  setCalModal(true);
                }}>
                <Image
                  source={require('../asset/image/calendar.png')}
                  style={commonStyles.iconSize()}
                />
              </TouchableOpacity>
            </View>
            <View style={style.container}>
              <Text>{selectedTime.toLocaleTimeString()}</Text>

              <TouchableOpacity
                onPress={() => {
                  setTimeModal(true);
                  setReminderModalVisible(false);
                }}>
                <Image
                  source={require('../asset/image/clock-01.png')}
                  style={commonStyles.iconSize()}
                />
              </TouchableOpacity>
            </View>
            <View style={style.container}>
              <Text>{repeat}</Text>

              <ToggleSwitch
                isOn={isOn}
                onColor="#0B162B"
                offColor="#E9E9EA"
                size="medium"
                onToggle={handleToggle}
              />
            </View>
            <View style={styles.flatListContent}>
              <TouchableOpacity
                // style={SaveButton.structure}
                onPress={() => {
                  setReminderModalVisible(false);
                }}>
                <Text style={{marginTop: 10}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SaveButton.structure}
                onPress={() => {
                  handleReminder();
                }}>
                <Text style={SaveButton.text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={calModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 14, color: 'black', marginBottom: 20}}>
              Add Date
            </Text>
            <Calendar
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDayBackgroundColor: '#0B162B',
                },
              }}
              theme={{
                //calendarBackground: '#ffffff',
                //textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#0B162B',
                selectedDayTextColor: '#ffffff',
                todayTextColor: 'white',
                todayBackgroundColor: '#dd99fe',
                dayTextColor: '#2d4150',
                textDisabledColor: '#b6c1cd',
              }}
              onDayPress={dateShowing}
            />

            <View style={style.border}>
              <Text>Date</Text>
              <Text style={styles.title}>{selectedDate}</Text>
            </View>

            <View style={styles.flatListContent}>
              <TouchableOpacity
                // style={SaveButton.structure}
                onPress={() => {
                  setCalModal(false);
                }}>
                <Text style={{marginTop: 10}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SaveButton.structure}
                onPress={() => setCalModal(false)}>
                <Text style={SaveButton.text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={timeModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            <Text style={{fontSize: 16, color: 'black', marginBottom: 20}}>
              Add Time
            </Text>
            {/**  <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={(event, date) => {
                if (date) {
                  setSelectedTime(date);
                }
              }}
            />*/}
            {/** <DatePicker
              modal
              style={styles.modalContainer}
              open={timeModal}
              date={selectedTime}
              mode="time"
            />*/}
            <View style={{alignItems: 'center', display: 'flex'}}>
              <DatePicker
                mode="time"
                date={selectedTime}
                onDateChange={setSelectedTime}
              />
            </View>
            <View style={styles.flatListContent}>
              <TouchableOpacity
                // style={SaveButton.structure}
                onPress={() => {
                  setTimeModal(false);
                }}>
                <Text style={{marginTop: 10}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={SaveButton.structure}
                onPress={() => {
                  setTimeModal(false);
                  setReminderModalVisible(true);
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

export const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  border: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    height: 68,
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
});
