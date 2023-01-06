export const CreateButton = ({
  onClickCreate,
}: {
  onClickCreate: () => void;
}) => {
  return (
    <button
      className="rounded bg-foreground py-2 px-4 font-bold text-background"
      onClick={onClickCreate}
    >
      Create
    </button>
  );
};
