import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../App";
import useAsyncStorage from "../hooks/use-async-storage";
import { NoteType, initialNote } from "./home-screen";
import { CategoryPicker, ClientPicker } from "../components/pickers";
import { TextInputField } from "../components/inputs";

type Props = NativeStackScreenProps<AppStackParamList, "Detail">;

const DetailScreen = ({ route, navigation }: Props) => {
  const { noteId } = route.params;
  const {
    storedValue: notes,
    setValue,
    removeValue,
  } = useAsyncStorage<NoteType[]>("notes", []);

  const findNote = () => {
    return notes.find((n) => n.id === noteId) ?? initialNote;
  };

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [note, setNote] = useState<NoteType>(findNote);

  useEffect(() => {
    const foundNote = notes.find((n) => n.id === noteId) ?? initialNote;
    setNote(foundNote);
  }, [notes, noteId, initialNote]);

  const handleRemoveNote = async () => {
    const newNoteList = notes.filter((n) => n.id !== noteId);
    try {
      await setValue(newNoteList);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "error on deleting note", [
        {
          text: "Try it again",
        },
      ]);
    }
  };

  const handleChangeValue = (key: string) => {
    return (value: string) => setNote((prev) => ({ ...prev, [key]: value }));
  };

  const handleTogglingModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateNote = async () => {
    const filteredNotes = notes.filter((n) => n.id !== noteId);
    try {
      await setValue([...filteredNotes, note]);
      setModalVisible(false);
      Alert.alert("Success", "Note updated successfully");
    } catch (error) {
      Alert.alert("Error", "Note updated failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Delete Note" onPress={handleRemoveNote} />
        <Button title="Edit Note" onPress={handleTogglingModal} />
      </View>
      <Text>Client:{note?.client}</Text>
      <Text>Category:{note?.category}</Text>
      <Text>Content:{note?.content}</Text>
      <Modal visible={isModalVisible} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
        >
          <View style={styles.modalContainer}>
            <CategoryPicker
              value={note.category}
              onChange={handleChangeValue("category")}
            />
            <ClientPicker
              value={note.client}
              onChange={handleChangeValue("client")}
            />
            <TextInputField
              title="Content"
              value={note.content}
              onChange={handleChangeValue("content")}
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Save" onPress={handleUpdateNote} />
              <Button title="Cancel" onPress={handleTogglingModal} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default DetailScreen;

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
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
