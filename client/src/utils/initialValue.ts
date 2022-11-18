import { Descendant } from "slate";
import { BlockType } from './slate-types'

export const initialValue : Descendant[] = [
    {
        type: BlockType.Paragraph,
        children: [
          {
            text:
              'This is not a big text',
          },
        ],
    },
    {
      type: BlockType.Paragraph,
      children : [
        {
          text: 'This is another paragraph'
        }
      ]
    }
]