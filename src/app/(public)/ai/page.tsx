
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const aiFeatures = [
  {
    title: 'Adaptive Question Difficulty',
    description:
      'Our AI analyzes your performance in real-time and adjusts the difficulty of the next question. If you answer correctly, the questions get harder. If you struggle, we ease up to help you build a solid foundation.',
    icon: <Bot className="h-10 w-10 text-primary" />,
    image: 'https://placehold.co/600x400',
    imageHint: 'brain learning chart',
  },
  {
    title: 'AI-Generated Explanations',
    description:
      "Don't just know what you got wrong, understand why. For every question, our AI tutor provides a clear, step-by-step explanation, helping you grasp complex concepts and learn from your mistakes.",
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    image: 'https://placehold.co/600x400',
    imageHint: 'teacher student explanation',
  },
];

export default function AiFeaturesPage() {
  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <main className="flex-1">
          <section className="relative w-full h-48 md:h-80 bg-primary/10">
            <Image
              src="https://placehold.co/1920x320"
              alt="AI banner"
              fill
              className="object-cover"
              data-ai-hint="futuristic abstract technology"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white text-center">
                AI-Powered Learning
              </h1>
            </div>
          </section>

          <section className="py-12 md:py-24">
            <div className="container space-y-16">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                        <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        data-ai-hint={feature.imageHint}
                        />
                  </div>
                  <div className={`space-y-6 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="flex items-center gap-4">
                        {feature.icon}
                        <h2 className="text-3xl font-bold tracking-tight text-primary">
                            {feature.title}
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {feature.description}
                    </p>
                    <Link href="/exams">
                        <Button variant="outline">Try it now</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
