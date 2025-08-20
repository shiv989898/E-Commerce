import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import AppButton from './AppButton';

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (values: { category: string; sort: string; rating: number }) => void;
  categories: string[];
  values: { category: string; sort: string; rating: number };
}

export const FilterModal: React.FC<Props> = ({ visible, onClose, onApply, categories, values }) => {
  const [category, setCategory] = useState(values.category);
  const [sort, setSort] = useState(values.sort);
  const [rating, setRating] = useState(values.rating);

  useEffect(() => {
    if (visible) {
      setCategory(values.category);
      setSort(values.sort);
      setRating(values.rating);
    }
  }, [visible, values]);

  const apply = () => {
    onApply({ category, sort, rating });
    onClose();
  };

  const reset = () => {
    setCategory('All');
    setSort('default');
    setRating(0);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} accessibilityLabel="Close filters">
              <Feather name="x" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={category}
                onValueChange={(v) => setCategory(v)}
                style={styles.picker}
                dropdownIconColor={Colors.light.tint}
                itemStyle={styles.pickerItem}
              >
                {categories.map((c) => (
                  <Picker.Item key={c} label={c} value={c} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Sort</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={sort}
                onValueChange={(v) => setSort(v)}
                style={styles.picker}
                dropdownIconColor={Colors.light.tint}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="Price: Low → High" value="lowToHigh" />
                <Picker.Item label="Price: High → Low" value="highToLow" />
              </Picker>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Minimum Rating</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={rating}
                onValueChange={(v) => setRating(v)}
                style={styles.picker}
                dropdownIconColor={Colors.light.tint}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Any" value={0} />
                <Picker.Item label="3+ stars" value={3} />
                <Picker.Item label="4+ stars" value={4} />
              </Picker>
            </View>
          </View>

          <View style={styles.actions}>
            <AppButton title="Reset" variant="outline" onPress={reset} small />
            <AppButton title="Apply" onPress={apply} small />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#141414',
    paddingTop: 14,
    paddingHorizontal: 18,
    paddingBottom: Platform.select({ ios: 34, android: 20, default: 20 }),
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.light.tint },
  closeBtn: { padding: 6, marginRight: -6 },
  section: { marginTop: 14 },
  label: { color: '#b3b3b3', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  pickerWrap: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#262626',
    overflow: 'hidden',
  },
  picker: { height: 50, color: '#ffffff' },
  pickerItem: { color: '#ffffff' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 28 },
});

export default FilterModal;
