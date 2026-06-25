import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiMessageSquare, FiSend, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (e) => { e.preventDefault(); toast.success('Message sent successfully!'); setForm({ name: '', email: '', message: '' }); };
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 pb-24 md:pb-12">
      <div className="text-center mb-12">
        <p className="text-accent-cyan font-medium mb-2">GET IN TOUCH</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">Contact Us</h1>
        <p className="text-gray-400">We'd love to hear from you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: FiMail, title: 'Email', info: 'hello@maris4u.com' },
          { icon: FiPhone, title: 'Phone', info: '+1 (555) 123-4567' },
          { icon: FiMapPin, title: 'Location', info: 'New York, NY' },
        ].map((c, i) => (
          <div key={i} className="dark-card p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-accent-cyan/10 flex items-center justify-center">
              <c.icon className="text-accent-cyan" size={24} />
            </div>
            <h3 className="font-bold text-white mb-1">{c.title}</h3>
            <p className="text-sm text-gray-400">{c.info}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="dark-card p-8 md:p-10">
        <h2 className="text-2xl font-bold text-white mb-6 font-display">Send us a message</h2>
        <div className="space-y-4">
          <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="modern-input" />
          <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="modern-input" />
          <textarea placeholder="Your Message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="modern-input !rounded-xl resize-none" />
          <button className="modern-btn w-full flex items-center justify-center gap-2">
            <FiSend /> Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
