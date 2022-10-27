import { Descendant } from "slate";

export const initialValue : Descendant[] = [
    {
        type: 'paragraph',
        children: [
          {
            text:
              'This is not a big text',
          },
        ],
    },
    {
      type: 'paragraph',
      children : [
        {
          text: 'This is another paragraph'
        }
      ]
    }
]