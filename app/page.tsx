'use client';

import { useState, useMemo } from 'react';
import EmployeeCard from './components/EmployeeCard';
import SearchBar from './components/SearchBar';
import StatsBar from './components/StatsBar';
import { getAllEmployees } from './data/employees';
import { Users } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState('ALL');
  
  const employees = getAllEmployees().filter(emp => emp.name && emp.name.trim() !== '');
  
  // Get unique sections for filter
  const sections = useMemo(() => {
    const sectionSet = new Set<string>();
    employees.forEach(emp => {
      if (emp.workedInSection && emp.workedInSection.trim()) {
        const sectionParts = emp.workedInSection.split('+').map(s => s.trim());
        sectionParts.forEach(section => sectionSet.add(section));
      }
    });
    return Array.from(sectionSet).sort();
  }, [employees]);
  
  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = searchTerm === '' || 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.workedInSection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.presentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.presentResidence.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSection = filterSection === 'ALL' || 
        emp.workedInSection.includes(filterSection);
      
      return matchesSearch && matchesSection;
    });
  }, [employees, searchTerm, filterSection]);
  
  // Calculate stats
  const stats = useMemo(() => {
    const uniqueSections = new Set();
    let retiredCount = 0;
    const uniqueLocations = new Set();
    
    employees.forEach(emp => {
      if (emp.workedInSection) {
        uniqueSections.add(emp.workedInSection);
      }
      if (emp.presentStatus && emp.presentStatus.includes('Retired')) {
        retiredCount++;
      }
      if (emp.presentResidence) {
        const city = emp.presentResidence.split(',')[0];
        uniqueLocations.add(city);
      }
    });
    
    return {
      uniqueSections: uniqueSections.size,
      retiredCount,
      locationsCount: uniqueLocations.size
    };
  }, [employees]);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-green-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Users className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
    style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1), 6px 6px 0px rgba(0,0,0,0.05)' }}>
  Mangla Power Ex Employees
</h1>
                <p className="text-xs text-gray-600">Community Directory</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <StatsBar 
          totalEmployees={employees.length}
          uniqueSections={stats.uniqueSections}
          retiredCount={stats.retiredCount}
          locationsCount={stats.locationsCount}
        />
        
        {/* Search & Filter */}
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterSection={filterSection}
          onFilterChange={setFilterSection}
          sections={sections}
        />
        
        {/* Results Count */}
        <div className="mb-4 text-gray-600" aria-live="polite">
          Found {filteredEmployees.length} of {employees.length} members
        </div>
        
        {/* Employee Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Employee directory">
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard key={employee.sno} employee={employee} index={index} />
          ))}
        </section>
        
        {/* No Results */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12" role="status">
            <p className="text-gray-600 text-lg">No members found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md mt-12 py-4 border-t border-gray-200">
        <div className="text-center text-gray-600">
          Designed with ❤️ by <span className="font-semibold text-blue-600">Azmat Ali</span>
        </div>
      </footer>
    </main>
  );
}
