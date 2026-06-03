import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { ShieldCheck, MapPin, Heart, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/auth/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F2F4F7', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 16px' }}>
      <div style={{ maxWidth: 448, margin: '0 auto', width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ position: 'relative', width: 44, height: 44, background: '#0F4C75', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(15,76,117,0.35)' }}>
              <MapPin size={24} color="white" />
              <Heart size={11} color="white" fill="white" style={{ position: 'absolute', bottom: 8 }} />
            </div>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#2F5D7C', letterSpacing: '-0.5px' }}>
              Afya<span style={{ color: '#6F97C1' }}>Map</span>
            </span>
          </Link>
        </div>

        <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Admin Portal Access</h2>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginBottom: 32 }}>
          Authorized personnel only.{' '}
          <Link href="/" style={{ color: '#0F4C75', fontWeight: 600 }}>Return to public site</Link>
        </p>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1px solid #e5e7eb', padding: '36px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, background: '#EBF4FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={32} color="#0F4C75" />
            </div>
          </div>

          {/* Flash error */}
          {errors.email && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 20, color: '#DC2626', fontSize: 14 }}>
              {errors.email}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                placeholder="admin@afyamap.tz"
                style={{
                  display: 'block', width: '100%', boxSizing: 'border-box',
                  padding: '12px 14px', fontSize: 15, color: '#111827',
                  background: '#F9FAFB', border: '1.5px solid #D1D5DB',
                  borderRadius: 10, outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.target.style.borderColor = '#0F4C75')}
                onBlur={e => (e.target.style.borderColor = '#D1D5DB')}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  placeholder="••••••••"
                  style={{
                    display: 'block', width: '100%', boxSizing: 'border-box',
                    padding: '12px 44px 12px 14px', fontSize: 15, color: '#111827',
                    background: '#F9FAFB', border: '1.5px solid #D1D5DB',
                    borderRadius: 10, outline: 'none', transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0F4C75')}
                  onBlur={e => (e.target.style.borderColor = '#D1D5DB')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#0F4C75' }}
                />
                Remember me
              </label>
              <a href="#" style={{ fontSize: 14, color: '#0F4C75', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={processing}
              style={{
                width: '100%', padding: '13px', fontSize: 15, fontWeight: 700,
                color: '#fff', background: processing ? '#6F97C1' : '#0F4C75',
                border: 'none', borderRadius: 10, cursor: processing ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s', boxShadow: '0 2px 10px rgba(15,76,117,0.3)',
              }}>
              {processing ? 'Signing in…' : 'Sign in to Dashboard'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#6b7280', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to public site
            </Link>
          </div>
        </div>

        {/* Hint */}
        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#9CA3AF' }}>
          Default: <strong>admin@afyamap.tz</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}