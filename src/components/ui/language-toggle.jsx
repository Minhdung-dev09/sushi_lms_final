import React from 'react';
import { useLanguage } from '@/context/language-context';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { Star, Book } from 'lucide-react';

const LanguageToggle = ({ className = '', variant = 'default' }) => {
  const { currentLanguage, toggleLanguage, isVietnamese, isEnglish } = useLanguage();
  const { t } = useTranslation();

  const getLanguageText = () => {
    return isVietnamese ? t('common.english') : t('common.vietnamese');
  };

  const getLanguageCode = () => {
    return isVietnamese ? 'EN' : 'VI';
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={`flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors ${className}`}
        title={t('common.language')}
      >
        {isVietnamese ? <span className='w-4 h-4 flex items-center'><img src="/en.webp" alt="" className="w-full h-full object-contain" /></span> : <span className='w-4 h-4 flex items-center'><img src="/vn.webp" alt="" className="w-full h-full object-contain" /></span>}
        <span className="text-xs font-medium text-gray-700 flex items-center">{getLanguageCode()}</span>
      </Button>
    );
  }

  if (variant === 'text') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={`flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors ${className}`}
      >
        {isVietnamese ? <span className='w-4 h-4 flex items-center'><img src="/en.webp" alt="" className="w-full h-full object-contain" /></span> : <span className='w-4 h-4 flex items-center'><img src="/vn.webp" alt="" className="w-full h-full object-contain" /></span>}
        <span className="text-sm font-medium text-gray-700 flex items-center">{getLanguageText()}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors ${className}`}
    >
      {isVietnamese ? <span className='w-4 h-4 flex items-center'><img src="/en.webp" alt="" className="w-full h-full object-contain" /></span> : <span className='w-4 h-4 flex items-center'><img src="/vn.webp" alt="" className="w-full h-full object-contain" /></span>}
      <span className="text-sm font-medium text-gray-700 flex items-center">{getLanguageText()}</span>
    </Button>
  );
};

export default LanguageToggle; 