import { FiTarget, FiHeart, FiUsers, FiAward } from 'react-icons/fi';

export default function About() {
  const values = [
    { icon: FiTarget, title: 'Our Mission', desc: 'To make premium fashion accessible to everyone' },
    { icon: FiHeart, title: 'Passion', desc: 'Curated with love for the modern individual' },
    { icon: FiUsers, title: 'Community', desc: '50,000+ happy customers worldwide' },
    { icon: FiAward, title: 'Quality', desc: 'Only the finest materials and craftsmanship' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 pb-24 md:pb-12">
      <div className="text-center mb-12">
        <p className="text-accent-cyan font-medium mb-2">ABOUT US</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">The Maris4u Story</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Founded in 2026, we believe fashion should be an expression of individuality. Every piece in our collection is curated with precision and delivered with care.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {values.map((v, i) => (
          <div key={i} className="dark-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center">
              <v.icon className="text-accent-cyan" size={28} />
            </div>
            <h3 className="font-bold text-white mb-2">{v.title}</h3>
            <p className="text-sm text-gray-400">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="dark-card p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">Why Choose Maris4u?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">We combine cutting-edge design with timeless elegance. Our commitment to quality, sustainability, and customer satisfaction sets us apart in the world of modern fashion.</p>
      </div>
    </div>
  );
}
