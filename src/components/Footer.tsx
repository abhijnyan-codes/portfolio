import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} Abhijnyan Saikia. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-secondary">
          <Link href="https://github.com/abhijnyan-codes" target="_blank" className="hover:text-primary transition-colors">
            GitHub
          </Link>
          <Link href="#" target="_blank" className="hover:text-primary transition-colors">
            LinkedIn
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Twitter / X
          </Link>
        </div>
      </div>
    </footer>
  );
}