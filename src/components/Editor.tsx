import { atRule } from "postcss";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  BaseEditor,
  Editor,
  Point,
  Range,
  Transforms,
  Element as SlateElement,
  createEditor,
  Descendant,
} from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import {
  BlockType,
  CustomElement,
  SHORTCUTS,
  HeadersTypes,
  ParagraphElement,
} from "../utils/slate-types";
import { ListItem } from "./ListItem";
import { Toolbar } from "./Toolbar";

export const MdEditor = ({
  value,
  setValue,
  isReadOnly = false,
}: {
  value: Descendant[];
  setValue?: Dispatch<SetStateAction<Descendant[]>>;
  isReadOnly: boolean;
}) => {
  const editor = useMemo(() => withShortcuts(withReact(createEditor())), []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  return (
    <div className="font-JetMono">
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          renderElement={renderElement}
          decorate={([node, path]) => {
            if (editor.selection != null && path[0] != null) {
              if (
                !Editor.isEditor(node) &&
                Editor.string(editor, [path[0]]) === "" &&
                Range.includes(editor.selection, path) &&
                Range.isCollapsed(editor.selection)
              ) {
                return [
                  {
                    ...editor.selection,
                    placeholder: "Type something here...",
                  },
                ];
              }
            }
            return [];
          }}
          renderLeaf={renderLeaf}
          readOnly={isReadOnly}
        />
        {isReadOnly ? null : <Toolbar />}
      </Slate>
      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
    </div>
  );
};

const withShortcuts = (editor: BaseEditor & ReactEditor) => {
  const { deleteBackward, insertText, insertBreak } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;
    if (text.endsWith(" ") && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection; //anchor da selection, que nesse caso, é a mesma posição do cursor
      const block = Editor.above(editor, {
        //acha o ancestral do leaf atual
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : []; // Path do block
      const start = Editor.start(editor, path); // acha o começo de uma location, retorna um Point
      const range = { anchor, focus: start }; // cria um range da ancora(cursor) até o começo do block
      const beforeText = Editor.string(editor, range) + text.slice(0, -1); // pega a string de uma location, no caso string dentro do range
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range); //alterar a selection para o range(começo da linha até o cursor)
        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor); //Deletando a linha
        }
        const newProperties: Partial<CustomElement> = {
          type,
        };
        Transforms.setNodes<CustomElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        // if (type === "list-item") {
        //   const list: BulletedListElement = {
        //     type: BlockType.BulletedList,
        //     children: [],
        //   };
        //   Transforms.wrapNodes(editor, list, {
        //     match: (n) =>
        //       !Editor.isEditor(n) &&
        //       SlateElement.isElement(n) &&
        //       n.type === "list-item",
        //   });
        // }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args: any) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<CustomElement> = {
            type: BlockType.Paragraph,
          };
          Transforms.setNodes(editor, newProperties);

          // if (block.type === "list-item") {
          //   Transforms.unwrapNodes(editor, {
          //     match: (n) =>
          //       !Editor.isEditor(n) &&
          //       SlateElement.isElement(n) &&
          //       n.type === "bulleted-list",
          //     split: true,
          //   });
          // }

          return;
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      deleteBackward(...args);
    }
  };

  editor.insertBreak = () => {
    const { selection } = editor;
    insertBreak();
    if (selection && Range.isCollapsed(selection)) {
      const previousBlock = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      if (previousBlock) {
        const block = previousBlock[0] as CustomElement;
        if (block.type in HeadersTypes) {
          const emptyParagraph: ParagraphElement = {
            type: BlockType.Paragraph,
            children: [{ text: "" }],
          };
          Transforms.setNodes(editor, emptyParagraph);
        }
      }
    }
  };

  return editor;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    // case "bulleted-list":
    //   return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return (
        <div {...attributes} className="mt-1 mb-0 ">
          <ListItem element={element}>{children}</ListItem>
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// https://jkrsp.com/slate-js-placeholder-per-line/

const Leaf = ({ leaf, children, attributes }: RenderLeafProps) => {
  if (leaf.placeholder) {
    return (
      <>
        <span
          className="pointer-events-none absolute select-none opacity-30"
          contentEditable={false}
        >
          {leaf.placeholder}
        </span>
        <span {...attributes}>{children}</span>
      </>
    );
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikeThrough) {
    children = <s>{children}</s>;
  }

  return <span {...attributes}>{children}</span>;
};
