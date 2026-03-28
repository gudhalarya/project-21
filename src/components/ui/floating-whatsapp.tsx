import { motion, useCycle } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

const WHATSAPP_NUMBER = '15550123456'; // replace with real business number

const FloatingWhatsApp = () => {
  const [pulse, cyclePulse] = useCycle(
    { scale: 1, boxShadow: '0px 8px 25px rgba(0,0,0,0.15)' },
    { scale: 1.08, boxShadow: '0px 12px 30px rgba(0,0,0,0.22)' },
  );

  useEffect(() => {
    const id = setInterval(() => cyclePulse(), 1300);
    return () => clearInterval(id);
  }, [cyclePulse]);

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[hsl(148,83%,44%)] px-4 py-3 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all md:bottom-8 md:right-8"
      animate={pulse}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline text-sm font-semibold tracking-tight">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
