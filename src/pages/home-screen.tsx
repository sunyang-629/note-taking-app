import { useState } from "react";
import useAsyncStorage from "../hooks/use-async-storage";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryPicker, ClientPicker } from "../components/pickers";
import TextInputField from "../components/inputs/text-input-field/text-input-field";
import * as Crypto from "expo-crypto";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../App";

type CategoryType = "Goal Evidence" | "Support Coordination" | "Active Duty";
type Props = NativeStackScreenProps<AppStackParamList, "Home">;

export type NoteType = {
  id: string;
  content: string;
  client: string;
  category: CategoryType;
};

const initialNote = {
  id: "",
  content: "",
  client: "",
  category: "Goal Evidence" as CategoryType,
};

const HomeScreen = ({ route, navigation }: Props) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<NoteType>(initialNote);

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
    if (newNote.content.length <= 10)
      return Alert.alert("Error", "The length of content must be above 10", [
        {
          text: "Try it again",
        },
      ]);
    try {
      await setValue([...notes, { ...newNote, id: Crypto.randomUUID() }]);
      setNewNote(initialNote);
    } catch (error) {
      Alert.alert("Error", "error on saving new note", [
        {
          text: "Try it again",
        },
      ]);
    } finally {
      setModalVisible(false);
    }
  };

  const handleNavigateToDetail = (item: NoteType) => {
    navigation.navigate("Detail", { noteId: item.id });
  };

  const renderItem = ({ item }: { item: NoteType }) => (
    <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
      <View style={styles.noteContainer}>
        <Text>Client: {item.client}</Text>
        <Text>Category: {item.category}</Text>
        <Text>Content: {item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Add New Note" onPress={() => setModalVisible(true)} />
      </View>
      <View style={{ width: "100%", margin: 10 }}>
        {notes.length === 0 ? (
          <Text>
            Uh-oh! No notes found. Time to get creative and jot something down!
          </Text>
        ) : (
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>
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
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  flatListContainer: {
    flexGrow: 1,
  },
  noteContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 10,
  },
});
