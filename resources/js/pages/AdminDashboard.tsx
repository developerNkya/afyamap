import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
  LayoutDashboard, Building2, MessageSquare, Activity,
  Map, Settings, LogOut, Plus, Search, Edit, Trash2,
  Shield, Star, MoreVertical, X, ChevronDown, CheckSquare
} from 'lucide-react';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';

const REGIONS = ['Dar es Salaam','Mwanza','Arusha','Kilimanjaro','Dodoma','Mbeya','Tanga','Morogoro','Iringa','Kagera','Lindi','Mara','Mtwara','Pwani','Rukwa','Ruvuma','Shinyanga','Singida','Tabora'];
const CATEGORIES = ['National Hospitals','Zonal Referral','Regional Referral','Private Hospitals','Maternity Clinics','Dental Clinics','Emergency Centers','Specialist Centers','Dispensary'];
const ALL_SERVICES = ['Emergency','Maternity','Dental','Surgery','Laboratory','Radiology','Pharmacy','ICU','Specialist Clinics','Pediatrics','Eye Care','Physiotherapy','Mental Health','Dialysis','Oncology'];
const ALL_INSURANCES = ['NHIF','Jubilee','AAR','Strategis','Britam','MO Assurance','UAP','Resolution'];
const ALL_LANGUAGES = ['Swahili','English','Arabic','Hindi','Gujarati','French'];

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  padding: '9px 12px', fontSize: 14, color: '#111827',
  background: '#F9FAFB', border: '1.5px solid #D1D5DB',
  borderRadius: 8, outline: 'none', fontFamily: 'inherit',
};

function TagCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
      padding: '4px 10px', borderRadius: 20, fontSize: 13, fontWeight: 500,
      background: checked ? '#0F4C75' : '#F3F4F6', color: checked ? '#fff' : '#374151',
      border: `1.5px solid ${checked ? '#0F4C75' : '#E5E7EB'}`, transition: 'all 0.15s', userSelect: 'none',
    }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      {label}
    </label>
  );
}

export default function AdminDashboard({ facilities = [], flash }: { facilities: any[], flash?: any }) {
  const [activeTab, setActiveTab] = useState('facilities');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState<any>(null);

  const emptyForm = {
    name: '', region: 'Dar es Salaam', category: 'Private Hospitals',
    safeCareLevel: 3, jciAccredited: false, description: '',
    address: '', phone: '', email: '', hours: '24 Hours',
    established: '', beds: '', emergency247: false,
    services: [] as string[], insurances: [] as string[], languages: ['Swahili', 'English'],
    image: '', lat: '', lng: '',
  };

  const { data, setData, post, put, processing, errors, reset } = useForm(emptyForm);

  const openAdd = () => { reset(); setEditingFacility(null); setShowAddModal(true); };
  const openEdit = (f: any) => {
    setEditingFacility(f);
    setData({
      name: f.name || '', region: f.region || 'Dar es Salaam', category: f.category || 'Private Hospitals',
      safeCareLevel: f.safeCareLevel || 3, jciAccredited: !!f.jciAccredited, description: f.description || '',
      address: f.address || '', phone: f.phone || '', email: f.email || '', hours: f.hours || '24 Hours',
      established: f.established || '', beds: f.beds || '', emergency247: !!f.emergency247,
      services: f.services || [], insurances: f.insurances || [], languages: f.languages || ['Swahili'],
      image: f.image || '', lat: String(f.lat || ''), lng: String(f.lng || ''),
    } as any);
    setShowAddModal(true);
  };

  const toggleArray = (field: 'services' | 'insurances' | 'languages', val: string) => {
    const arr = (data[field] as string[]);
    setData(field, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFacility) {
      router.put(`/admin/facilities/${editingFacility.id}`, data as any, {
        onSuccess: () => { setShowAddModal(false); reset(); setEditingFacility(null); },
      });
    } else {
      post('/admin/facilities', {
        onSuccess: () => { setShowAddModal(false); reset(); },
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this facility?')) {
      router.delete(`/admin/facilities/${id}`);
    }
  };

  const sidebarNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'facilities', label: 'Facilities', icon: <Building2 size={20} /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageSquare size={20} /> },
    { id: 'services', label: 'Services', icon: <Activity size={20} /> },
    { id: 'regions', label: 'Regions', icon: <Map size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const filteredFacilities = facilities.filter(f =>
    f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F2F4F7', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: 'linear-gradient(180deg,#0F4C75 0%,#0a3558 100%)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="white" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Afya<span style={{ color: '#93C5FD' }}>Map</span></span>
          </Link>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, marginLeft: 46 }}>Admin Console</p>
        </div>
        <nav style={{ flex: 1, padding: '12px 12px' }}>
          {sidebarNav.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '10px 12px', borderRadius: 10, marginBottom: 2,
              background: activeTab === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: activeTab === item.id ? '#fff' : 'rgba(255,255,255,0.65)',
              border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, textAlign: 'left',
              transition: 'all 0.15s',
            }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => router.post('/admin/auth/logout')} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '10px 12px', borderRadius: 10, background: 'transparent',
            color: 'rgba(255,255,255,0.65)', border: 'none', cursor: 'pointer', fontSize: 14,
          }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>
              {sidebarNav.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>{facilities.length} facilities in database</p>
          </div>
          {activeTab === 'facilities' && (
            <button onClick={openAdd} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
              background: '#0F4C75', color: '#fff', border: 'none', borderRadius: 10,
              fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 2px 8px rgba(15,76,117,0.3)',
            }}>
              <Plus size={18} /> Add Facility
            </button>
          )}
        </header>

        {/* Flash */}
        {flash?.success && (
          <div style={{ margin: '16px 28px 0', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: 10, color: '#065F46', fontSize: 14 }}>
            ✓ {flash.success}
          </div>
        )}

        <main style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 28 }}>
                {[
                  { label: 'Total Facilities', value: facilities.length, color: '#0F4C75' },
                  { label: 'JCI Accredited', value: facilities.filter(f => f.jciAccredited).length, color: '#059669' },
                  { label: 'Level 4-5 Facilities', value: facilities.filter(f => f.safeCareLevel >= 4).length, color: '#7C3AED' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 6px' }}>{stat.label}</p>
                    <p style={{ fontSize: 36, fontWeight: 800, color: stat.color, margin: 0 }}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', padding: 24 }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Recent Facilities</h3>
                {facilities.slice(0, 5).map(f => (
                  <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, color: '#111827', fontSize: 14 }}>{f.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#9CA3AF' }}>{f.region} · {f.category}</p>
                    </div>
                    <span style={{ padding: '3px 10px', background: '#EBF4FF', color: '#0F4C75', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Level {f.safeCareLevel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px' }}>
                    <Search size={16} color="#9CA3AF" />
                    <input
                      type="text"
                      placeholder="Search facilities..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: '#111827', width: '100%' }}
                    />
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB' }}>
                      {['Facility', 'Region', 'Category', 'SafeCare', 'Rating', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFacilities.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>
                          No facilities found. Click "Add Facility" to get started.
                        </td>
                      </tr>
                    ) : filteredFacilities.map(f => (
                      <tr key={f.id} style={{ borderTop: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={f.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=60&h=60&fit=crop'} alt={f.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#111827' }}>{f.name}</p>
                              {f.jciAccredited && <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>✓ JCI Accredited</span>}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: 14, color: '#6B7280' }}>{f.region}</td>
                        <td style={{ padding: '14px 16px', fontSize: 14, color: '#6B7280' }}>{f.category}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <SafeCareLevelIndicator level={f.safeCareLevel} size="sm" showLabel={false} />
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Star size={14} color="#FBBF24" fill="#FBBF24" />
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{f.rating}</span>
                            <span style={{ fontSize: 12, color: '#9CA3AF' }}>({f.reviewCount})</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => openEdit(f)} style={{ padding: '6px 12px', background: '#EBF4FF', color: '#0F4C75', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => handleDelete(f.id)} style={{ padding: '6px 12px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'facilities' && (
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', padding: 48, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Settings size={28} color="#9CA3AF" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{activeTab} Management</h3>
              <p style={{ color: '#9CA3AF', fontSize: 14 }}>This module is under development.</p>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 780, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 80px rgba(0,0,0,0.3)' }}>
            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>
                {editingFacility ? `Edit: ${editingFacility.name}` : 'Add New Facility'}
              </h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4, borderRadius: 6 }}>
                <X size={22} />
              </button>
            </div>

            {/* Modal body - scrollable */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

                {/* Section: Basic Info */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 12 }}>Basic Information</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Facility Name *</label>
                    <input required value={data.name} onChange={e => setData('name', e.target.value)} placeholder="e.g. Aga Khan Hospital" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Region *</label>
                    <select value={data.region} onChange={e => setData('region', e.target.value)} style={inputStyle}>
                      {REGIONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Category *</label>
                    <select value={data.category} onChange={e => setData('category', e.target.value)} style={inputStyle}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Section: Contact */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 12 }}>Contact & Location</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Address</label>
                    <input value={data.address} onChange={e => setData('address', e.target.value)} placeholder="Street, City, Region" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Phone</label>
                    <input value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="+255 22 ..." style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Email</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="info@facility.tz" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Latitude</label>
                    <input type="number" step="any" value={data.lat} onChange={e => setData('lat', e.target.value)} placeholder="-6.8086" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Longitude</label>
                    <input type="number" step="any" value={data.lng} onChange={e => setData('lng', e.target.value)} placeholder="39.2743" style={inputStyle} />
                  </div>
                </div>

                {/* Section: Operational */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 12 }}>Operational Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Operating Hours</label>
                    <input value={data.hours} onChange={e => setData('hours', e.target.value)} placeholder="24 Hours" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Year Established</label>
                    <input value={data.established} onChange={e => setData('established', e.target.value)} placeholder="1990" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Bed Count</label>
                    <input value={data.beds} onChange={e => setData('beds', e.target.value)} placeholder="150" style={inputStyle} />
                  </div>
                </div>

                {/* Section: Quality */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 12 }}>Quality & Certification</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>SafeCare Level: <strong style={{ color: '#0F4C75' }}>{data.safeCareLevel}</strong></label>
                    <input type="range" min={1} max={5} value={data.safeCareLevel} onChange={e => setData('safeCareLevel', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#0F4C75' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9CA3AF' }}>
                      {[1,2,3,4,5].map(n => <span key={n}>{n}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                      <input type="checkbox" checked={data.jciAccredited} onChange={e => setData('jciAccredited', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#0F4C75' }} />
                      <span style={{ fontWeight: 600 }}>JCI Accredited</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#374151' }}>
                      <input type="checkbox" checked={data.emergency247} onChange={e => setData('emergency247', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#DC2626' }} />
                      <span style={{ fontWeight: 600 }}>24/7 Emergency</span>
                    </label>
                  </div>
                </div>

                {/* Services */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 10 }}>Services Offered</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {ALL_SERVICES.map(s => (
                    <TagCheckbox key={s} label={s} checked={(data.services as string[]).includes(s)} onChange={() => toggleArray('services', s)} />
                  ))}
                </div>

                {/* Insurances */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 10 }}>Insurance Accepted</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {ALL_INSURANCES.map(i => (
                    <TagCheckbox key={i} label={i} checked={(data.insurances as string[]).includes(i)} onChange={() => toggleArray('insurances', i)} />
                  ))}
                </div>

                {/* Languages */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 10 }}>Languages Spoken</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {ALL_LANGUAGES.map(l => (
                    <TagCheckbox key={l} label={l} checked={(data.languages as string[]).includes(l)} onChange={() => toggleArray('languages', l)} />
                  ))}
                </div>

                {/* Image */}
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 10 }}>Media</p>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Cover Image URL</label>
                  <input value={data.image} onChange={e => setData('image', e.target.value)} placeholder="https://images.unsplash.com/..." style={inputStyle} />
                  {data.image && <img src={data.image} alt="preview" style={{ marginTop: 10, width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Description</label>
                  <textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Brief overview of the facility..." style={{ ...inputStyle, height: 90, resize: 'vertical' }} />
                </div>
              </div>

              {/* Modal footer */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#F9FAFB', borderRadius: '0 0 20px 20px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', border: '1.5px solid #D1D5DB', borderRadius: 10, background: '#fff', color: '#374151', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={processing} style={{
                  padding: '10px 24px', border: 'none', borderRadius: 10,
                  background: processing ? '#6F97C1' : '#0F4C75', color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: processing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(15,76,117,0.3)',
                }}>
                  {processing ? 'Saving…' : editingFacility ? 'Update Facility' : 'Add Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}