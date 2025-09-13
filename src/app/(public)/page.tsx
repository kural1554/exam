
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExams } from '@/lib/mock-data';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from '@/lib/utils';
import AuthPopup from '@/components/auth/AuthPopup';

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Adaptive Learning',
    description: 'Our AI adjusts question difficulty based on your performance, ensuring an optimal learning curve.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Realistic Simulation',
    description: 'Experience a real exam environment with timed tests and a true-to-pattern interface.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Detailed Explanations',
    description: 'Get in-depth, AI-powered explanations for every question to understand concepts better.',
  },
    {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Expert Content',
    description: 'Questions and materials are crafted by subject matter experts and experienced educators.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'SSC Aspirant',
    quote: "Examplify's adaptive tests were a game-changer. I could focus on my weak areas and my scores improved dramatically!",
    avatar: 'https://placehold.co/100x100?text=PS',
  },
  {
    name: 'Arjun Kumar',
    role: 'UPSC Candidate',
    quote: "The detailed explanations after each mock test are incredibly helpful. It's like having a personal tutor 24/7.",
    avatar: 'https://placehold.co/100x100?text=AK',
  },
  {
    name: 'Ananya Reddy',
    role: 'Banking Aspirant',
    quote: 'The realistic exam simulation helped me manage my time effectively and reduced my exam-day anxiety.',
    avatar: 'https://placehold.co/100x100?text=AR',
  },
];

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = getCookie('user_loggedin');
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <AuthPopup isOpen={isPopupOpen} onOpenChange={setIsPopupOpen} />
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
            <Image 
                src="https://placehold.co/1920x1080"
                alt="Student studying for an exam"
                fill
                className="object-cover"
                data-ai-hint="student library study"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
            <div className="relative z-10 container px-4 text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    Unlock Your Potential with AI-Powered Exams
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
                    Prepare smarter, not harder. Examplify offers adaptive practice tests and AI-driven insights to help you ace your competitive exams.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg" className="text-lg">
                        <Link href="/signup">Get Started for Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="text-lg">
                        <Link href="/exams">Browse Exams</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-card">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose Examplify?</h2>
              <p className="mt-2 text-lg text-muted-foreground">The ultimate platform for serious aspirants.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-4">
                  <div className="flex justify-center items-center h-20 w-20 rounded-full bg-primary/10 mx-auto border-2 border-primary/20 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Exams Section */}
        <section className="py-20 md:py-28 bg-background">
            <div className="container">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Popular Exams</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Kickstart your preparation with our most popular test series.</p>
                </div>
                 <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockExams.slice(0, 4).map(exam => (
                        <Link href={`/exams/${exam.id}`} key={exam.id} className="group">
                             <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 overflow-hidden rounded-xl">
                                <div className="relative h-40 w-full">
                                    <Image
                                        src={exam.image.src}
                                        alt={exam.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={exam.image.hint}
                                    />
                                </div>
                                <CardContent className="p-6 flex-grow">
                                    <h3 className="font-semibold text-lg">{exam.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{exam.category}</p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                 </div>
                 <div className="mt-12 text-center">
                    <Button asChild size="lg">
                        <Link href="/exams">View All Exams <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                 </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 bg-card">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">What Our Students Say</h2>
              <p className="mt-2 text-lg text-muted-foreground">Thousands of aspirants have trusted us with their preparation.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex flex-col justify-between bg-background p-2 rounded-xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-card-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex items-center gap-4">
                    <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full" data-ai-hint="person portrait" />
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container text-center">
                <h2 className="text-4xl font-extrabold tracking-tight">Ready to Start Your Journey?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-primary-foreground/80">
                    Join thousands of successful candidates. Sign up now and get instant access to free mock tests and resources.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="secondary" className="text-lg">
                        <Link href="/signup">Sign Up Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
