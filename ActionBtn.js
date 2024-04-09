import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActionBtn = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop:20,
    backgroundColor: '#FFD300',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginStart :10,
    marginEnd:10,
    marginBottom:20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActionBtn;
