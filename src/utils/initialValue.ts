import { Descendant } from "slate";
import { text } from "stream/consumers";
import { BlockType, CustomElement } from "./slate-types";

export const initialValue: Descendant[] = [
  {
    type: BlockType.Paragraph,
    children: [
      {
        text: "This is an minimalist open source text editor built with SlateJS. It has rich-text features like: ",
      },
      {
        text: "bold",
        bold: true,
      },
      { text: ", " },
      {
        text: "italic",
        italic: true,
      },
      { text: ", " },
      { text: "underline " },
      { text: "and " },
      { text: "strike-through" },
      { text: "." },
    ],
  },
  {
    type: BlockType.Paragraph,
    children: [
      {
        text: "It also has markdown like shortcuts like:",
      },
    ],
  },
  {
    type: BlockType.H3,
    children: [{ text: '"#" For headers, ranging from H1 to H4' }],
  },
  {
    type: BlockType.BlockQuote,
    children: [
      {
        text: '">" For block quotes.',
      },
    ],
  },
  {
    type: BlockType.ListItem,
    children: [{ text: '"*"' }],
  },
  {
    type: BlockType.ListItem,
    children: [{ text: '"+"' }],
  },
  {
    type: BlockType.ListItem,
    children: [{ text: '"-"' }],
  },
  {
    type: BlockType.ListItem,
    children: [{ text: '"For list items."' }],
  },
  {
    type: BlockType.Paragraph,
    children: [
      {
        text: "The documents you save get saved to a link so you can revisit or share it with someone",
      },
    ],
  },
  {
    type: BlockType.H1,
    children: [{ text: "Try it out!" }],
  },
];
