'use client';

import { Modal } from 'flowbite-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExampleModal({ isOpen, onClose }: ModalProps) {
  const pathname = usePathname();
  
  const menuItems = [
    { label: "Courses", href: "/courses" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <Modal 
      show={isOpen} 
      onClose={onClose}
      className="!p-0 !z-[5000]"
      theme={{
        content: {
          base: "relative w-[70vw] h-full p-0 rounded-none bg-white ml-auto",
          inner: "relative rounded-none p-0"
        }
      }}
    >
      <div className="h-full bg-gradient-to-b from-blue-50 to-white">
        <div className="p-6 bg-blue-100/10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-blue-900">Menu</h3>
            <button 
              onClick={onClose}
              className="text-blue-900 hover:text-yellow-base transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <nav className="space-y-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block text-xl font-medium transition-colors ${
                    pathname === item.href 
                      ? 'text-blue-600' 
                      : 'text-blue-900 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-12 pt-12 border-t border-gray-100">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-500">Contact Us</h4>
              <a 
                href="mailto:support@example.com"
                className="flex items-center text-blue-900 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@stardeliteacademy.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 