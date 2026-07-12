import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="text-lg font-extrabold tracking-tight text-blue-600">
            Doodlets
          </span>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Doodlets. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}