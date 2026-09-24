import React, { useState } from 'react';
import { X, FileText, Printer, Copy, Check } from 'lucide-react';

interface ProjectDocModalProps {
  onClose: () => void;
}

const SECTIONS = [
  { id: 'sec-1', title: '1. Project Title' },
  { id: 'sec-2', title: '2. Introduction' },
  { id: 'sec-3', title: '3. Problem Statement' },
  { id: 'sec-4', title: '4. Main Objectives' },
  { id: 'sec-5', title: '5. Existing System' },
  { id: 'sec-6', title: '6. Problems with Existing System' },
  { id: 'sec-7', title: '7. Proposed System' },
  { id: 'sec-8', title: '8. Key Features' },
  { id: 'sec-9', title: '9. Target Users' },
  { id: 'sec-10', title: '10. Technology Used' },
  { id: 'sec-11', title: '11. System Architecture' },
  { id: 'sec-12', title: '12. Database Design & Schema' },
  { id: 'sec-13', title: '13. Student User Flow' },
  { id: 'sec-14', title: '14. Admin Moderation Flow' },
  { id: 'sec-15', title: '15. Key Advantages' },
  { id: 'sec-16', title: '16. Limitations' },
  { id: 'sec-17', title: '17. Community Impact' },
  { id: 'sec-18', title: '18. Future Scope' },
  { id: 'sec-19', title: '19. Testing Strategy' },
  { id: 'sec-20', title: '20. Conclusion' },
];

export const ProjectDocModal: React.FC<ProjectDocModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = document.getElementById('academic-doc-content')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold">Academic College Project Documentation (20 Sections)</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1 border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg flex items-center gap-1 border border-slate-700"
            >
              <Printer className="w-4 h-4" /> Print PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Section Jump Sidebar */}
          <div className="hidden lg:block lg:col-span-3 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto space-y-1 text-xs font-semibold text-slate-700">
            <span className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Table of Contents</span>
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block p-2 rounded-lg hover:bg-white hover:text-brand-700 transition-colors truncate"
              >
                {s.title}
              </a>
            ))}
          </div>

          {/* Main Doc View */}
          <div id="academic-doc-content" className="lg:col-span-9 p-6 overflow-y-auto space-y-8 text-sm text-slate-800 leading-relaxed font-sans">
            
            {/* Sec 1 */}
            <section id="sec-1" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-xl font-extrabold text-slate-900 text-brand-700">1. Project Title</h3>
              <p className="font-extrabold text-2xl text-slate-900">
                StayNest — General-Purpose Student PG Accommodation Finder Web Platform
              </p>
              <p className="text-xs text-slate-500 italic">
                A multi-college accommodation discovery and comparison platform for higher educational institutions across India.
              </p>
            </section>

            {/* Sec 2 */}
            <section id="sec-2" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">2. Introduction</h3>
              <p>
                When students take admission to a new college, university, or institute — particularly outstation students coming from different cities or villages — their immediate requirement is finding safe, hygienic, and affordable Paying Guest (PG) accommodation near their educational campus. StayNest is designed as a centralized community platform connecting students, parents, PG owners, and educational institutes.
              </p>
            </section>

            {/* Sec 3 */}
            <section id="sec-3" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">3. Problem Statement</h3>
              <p>
                Currently, accommodation details for new college admissions are scattered across local hoardings, physical agents, word-of-mouth recommendations, and unverified social media groups. Students face major difficulties:
              </p>
              <ul className="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>Lack of clear distance metrics between PG locations and specific college gates.</li>
                <li>Hidden security deposit charges, food quality ambiguity, and electricity billing extra costs.</li>
                <li>Fake or unverified listings uploaded by unscrupulous middlemen.</li>
                <li>Absence of genuine verified student reviews and star ratings.</li>
              </ul>
            </section>

            {/* Sec 4 */}
            <section id="sec-4" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">4. Main Objectives</h3>
              <ul className="list-disc pl-5 text-xs space-y-1.5 text-slate-700">
                <li><strong>College-Based Location Search:</strong> Enable students from ANY educational campus (PCCOE, COEP, VIT, IIT Bombay, VJTI, etc.) to discover nearby PGs.</li>
                <li><strong>Multi-College Association:</strong> Structure the database so a single PG can map distance metrics to multiple nearby campuses.</li>
                <li><strong>Verification Workflow:</strong> Enforce strict Admin Moderation so newly submitted owner PGs receive <span className="text-emerald-700 font-bold">🟢 Verified PG Status</span> only after review.</li>
                <li><strong>Side-by-Side Comparison:</strong> Provide a multi-attribute matrix comparing rent, deposit, sharing types, and facilities.</li>
              </ul>
            </section>

            {/* Sec 5 & 6 */}
            <section id="sec-5" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">5. Existing System vs 6. Problems with Existing System</h3>
              <p className="text-xs">
                Traditional portals hard-code property searches around general municipal boundaries rather than educational institutes. For a student, knowing a PG is in "Pune" is unhelpful; knowing it is 0.6 km from "PCCOE Akurdi Campus" is actionable. Existing platforms also charge heavy brokerage fees or expose unverified owner numbers to spam.
              </p>
            </section>

            {/* Sec 7 & 8 */}
            <section id="sec-7" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">7. Proposed System & 8. Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">1. College-Based Search Engine</span>
                  Autocomplete & location filters tailored around campus codes (PCCOE, COEP, VIT, IIT Bombay).
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">2. 15+ Facility Checklist Filter</span>
                  Filter by Wi-Fi, Hot water, Washing Machine, CCTV, Power Backup, Mess/Food, attached bath.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">3. Owner Submission Portal</span>
                  Multi-step "Add Your PG" form logged as 🟡 Pending Verification.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">4. Admin Control Center</span>
                  Password-protected dashboard with pending approvals, college manager, and review moderation.
                </div>
              </div>
            </section>

            {/* Sec 9 & 10 */}
            <section id="sec-9" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">9. Target Users & 10. Technology Stack</h3>
              <p className="text-xs">
                <strong>Target Audience:</strong> Outstation & local Students, Parents, PG Owners & Managers, College Administration.
              </p>
              <p className="text-xs">
                <strong>Frontend:</strong> React 18, TypeScript, Tailwind CSS, Lucide React Icons.<br/>
                <strong>Mapping:</strong> OpenStreetMap + Leaflet visualizer engine.<br/>
                <strong>Data Storage:</strong> StorageService engine utilizing LocalStorage state & seed data with architecture decoupled for Supabase / Firebase production deployment.
              </p>
            </section>

            {/* Sec 11 & 12 */}
            <section id="sec-11" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">11. System Architecture & 12. Relational Schema</h3>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs overflow-x-auto font-mono">
{`College (1) ───< CollegeDistance (M) >─── (M) PG (1) ───< Reviews (M)
  │                                           │
  ├── id, name, code, city                    ├── id, name, rent, deposit
  └── lat, lng, image                         ├── verifiedStatus, availableBeds
                                              └── facilities[], photos[]`}
              </pre>
            </section>

            {/* Sec 13 to 16 */}
            <section id="sec-13" className="space-y-2 border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-900">13 - 16. Workflow, Advantages & Limitations</h3>
              <p className="text-xs">
                <strong>Student Flow:</strong> Select College → Apply Filters (Budget/Facilities/Gender) → Compare PGs → Inspect Detail Page → Contact Owner.<br/>
                <strong>Admin Flow:</strong> Login → Check Pending Approvals Queue → Inspect Details → Approve (🟢 Verified) or Reject.<br/>
                <strong>Advantages:</strong> Scalable multi-college structure, zero mandatory paid map API costs, mobile responsive.<br/>
                <strong>Limitations:</strong> Requires physical student inspection for final contract signing.
              </p>
            </section>

            {/* Sec 17 to 20 */}
            <section id="sec-17" className="space-y-2 pb-4">
              <h3 className="text-lg font-bold text-slate-900">17 - 20. Community Impact & Conclusion</h3>
              <p className="text-xs leading-relaxed">
                StayNest brings transparency, safety, and convenience to the student accommodation ecosystem across Indian cities. By empowering students with distance metrics, verified owner details, and real peer reviews, the platform reduces stress during college admissions.
              </p>
              <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 text-xs font-bold text-brand-900 text-center">
                StayNest Academic Community Project — Ready for College Evaluation & Deployment.
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
