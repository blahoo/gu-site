import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { PageTransition } from "./PageTransition";
import { motion } from "motion/react";

export function ExperiencePage() {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/content/gregory-gu-cv.pdf';
    link.download = 'Gregory-Gu-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageTransition>
      {/* Match Projects/About page container width */}
      <div className="max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-12 pt-8 pb-20">
        {/* Intro text */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
      Experience
    </h1>
        <div className="text-lg md:text-[16px] lg:text-[18px] mb-8 text-gray-800">
          <p className="leading-[normal]">
            Let's be real, LinkedIn exists.
          </p>
        </div>

        {/* Download CV button */}
        <div className="mb-8">
          <motion.button
            onClick={handleDownloadCV}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="bg-neutral-100 h-[28px] md:h-[36px] rounded-[8px] w-[140px] md:w-[160px] border-gray-800 border-[1.5px] hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span className="font-['Inter:Bold',_sans-serif] font-bold text-gray-900 text-[12px] md:text-[11px] lg:text-[12px]">
              Download CV ↓
            </span>
          </motion.button>
        </div>

        {/* Contact information */}
        <div className="text-lg md:text-[16px] lg:text-[18px] mb-8 text-gray-800">
          <p className="mb-0">
            A simple conversation will be infinitely more useful
            than a PDF
          </p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-4">
            contact via gu.gregory.gg@gmail.com
          </p>

          <div className="mb-4">
            <motion.button
              onClick={() =>
                setShowContactForm(!showContactForm)
              }
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="bg-[#0d0a0b] text-white h-[28px] md:h-[36px] rounded-[8px] px-4 hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="font-['Inter:Bold',_sans-serif] font-bold text-[13px] md:text-[12px] lg:text-[13px]">
                {showContactForm
                  ? "Hide Form"
                  : "Send a Message"}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="mb-8">
            <div className="bg-white bg-opacity-60 rounded-[8px] p-4 border border-gray-200">
              <div className="text-lg md:text-[14px] lg:text-[16px] mb-4">
                <p className="font-['Inter:Bold',_sans-serif] font-bold mb-0">
                  Drop me a line
                </p>
                <p className="text-[#454955] mb-0">
                  I'd love to hear from you
                </p>
              </div>
              <ContactForm
                onSubmit={(data) => {
                  console.log("Contact form submitted:", data);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}