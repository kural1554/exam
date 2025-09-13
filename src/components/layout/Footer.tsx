
import Link from 'next/link';
import Logo from '../Logo';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerSections = {
    'Quick Link': [
        { href: '/about', label: 'About us' },
        { href: '/contact', label: 'Contact support' },
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Guides & tutorials' },
        { href: '#', label: 'Help center' },
        { href: '#', label: "What's new" },
    ],
    'Templates': [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/login', label: 'Log In and Sign Up' },
        { href: '#', label: 'Payment' },
    ],
};

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' },
]

export default function Footer() {
    return (
        <footer className="bg-card text-card-foreground border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2 pr-8">
                        <Logo />
                        <p className="mt-4 text-muted-foreground max-w-xs">
                            Optimize your preparation process for competitive exams.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <Link key={`social-${social.name}-${index}`} href={social.href} className="text-muted-foreground hover:text-primary">
                                    <social.icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {Object.entries(footerSections).map(([title, links]) => (
                         <div key={title}>
                            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">{title}</h3>
                            <ul className="mt-4 space-y-3">
                                {links.map(link => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-base text-muted-foreground hover:text-primary">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-border pt-8">
                    <p className="text-base text-muted-foreground text-center">
                        Copyright &copy; {new Date().getFullYear()} Examplify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
