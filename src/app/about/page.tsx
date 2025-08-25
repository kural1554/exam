import PublicHeader from '@/components/layout/PublicHeader';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const aboutSections = [
  {
    title: 'Comprehensive Exam Coverage',
    description:
      'Our platform provides extensive study materials and mock tests for a wide range of government exams, including UPSC, SSC, Banking, and State PSCs. We ensure you have everything you need to prepare effectively.',
    features: [
      'Latest Syllabus & Pattern',
      'All Major Exams Covered',
      'Subject-wise Modules',
    ],
    imageSrc: 'https://placehold.co/600x400',
    imageHint: 'library bookshelf',
    imageLeft: true,
  },
  {
    title: 'AI-Powered Adaptive Learning',
    description:
      'Examplify uses cutting-edge AI to adapt to your learning pace. Our system identifies your strengths and weaknesses, providing personalized quizzes and study plans to help you focus on areas that need improvement.',
    features: [
      'Personalized Study Plans',
      'Difficulty Adjusts to You',
      'Performance Analytics',
    ],
    imageSrc: 'https://placehold.co/600x400',
    imageHint: 'futuristic technology circuit',
    imageLeft: false,
  },
  {
    title: 'Expertly Crafted Content',
    description:
      'All our questions and study materials are created by subject matter experts and retired civil servants who have a deep understanding of the exam patterns and syllabus, ensuring the highest quality and relevance.',
    features: [
      'Created by Toppers & Experts',
      'Regularly Updated Content',
      'In-depth Explanations',
    ],
    imageSrc: 'https://placehold.co/600x400',
    imageHint: 'teacher student',
    imageLeft: true,
  },
  {
    title: 'Realistic Exam Simulation',
    description:
      'Prepare for the actual exam day with our timed mock tests that replicate the real testing environment. Overcome exam anxiety and manage your time effectively with our true-to-pattern test series.',
    features: [
      'Timed Mock Tests',
      'Real Exam Interface',
      'All India Rankings',
    ],
    imageSrc: 'https://placehold.co/600x400',
    imageHint: 'students writing exam',
    imageLeft: false,
  },
  {
    title: 'Your Success is Our Mission',
    description:
      "We are committed to empowering every government job aspirant with the tools and knowledge to achieve their dreams. Join thousands of successful candidates who have trusted Examplify for their preparation.",
    features: [
        '24/7 Support', 
        'Community Forum Access', 
        'Proven Success Stories'
    ],
    imageSrc: 'https://placehold.co/600x400',
    imageHint: 'trophy success',
    imageLeft: true,
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PublicHeader />
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <main className="flex-1">
          <section className="relative w-full h-48 md:h-80 bg-primary/10">
             <Image
                src="https://placehold.co/1920x320"
                alt="About us banner"
                fill
                className="object-cover"
                data-ai-hint="library study hall"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                    About Examplify
                </h1>
            </div>
          </section>

          <section className="py-12 md:py-24">
            <div className="container space-y-12 md:space-y-24">
              {aboutSections.map((section, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div
                    className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl ${
                      section.imageLeft ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <Image
                      src={section.imageSrc}
                      alt={section.title}
                      fill
                      className="object-cover"
                      data-ai-hint={section.imageHint}
                    />
                  </div>
                  <div
                    className={`space-y-4 p-4 ${
                      section.imageLeft ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <h2 className="text-3xl font-bold tracking-tight text-primary">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {section.description}
                    </p>
                    <ul className="space-y-2">
                        {section.features.map(feature => (
                             <li key={feature} className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
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
