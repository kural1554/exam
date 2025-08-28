
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">General Settings</h1>
                <p className="text-muted-foreground">Manage your site's general configuration.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Logo Settings</CardTitle>
                    <CardDescription>Update your site's logo. The logo will appear in the navigation bar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Current Logo</Label>
                        <div className="mt-2 p-4 border rounded-md inline-block bg-background">
                            <Logo />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="logo-upload">Upload New Logo</Label>
                        <Input id="logo-upload" type="file" />
                        <p className="text-sm text-muted-foreground">Recommended size: 128x128px. File format: PNG, SVG.</p>
                    </div>
                     <Button>Save Logo</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>Enter the URLs for your social media profiles. These will appear in the site footer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="facebook-url">Facebook</Label>
                        <Input id="facebook-url" placeholder="https://facebook.com/your-page" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="twitter-url">Twitter</Label>
                        <Input id="twitter-url" placeholder="https://twitter.com/your-handle" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="instagram-url">Instagram</Label>
                        <Input id="instagram-url" placeholder="https://instagram.com/your-username" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="youtube-url">YouTube</Label>
                        <Input id="youtube-url" placeholder="https://youtube.com/your-channel" />
                    </div>
                    <Button>Save Social Links</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Site Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>General site settings interface is under construction.</p>
                </CardContent>
            </Card>
        </div>
    )
}
