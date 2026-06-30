import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, User, ArrowLeft, Search, Plus, Edit, Trash2, 
  Settings, Key, Lock, CheckCircle2, X, Sparkles, Tag, ChevronRight, Send, AlertCircle
} from "lucide-react";
import { BlogPost } from "../types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Navigation states inside Blog
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // CMS Authentication states
  const [cmsMode, setCmsMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  
  // CMS Form states
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Eco Products");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formCover, setFormCover] = useState("bg-gradient-to-r from-emerald-800 to-teal-700");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Fetch blogs
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to load blog posts.");
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // Check if token already exists in localStorage to keep session active
    const savedToken = localStorage.getItem("yalini_admin_token");
    if (savedToken === "yaliniadmin2026") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // Handle Admin Auth
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (adminPassword === "yaliniadmin2026") {
      setIsAdminAuthenticated(true);
      localStorage.setItem("yalini_admin_token", "yaliniadmin2026");
      setAdminPassword("");
    } else {
      setAuthError("Invalid administrative password credentials.");
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("yalini_admin_token");
    setCmsMode(false);
  };

  // Open Form for Create
  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormCategory("Eco Products");
    setFormExcerpt("");
    setFormContent("");
    setFormTags("");
    setFormCover("bg-gradient-to-r from-emerald-800 to-teal-700");
    setFormError("");
    setFormSuccess(false);
    setShowFormModal(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormTags(post.tags.join(", "));
    setFormCover(post.coverImage);
    setFormError("");
    setFormSuccess(false);
    setShowFormModal(true);
  };

  // Submit CMS Form (Create / Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSaving(true);

    const payload = {
      title: formTitle,
      category: formCategory,
      excerpt: formExcerpt,
      content: formContent,
      coverImage: formCover,
      tags: formTags.split(",").map(t => t.trim()).filter(Boolean)
    };

    try {
      const url = editingPost ? `/api/posts/${editingPost.id}` : "/api/posts";
      const method = editingPost ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "yaliniadmin2026"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save blog post.");

      setFormSuccess(true);
      setTimeout(() => {
        setShowFormModal(false);
        fetchPosts();
      }, 1000);
    } catch (err: any) {
      setFormError(err.message || "An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Are you absolutely sure you want to delete this blog post? This action is irreversible.")) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": "yaliniadmin2026"
        }
      });
      if (!res.ok) throw new Error("Failed to delete blog post.");
      fetchPosts();
      if (activePost && activePost.id === id) {
        setActivePost(null);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  // Filtering list
  const categoriesList = ["All", "Eco Products", "Logistics", "Groceries & FMCG", "Sourcing"];

  const filteredPosts = posts.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-grow bg-slate-50 min-h-screen">
      {/* Blog Hero Banner */}
      {!activePost && !cmsMode && (
        <div className="relative bg-brand-dark py-16 overflow-hidden border-b-4 border-brand-green-light">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/50 via-brand-dark to-brand-dark"></div>
          <div className="absolute -right-16 -top-16 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light/10 text-brand-green-light rounded-full text-xs font-bold uppercase tracking-wider border border-brand-green-light/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sourcing Insights & Updates</span>
                </div>
                <h1 className="text-4xl font-bold font-display text-white">Yalini Trade Digest</h1>
                <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                  Export-import intelligence, biopolymer container specs, BASMATI grains standards, and Chennai sea freight lane updates.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCmsMode(true)}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>CMS Owner Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Main Blog List View */}
      {!activePost && !cmsMode && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input 
                type="text"
                placeholder="Search articles, cargo specifications, regulatory parameters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 shadow-3xs rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-hidden focus:border-brand-green transition-all"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? "bg-brand-green text-white shadow-xs" 
                      : "bg-white text-gray-600 border border-gray-200/80 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading, Error and Grid */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-brand-green rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Syncing database feed...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl max-w-md mx-auto text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <h4 className="text-sm font-bold text-brand-dark">Failed to Sync Trade Digest</h4>
              <p className="text-xs text-gray-500">{error}</p>
              <button onClick={fetchPosts} className="bg-brand-green text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-brand-green-light">
                Retry Connection
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white border border-gray-200/70 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col h-full"
                >
                  {/* Styled Background Header */}
                  <div className={`h-44 ${post.coverImage} relative overflow-hidden flex items-center justify-center p-6 text-center`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] uppercase font-bold text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white relative z-10 leading-tight tracking-tight drop-shadow-xs px-2 line-clamp-3">
                      {post.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between text-left space-y-4">
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-gray-150">
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold uppercase">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Author & Button */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-green/10 text-brand-green font-bold text-[11px] flex items-center justify-center border border-brand-green/20">
                            {post.author.avatar}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-brand-dark block leading-none">{post.author.name}</span>
                            <span className="text-[9px] text-gray-400 block leading-none mt-0.5">{post.author.role}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setActivePost(post);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="bg-brand-green/5 text-brand-green hover:bg-brand-green hover:text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 group-hover:translate-x-0.5"
                        >
                          <span>Read</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200/60 rounded-2xl p-16 text-center space-y-3 max-w-md mx-auto">
              <span className="text-gray-300 text-4xl block">📰</span>
              <h4 className="text-sm font-bold text-brand-dark">No Articles Match Your Criteria</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                We couldn't locate any trade digests matching "<strong>{searchQuery}</strong>". Reset your keywords or filter parameters.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }} 
                className="bg-brand-green text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer hover:bg-brand-green-light"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Blog Post Immersive Reader View */}
      {activePost && !cmsMode && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Back Controls */}
          <button
            onClick={() => {
              setActivePost(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-green transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Trade Digest Feed</span>
          </button>

          {/* Article Header Card */}
          <header className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs mb-8 text-left">
            <div className={`p-8 sm:p-12 ${activePost.coverImage} text-white relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] uppercase font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {activePost.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight tracking-tight">
                  {activePost.title}
                </h1>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-gray-200 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-green-light" />
                    <span>Written by {activePost.author.name} ({activePost.author.role})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-green-light" />
                    <span>{new Date(activePost.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-green-light" />
                    <span>{activePost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Main reading content */}
            <div className="lg:col-span-8 bg-white border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-3xs prose max-w-none">
              <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
                {activePost.content.split("\n\n").map((para, i) => {
                  // Basic Markdown detection
                  if (para.startsWith("### ")) {
                    return <h3 key={i} className="text-base font-bold text-brand-dark pt-3 font-display">{para.replace("### ", "")}</h3>;
                  }
                  if (para.startsWith("## ")) {
                    return <h2 key={i} className="text-lg font-bold text-brand-dark pt-4 border-b border-gray-150 pb-1 font-display">{para.replace("## ", "")}</h2>;
                  }
                  if (para.startsWith("* ") || para.startsWith("- ")) {
                    const items = para.split("\n");
                    return (
                      <ul key={i} className="list-disc list-inside pl-4 space-y-1 text-xs text-gray-600">
                        {items.map((it, idx) => (
                          <li key={idx}>{it.replace(/^[*-\s]+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.match(/^\d+\.\s/)) {
                    const items = para.split("\n");
                    return (
                      <ol key={i} className="list-decimal list-inside pl-4 space-y-1 text-xs text-gray-600">
                        {items.map((it, idx) => (
                          <li key={idx}>{it.replace(/^\d+\.\s+/, "")}</li>
                        ))}
                      </ol>
                    );
                  }
                  
                  // Text formatting with bold marks **text**
                  const formatText = (text: string) => {
                    const parts = text.split(/\*\*([^*]+)\*\*/g);
                    return parts.map((part, index) => {
                      if (index % 2 === 1) {
                        return <strong key={index} className="text-brand-dark font-extrabold">{part}</strong>;
                      }
                      return part;
                    });
                  };

                  return <p key={i} className="leading-relaxed">{formatText(para)}</p>;
                })}
              </div>

              {/* Tags row */}
              <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-150 mt-8">
                {activePost.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-gray-500 font-bold bg-slate-100 border border-gray-200 px-2.5 py-1 rounded-md">
                    <Tag className="w-3 h-3 text-brand-green" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar B2B CTA panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-br from-brand-dark to-slate-900 text-white rounded-2xl p-6 border border-emerald-800/10 shadow-lg text-left">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-brand-green-light block mb-2">Trade Opportunity</h4>
                <h3 className="text-sm font-bold font-display leading-tight text-white mb-2">Interested in Sourcing these products?</h3>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  Yalini Exim operates direct logistics corridors out of India to major ports worldwide. We manage quality audits, custom certifications, and container packing.
                </p>

                <button
                  onClick={() => {
                    const element = document.getElementById("quote-assistant");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Export RFQ</span>
                </button>
              </div>

              {/* Director Card */}
              <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-3xs flex gap-3.5 text-left">
                <div className="w-10 h-10 bg-brand-green text-white font-black rounded-full flex items-center justify-center shadow-xs border border-brand-green-light">
                  P
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-dark">Direct Consultation</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">Contact Mr. Prabhu directly for private-labeling tolerances.</p>
                  <a href="tel:+919944823311" className="text-xs font-bold text-brand-green block mt-1 hover:underline">
                    +91 99448 23311
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Blog CMS Management Dashboard View */}
      {cmsMode && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCmsMode(false)}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-brand-dark cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="text-left">
                <h1 className="text-2xl font-bold font-display text-brand-dark">Trade Digest CMS Portal</h1>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Content Management & Distribution</p>
              </div>
            </div>

            {/* Logout & Create New row */}
            {isAdminAuthenticated && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="bg-slate-100 hover:bg-slate-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Log out
                </button>
                <button
                  onClick={handleOpenCreate}
                  className="bg-brand-green hover:bg-brand-green-light text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-emerald-950/10 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Post</span>
                </button>
              </div>
            )}
          </div>

          {/* If NOT authenticated, show simple password prompt */}
          {!isAdminAuthenticated ? (
            <div className="max-w-md mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100 text-brand-green">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-dark">Enter Owner Password</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">Authenticate using your Yalini corporate credential.</p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <input 
                  type="password"
                  placeholder="Owner Admin Password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2.5 text-xs text-center focus:outline-hidden focus:border-brand-green transition-all focus:bg-white"
                />

                {authError && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg">{authError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow-sm cursor-pointer transition-all"
                >
                  Authenticate CMS Channel
                </button>
              </form>
            </div>
          ) : (
            /* CMS Table listing all posts */
            <div className="bg-white border border-gray-200/60 rounded-2xl shadow-2xs overflow-hidden text-left">
              <div className="p-4 sm:p-6 bg-slate-50/50 border-b border-gray-150 flex items-center justify-between">
                <h3 className="text-sm font-bold text-brand-dark">Published Press Releases & Guides ({posts.length})</h3>
                <span className="text-[10px] bg-brand-green/10 text-brand-green px-2.5 py-0.5 rounded-full font-bold uppercase">Online Database Connection</span>
              </div>

              {posts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-gray-400 uppercase font-bold border-b border-gray-150">
                        <th className="px-6 py-3.5">Title</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Published Date</th>
                        <th className="px-6 py-3.5">Read Time</th>
                        <th className="px-6 py-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 text-brand-dark font-medium">
                      {posts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4">
                            <div className="max-w-xs sm:max-w-md">
                              <span className="font-bold text-brand-dark block truncate">{p.title}</span>
                              <span className="text-[10px] text-gray-400 block truncate mt-0.5">{p.excerpt}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-md text-[10px] font-bold">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(p.publishedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {p.readTime}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="p-1.5 rounded-md text-slate-500 hover:text-brand-green hover:bg-emerald-50 transition-colors cursor-pointer"
                                title="Edit Article"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(p.id)}
                                className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Article"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center text-gray-400">
                  <p className="text-sm font-semibold">No published articles in database.</p>
                  <p className="text-xs mt-1">Click "Create New Post" to distribute your first trade advisory.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Full CMS Post Form Modal (Create / Update) */}
      {showFormModal && (
        <div className="fixed inset-0 bg-brand-dark/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-150 bg-slate-50 flex items-center justify-between text-left">
              <div>
                <h3 className="text-base font-bold text-brand-dark">
                  {editingPost ? "Modify Existing Trade Advisory" : "Publish New B2B Trade Advisory"}
                </h3>
                <p className="text-[11px] text-gray-400">Distribute industry guides and specifications instantly.</p>
              </div>
              <button 
                onClick={() => setShowFormModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            {formSuccess ? (
              <div className="flex-grow flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-brand-dark">Advisory Database Synced!</h4>
                <p className="text-xs text-gray-500">Your article changes are now live and distributed globally.</p>
              </div>
            ) : (
              <form onSubmit={handleSavePost} className="flex-grow overflow-y-auto p-6 space-y-4 text-left">
                
                {/* Title */}
                <div>
                  <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider mb-1">Article Title *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Sourcing Basmati Rice: Meeting European Pesticide & Traceability Regulations"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green focus:bg-white transition-all"
                  />
                </div>

                {/* Grid Category & Cover preset */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider mb-1">Category Sourcing Corridor *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green focus:bg-white cursor-pointer transition-all"
                    >
                      <option value="Eco Products">Eco Products</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Groceries & FMCG">Groceries & FMCG</option>
                      <option value="Sourcing">Sourcing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider mb-1">Visual Cover Palette *</label>
                    <select
                      value={formCover}
                      onChange={(e) => setFormCover(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green focus:bg-white cursor-pointer transition-all"
                    >
                      <option value="bg-gradient-to-r from-emerald-800 to-teal-700">Emerald Forest Preset (Eco Products)</option>
                      <option value="bg-gradient-to-r from-cyan-800 to-indigo-800">Maritime Indigo Preset (Logistics)</option>
                      <option value="bg-gradient-to-r from-amber-800 to-orange-700">Autumn Spice Preset (Groceries / FMCG)</option>
                      <option value="bg-gradient-to-r from-slate-800 to-slate-900">Charcoal Sourcing Preset (Granite & Marbles)</option>
                    </select>
                  </div>
                </div>

                {/* Tags & Excerpt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider mb-1">Meta Tags (comma separated)</label>
                    <input 
                      type="text"
                      placeholder="e.g. Basmati, Grains, FSSAI, Sourcing"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider mb-1">Brief Summary Excerpt</label>
                    <input 
                      type="text"
                      placeholder="A short 1-2 sentence description summarizing the article."
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 rounded-lg px-3.5 py-2 text-xs text-brand-dark focus:outline-hidden focus:border-brand-green focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Content body (Markdown supported) */}
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">Article Content Body (Markdown & Plain text supported) *</label>
                    <span className="text-[9px] text-gray-400 font-bold">Use ## for Headings, * for lists, ** for Bold text.</span>
                  </div>
                  <textarea 
                    required
                    rows={12}
                    placeholder="Provide your high-fidelity trade advisory here..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-250 rounded-lg p-3.5 text-xs text-brand-dark font-sans focus:outline-hidden focus:border-brand-green focus:bg-white resize-none"
                  ></textarea>
                </div>

                {formError && (
                  <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg">{formError}</p>
                )}

                {/* Modal footer actions */}
                <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-gray-600 px-4 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-brand-green hover:bg-brand-green-light text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md cursor-pointer transition-all disabled:opacity-60"
                  >
                    {isSaving ? "Publishing to Server..." : (editingPost ? "Update Live Advisory" : "Publish live Advisory")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
