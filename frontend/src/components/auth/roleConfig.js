import { Sparkles, Palette, ShieldCheck, Feather, Cpu, Settings } from 'lucide-react';

export const USER_ROLES = [
  {
    id: 'artisan',
    name: 'Artisan',
    tagline: 'Master Weaver & Traditional Craftsman',
    icon: Feather,
    accentColor: '#7B1113', // Maroon
    badgeBg: 'bg-heritage-maroon/10 text-heritage-maroon border-heritage-maroon/20',
    description: 'Explore regional handloom motifs, convert digital patterns into loom-ready specifications, and archive authentic family traditions.',
    features: [
      'Browse traditional motif libraries & regional categories',
      'Generate patterns with strict authentic weave rules',
      'Access warp-weft dimensions & loom repeat charts',
      'Save, organize, and share community designs',
    ],
  },
  {
    id: 'designer',
    name: 'Designer',
    tagline: 'Contemporary Textile & Fashion Stylist',
    icon: Palette,
    accentColor: '#0D4D4D', // Deep Teal
    badgeBg: 'bg-heritage-teal/10 text-heritage-deepTeal border-heritage-teal/20',
    description: 'Leverage the cGAN Generative Studio to invent novel fusion patterns, customize palettes, and visualize designs on sarees and textiles.',
    features: [
      'Interactive cGAN AI design generation studio',
      'Advanced pattern editor (density, symmetry, color)',
      'Automated K-Means color palette & symmetry analysis',
      'Realistic 2D drape visualization on Sarees, Dupattas & Fabric',
    ],
  },
  {
    id: 'admin',
    name: 'Admin',
    tagline: 'Platform & Dataset Custodian',
    icon: ShieldCheck,
    accentColor: '#D4AF37', // Gold
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Oversee regional textile categories, curate training datasets, manage user roles, and monitor platform health and generation throughput.',
    features: [
      'Manage regional textile categories & motif databases',
      'Upload & validate handloom training image sets',
      'Manage user accounts, roles, and security policies',
      'Monitor AI model inference health & platform logs',
    ],
  },
];
