'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with loading states
const Editor = dynamic(() => import('@/components/textEditor'), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded" />
});

const FileUpload = dynamic(() => import('@/components/admin/ImageUploader'), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded" />
});

const initialFormState = {
  pageName: '',
  pageType: '',
  serviceTitle: '',
  description: '',
  pageUrl: '',
  bannerTitle: '',
  bannerDescription: '',
  bannerImage: '',
  overviewContent: '',
  typesDetails: '',
  typeImages: ['', '', ''],
  benefitsTitle: '',
  benefitsDescription: '',
  benefitComponents: [],
  faqs: [],
  extraDetail1: '',
  extraDetail2: ''
};

export default function EditService({ initialData }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  // Initialize form with initialData
  useEffect(() => {
    setIsMounted(true);
    if (initialData) {
      setFormData({
        pageName: initialData.metadata?.pageName || '',
        pageType: initialData.metadata?.pageType || '',
        serviceTitle: initialData.metadata?.title || '',
        description: initialData.metadata?.description || '',
        pageUrl: initialData.metadata?.pageurl || '',
        bannerTitle: initialData.bannerData?.title || '',
        bannerDescription: initialData.bannerData?.description || '',
        bannerImage: initialData.bannerData?.imageurl || '',
        overviewContent: initialData.metadata?.overviewData || '',
        typesDetails: initialData.typesData?.details || '',
        typeImages: initialData.typesData?.images || ['', '', ''],
        benefitsTitle: initialData.benefitsData?.title || '',
        benefitsDescription: initialData.benefitsData?.description || '',
        benefitComponents: initialData.benefitsData?.component || [],
        faqs: initialData.faq || [],
        extraDetail1: initialData.extraFields?.detail1 || '',
        extraDetail2: initialData.extraFields?.detail2 || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pageName.trim()) newErrors.pageName = 'Page name is required';
    if (!formData.serviceTitle.trim()) newErrors.serviceTitle = 'Service title is required';
    if (!formData.pageUrl.trim()) newErrors.pageUrl = 'Page URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEditorChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (index, url) => {
    const updatedImages = [...formData.typeImages];
    updatedImages[index] = url;
    setFormData(prev => ({ ...prev, typeImages: updatedImages }));
  };

  const handleBenefitChange = (index, field, value) => {
    const updated = [...formData.benefitComponents];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, benefitComponents: updated }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefitComponents: [...prev.benefitComponents, { title: '', description: '', icon: '' }]
    }));
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefitComponents: prev.benefitComponents.filter((_, i) => i !== index)
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, faqs: updated }));
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, bannerImage: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/services/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update service');
      }
      
      const result = await response.json();
      alert('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return <div className="max-w-5xl mx-auto p-6">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit Service</h1>

      {/* Service Metadata */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Service Metadata
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pageName" className="block text-sm font-medium text-gray-700 mb-1">Page Name*</label>
            <input
              id="pageName"
              name="pageName"
              value={formData.pageName}
              onChange={handleChange}
              placeholder="Page Name"
              className={`w-full px-3 py-2 border rounded-md ${errors.pageName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.pageName && <p className="mt-1 text-sm text-red-600">{errors.pageName}</p>}
          </div>
          
          <div>
            <label htmlFor="pageType" className="block text-sm font-medium text-gray-700 mb-1">Page Type</label>
            <input
              id="pageType"
              name="pageType"
              value={formData.pageType}
              onChange={handleChange}
              placeholder="Page Type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="serviceTitle" className="block text-sm font-medium text-gray-700 mb-1">Service Title*</label>
            <input
              id="serviceTitle"
              name="serviceTitle"
              value={formData.serviceTitle}
              onChange={handleChange}
              placeholder="Service Title"
              className={`w-full px-3 py-2 border rounded-md ${errors.serviceTitle ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.serviceTitle && <p className="mt-1 text-sm text-red-600">{errors.serviceTitle}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-700 mb-1">Page URL*</label>
            <input
              id="pageUrl"
              name="pageUrl"
              value={formData.pageUrl}
              onChange={handleChange}
              placeholder="Page URL"
              className={`w-full px-3 py-2 border rounded-md ${errors.pageUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.pageUrl && <p className="mt-1 text-sm text-red-600">{errors.pageUrl}</p>}
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Banner Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bannerTitle" className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
            <input
              id="bannerTitle"
              name="bannerTitle"
              value={formData.bannerTitle}
              onChange={handleChange}
              placeholder="Banner Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="bannerDescription" className="block text-sm font-medium text-gray-700 mb-1">Banner Description</label>
            <input
              id="bannerDescription"
              name="bannerDescription"
              value={formData.bannerDescription}
              onChange={handleChange}
              placeholder="Banner Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
          <FileUpload 
            onUpload={handleImageUpload} 
            initialImage={formData.bannerImage} 
            accept="image/*"
            maxSize={5 * 1024 * 1024}
          />
        </div>
      </div>

      {/* Overview */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Service Overview
        </h2>
        <div className="min-h-[200px]">
          <Editor 
            key={`overview-${isMounted}`}
            value={formData.overviewContent || ''}
            onChange={(val) => handleEditorChange('overviewContent', val)} 
            placeholder="Enter service overview content..."
          />
        </div>
      </div>

      {/* Types */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Service Types
        </h2>
        <div className="min-h-[200px]">
          <Editor 
            key={`types-${isMounted}`}
            value={formData.typesDetails || ''}
            onChange={(val) => handleEditorChange('typesDetails', val)} 
            placeholder="Enter service types details..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {formData.typeImages.map((img, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type Image {idx + 1}</label>
              <FileUpload 
                onUpload={(url) => handleFileUpload(idx, url)} 
                initialImage={img} 
                accept="image/*"
                maxSize={5 * 1024 * 1024}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Service Benefits
        </h2>
        <div>
          <label htmlFor="benefitsTitle" className="block text-sm font-medium text-gray-700 mb-1">Benefits Title</label>
          <input
            id="benefitsTitle"
            name="benefitsTitle"
            value={formData.benefitsTitle}
            onChange={handleChange}
            placeholder="Benefits Title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="benefitsDescription" className="block text-sm font-medium text-gray-700 mb-1">Benefits Description</label>
          <input
            id="benefitsDescription"
            name="benefitsDescription"
            value={formData.benefitsDescription}
            onChange={handleChange}
            placeholder="Benefits Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {formData.benefitComponents.map((b, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b border-gray-100 pb-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                value={b.title}
                onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                value={b.description}
                onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input
                  value={b.icon}
                  onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                  placeholder="Icon URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={() => removeBenefit(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                aria-label="Remove benefit"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        
        <button 
          type="button" 
          onClick={addBenefit} 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          + Add Benefit Component
        </button>
      </div>

      {/* FAQs */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          FAQs
        </h2>
        {formData.faqs.map((faq, index) => (
          <div key={index} className="space-y-2 border-b border-gray-100 pb-4 mb-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700 mb-1">Question {index + 1}</label>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
                aria-label="Remove FAQ"
              >
                Remove
              </button>
            </div>
            <input
              value={faq.question}
              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
              placeholder="FAQ Question"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Answer</label>
            <div className="min-h-[150px]">
              <Editor 
                key={`faq-${index}-${isMounted}`}
                value={faq.answer || ''}
                onChange={(val) => handleFaqChange(index, 'answer', val)} 
                placeholder="Enter FAQ answer..."
              />
            </div>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addFaq} 
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add FAQ
        </button>
      </div>

      {/* Additional Info */}
      <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Detail 1</label>
            <Editor 
              value={formData.extraDetail1 || ''}
              onChange={(val) => handleEditorChange('extraDetail1', val)} 
              placeholder="Enter additional information..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Detail 2</label>
            <Editor 
              value={formData.extraDetail2 || ''}
              onChange={(val) => handleEditorChange('extraDetail2', val)} 
              placeholder="Enter additional information..."
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-base font-medium disabled:opacity-70 transition-colors flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}