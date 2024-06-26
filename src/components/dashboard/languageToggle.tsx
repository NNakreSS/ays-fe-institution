'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { changeLanguage } from '@/i18n'

const lngs: any = {
  en: { nativeName: 'English' },
  tr: { nativeName: 'Türkçe' },
}

function LanguageToggle() {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'tr'
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  const handleLanguageChange = (lng: string) => {
    setSelectedLanguage(lng)
    changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  return (
    <div className="flex gap-2">
      <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
        <SelectTrigger className="">
          <SelectValue placeholder={lngs[i18n.language].nativeName} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(lngs).map((lng) => {
            return (
              <SelectItem key={lng} value={lng}>
                {lngs[lng].nativeName}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageToggle
