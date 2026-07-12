type Props = {
  uploaded: number;
  minimum: number;
  maximum: number;
};

export default function UploadCounter({
  uploaded,
  minimum,
  maximum,
}: Props) {
  return (
    <div className="mt-8">

      <div className="flex justify-between text-sm font-medium">

        <span>
          {uploaded} uploaded
        </span>

        <span>
          Minimum {minimum} • Maximum {maximum}
        </span>

      </div>

      <div className="mt-3 h-3 rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: `${(uploaded / minimum) * 100}%`,
          }}
        />

      </div>

    </div>
  );
}