import { PACKAGES } from "../constants";
import { PackageType } from "../types";

type Props = {
  selected: PackageType;
  onChange: () => void;
};

export default function SelectedPackage({
  selected,
  onChange,
}: Props) {
  const pkg = PACKAGES.find((p) => p.id === selected);

  if (!pkg || selected === "custom") return null;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">
        Selected Package
      </h3>

      <p className="mt-2">
        {pkg.title} • {pkg.pages} Pages
      </p>

      <button
        onClick={onChange}
        className="mt-5 text-blue-600 hover:underline"
      >
        Change Package
      </button>
    </div>
  );
}