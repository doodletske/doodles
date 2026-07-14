import GoogleButton from "./GoogleButton";
import PhoneButton from "./PhoneButton";
import GuestButton from "./GuestButton";

export default function AuthButtons() {
  return (
    <div className="space-y-4">

      <GoogleButton />

      <div className="text-center text-sm text-gray-400">
        OR
      </div>

      <PhoneButton />

      <div className="pt-2 text-center">
        <GuestButton />
      </div>

    </div>
  );
}