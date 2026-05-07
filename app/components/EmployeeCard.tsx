'use client';

import { useState } from 'react';
import { Phone, Home, Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { Employee } from '../types/employee';

interface EmployeeCardProps {
  employee: Employee;
  index: number;
}

export default function EmployeeCard({ employee, index }: EmployeeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    if (status.includes('Retired')) return 'bg-purple-100 text-purple-800';
    if (status.includes('Business') || status.includes('Store')) return 'bg-blue-100 text-blue-800';
    if (status.includes('Working')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getShortName = (name: string) => {
    if (name.length > 30) {
      return name.substring(0, 27) + '...';
    }
    return name;
  };

  const handleCall = () => {
    if (employee.phoneNumber && employee.phoneNumber !== '?') {
      const phone = employee.phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
      window.location.href = `tel:${phone}`;
    } else {
      alert('Phone number not available for this member');
    }
  };

  const handleWhatsApp = () => {
    if (employee.phoneNumber && employee.phoneNumber !== '?') {
      let phone = employee.phoneNumber.replace(/\s/g, '').replace(/\+/g, '');
      if (phone.startsWith('0')) {
        phone = '92' + phone.substring(1);
      }
      if (phone.startsWith('92')) {
        // Good, already has country code
      }
      const message = encodeURIComponent(`Hi ${employee.name.split('(')[0].trim()}, I saw your profile on Mangla Power Ex-Employees Community. Hope you're doing well!`);
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    } else {
      alert('Phone number not available for WhatsApp');
    }
  };

  // Get initials for avatar (fallback when no image)
  const getInitials = (name: string) => {
    const cleanName = name.split('(')[0].trim();
    return cleanName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGradient = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-teal-500 to-teal-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Check if image exists and should be shown
  const showImage = employee.imageUrl && !imageError;

  return (
    <article 
      className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-full flex flex-col ${
        index % 2 === 0 ? 'bg-gradient-to-r from-sky-50 to-sky-100' : 'bg-gradient-to-r from-green-50 to-green-100'
      }`}
    >
      <div className="p-3 sm:p-4 flex-1">
        {/* Header Section with Image/Avatar */}
        <div className="flex items-start gap-2 sm:gap-3 mb-3">
          {/* Profile Image or Avatar */}
          <div className="flex-shrink-0">
            {showImage ? (
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-200 shadow-md">
                <Image
                  src={employee.imageUrl!}
                  alt={`${employee.name}'s profile`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
            ) : (
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${getGradient(employee.name)} flex items-center justify-center shadow-md`}>
                <span className="text-white text-base sm:text-xl font-bold text-shadow-sm">
                  {getInitials(employee.name)}
                </span>
              </div>
            )}
          </div>
          
          {/* Name and Role */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 text-shadow-sm break-words">
              <span className="line-clamp-2">{getShortName(employee.name)}</span>
            </h3>
            {employee.servedAs && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 text-shadow-sm line-clamp-2">
                {employee.servedAs}
              </p>
            )}
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm mb-2">
          {employee.workedInSection && (
            <div className="flex items-center gap-1 text-gray-600 min-w-0 text-shadow-sm">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate text-xs sm:text-sm">
                {employee.workedInSection.split('+')[0].trim()}
              </span>
            </div>
          )}
          {employee.presentResidence && (
            <div className="flex items-center gap-1 text-gray-600 min-w-0 text-shadow-sm">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate text-xs sm:text-sm">
                {employee.presentResidence.split(',')[0]}
              </span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        {employee.presentStatus && (
          <div className="mt-2">
            <span 
              className={`inline-block px-2 py-0.5 sm:py-1 text-xs rounded-full ${getStatusColor(employee.presentStatus)} text-shadow-sm`}
              role="status"
            >
              {employee.presentStatus.split(',')[0]}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex gap-2">
              {employee.phoneNumber && employee.phoneNumber !== '?' && (
                <>
                  <button
                    type="button"
                    onClick={handleCall}
                    className="bg-green-500 hover:bg-green-600 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                    aria-label={`Call ${employee.name}`}
                    title={`Call ${employee.name}`}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
                    aria-label={`WhatsApp ${employee.name}`}
                    title={`WhatsApp ${employee.name}`}
                  >
                    <span className="text-sm sm:text-base">📱</span>
                  </button>
                </>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center"
              aria-label={isExpanded ? `Show less details for ${employee.name}` : `Show more details for ${employee.name}`}
            >
              {isExpanded ? (
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-white/50 p-3 sm:p-4 space-y-2 sm:space-y-3 animate-slide-down">
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {employee.servedFromTo && (
              <div className="flex items-start gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Served At Mangla</p>
                  <p className="text-xs sm:text-sm text-gray-800 break-words">{employee.servedFromTo}</p>
                </div>
              </div>
            )}
            
            {employee.residenceDuringJob && (
              <div className="flex items-start gap-2">
                <Home className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Residence During Job</p>
                  <p className="text-xs sm:text-sm text-gray-800 break-words">{employee.residenceDuringJob}</p>
                </div>
              </div>
            )}

            {employee.servedAs && (
              <div className="flex items-start gap-2">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Served As</p>
                  <p className="text-xs sm:text-sm text-gray-800 break-words">{employee.servedAs}</p>
                </div>
              </div>
            )}

            {employee.workedInSection && (
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Worked In Section</p>
                  <p className="text-xs sm:text-sm text-gray-800 break-words">{employee.workedInSection}</p>
                </div>
              </div>
            )}
          </div>

          {employee.phoneNumber && employee.phoneNumber !== '?' && (
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleCall}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-xs sm:text-sm"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                Call: {employee.phoneNumber}
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-xs sm:text-sm"
              >
                <span className="text-sm sm:text-base">📱</span>
                WhatsApp: {employee.phoneNumber}
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}