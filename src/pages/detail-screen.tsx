import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../App";
import useAsyncStorage from "../hooks/use-async-storage";
import { NoteType } from "./home-screen";

type Props = NativeStackScreenProps<AppStackParamList, "Detail">;

const DetailScreen = ({ route, navigation }: Props) => {
  const { noteId } = route.params;
  const {
    storedValue: notes,
    setValue,
    removeValue,
  } = useAsyncStorage<NoteType[]>("notes", []);
  const note = notes.find((n) => n.id === noteId);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title="Delete Note" onPress={handleRemoveNote} />
      </View>
      <Text>DetailScreen:{noteId}</Text>
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
    // backgroundColor: "#eee",
    width: "100%",
  },
});
