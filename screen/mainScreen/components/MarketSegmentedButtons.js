import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import  { useState } from 'react';
const MarketSegmentedButtons  = ({ setStatus }) => {
  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={(newValue) => {
        setValue(newValue);
        setStatus(newValue);
      }}
         buttons={[
        { value: 'new', label: 'New' },
        { value: 'used', label: 'Used' },
        { value: 'old', label: 'Old' },
      ]}
        style={styles.segmentedButtons}
      />
    </SafeAreaView>
  );
};
export default MarketSegmentedButtons;

const styles = StyleSheet.create({
  segmentedButtons: {
    marginVertical: 10,
    zIndex: 10,
  },
});

 