'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiGithub, FiTwitter } from 'react-icons/fi';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-store',
        credentials: 'same-origin',
      });

      const data = await res.json();
      console.log('Login response:', { status: res.status, data });

      if (res.ok) {
        document.cookie = `token=${data.token}; path=/`;
        router.push('/chat');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error instanceof Error 
          ? `Connection error: ${error.message}` 
          : 'Network error - Please check your connection'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: 'linear-gradient(135deg, #0061ff 0%, #60efff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite'
      }}
    >
      <div className="w-full max-w-md">
        {/* User Icon */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-full mb-4 overflow-hidden"
            style={{
              animation: 'float 3s ease-in-out infinite'
            }}
          >
            <Image 
              src="https://raw.githubusercontent.com/TheCyperpunk/xmo-image/main/Gemini_Generated_Image_tz4cu0tz4cu0tz4c.png"
              alt="XMO Logo"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Login Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl border border-white border-opacity-20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to XMO</h1>
            <p className="text-white text-opacity-70">Please sign in to continue</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-white rounded-lg p-4 mb-6" role="alert">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-white text-opacity-70" size={20} />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-transparent transition-all duration-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-white text-opacity-70" size={20} />
                </div>
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-white bg-opacity-10 border-white border-opacity-30 rounded focus:ring-blue-500 focus:ring-2"
                  id="remember"
                />
                <label className="ml-2 text-white text-opacity-70 text-sm" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <Link 
                href="/forgot-password"
                className="text-white text-opacity-90 hover:text-opacity-100 text-sm font-medium transition-all duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white border-opacity-20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white text-opacity-70">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button 
                  type="button"
                  className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full text-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all duration-200"
                >
                  <FiGithub size={20} />
                </button>
                <button 
                  type="button"
                  className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full text-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all duration-200"
                >
                  <FiTwitter size={20} />
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-white text-opacity-70">Don't have an account? </span>
              <Link 
                href="/register" 
                className="text-white font-semibold hover:text-opacity-80 transition-all duration-200"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>

        {/* Terms & Privacy */}
        <div className="text-center mt-8">
          <p className="text-white text-opacity-60 text-sm">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
              Terms
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-white text-opacity-80 hover:text-opacity-100 transition-all duration-200">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 