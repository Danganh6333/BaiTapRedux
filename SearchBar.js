import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import  Icons  from 'react-native-vector-icons/Ionicons'; 

const SearchBar = ({ placeholder,onChangeText,onSubmitEditing }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity style={styles.searchButton}>
        <Icons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor:"white"
  },
  searchButton: {
    backgroundColor: 'skyblue',
    borderRadius: 8,
    padding: 10,
    marginLeft: 5,
  },
});

export default SearchBar;
