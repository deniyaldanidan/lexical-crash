import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useState } from "react";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import {
  URL_MATCHERS,
  editorTheme,
  initialEditorData,
  onEditorError,
} from "./editorData";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";

export default function Editor() {
  const [myEditorState, setMyEditorState] = useState<EditorState>();

  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme: editorTheme,
    onError: onEditorError,
    editorState: JSON.stringify(initialEditorData),
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, AutoLinkNode],
  };

  const onchange = (editorSt: EditorState) => {
    setMyEditorState(editorSt);
  };

  const submitFN = () => {
    console.log(JSON.stringify(myEditorState?.toJSON()));
  };

  return (
    <div className="editor-wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="editor-inner-wrapper">
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={
              <div className="editor-placeholder">Let's start writing</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CheckListPlugin />
          <ListPlugin />
          <AutoLinkPlugin matchers={URL_MATCHERS} />
          <OnChangePlugin onChange={onchange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
      <button
        type="button"
        style={{
          margin: "20px 0 20px auto",
          width: "fit-content",
          height: "fit-content",
          display: "block",
          padding: "10px 36px",
          fontSize: "1.1rem",
          textTransform: "capitalize",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={submitFN}
      >
        Submit
      </button>
      <pre className="editor-ouptut-nodes">
        <span style={{ marginBottom: "15px", display: "block" }}>Output:</span>
        <span style={{ marginLeft: "15px" }}>
          {JSON.stringify(myEditorState?.toJSON(), undefined, 4)}
        </span>
      </pre>
    </div>
  );
}
