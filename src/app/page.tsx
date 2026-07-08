import Button from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">
          Doodlets
        </h1>

        <p className="text-xl text-gray-500">
          Turn your memories into personalized coloring books.
        </p>

        <Button>Create My Book</Button>
      </div>
    </main>
  );
}