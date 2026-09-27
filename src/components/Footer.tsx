import { useState } from 'react';
import { SOCIAL_LINKS } from '../data';
import { HoverButton } from './HoverButton';
import footerBg from '../../resources/assets/footer.jpg';

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // Formspree API endpoint - user needs to replace YOUR_FORM_ID
      const res = await fetch('https://formspree.io/f/xykrvpap', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        e.currentTarget.reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#111111] pt-0 pb-24 md:pb-32 flex flex-col items-center overflow-hidden relative">
      <div className="w-full max-w-[1600px] 2xl:max-w-[92vw] mx-auto px-6 md:px-10 flex flex-col items-center">
        
        {/* Form and Contact Header */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-24 md:mb-32">
          
          {/* Left Column: Heading & Socials */}
          <div className="flex flex-col gap-10">
            <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-none text-white drop-shadow-sm">
              Let's <span className="text-gray-500">talk.</span>
            </h2>
            
            <div className="flex flex-col gap-6 mt-8">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Connect</span>
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform shrink-0" />
                    <span className="font-semibold">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 block">Resume</span>
              <a
                href="https://drive.google.com/file/d/1Ip07PW_t1kDbJ7JLBmz4kv_20x26NpFP/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white p-2 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1Ip07PW_t1kDbJ7JLBmz4kv_20x26NpFP%2Fview%3Fusp%3Ddrive_link"
                  alt="CV QR Code"
                  className="w-32 h-32 rounded-xl"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col justify-center">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8 md:gap-6">
                  <div className="flex-1 space-y-3">
                    <label className="text-xs font-bold tracking-widest uppercase text-gray-500">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full bg-transparent border-b border-gray-600 pb-3 text-white outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full bg-transparent border-b border-gray-600 pb-3 text-white outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-gray-600 pb-3 text-white outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Message</label>
                <input
                  type="text"
                  name="message"
                  required
                  className="w-full bg-transparent border-b border-gray-600 pb-3 text-white outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                <HoverButton
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full sm:w-auto bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-200 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Submit Message'}
                </HoverButton>
                {status === 'success' && <span className="text-sm text-green-400 font-bold">Message received!</span>}
                {status === 'error' && <span className="text-sm text-red-400 font-bold">Failed to send. Please try again.</span>}
              </div>
            </form>
          </div>
        </div>

        {/* Info Text Row */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-medium text-gray-500 mb-16 px-4">
          <div className="text-center md:text-left leading-relaxed">
            Full-stack Development<br />
            System Design & Optimization
          </div>
          <div className="text-center leading-relaxed">
            Available for new opportunities<br />
            <a href="#projects" className="text-white hover:underline underline-offset-4 transition-colors">View Selected Work</a>
          </div>
          <div className="text-center md:text-right leading-relaxed">
            Shahriar Tahmid<br />
            Based in Bangladesh
          </div>
        </div>

        {/* Giant Scalable Name to prevent misalignment */}
        <div className="w-full flex justify-center overflow-hidden py-10 border-t border-b border-white/10 mb-12">
          <h3 className="text-[14vw] font-bold tracking-tighter leading-none text-white whitespace-nowrap select-none">
            shahriar
          </h3>
        </div>

        {/* Bottom Footer Links */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-xs font-bold tracking-widest uppercase text-gray-600 px-4">
          <div className="text-center md:text-left">
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-center">
            <a href="mailto:shahriarxproximalog1@gmail.com" className="hover:text-white transition-colors lowercase tracking-normal text-sm">
              shahriarxproximalog1@gmail.com
            </a>
          </div>
          <div className="text-center md:text-right">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
