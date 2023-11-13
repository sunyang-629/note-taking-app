import { useState } from "react";
import useAsyncStorage from "./src/hooks/use-async-storage";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { clients, categories } from "./data/data.json";
import { CategoryPicker } from "./src/components/pickers";

type NoteType = {
  content: string;
  client: string;
  category: "Goal Evidence" | "Support Coordination" | "Active Duty";
};

export default function App() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<NoteType>({
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

  if (notes.length === 0)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Button title="Add New Note" onPress={() => setModalVisible(true)} />
        </View>
        <Text>
          Uh-oh! No notes found. Time to get creative and jot something down!
        </Text>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <CategoryPicker
              value={newNote.category}
              onChange={handleChangeValue("category")}
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Cancel" onPress={handleTogglingModal} />
            </View>
          </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
