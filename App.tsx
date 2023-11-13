import useAsyncStorage from "./src/hooks/use-async-storage";
import { StyleSheet, Text, View } from "react-native";

type NoteType = {
  content: string;
  client: string;
  category: "Goal Evidence" | "Support Coordination" | "Active Duty";
};

export default function App() {
  const { storedValue, setValue, removeValue } = useAsyncStorage<NoteType[]>(
    "notes",
    []
  );

  if (storedValue.length === 0)
    return (
      <View style={styles.container}>
        <Text>
          Uh-oh! No notes found. Time to get creative and jot something down!
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
