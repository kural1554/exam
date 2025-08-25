import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PublicHeader from "@/components/layout/PublicHeader";
import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-[calc(100vh-4rem)] w-full bg-lime-50 dark:bg-lime-900/10">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="relative rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0">
                <Image 
                    src="https://placehold.co/1200x600"
                    alt="Office background"
                    fill
                    className="object-cover"
                    data-ai-hint="modern office interior"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative grid md:grid-cols-2 min-h-[600px]">
                <div className="flex items-center justify-center p-8">
                    <Card className="max-w-sm w-full bg-white/90 dark:bg-card/90 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-muted-foreground">123 Examplify Lane, Knowledge City, 12345</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-muted-foreground">(123) 456-7890</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Hours</h3>
                                    <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                </div>
                 <div className="flex items-center justify-center p-8">
                    <Card className="w-full max-w-lg bg-white/95 dark:bg-card/95 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Contact Form</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Your Name" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="you@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Comment or message</Label>
                                    <Textarea id="message" placeholder="Your message..." />
                                </div>
                                <Button type="submit" className="w-full !mt-6" size="lg">Submit</Button>
                            </form>
                        </CardContent>
                    </Card>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
