import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CreatePage from "@/features/create/CreatePage";

export default function Page() {
  return (
    <ProtectedRoute>
      <CreatePage />
    </ProtectedRoute>
  );
}