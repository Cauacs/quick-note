import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export enum BlockType {
  Title = "title",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  BulletedList = "bulleted-list",
  Paragraph = "paragraph",
}

//leafs types
export type TextBlock =
  | BlockType.H1
  | BlockType.H2
  | BlockType.H3
  | BlockType.H4
  | BlockType.H5
  | BlockType.H6
  | BlockType.Paragraph;

//Things that every block shares | maybe add id later?
export type BlockElement = {
  children: CustomText[];
};

export type ParagraphElement = BlockElement & {
  type: BlockType.Paragraph;
};
export type HeadingElement = BlockElement & {
  type:
    | BlockType.H1
    | BlockType.H2
    | BlockType.H3
    | BlockType.H4
    | BlockType.H5
    | BlockType.H6;
};

export type ListElement = BlockElement & {
  type: BlockType.BulletedList;
};

export type CustomElement = HeadingElement | ListElement | ParagraphElement;

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
