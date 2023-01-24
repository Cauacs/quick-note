export const CreateButton = ({
  onClickCreate,
}: {
  onClickCreate: () => void;
}) => {
  return (
    <button
      className="rounded border py-2 px-4 font-bold"
      onClick={onClickCreate}
    >
      Create
    </button>
  );
};
