import { useState } from "react";
import useAsyncStorage from "./src/hooks/use-async-storage";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CategoryPicker, ClientPicker } from "./src/components/pickers";
import TextInputField from "./src/components/inputs/text-input-field/text-input-field";
import * as Crypto from "expo-crypto";

type NoteType = {
  id: string;
  content: string;
  client: string;
  category: "Goal Evidence" | "Support Coordination" | "Active Duty";
};

export default function App() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<NoteType>({
    id: "",
    content: "",
    client: "",
    category: "Goal Evidence",
  });

  const {
    storedValue: notes,
    setValue,
    removeValue,
  } = useAsyncStorage<NoteType[]>("notes", []);

  const handleTogglingModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChangeValue = (key: string) => {
    return (value: string) => setNewNote((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await setValue([...notes, { ...newNote, id: Crypto.randomUUID() }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Add New Note" onPress={() => setModalVisible(true)} />
      </View>
      {notes.length === 0 ? (
        <Text>
          Uh-oh! No notes found. Time to get creative and jot something down!
        </Text>
      ) : (
        <Text>{notes.length}</Text>
      )}
      <Modal visible={isModalVisible} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
        >
          <View style={styles.modalContainer}>
            <CategoryPicker
              value={newNote.category}
              onChange={handleChangeValue("category")}
            />
            <ClientPicker
              value={newNote.client}
              onChange={handleChangeValue("client")}
            />
            <TextInputField
              title="Content"
              value={newNote.content}
              onChange={handleChangeValue("content")}
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={handleTogglingModal} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
    // backgroundColor: "#eee",
    width: "100%",
  },
  // addButtonContainer: {
  //   position: "absolute",
  //   top: 32,
  //   right: 16,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // backgroundColor: "red",
  },
  modalButtonsContainer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
});
