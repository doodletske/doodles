"use client";

type Props = {
  complete: boolean;
  uploaded: number;
  pages: number;
  onContinue: () => void;
  onChangePackage: () => void;
};

export default function ContinueBar({
  complete,
  uploaded,
  pages,
  onContinue,
  onChangePackage,
}: Props) {
  const remaining = pages - uploaded;

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">

      {complete ? (
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
          <h3 className="text-lg font-semibold text-green-700">
            🎉 Great! Your book is ready.
          </h3>

          <p className="mt-2 text-sm text-green-600">
            You’ve uploaded all {pages} pages. Continue to the next step.
          </p>
        </div>
      ) : (
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center">
          <h3 className="text-lg font-semibold text-blue-700">
            {uploaded} of {pages} pages uploaded
          </h3>

          <p className="mt-2 text-sm text-blue-600">
            Upload {remaining} more page{remaining === 1 ? "" : "s"} to
            continue.
          </p>
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={!complete}
        className={`w-full rounded-xl py-4 text-lg font-semibold text-white transition ${
          complete
            ? "bg-blue-600 hover:bg-blue-700"
            : "cursor-not-allowed bg-gray-300"
        }`}
      >
        Continue →
      </button>

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Need a different package?
        </p>

        <button
          onClick={onChangePackage}
          className="mt-2 font-semibold text-blue-600 transition hover:text-blue-700"
        >
          Change Package
        </button>
      </div>
    </div>
  );
}
