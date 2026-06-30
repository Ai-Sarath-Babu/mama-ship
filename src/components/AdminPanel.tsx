import React, { useState, useEffect } from "react";
import { X, Search, FileDown, Trash2, CheckCircle, RefreshCw, Key, ShieldCheck, Mail, Phone, Calendar, Loader2 } from "lucide-react";

interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  country: string;
  email: string;
  whatsapp: string;
  productCategory: string;
  specificProduct: string;
  quantity: string;
  message: string;
  leadSource: string;
  status: 'New' | 'Contacted' | 'Negotiating' | 'Quoted' | 'Converted' | 'Archived';
  date: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_TOKEN = "yaliniadmin2026";

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    // Check if we are already authenticated in this session
    const savedAuth = sessionStorage.getItem("admin_authenticated");
    if (savedAuth === "true") {
      setAuthenticated(true);
      fetchLeads();
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_TOKEN) {
      setAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem("admin_authenticated", "true");
      fetchLeads();
    } else {
      setAuthError("Incorrect password. Please verify the owner passphrase.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leads?token=${ADMIN_TOKEN}`, {
        headers: { "x-admin-token": ADMIN_TOKEN }
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        console.error("Failed to load leads");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      const response = await fetch(`/api/leads/${id}/status?token=${ADMIN_TOKEN}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": ADMIN_TOKEN
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        // Update local state
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus as any } : lead));
      }
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;
    setActionLoading(id);
    try {
      const response = await fetch(`/api/leads/${id}?token=${ADMIN_TOKEN}`, {
        method: "DELETE",
        headers: { "x-admin-token": ADMIN_TOKEN }
      });
      if (response.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
      }
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (!isOpen) return null;

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.contactPerson || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.companyName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.country || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.specificProduct || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalInquiries = leads.length;
  const newLeadsCount = leads.filter(l => l.status === "New").length;
  const quotedCount = leads.filter(l => l.status === "Quoted" || l.status === "Converted").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="bg-brand-dark text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center border border-brand-green-light shadow-sm">
              <ShieldCheck className="w-6 h-6 text-brand-green-light" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display leading-tight">Yalini Exim - Lead Management Portal</h3>
              <p className="text-xs text-gray-400">Owner Access Dashboard (Confidential)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock Screen */}
        {!authenticated ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8 bg-slate-50">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl border border-gray-200/60 shadow-md">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Key className="w-6 h-6 text-brand-green-light" />
              </div>
              <h4 className="text-lg font-bold text-center text-brand-dark font-display mb-1">Enter Admin Password</h4>
              <p className="text-xs text-center text-gray-400 mb-6">Authenticate using the owner credential configured in your server.</p>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-800 text-xs rounded-r-lg font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  required
                  placeholder="Enter Passphrase (yaliniadmin2026)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-center p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-green focus:bg-white focus:outline-hidden transition-all text-sm font-mono tracking-widest"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 rounded-lg text-sm shadow-sm cursor-pointer transition-colors"
                >
                  Unlock Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Workspace */
          <div className="flex-grow flex flex-col bg-slate-50 overflow-hidden">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white border-b border-gray-100">
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Total Export inquiries</span>
                <span className="text-2xl font-black text-brand-dark">{totalInquiries} Leads</span>
              </div>
              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/50">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">Unprocessed Leads</span>
                <span className="text-2xl font-black text-brand-green">{newLeadsCount} New</span>
              </div>
              <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/30">
                <span className="text-[10px] uppercase font-bold text-brand-green block mb-1">Quoted / Converted rate</span>
                <span className="text-2xl font-black text-brand-green-light">{quotedCount} Active</span>
              </div>
            </div>

            {/* Controls panel */}
            <div className="p-4 bg-white border-b border-gray-150 flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search buyer, company, country, product..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:border-brand-green focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              {/* Filters & CSV export */}
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:border-brand-green focus:outline-hidden"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Negotiating">Negotiating</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Converted">Converted</option>
                  <option value="Archived">Archived</option>
                </select>

                <button
                  onClick={fetchLeads}
                  disabled={loading}
                  className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 cursor-pointer flex items-center gap-1 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Sync</span>
                </button>

                <a
                  href={`/api/leads/export?token=${ADMIN_TOKEN}`}
                  className="p-2 bg-brand-green hover:bg-brand-green-light text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 shadow-xs transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </a>
              </div>
            </div>

            {/* Table or loading state */}
            <div className="flex-grow overflow-auto p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-brand-green animate-spin mb-3" />
                  <p className="text-sm text-gray-500 font-medium">Synchronizing lead entries from secure database...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20 bg-white border border-gray-200/60 rounded-xl">
                  <p className="text-sm text-gray-400 font-semibold mb-1">No matching leads found</p>
                  <p className="text-xs text-gray-400">Try adjusting your filter or search criteria.</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-white">
                  <table className="w-full text-left text-xs text-gray-500 font-sans border-collapse">
                    <thead className="bg-slate-50 text-brand-dark uppercase text-[10px] tracking-wider font-bold border-b border-gray-150">
                      <tr>
                        <th className="p-4">Lead Date</th>
                        <th className="p-4">Company & Buyer</th>
                        <th className="p-4">Target Country</th>
                        <th className="p-4">Product Requirement</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Status Code</th>
                        <th className="p-4 text-right">Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 whitespace-nowrap font-medium text-gray-400">
                            <div className="flex flex-col">
                              <span>{new Date(lead.date).toLocaleDateString()}</span>
                              <span className="text-[10px]">{new Date(lead.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col font-semibold text-brand-dark">
                              <span>{lead.contactPerson}</span>
                              <span className="text-[10px] text-gray-400 font-normal">{lead.companyName || "Individual"}</span>
                              <div className="flex items-center gap-3 text-[10px] text-brand-green font-normal mt-1">
                                <a href={`mailto:${lead.email}`} className="hover:underline flex items-center gap-0.5">
                                  <Mail className="w-2.5 h-2.5" />
                                  <span>{lead.email}</span>
                                </a>
                                <a href={`tel:${lead.whatsapp}`} className="hover:underline flex items-center gap-0.5">
                                  <Phone className="w-2.5 h-2.5" />
                                  <span>{lead.whatsapp}</span>
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap font-bold text-brand-dark">
                            {lead.country}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-brand-dark">{lead.specificProduct}</span>
                              <span className="text-[10px] text-gray-400">Qty: {lead.quantity || "General Quote"}</span>
                              {lead.message && (
                                <p className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 p-1.5 rounded-md mt-1 italic max-w-xs line-clamp-2">
                                  "{lead.message}"
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              lead.leadSource === "quote-assistant" 
                                ? "bg-purple-100 text-purple-800" 
                                : lead.leadSource === "exit-intent"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {lead.leadSource || "direct"}
                            </span>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              disabled={actionLoading === lead.id}
                              className={`p-1 text-[11px] font-bold rounded-md border focus:outline-hidden ${
                                lead.status === "New" 
                                  ? "bg-red-50 text-red-700 border-red-200" 
                                  : lead.status === "Contacted"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : lead.status === "Negotiating"
                                  ? "bg-orange-50 text-orange-700 border-orange-200"
                                  : lead.status === "Quoted"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : lead.status === "Converted"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-gray-150 text-gray-700 border-gray-300"
                              }`}
                            >
                              <option value="New">🔴 New</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Negotiating">🟠 Negotiating</option>
                              <option value="Quoted">🟡 Quoted</option>
                              <option value="Converted">🟢 Converted</option>
                              <option value="Archived">⚪ Archived</option>
                            </select>
                          </td>
                          <td className="p-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              disabled={actionLoading === lead.id}
                              className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-md cursor-pointer transition-colors"
                              title="Delete Lead Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
