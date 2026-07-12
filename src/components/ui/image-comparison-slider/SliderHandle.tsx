interface SliderHandleProps {
  position: number;
  onMouseDown: () => void;
}

export default function SliderHandle({
  position,
  onMouseDown,
}: SliderHandleProps) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        left: `${position}%`,
      }}
      aria-label="Drag comparison slider"
    >
      <span className="text-lg font-bold text-gray-700">
        ↔
      </span>
    </button>
  );
}