import debounce from "lodash.debounce";
import * as React from "react";
import { NativeSyntheticEvent, Platform, StyleSheet, View } from "react-native";
import { EnrichedTextInput, OnChangeHtmlEvent } from "react-native-enriched";

export type NoteContentEditorRef = {
  focus: () => void;
  blur: () => void;
  setValue: (html: string) => void;
  getHTML: () => Promise<string>;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  toggleH1: () => void;
  toggleH2: () => void;
  toggleH3: () => void;
  toggleUnorderedList: () => void;
  toggleOrderedList: () => void;
  toggleBlockQuote: () => void;
  toggleCodeBlock: () => void;
  undo: () => void;
  redo: () => void;
  setLink: (start: number, end: number, text: string, url: string) => void;
  setImage: (src: string) => void;
  startMention: (indicator: string) => void;
};

type Props = {
  html: string;
  onChange: (html: string) => void;
  editable?: boolean;
  placeholder?: string;
  htmlStyle?: any;
  testID?: string;
};

const NOTE_DEBOUNCE_MS = 300;

const NoteContentEditor = React.forwardRef<NoteContentEditorRef, Props>(
  ({ html, onChange, editable = true, placeholder = "", htmlStyle, testID }, ref) => {
    const editorRef = React.useRef<any>(null);
    const lastHtmlRef = React.useRef<string | null>(null);

    const debouncedOnChange = React.useCallback(
      debounce((value: string) => {
        onChange(value);
      }, NOTE_DEBOUNCE_MS),
      [onChange]
    );

    // when html prop changes from outside, update editor
    React.useEffect(() => {
      if (!editorRef.current) return;
      if (html === lastHtmlRef.current) return;

      if (typeof editorRef.current.setValue === "function") {
        editorRef.current.setValue(html ?? "");
        lastHtmlRef.current = html ?? "";
      } else {
        // fallback to setValue if different naming used
        try {
          (editorRef.current as any).setHTML?.(html ?? "");
          lastHtmlRef.current = html ?? "";
        } catch {
          // no-op
        }
      }
    }, [html]);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => editorRef.current?.focus?.(),
        blur: () => editorRef.current?.blur?.(),
        setValue: (value: string) => {
          editorRef.current?.setValue?.(value);
          lastHtmlRef.current = value;
        },
        getHTML: async () => {
          if (!editorRef.current) return lastHtmlRef.current ?? "";
          if (typeof editorRef.current.getHTML === "function") {
            const v = await editorRef.current.getHTML();
            lastHtmlRef.current = v;
            return v;
          }
          return lastHtmlRef.current ?? "";
        },
        toggleBold: () => editorRef.current?.toggleBold?.(),
        toggleItalic: () => editorRef.current?.toggleItalic?.(),
        toggleUnderline: () => editorRef.current?.toggleUnderline?.(),
        toggleH1: () => editorRef.current?.toggleH1?.(),
        toggleH2: () => editorRef.current?.toggleH2?.(),
        toggleH3: () => editorRef.current?.toggleH3?.(),
        toggleUnorderedList: () => editorRef.current?.toggleUnorderedList?.(),
        toggleOrderedList: () => editorRef.current?.toggleOrderedList?.(),
        toggleBlockQuote: () => editorRef.current?.toggleBlockQuote?.(),
        toggleCodeBlock: () => editorRef.current?.toggleCodeBlock?.(),
        undo: () => editorRef.current?.toggleUndo?.() ?? editorRef.current?.undo?.(),
        redo: () => editorRef.current?.toggleRedo?.() ?? editorRef.current?.redo?.(),
        setLink: (start, end, text, url) =>
          editorRef.current?.setLink?.(start, end, text, url),
        setImage: (src) => editorRef.current?.setImage?.(src),
        startMention: (indicator) => editorRef.current?.startMention?.(indicator)
      }),
      []
    );

    const handleOnChangeHtml = (ev: NativeSyntheticEvent<OnChangeHtmlEvent>) => {
      const value = ev?.nativeEvent?.value ?? "";
      if (value === lastHtmlRef.current) return;
      lastHtmlRef.current = value;
      debouncedOnChange(value);
    };

    const handleBlur = () => {
      debouncedOnChange.flush();
      try {
        editorRef.current?.blur?.();
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <View className='w-full'>
        <EnrichedTextInput
          ref={editorRef}
          testID={testID}
          editable={editable}
          defaultValue={html}
          placeholder={placeholder}
          htmlStyle={htmlStyle}
          onChangeHtml={handleOnChangeHtml}
          onBlur={handleBlur}
          onFocus={() => {
            // nothing here
          }}
          androidExperimentalSynchronousEvents={Platform.OS === "android"}
          style={styles.editor}
        />
      </View>
    );
  }
);

NoteContentEditor.displayName = "NoteContentEditor";

export default NoteContentEditor;

const styles = StyleSheet.create({
  editor: {
    width: "100%",
    minHeight: 180
  }
});
