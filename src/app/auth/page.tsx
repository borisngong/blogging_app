'use client'

import { useState } from 'react'
import AuthForms from '@/components/auth-forms'

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
  }

  return <AuthForms mode={mode} onToggleMode={toggleMode} />
}