'use client';

import { useState } from 'react';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (non-functional for now)
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        'Form submitted! (This is just a demo - form is not functional yet)'
      );
    }, 2000);
  };

  const getFieldClasses = (
    fieldName: keyof FormErrors,
    baseClasses: string
  ) => {
    const isFocused = focusedField === fieldName;
    const hasError = errors[fieldName];

    let classes = baseClasses;

    if (hasError) {
      classes += ' border-red-300 focus:border-red-400 focus:ring-red-200';
    } else if (isFocused) {
      classes += ' border-white/40 ring-2 ring-white/20';
    } else {
      classes +=
        ' border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20';
    }

    return classes;
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Name Field */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-white font-medium mb-2"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className={getFieldClasses(
            'name',
            'w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-indigo-200 focus:outline-none transition-all duration-300'
          )}
          placeholder="Enter your full name"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-red-300 text-sm" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-white font-medium mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={getFieldClasses(
            'email',
            'w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-indigo-200 focus:outline-none transition-all duration-300'
          )}
          placeholder="your.email@example.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-2 text-red-300 text-sm"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Service Interest */}
      <div>
        <label
          htmlFor="contact-service"
          className="block text-white font-medium mb-2"
        >
          Service Interest
        </label>
        <select
          id="contact-service"
          name="service"
          value={formData.service}
          onChange={(e) => handleInputChange('service', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
        >
          <option value="">Select a service</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-apps">Mobile Applications</option>
          <option value="consulting">Digital Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-white font-medium mb-2"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          className={getFieldClasses(
            'message',
            'w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-indigo-200 focus:outline-none transition-all duration-300 resize-none'
          )}
          placeholder="Tell us about your project..."
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-2 text-red-300 text-sm"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-white/30 ${
          isSubmitting
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105'
        }`}
        aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            Sending...
          </div>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Form Notice */}
      <div className="text-center">
        <p className="text-indigo-200 text-sm">
          * This form is for demonstration purposes and is not yet functional
        </p>
      </div>
    </form>
  );
}
