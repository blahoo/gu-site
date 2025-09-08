import { useState } from 'react';
import { motion } from 'motion/react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      } else {
        console.log('Contact form submitted:', formData);
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-[8px] p-4 text-center"
      >
        <div className="text-green-800 mb-2">✓ Message Sent!</div>
        <div className="text-[13px] text-green-600">
          Thanks for reaching out. I'll get back to you soon.
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-3 text-[11px] text-green-700 hover:text-green-900 underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-3 py-2 text-[13px] border rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0d0a0b] ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errors.name && (
          <div className="mt-1 text-[11px] text-red-600">{errors.name}</div>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-3 py-2 text-[13px] border rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0d0a0b] ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errors.email && (
          <div className="mt-1 text-[11px] text-red-600">{errors.email}</div>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={`w-full px-3 py-2 text-[13px] border rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0d0a0b] ${
            errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errors.subject && (
          <div className="mt-1 text-[11px] text-red-600">{errors.subject}</div>
        )}
      </div>

      <div>
        <textarea
          placeholder="Your message..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 text-[13px] border rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0d0a0b] resize-vertical ${
            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
        {errors.message && (
          <div className="mt-1 text-[11px] text-red-600">{errors.message}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0d0a0b] text-white py-2 px-4 rounded-[6px] text-[13px] font-['Inter:Bold',_sans-serif] font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}