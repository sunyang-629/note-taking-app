import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { clients } from "../../../../data/data.json";
import { Picker } from "@react-native-picker/picker";

interface IClientPickerProps {
  value: (typeof clients)[number];
  onChange: Function;
}

const ClientPicker: FC<IClientPickerProps> = ({ value, onChange }) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Client:</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue as string)}
      >
        {clients.map((c, ind) => (
          <Picker.Item label={c} value={c} key={c + ind} />
        ))}
      </Picker>
    </View>
  );
};

export default ClientPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 1,
  },
});
