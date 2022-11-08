import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export enum BlockType {
  H1 = 'heading-one',
  H2 = 'heading-two',
  H3 = 'heading-three',
  H4 = 'heading-four',
  H5 = 'heading-five',
  H6 = 'heading-six',
  BulletedList = 'bulleted-list',
  BlockQuote = 'block-quote',
  Paragraph = 'paragraph',
  ListItem = 'list-item'
}

//text leaf
export type CustomText = {
  text: string //obligatory
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
}

export type BlockElement = {
  children: CustomText[]
}

export type ParagraphElement =  BlockElement & {
  type : BlockType.Paragraph
}

export type HeadingElement = BlockElement & {
  type:
    | BlockType.H1
    | BlockType.H2
    | BlockType.H3
    | BlockType.H4
    | BlockType.H5
    | BlockType.H6;
};

export type BlockQuoteElement = BlockElement & {
  type : BlockType.BlockQuote
}

export type BulletedListElement = {
  type : BlockType.BulletedList
  children : ListItemElement[]
}

export type ListItemElement = BlockElement & {
  type : BlockType.ListItem
}

export type CustomElement = HeadingElement | ParagraphElement | BlockQuoteElement | BulletedListElement | ListItemElement

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface slateShortcuts {
  [index : string] : BlockType;
}

export const SHORTCUTS: slateShortcuts = {
  "*": BlockType.ListItem,
  "-": BlockType.ListItem,
  "+": BlockType.ListItem,
  ">": BlockType.BlockQuote,
  "#": BlockType.H1,
  "##": BlockType.H2,
  "###": BlockType.H3,
  "####": BlockType.H4,
  "#####": BlockType.H5,
  "######": BlockType.H6,
};

//todo : redo all