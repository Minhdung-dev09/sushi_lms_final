import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('vi');

  useEffect(() => {
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
    const savedLanguage = localStorage.getItem('language') || 'vi';
    setCurrentLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    changeLanguage(newLanguage);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    isVietnamese: currentLanguage === 'vi',
    isEnglish: currentLanguage === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 