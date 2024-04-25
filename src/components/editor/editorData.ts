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

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export const URL_MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
    };
  },
  (text: string) => {
    const match = EMAIL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: `mailto:${match[0]}`,
      }
    );
  },
];

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
