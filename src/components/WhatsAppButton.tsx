import React from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/918961260151?text=Hello%20JIT%20Computer,%20I%20need%20help%20with%20the%20online%20test.';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Help"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-display font-semibold text-xs sm:text-sm shadow-[0_8px_24px_rgba(22,163,74,0.38)] hover:shadow-[0_12px_28px_rgba(22,163,74,0.48)] transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#16A34A]"
    >
      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp Help</span>
    </a>
  );
};
