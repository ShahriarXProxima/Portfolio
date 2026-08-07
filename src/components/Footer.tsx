import { useState } from 'react';
import { SOCIAL_LINKS } from '../data';
import { HoverButton } from './HoverButton';
import footerBg from '../../resources/footer.jpg';

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
    <footer id="contact" className="relative w-full overflow-hidden p-3 sm:p-4 md:p-5 lg:p-6">
      <div 
        className="absolute inset-0 z-0 w-full h-full -scale-y-100" 
        style={{ backgroundImage: `url(${footerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
      />
      <div className="relative z-10 w-full mx-auto px-6 py-12 sm:px-10 md:px-12 bg-white/30 dark:bg-black/40 backdrop-blur-[70px] rounded-[2rem] md:rounded-[3rem] shadow-2xl">
        <div className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-24">
          {/* Contact Me Section */}
        <div className="space-y-16">
          <h2 className="text-4xl sm:text-6xl md:text-[10rem] font-bold font-sans tracking-tighter leading-none text-gray-900 dark:text-white break-words">
            Contact me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 md:gap-8 font-mono text-sm text-gray-600 dark:text-gray-300">
            {/* Left Column: Contact Details & Social Links */}
            <div className="space-y-6 md:mt-2">
              <div className="text-gray-900 dark:text-white hover:underline transition-colors block mb-4">
                Social Links
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors group break-all"
                  >
                    <social.icon size={16} className="group-hover:scale-110 transition-transform shrink-0" />
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>

              {/* CV QR Code */}
              <div className="pt-8">
                <p className="text-gray-900 dark:text-white font-bold mb-5">Scan for CV:</p>
                <a
                  href="https://drive.google.com/file/d/1Ip07PW_t1kDbJ7JLBmz4kv_20x26NpFP/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-100 dark:bg-white p-3 rounded-full hover:scale-105 transition-transform border border-gray-200 dark:border-transparent"
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1Ip07PW_t1kDbJ7JLBmz4kv_20x26NpFP%2Fview%3Fusp%3Ddrive_link"
                    alt="CV QR Code"
                    className="w-40 h-40"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <form className="space-y-8 font-mono" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <label className="text-gray-900 dark:text-white font-medium block">Name (required)</label>
                <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-gray-500 dark:text-zinc-400">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-2 outline-none focus:border-black dark:focus:border-white transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs text-gray-500 dark:text-zinc-400">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-2 outline-none focus:border-black dark:focus:border-white transition-colors rounded-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 dark:text-white font-medium block mb-6">Email (required)</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-2 outline-none focus:border-black dark:focus:border-white transition-colors rounded-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 dark:text-white font-medium block mb-6">Message (required)</label>
                <input
                  type="text"
                  name="message"
                  required
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 pb-2 outline-none focus:border-black dark:focus:border-white transition-colors rounded-none"
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <HoverButton
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="bg-orange-vivid dark:bg-orange-vivid text-white dark:text-white text-xs font-bold px-8 py-3 hover:bg-orange-vivid/80 transition-colors cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'SUBMITTING...' : status === 'success' ? 'SENT!' : 'SUBMIT'}
                </HoverButton>
                {status === 'success' && <span className="text-sm text-green-600 dark:text-green-400 font-bold">Message sent successfully!</span>}
                {status === 'error' && <span className="text-sm text-red-600 dark:text-red-400 font-bold">Failed to send. Please try again.</span>}
              </div>
            </form>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono text-gray-600 dark:text-gray-300">
          <div>
            Full-stack Development,<br />
            System Designing, Problem Solving
          </div>
          <div className="md:text-center">
            7+ months of professional experience<br />
            <a href="#projects" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">View Work</a>
          </div>
          <div className="md:text-right">
            Shahriar Tahmid<br />
            2026
          </div>
        </div>

        {/* Giant Name */}
        <div className="w-full flex justify-center md:justify-center overflow-hidden">
          <h3 className="text-3xl sm:text-5xl md:text-[10rem] font-bold font-sans tracking-tighter leading-[0.85] md:leading-[0.75] text-accent break-words text-center">
            shahriar tahmid
          </h3>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-6 pt-12 text-xs font-mono text-black-500 dark:text-black-500">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0">
            <a href="#contact" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">Contact</a>
            <a href="mailto:shahriarxproximalog1@gmail.com" className="hover:text-black dark:hover:text-black transition-colors text-center">shahriarxproximalog1@gmail.com</a>
            <div className="hidden md:block w-[45px]"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0 text-center md:text-left">
            <div>
              © 2026 Shahriar Tahmid | All Rights Reserved
            </div>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
