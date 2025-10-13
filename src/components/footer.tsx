
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Tv, Ticket, Mic, Calendar, Shield } from 'lucide-react';

const SocialLink = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        {icon}
        <span>{label}</span>
    </a>
);

const FooterLink = ({ href, label }: { href: string, label: string }) => (
    <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
        {label}
    </a>
);

export function Footer() {
    return (
        <footer className="bg-card border-t mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Columna de Shows */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Shows</h3>
                        <div className="space-y-3">
                            <FooterLink href="/?show=raw" label="RAW" />
                            <FooterLink href="/?show=smackdown" label="SmackDown" />
                            <FooterLink href="/?show=ppv" label="PPVs" />
                        </div>
                    </div>
                    {/* Columna de Años */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Años</h3>
                        <div className="space-y-3">
                            <FooterLink href="/?year=2000" label="2000" />
                            <FooterLink href="/?year=2001" label="2001" />
                        </div>
                    </div>
                    {/* Columna de Redes Sociales */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Redes Sociales</h3>
                        <div className="space-y-3">
                            <SocialLink icon={<Facebook size={16} />} href="#" label="Facebook" />
                            <SocialLink icon={<Twitter size={16} />} href="#" label="Twitter" />
                            <SocialLink icon={<Instagram size={16} />} href="#" label="Instagram" />
                        </div>
                    </div>
                    {/* Columna de Attitude Rewind */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Attitude Rewind</h3>
                        <div className="space-y-3">
                            <FooterLink href="#" label="Sobre Nosotros" />
                            <FooterLink href="#" label="Contacto" />
                            <FooterLink href="#" label="Contribuir" />
                        </div>
                    </div>
                    {/* Columna en blanco para espaciado en LG */}
                    <div className="hidden lg:block"></div>
                </div>

                <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="https://i.imgur.com/ITpm1XW.png" alt="Attitude Rewind Logo" width={24} height={24} />
                        <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Attitude Rewind. Todos los derechos reservados.</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <FooterLink href="#" label="Condiciones de Uso" />
                        <FooterLink href="#" label="Política de Privacidad" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
