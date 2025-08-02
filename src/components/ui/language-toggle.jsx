import React from 'react';
import { useLanguage } from '@/context/language-context';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { Globe } from 'lucide-react';

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
        className={`flex items-center gap-2 ${className}`}
        title={t('common.language')}
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium">{getLanguageCode()}</span>
      </Button>
    );
  }

  if (variant === 'text') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={`${className}`}
      >
        {getLanguageText()}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 ${className}`}
    >
      <Globe className="w-4 h-4" />
      <span>{getLanguageText()}</span>
    </Button>
  );
};

export default LanguageToggle; 