import { Editor } from "slate";
import { useSlate } from "slate-react";

export const Toolbar = () => {
  return (
    <div>
      <Button format="bold" />
      <Button format="italic" />
      <Button format="underline" />
      <Button format="strikeThrough" />
    </div>
  );
};

// A button that toggle the mark and change the color based on it

type ButtonProps = {
  format: string;
};
const Button = ({ format }: ButtonProps) => {
  const editor = useSlate();
  const markBool = isMarkActive(editor, format);
  return (
    <button
      className={`${markBool ? "bg-foreground" : "bg-background"}`}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format, markBool);
      }}
    >
      {format}
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
