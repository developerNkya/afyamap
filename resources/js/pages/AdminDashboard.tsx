import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Activity,
  Map,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  Star,
  MoreVertical } from
'lucide-react';

import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
export const AdminDashboard = ({ facilities = [] }: { facilities: any[] }) => {
  const [activeTab, setActiveTab] = useState('facilities');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    region: 'Dar es Salaam',
    category: 'Private Hospital',
    safeCareLevel: 3,
    jciAccredited: false,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/facilities', {
      onSuccess: () => {
        setShowAddModal(false);
        reset();
      }
    });
  };
  const sidebarNav = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />
  },
  {
    id: 'facilities',
    label: 'Facilities',
    icon: <Building2 size={20} />
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: <MessageSquare size={20} />
  },
  {
    id: 'services',
    label: 'Services',
    icon: <Activity size={20} />
  },
  {
    id: 'regions',
    label: 'Regions',
    icon: <Map size={20} />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />
  }];

  const filteredFacilities = facilities.filter(
    (f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.region.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-afya-deep text-white hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-2xl font-bold tracking-tight">
            Afya<span className="text-afya-mid">Map</span>{' '}
            <span className="text-xs font-normal bg-white/20 px-2 py-1 rounded ml-2">
              Admin
            </span>
          </span>
        </div>
        <div className="flex-grow py-6">
          <nav className="space-y-1 px-3">
            {sidebarNav.map((item) =>
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-white/10 text-white' : 'text-blue-100 hover:bg-white/5 hover:text-white'}`}>
              
                {item.icon}
                {item.label}
              </button>
            )}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => router.get('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/5 hover:text-white transition-colors">
            
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-afya-light rounded-full flex items-center justify-center text-afya-deep font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          {activeTab === 'dashboard' &&
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">
                      Total Facilities
                    </h3>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Building2 size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">452</div>
                  <div className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    ↑ 12 this month
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">
                      Avg SafeCare Level
                    </h3>
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Shield size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">3.2</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Across all facilities
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Total Reviews</h3>
                    <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                      <Star size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">15,420</div>
                  <div className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    ↑ 340 this week
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">
                      Pending Reviews
                    </h3>
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">24</div>
                  <div className="text-sm text-red-600 mt-2">
                    Requires moderation
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">
                        New facility added: Aga Khan Hospital Mwanza
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">
                        SafeCare Level updated for KCMC (Level 3 → 4)
                      </p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">
                        Review flagged for moderation (Muhimbili National
                        Hospital)
                      </p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'facilities' &&
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
              <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-96">
                  <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18} />
                
                  <input
                  type="text"
                  placeholder="Search facilities..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                
                </div>
                <button
                onClick={() => setShowAddModal(true)}
                className="w-full sm:w-auto bg-afya-deep text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center justify-center gap-2">
                
                  <Plus size={18} /> Add Facility
                </button>
              </div>

              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Facility Name</th>
                      <th className="px-6 py-4 font-medium">
                        Region & Category
                      </th>
                      <th className="px-6 py-4 font-medium">Quality Level</th>
                      <th className="px-6 py-4 font-medium">Rating</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredFacilities.map((facility) =>
                  <tr key={facility.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                          src={facility.image}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover" />
                        
                            <div className="font-medium text-gray-900">
                              {facility.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {facility.region}
                          </div>
                          <div className="text-xs text-gray-500">
                            {facility.category}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <SafeCareLevelIndicator
                          level={facility.safeCareLevel}
                          size="sm" />
                        
                            {facility.jciAccredited &&
                        <span className="text-xs text-afya-deep font-medium">
                                JCI Accredited
                              </span>
                        }
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <Star
                          size={14}
                          className="fill-afya-deep text-afya-deep" />
                        {' '}
                            {facility.rating}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-afya-deep transition-colors">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                <span>
                  Showing 1 to {filteredFacilities.length} of{' '}
                  {facilities.length} entries
                </span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    Prev
                  </button>
                  <button className="px-3 py-1 bg-afya-deep text-white rounded">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          }

          {activeTab !== 'dashboard' && activeTab !== 'facilities' &&
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {activeTab} Management
              </h3>
              <p className="text-gray-500">
                This module is currently under development.
              </p>
            </div>
          }
        </main>
      </div>

      {/* Add Facility Modal (Mock) */}
      {showAddModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Facility</h2>
              <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-900">
              
                <LogOut size={24} className="rotate-45" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facility Name
                    </label>
                    <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="e.g. Aga Khan Hospital" required />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Region
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>Dar es Salaam</option>
                      <option>Mwanza</option>
                      <option>Arusha</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>Private Hospital</option>
                      <option>National Hospital</option>
                      <option>Clinic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SafeCare Level (1-5)
                    </label>
                    <input
                    type="range"
                    min="1"
                    max="5"
                    value={data.safeCareLevel}
                    onChange={e => setData('safeCareLevel', parseInt(e.target.value))}
                    className="w-full accent-afya-deep" />
                  
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={data.jciAccredited}
                    onChange={e => setData('jciAccredited', e.target.checked)}
                    className="rounded text-afya-deep w-5 h-5" />
                  
                    <span className="font-medium text-gray-900">
                      JCI Accredited
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                  placeholder="Facility overview...">
                </textarea>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                
                  Cancel
                </button>
                <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-afya-deep text-white rounded-lg font-medium hover:bg-opacity-90">
                
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

};