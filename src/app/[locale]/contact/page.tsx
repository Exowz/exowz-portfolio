'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Mail, Github as GithubIcon, Linkedin as LinkedinIcon, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('pages.contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - you can add your logic here
    window.location.href = `mailto:contact@mke-kapoor.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:contact@mke-kapoor.com"
                    className="flex items-center gap-3 p-4 rounded-lg dark:glass-dark glass-light hover:scale-105 transition-all text-foreground"
                  >
                    <Mail className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@mke-kapoor.com</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/exowz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg dark:glass-dark glass-light hover:scale-105 transition-all text-foreground"
                  >
                    <GithubIcon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">@exowz</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/mke-kapoor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg dark:glass-dark glass-light hover:scale-105 transition-all text-foreground"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">mke-kapoor</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-4 rounded-lg dark:glass-dark glass-light text-foreground">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg dark:neu-pressed-dark neu-pressed-light text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg dark:neu-pressed-dark neu-pressed-light text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg dark:neu-pressed-dark neu-pressed-light text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium dark:neu-raised-dark neu-raised-light hover:scale-105 transition-all accent-glow-hover"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
