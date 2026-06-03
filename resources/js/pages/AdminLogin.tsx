import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import { ShieldCheck, MapPin, Heart, ArrowLeft } from 'lucide-react';
export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - just navigate to dashboard
    router.get('/admin');
  };
  return (
    <div className="min-h-screen bg-afya-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-10 h-10 bg-afya-deep rounded-xl text-white shadow-lg">
              <MapPin size={24} className="absolute" />
              <Heart size={12} className="absolute mt-[-2px] fill-white" />
            </div>
            <span className="text-3xl font-bold text-afya-text tracking-tight">
              Afya<span className="text-afya-mid">Map</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
          Admin Portal Access
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Authorized personnel only. For public use,{' '}
          <Link
            href="/"
            className="font-medium text-afya-deep hover:text-afya-mid">
            
            return to home
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <ShieldCheck size={32} className="text-afya-deep" />
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-afya-deep focus:border-afya-deep sm:text-sm"
                  placeholder="admin@pharmaccess.org" />
                
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-afya-deep focus:border-afya-deep sm:text-sm"
                  placeholder="••••••••" />
                
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-afya-deep focus:ring-afya-deep border-gray-300 rounded" />
                
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-afya-deep hover:text-afya-mid">
                  
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-afya-deep hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-afya-deep transition-colors">
                
                Sign in to Dashboard
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
              
              <ArrowLeft size={16} /> Back to public site
            </Link>
          </div>
        </div>
      </div>
    </div>);

};