
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { Info, Upload } from "lucide-react";
import Image from "next/image";
import Logo from "@/components/Logo";

const settingsNav = [
    { name: 'Social media settings', key: 'social' },
    { name: 'Logo settings', key: 'logo' },
    { name: 'Hero Image', key: 'hero' },
]

const socialFields = [
    { name: 'Facebook', placeholder: 'https://www.facebook.com/profile.php?id=61576615841032' },
    { name: 'Twitter', placeholder: 'https://x.com/tekiiesoft/' },
    { name: 'Linkedin', placeholder: 'https://www.linkedin.com/showcase/tekiie-com/' },
    { name: 'Dribbble', placeholder: 'Dribbble' },
]

const SocialMediaSettings = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="text-lg">Social media settings</CardTitle>
            <div className="flex items-center gap-2">
                 <Button variant="ghost">Reset all</Button>
                 <Button variant="outline">Reset section</Button>
                 <Button>Save changes</Button>
            </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
            {socialFields.map(field => (
                <div key={field.name} className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <Label htmlFor={field.name.toLowerCase()} className="text-right">{field.name}</Label>
                     <div className="relative">
                        <Input id={field.name.toLowerCase()} placeholder={field.placeholder} className="pr-8" />
                        <Info className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);

const LogoSettings = () => {
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle className="text-lg">Logo Settings</CardTitle>
                <CardDescription>Update your site's logo.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div>
                    <h3 className="text-sm font-medium mb-2">Current Logo</h3>
                    <div className="p-4 border rounded-md bg-muted/20 inline-block">
                        <Logo />
                    </div>
                </div>
                 <div>
                    <h3 className="text-sm font-medium mb-2">New Logo Preview</h3>
                    <div className="w-48 h-24 border-2 border-dashed rounded-md flex items-center justify-center bg-muted/20">
                         {logoPreview ? (
                            <Image src={logoPreview} alt="New logo preview" width={100} height={40} className="object-contain" />
                        ) : (
                            <span className="text-sm text-muted-foreground">Preview</span>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="logo-upload">Upload New Logo</Label>
                    <div className="flex items-center gap-2">
                        <Input id="logo-upload" type="file" accept="image/*" className="max-w-xs" onChange={handleFileChange} />
                        <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                 <Button>Save Logo</Button>
            </CardFooter>
        </Card>
    )
};

const HeroImageSettings = () => {
    const [heroPreview, setHeroPreview] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle className="text-lg">Hero Image Settings</CardTitle>
                <CardDescription>Update your site's hero image.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div>
                    <h3 className="text-sm font-medium mb-2">Current Hero Image</h3>
                    <div className="p-4 border rounded-md bg-muted/20 inline-block">
                        <Image src="https://placehold.co/1920x1080" alt="Current hero image" width={300} height={150} className="object-cover" data-ai-hint="student library study" />
                    </div>
                </div>
                 <div>
                    <h3 className="text-sm font-medium mb-2">New Hero Image Preview</h3>
                    <div className="w-full aspect-video border-2 border-dashed rounded-md flex items-center justify-center bg-muted/20 relative">
                         {heroPreview ? (
                            <Image src={heroPreview} alt="New hero preview" fill className="object-contain" />
                        ) : (
                            <span className="text-sm text-muted-foreground">Preview</span>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hero-upload">Upload New Hero Image</Label>
                    <div className="flex items-center gap-2">
                        <Input id="hero-upload" type="file" accept="image/*" className="max-w-xs" onChange={handleFileChange} />
                        <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                 <Button>Save Hero Image</Button>
            </CardFooter>
        </Card>
    )
};


export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = React.useState('social');

    const renderContent = () => {
        switch (activeTab) {
            case 'social':
                return <SocialMediaSettings />;
            case 'logo':
                return <LogoSettings />;
            case 'hero':
                return <HeroImageSettings />;
            default:
                return <SocialMediaSettings />;
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Global Settings</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8 items-start">
                <nav className="flex flex-col gap-1">
                    {settingsNav.map(item => (
                         <Button 
                            key={item.key}
                            variant="ghost"
                            onClick={() => setActiveTab(item.key)}
                            className={cn(
                                "justify-start text-left",
                                activeTab === item.key ? "bg-muted text-primary hover:bg-muted" : ""
                            )}
                         >
                            {item.name}
                         </Button>
                    ))}
                </nav>

                {renderContent()}
            </div>
        </div>
    )
}
