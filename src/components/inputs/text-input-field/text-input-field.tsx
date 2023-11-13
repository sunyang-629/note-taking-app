import { StyleSheet, Text, TextInput, View } from "react-native";
import { FC } from "react";

interface ITextInputFieldPrps {
  title: string;
  value: string;
  onChange: Function;
}

const TextInputField: FC<ITextInputFieldPrps> = ({
  title,
  value,
  onChange,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{title}:</Text>
      <TextInput
        style={styles.input}
        placeholder={title}
        value={value}
        onChangeText={(text) => onChange(text)}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});
