import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Master Your Exams with Examplify
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      AI-powered practice exams and adaptive learning to help you
                      ace any test. Personalized feedback and detailed
                      explanations at your fingertips.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button asChild size="lg">
                      <Link href="/signup">Get Started for Free</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/exams">Browse Exams</Link>
                    </Button>
                  </div>
                </div>
                <Image
                  src="https://placehold.co/600x400"
                  width="600"
                  height="400"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  data-ai-hint="students studying"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
