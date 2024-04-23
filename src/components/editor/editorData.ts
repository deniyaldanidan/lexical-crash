import { EditorThemeClasses } from "lexical";

export const editorTheme: EditorThemeClasses = {
  root: "editor-root",
  text: {
    underline: "editor-inline-text-underline",
    highlight: "editor-inline-text-highlight",
    bold: "editor-inline-text-bold",
    italic: "editor-inline-text-italic",
    code: "editor-inline-text-code",
    strikethrough: "editor-inline-text-strikethrough",
  },
  quote: "editor-block-quote",
  list: {
    checklist: "editor-block-check-list",
    listitemChecked: "editor-block-check-listitem-checked",
    listitemUnchecked: "editor-block-check-listitem-unchecked",
    nested: {
      listitem: "editor-block-nested-listitem",
    },
  },
};
export const onEditorError = (error: Error) => {
  console.log(error);
};

export const initialEditorData = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Hello ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "World,",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " How are ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "you",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "?",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
      },
      {
        children: [
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "Hey",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "User!",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 2,
      },
      {
        children: [
          {
            detail: 0,
            format: 16,
            mode: "normal",
            style: "",
            text: 'console.log("',
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 18,
            mode: "normal",
            style: "",
            text: "Hello World",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 16,
            mode: "normal",
            style: "",
            text: '") // This will log ',
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 17,
            mode: "normal",
            style: "",
            text: "Hello World",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 16,
            mode: "normal",
            style: "",
            text: " to the console.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 16,
      },
      {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};