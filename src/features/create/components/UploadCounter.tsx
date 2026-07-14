"use client";

type Props = {
  uploaded: number;
  required: number;
};

export default function UploadCounter({
  uploaded,
  required,
}: Props) {
  const percentage = Math.min(
    (uploaded / required) * 100,
    100
  );

  const complete = uploaded === required;

  return (
    <div className="mb-10">

      <div className="mb-3 flex items-center justify-between">

        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Upload Progress
          </h3>

          <p className="text-gray-500">
            {uploaded} of {required} photos uploaded
          </p>
        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            complete
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {complete ? "Complete ✓" : `${uploaded}/${required}`}
        </div>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}