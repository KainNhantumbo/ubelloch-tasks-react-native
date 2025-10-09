import { Text } from "@/components/ui/text";
import { NoteForm } from "@/screens/note";
import { useLocalSearchParams } from "expo-router";

export default function NotePage() {
  const params = useLocalSearchParams();
  const { noteId } = params;

  // TODO: HANDLE INVALID NOTE ID LATER
  if (noteId && isNaN(Number(noteId))) {
    return <Text>Invalid note ID</Text>;
  }

  return <NoteForm />;
}
