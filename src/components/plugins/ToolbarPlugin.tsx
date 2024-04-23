import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
  $isHeadingNode,
  // $isQuoteNode,
} from "@lexical/rich-text";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  // $isParagraphNode,
} from "lexical";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $setBlocksType } from "@lexical/selection";
import { useCallback, useEffect, useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdHighlight,
  MdChecklist,
} from "react-icons/md";
import {
  FaStrikethrough,
  FaCode,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaIndent,
  FaOutdent,
} from "react-icons/fa6";
import { GrBlockQuote } from "react-icons/gr";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { FaUndo, FaRedo } from "react-icons/fa";

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isHighlight, setIsHighlight] = useState<boolean>(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState<boolean>(false);
  const [isCodeInline, setIsCodeInline] = useState<boolean>(false);
  const [blockType, setBlockType] = useState<string>("paragraph");
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const $updateToolbarState = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // TEXT Status
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsHighlight(selection.hasFormat("highlight"));
      setIsStrikeThrough(selection.hasFormat("strikethrough"));
      setIsCodeInline(selection.hasFormat("code"));

      // Block Status
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getType() : element.getType();
          const listType = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(`${type}-${listType}`);
        } else {
          setBlockType(
            $isHeadingNode(element) ? element.getTag() : element.getType()
          );
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbarState();
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbarState]);

  // useEffect(() => {
  //   console.log(blockType);
  // }, [blockType]);

  const convertToHead = (headType: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headType));
      }
    });
  };

  const convertToPara = () => {
    editor.update(() => {
      const selection = $getSelection();
      $isRangeSelection(selection) &&
        $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const convertToQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      $isRangeSelection(selection) &&
        $setBlocksType(selection, () => $createQuoteNode());
    });
  };

  const convertToOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const convertToUnOrderedList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const convertToCheckList = () => {
    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  };

  const formatToBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatToItalic = () =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");

  const formatToUnderline = () =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");

  const formatToHighlight = () =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");

  const formatToStrikeThrough = () =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");

  const formatToCodeInline = () =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");

  const alignTo = (alignType: ElementFormatType) =>
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignType);

  const redo = () => editor.dispatchCommand(REDO_COMMAND, undefined);
  const undo = () => editor.dispatchCommand(UNDO_COMMAND, undefined);

  return (
    <div className="editor-toolbar-btngrps1">
      {canUndo ? (
        <button type="button" className="editor-toolbar-btn1" onClick={undo}>
          <FaUndo />
        </button>
      ) : (
        ""
      )}
      {canRedo ? (
        <button type="button" className="editor-toolbar-btn1" onClick={redo}>
          <FaRedo />
        </button>
      ) : (
        ""
      )}
      <button
        onClick={() => convertToHead("h1")}
        type="button"
        className="editor-toolbar-btn1"
        disabled={blockType === "h1"}
      >
        H1
      </button>
      <button
        onClick={() => convertToHead("h2")}
        type="button"
        className="editor-toolbar-btn1"
        disabled={blockType === "h2"}
      >
        H2
      </button>
      <button
        onClick={() => convertToHead("h3")}
        type="button"
        className="editor-toolbar-btn1"
        disabled={blockType === "h3"}
      >
        H3
      </button>
      <button
        onClick={() => convertToHead("h4")}
        type="button"
        className="editor-toolbar-btn1"
        disabled={blockType === "h4"}
      >
        H4
      </button>
      <button
        onClick={convertToPara}
        type="button"
        className="editor-toolbar-btn1"
        disabled={blockType === "paragraph"}
      >
        P
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={convertToQuote}
        disabled={blockType === "quote"}
      >
        <GrBlockQuote />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={convertToOrderedList}
        disabled={blockType === "list-number"}
      >
        <GoListOrdered />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={convertToUnOrderedList}
        disabled={blockType === "list-bullet"}
      >
        <GoListUnordered />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={convertToCheckList}
        disabled={blockType === "list-check"}
      >
        <MdChecklist />
      </button>
      <button
        onClick={formatToBold}
        type="button"
        className={`editor-toolbar-btn1 ${isBold ? "active" : ""}`}
      >
        <MdFormatBold />
      </button>
      <button
        onClick={formatToItalic}
        type="button"
        className={`editor-toolbar-btn1 ${isItalic ? "active" : ""}`}
      >
        <MdFormatItalic />
      </button>
      <button
        onClick={formatToUnderline}
        type="button"
        className={`editor-toolbar-btn1 ${isUnderline ? "active" : ""}`}
      >
        <MdFormatUnderlined />
      </button>
      <button
        onClick={formatToHighlight}
        type="button"
        className={`editor-toolbar-btn1 ${isHighlight ? "active" : ""}`}
      >
        <MdHighlight />
      </button>
      <button
        type="button"
        className={`editor-toolbar-btn1 ${isStrikeThrough ? "active" : ""} `}
        onClick={formatToStrikeThrough}
      >
        <FaStrikethrough />
      </button>
      <button
        type="button"
        className={`editor-toolbar-btn1 ${isCodeInline ? "active" : ""} `}
        onClick={formatToCodeInline}
      >
        <FaCode />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={() => alignTo("left")}
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={() => alignTo("center")}
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={() => alignTo("right")}
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        className="editor-toolbar-btn1"
        onClick={() => alignTo("justify")}
      >
        <FaAlignJustify />
      </button>
      {blockType !== "list-check" ? (
        <button
          type="button"
          onClick={() =>
            editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
          }
          className="editor-toolbar-btn1"
        >
          <FaIndent />
        </button>
      ) : (
        ""
      )}
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
        }
        className="editor-toolbar-btn1"
      >
        <FaOutdent />
      </button>
    </div>
  );
}
