import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome Authentication Design
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get started by creating an account or logging in
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
