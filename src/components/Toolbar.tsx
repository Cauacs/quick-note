import { Editor } from "slate";
import { useSlate } from "slate-react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
} from "react-icons/ai";
import { IconType } from "react-icons";

export const Toolbar = () => {
  return (
    <div className="text-right" onMouseDown={(event) => event.preventDefault()}>
      <Button format="bold" Icon={AiOutlineBold} />
      <Button format="italic" Icon={AiOutlineItalic} />
      <Button format="underline" Icon={AiOutlineUnderline} />
      <Button format="strikeThrough" Icon={AiOutlineStrikethrough} />
    </div>
  );
};

// A button that toggle the mark and change the color based on it

type ButtonProps = {
  format: string;
  Icon: IconType;
};
const Button = ({ format, Icon }: ButtonProps) => {
  const editor = useSlate();
  const markBool = isMarkActive(editor, format);
  return (
    <button
      className={`${markBool ? "bg-rose-100" : "bg-teal-100"} ml-1.5 rounded`}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format, markBool);
      }}
    >
      <Icon />
    </button>
  );
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  if (marks && format in marks) return true;
  else return false;
};

const toggleMark = (editor: Editor, format: string, isMark: boolean) => {
  if (isMark) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};
