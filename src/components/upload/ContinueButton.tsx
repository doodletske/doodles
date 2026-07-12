type Props = {
  disabled?: boolean;
};

export default function ContinueButton({
  disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      Continue
    </button>
  );
}