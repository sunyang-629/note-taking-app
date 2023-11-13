import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { categories } from "../../../../data/data.json";
import { Picker } from "@react-native-picker/picker";

interface ICategoryPickerProps {
  value: (typeof categories)[number];
  onChange: Function;
}

const CategoryPicker: FC<ICategoryPickerProps> = ({ value, onChange }) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue as string)}
      >
        {categories.map((c, ind) => (
          <Picker.Item label={c} value={c} key={c + ind} />
        ))}
      </Picker>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 1,
  },
});
