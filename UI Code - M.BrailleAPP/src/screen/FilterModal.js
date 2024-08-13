import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// Custom Fonts ********************

import { useFonts } from 'expo-font'

const FilterModal = ({ visible, onClose, filters, selectedFilters, onSelectFilter, applyFilters }) => {
  const handleChipPress = (filter) => {
    onSelectFilter(filter);
  };

  // fonts*******************************************************

  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../assets/fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../assets/fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../assets/fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../assets/fonts/PTSans-Regular.ttf'),


  })

  if (!fontsLoaded){
    return undefined ;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalBackdrop}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalButton,
                  selectedFilters.includes(filter) && styles.selectedChip,
                ]}
                onPress={() => handleChipPress(filter)}>
                <Text style={[
                  styles.modalButtonText,
                  selectedFilters.includes(filter) && styles.selectedChipText,
                ]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  modalButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3'
  },
  modalButtonText: {
    color: 'grey',
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    textAlign: 'center',
  },
  selectedChip: {
    backgroundColor: '#062CD4', // Change this to your desired selected color
  },
  selectedChipText: {
    color: 'white', // Change this to your desired selected text color
  },
  applyButton: {
    backgroundColor: '#062CD4',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  applyButtonText: {
    color: 'white',
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FilterModal;
