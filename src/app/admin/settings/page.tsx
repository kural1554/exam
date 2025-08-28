
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { Info } from "lucide-react";

const settingsNav = [
    { name: 'Adsense settings' },
    { name: 'Api settings' },
    { name: 'Contact us settings' },
    { name: 'Dispute settings' },
    { name: 'Email settings' },
    { name: 'Front Pages Settings' },
    { name: 'General settings' },
    { name: 'Multi language settings' },
    { name: 'Project settings' },
    { name: 'Proposal settings' },
    { name: 'Seller settings' },
    { name: 'Site settings' },
    { name: 'Social media settings', active: true },
]

const socialFields = [
    { name: 'Facebook', placeholder: 'https://www.facebook.com/profile.php?id=61576615841032' },
    { name: 'Twitter', placeholder: 'https://x.com/tekiiesoft/' },
    { name: 'Linkedin', placeholder: 'https://www.linkedin.com/showcase/tekiie-com/' },
    { name: 'Dribbble', placeholder: 'Dribbble' },
]

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = React.useState('Social media settings');
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Global Settings</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8 items-start">
                <nav className="flex flex-col gap-1">
                    {settingsNav.map(item => (
                         <Button 
                            key={item.name}
                            variant="ghost"
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "justify-start text-left",
                                activeTab === item.name ? "bg-muted text-primary hover:bg-muted" : ""
                            )}
                         >
                            {item.name}
                         </Button>
                    ))}
                </nav>

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
            </div>
        </div>
    )
}
