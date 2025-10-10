import { NoteForm } from "@/screens/note";
import { useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "react-native-screens";

export default function NotePage() {
  const params = useLocalSearchParams<{ noteId: string }>();
  const { noteId } = params;

  return (
    <ScreenContainer>
      <NoteForm currentNoteId={+noteId} />
    </ScreenContainer>
  );
}
