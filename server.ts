import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Ensure data folder and files exist
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

const POSTS_FILE = path.join(DATA_DIR, "posts.json");

// Default seed blog posts
const DEFAULT_POSTS = [
  {
    id: "post-1",
    title: "The Global Shift to Biodegradable Tableware: Why Sugarcane Bagasse Leads",
    slug: "global-shift-biodegradable-sugarcane-bagasse",
    excerpt: "With plastic bans intensifying in Europe and North America, sugarcane bagasse is rapidly becoming the gold standard for eco-friendly B2B dining ware.",
    content: "### The Environmental Imperative\n\nGlobal single-use plastic regulations have reached a tipping point. Nations across the UK, Europe, Canada, and Singapore have enacted strict bans on single-use plastics, forcing food service operators, restaurant franchises, and hotel chains to search for sustainable alternatives that do not compromise on quality.\n\nEnter **sugarcane bagasse**—a 100% natural, fibrous byproduct of sugarcane juice extraction. Historically discarded or burned, bagasse is now the cornerstone of premium circular dining ware.\n\n### Why Bagasse Outperforms Other Eco-Materials\n\nUnlike paper (which requires cutting trees and adding chemical linings) or bioplastics (which require high industrial composting heat), sugarcane bagasse offers superb natural performance:\n\n1. **Thermal Resilience**: Bagasse products withstand temperatures from **-20°C to 120°C**. They are completely microwave and freezer safe.\n2. **Oil & Water Resistance**: Naturally dense fibers prevent liquid absorption, allowing them to hold greasy gravies, hot soups, and oily retail items for hours without sogginess.\n3. **100% Compostable**: Bagasse dining ware completely breaks down in standard soil within **60 to 90 days**, enriching the earth with organic compost without leaving plastic micro-particles.\n\n### Sourcing High-Quality Bagasse from India\n\nIndia is one of the world's largest sugarcane producers, making it a powerful global manufacturing hub for bagasse tableware. By sourcing from **Yalini Exim**, international buyers access:\n\n* **Certified Bio-Based Quality**: Products certified with global environmental standards.\n* **Optimized Containerization**: Palletized container loading out of Chennai Port, ensuring maximum cargo density and low freight overhead.\n* **Bespoke Custom Print / OEM**: Embossed restaurant brand logos and custom shape configurations for wholesale distributors.",
    coverImage: "bg-gradient-to-r from-emerald-800 to-teal-700",
    category: "Eco Products",
    author: {
      name: "Prabhu",
      role: "Director of Global Trade",
      avatar: "P"
    },
    tags: ["Sustainability", "Eco Friendly", "Sugarcane Bagasse", "B2B Sourcing"],
    publishedAt: "2026-06-15T10:00:00Z",
    readTime: "5 min read"
  },
  {
    id: "post-2",
    "title": "FOB vs CIF Navigated: Choosing the Right Incoterm for Container Shipping",
    "slug": "fob-vs-cif-incoterms-container-shipping",
    "excerpt": "Understanding the cost, risk, and logistical differences between Free on Board and Cost, Insurance & Freight for your next cargo shipment.",
    "content": "### Demystifying B2B Ocean Logistics\n\nFor international purchasers sourcing consumer goods, dining ware, or bulk stone products from India, selecting the correct **Incoterm** (International Commercial Terms) is just as critical as negotiating the unit price. It dictates who manages ocean carrier booking, who pays freight, and exactly where cargo risk transfers from exporter to importer.\n\nAt **Yalini Exim**, we primarily offer two industry-standard terms: **FOB (Free on Board)** and **CIF (Cost, Insurance & Freight)**. Let's break down the advantages of each to optimize your supply chain.\n\n---\n\n### 1. FOB Chennai Port (Free on Board)\n\nUnder FOB terms, the seller (Yalini Exim) is responsible for transporting the goods from our factories, handling Indian export customs, paying local port terminal fees, and loading the cargo onto the ocean vessel nominated by the buyer at **Chennai Port (INMAA)**.\n\n* **Risk Transfer**: Risk passes to you (the importer) the moment the containers clear the ship's rail in India.\n* **Best For**: Established buyers who maintain direct contracts with global shipping lines (e.g., Maersk, MSC, COSCO) or local customs brokers in their home country.\n* **Benefit**: Gives you total control over ocean routing, transit schedules, and competitive shipping rates.\n\n### 2. CIF Destination Port (Cost, Insurance & Freight)\n\nUnder CIF terms, Yalini Exim handles the entire logistics pipeline. We pay for transport to the port, manage Indian export clearance, book the ocean freight, secure maritime insurance, and deliver the cargo to your designated destination seaport (e.g., Port of London, Singapore, Vancouver).\n\n* **Risk Transfer**: While Yalini Exim pays for the shipping cost and insurance, the legal transfer of risk occurs once the cargo is loaded onto the vessel in India. The maritime insurance protects your financial interest during sea transit.\n* **Best For**: Small-to-medium enterprises, first-time buyers, or organizations that prefer a hassle-free, single-invoice solution covering ocean transit.\n* **Benefit**: Minimal administrative overhead. You only coordinate with your local destination agent once the vessel arrives.\n\n### Making the Decision\n\nIf you have a trusted freight forwarder, **FOB** typically delivers the lowest net cost and highest flexibility. If you prefer to let us leverage our tier-1 shipping alliances to arrange reliable, fully-insured delivery straight to your country's shores, select **CIF**. Our digital pre-quote assistant can outline estimated budgets for both options instantly!",
    "coverImage": "bg-gradient-to-r from-cyan-800 to-indigo-800",
    "category": "Logistics",
    "author": {
      "name": "Prabhu",
      "role": "Director of Global Trade",
      "avatar": "P"
    },
    "tags": ["Logistics", "Incoterms", "FOB", "CIF", "Ocean Freight"],
    "publishedAt": "2026-06-20T08:30:00Z",
    "readTime": "4 min read"
  },
  {
    "id": "post-3",
    "title": "Meeting Global Food Standards: A Guide for FMCG and Spice Importers",
    "slug": "global-food-standards-fmcg-spice-imports",
    "excerpt": "A deep dive into the regulatory compliance, certifications, and quality checks required to import Indian provisions and whole spices seamlessly.",
    "content": "### Sourcing Food Products Globally\n\nSourcing retail grocery provisions, whole spices, pulses, or traditional beverages from India offers international supermarkets and restaurant chains access to magnificent quality and high consumer demand. However, the international food trade is highly regulated, requiring meticulous adherence to import food safety parameters.\n\nAt **Yalini Exim**, we guarantee complete regulatory alignment, ensuring that every container of spices, basmati grains, or packaged FMCG goods lands in your warehouse without customs delays.\n\n### Core Regulatory Certifications in India\n\nTo export agricultural and processed food items from India, the following statutory bodies govern quality:\n\n1. **FSSAI (Food Safety and Standards Authority of India)**: Essential central licensing validating that food processing, packing, and warehousing systems meet strict sanitation and contamination benchmarks.\n2. **The Spice Board of India**: A statutory body that inspects, samples, and certifies whole spices and spice blends for chemical purity, pesticide residues, and aflatoxin limits prior to vessel boarding.\n3. **Phytosanitary Certification**: Governed by the Ministry of Agriculture, this certificate confirms that natural items like grains, whole spices, or seeds have been fumigated and are free from active pests.\n\n### Key Sourcing Safeguards\n\nWhen importing Indian grocery provisions, Yalini Exim handles the heavy lifting of compliance:\n\n* **Barcoding & Labeling Translation**: Destination laws in countries like Canada, the UK, and the UAE require clear ingredient lists, nutritional value tables, expiration declarations, and sometimes multi-language labels. We execute compliant over-labeling at our facilities.\n* **Aflatoxin & Heavy Metal Limits**: Spices like black pepper, chili, and turmeric are strictly monitored. Yalini Exim implements certified laboratory checks to verify safety.\n* **Container Fumigation**: Every wooden shipping pallet and agricultural container undergoes professional pest treatment, certified with compliant global standards.\n\nBy consolidating multiple retail SKUs into a single, perfectly cleared shipping container, we help wholesale distributors streamline their inventories while remaining compliant with domestic FDA, EFSA, or local health authorities.",
    "coverImage": "bg-gradient-to-r from-amber-800 to-orange-700",
    "category": "Groceries & FMCG",
    "author": {
      "name": "Prabhu",
      "role": "Director of Global Trade",
      "avatar": "P"
    },
    "tags": ["Compliance", "Food Safety", "Spice Board", "FMCG Export", "FSSAI"],
    "publishedAt": "2026-06-25T14:15:00Z",
    "readTime": "6 min read"
  }
];

if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(DEFAULT_POSTS, null, 2), "utf-8");
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  publishedAt: string;
  readTime: string;
}

function readPosts(): BlogPost[] {
  try {
    const data = fs.readFileSync(POSTS_FILE, "utf-8");
    return JSON.parse(data) as BlogPost[];
  } catch (error) {
    console.error("Error reading posts file, resetting to defaults:", error);
    return DEFAULT_POSTS;
  }
}

function writePosts(posts: BlogPost[]): void {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing posts file:", error);
  }
}


// Types for Leads
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
  leadSource: string; // 'direct', 'whatsapp', 'quote-assistant', 'catalog'
  status: 'New' | 'Contacted' | 'Negotiating' | 'Quoted' | 'Converted' | 'Archived';
  date: string;
}

// Utility to read leads
function readLeads(): Lead[] {
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data) as Lead[];
  } catch (error) {
    console.error("Error reading leads file, resetting to empty array:", error);
    return [];
  }
}

// Utility to write leads
function writeLeads(leads: Lead[]): void {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing leads file:", error);
  }
}

// API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API: Submit Lead
app.post("/api/leads", (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      country,
      email,
      whatsapp,
      productCategory,
      specificProduct,
      quantity,
      message,
      leadSource = "direct"
    } = req.body;

    if (!contactPerson || !email || !whatsapp || !country) {
      res.status(400).json({ error: "Missing required fields: contactPerson, email, whatsapp, and country are required." });
      return;
    }

    const leads = readLeads();
    const newLead: Lead = {
      id: "lead_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      companyName: companyName || "Individual / Not Specified",
      contactPerson,
      country,
      email,
      whatsapp,
      productCategory: productCategory || "General Inquiry",
      specificProduct: specificProduct || "General",
      quantity: quantity || "Not Specified",
      message: message || "",
      leadSource,
      status: "New",
      date: new Date().toISOString()
    };

    leads.push(newLead);
    writeLeads(leads);

    res.status(201).json({ success: true, lead: newLead });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to save lead" });
  }
});

// Simple Auth Middleware for Admin Routes
const ADMIN_TOKEN = "yaliniadmin2026";

function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token === ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access. Invalid or missing admin token." });
  }
}

// ==================== BLOG POSTS API ====================

// API: Get all blog posts (Public)
app.get("/api/posts", (req, res) => {
  try {
    const posts = readPosts();
    // Sort by publishedAt descending
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve blog posts" });
  }
});

// API: Get single blog post by slug or ID (Public)
app.get("/api/posts/:identifier", (req, res) => {
  try {
    const { identifier } = req.params;
    const posts = readPosts();
    const post = posts.find(p => p.id === identifier || p.slug === identifier);
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve blog post" });
  }
});

// API: Create a new blog post (Admin only)
app.post("/api/posts", authenticateAdmin, (req, res) => {
  try {
    const { title, content, excerpt, coverImage, category, tags = [] } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Title and Content are required." });
      return;
    }

    const posts = readPosts();
    
    // Generate a unique slug
    let slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    
    // Check if slug already exists
    let slugCount = 0;
    let finalSlug = slug;
    while (posts.some(p => p.slug === finalSlug)) {
      slugCount++;
      finalSlug = `${slug}-${slugCount}`;
    }

    const newPost: BlogPost = {
      id: "post_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      title,
      slug: finalSlug,
      excerpt: excerpt || content.substring(0, 150).replace(/[#*`_]/g, "") + "...",
      content,
      coverImage: coverImage || "bg-gradient-to-r from-emerald-800 to-teal-700",
      category: category || "Uncategorized",
      author: {
        name: "Prabhu",
        role: "Director of Global Trade",
        avatar: "P"
      },
      tags: Array.isArray(tags) ? tags : [tags],
      publishedAt: new Date().toISOString(),
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)) + " min read"
    };

    posts.push(newPost);
    writePosts(posts);

    res.status(201).json({ success: true, post: newPost });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create blog post" });
  }
});

// API: Update an existing blog post (Admin only)
app.put("/api/posts/:id", authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, coverImage, category, tags } = req.body;

    const posts = readPosts();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    const existing = posts[postIndex];
    
    // Calculate new slug if title changed
    let finalSlug = existing.slug;
    if (title && title !== existing.title) {
      let slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      
      let slugCount = 0;
      finalSlug = slug;
      while (posts.some((p, idx) => p.slug === finalSlug && idx !== postIndex)) {
        slugCount++;
        finalSlug = `${slug}-${slugCount}`;
      }
    }

    const updatedPost: BlogPost = {
      ...existing,
      title: title || existing.title,
      slug: finalSlug,
      content: content || existing.content,
      excerpt: excerpt !== undefined ? excerpt : (content ? (content.substring(0, 150).replace(/[#*`_]/g, "") + "...") : existing.excerpt),
      coverImage: coverImage || existing.coverImage,
      category: category || existing.category,
      tags: tags !== undefined ? (Array.isArray(tags) ? tags : [tags]) : existing.tags,
      readTime: content ? (Math.max(1, Math.ceil(content.split(/\s+/).length / 200)) + " min read") : existing.readTime
    };

    posts[postIndex] = updatedPost;
    writePosts(posts);

    res.json({ success: true, post: updatedPost });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update blog post" });
  }
});

// API: Delete a blog post (Admin only)
app.delete("/api/posts/:id", authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const posts = readPosts();
    const filtered = posts.filter(p => p.id !== id);

    if (posts.length === filtered.length) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    writePosts(filtered);
    res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete blog post" });
  }
});

// API: Get Leads (Admin only)
app.get("/api/leads", authenticateAdmin, (req, res) => {
  try {
    const leads = readLeads();
    // Sort by date descending
    leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve leads" });
  }
});

// API: Update Lead Status (Admin only)
app.put("/api/leads/:id/status", authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["New", "Contacted", "Negotiating", "Quoted", "Converted", "Archived"];
    if (!allowedStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }

    const leads = readLeads();
    const leadIndex = leads.findIndex(l => l.id === id);

    if (leadIndex === -1) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }

    leads[leadIndex].status = status;
    writeLeads(leads);

    res.json({ success: true, lead: leads[leadIndex] });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update status" });
  }
});

// API: Delete Lead (Admin only)
app.delete("/api/leads/:id", authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const leads = readLeads();
    const filteredLeads = leads.filter(l => l.id !== id);

    if (leads.length === filteredLeads.length) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }

    writeLeads(filteredLeads);
    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete lead" });
  }
});

// API: Export Leads as CSV (Admin only)
app.get("/api/leads/export", authenticateAdmin, (req, res) => {
  try {
    const leads = readLeads();
    leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const headers = [
      "ID",
      "Date",
      "Company Name",
      "Contact Person",
      "Country",
      "Email",
      "WhatsApp/Phone",
      "Product Category",
      "Specific Product",
      "Quantity",
      "Status",
      "Lead Source",
      "Message"
    ];

    const rows = leads.map(l => [
      l.id,
      new Date(l.date).toLocaleString(),
      `"${(l.companyName || "").replace(/"/g, '""')}"`,
      `"${(l.contactPerson || "").replace(/"/g, '""')}"`,
      `"${(l.country || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.whatsapp || "").replace(/"/g, '""')}"`,
      `"${(l.productCategory || "").replace(/"/g, '""')}"`,
      `"${(l.specificProduct || "").replace(/"/g, '""')}"`,
      `"${(l.quantity || "").replace(/"/g, '""')}"`,
      l.status,
      l.leadSource,
      `"${(l.message || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=yalini_exim_leads_${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to export CSV" });
  }
});

// API: B2B Quote Assistant powered by Gemini API
app.post("/api/quote-assistant", async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      country,
      productCategory,
      specificProduct,
      quantity,
      message,
    } = req.body;

    if (!contactPerson || !country || !productCategory || !specificProduct) {
      res.status(400).json({ error: "Missing required details. Contact Person, Country, Category and Specific Product are required." });
      return;
    }

    // Lazy initialization of Gemini client
    let ai;
    try {
      ai = getGeminiClient();
    } catch (e: any) {
      // Return beautiful fallback if Gemini API is not configured yet
      res.json({
        fallback: true,
        summary: `Export Consultation Request Received for ${specificProduct} to ${country}. Our sales director, Mr. Prabhu, will prepare the FOB/CIF pricing options, custom packing solutions, and documentation drafts within 12 hours.`,
        details: {
          shippingPort: "Chennai Port (MAA/MAA1), India",
          suggestedIncoterm: "FOB Chennai (Incoterms 2020) or CIF Destination Port",
          estimatedMoq: "Generally 1x20ft FCL container. LCL option can be negotiated for first trials.",
          documentationRequired: [
            "IEC (Importer Exporter Code)",
            "Commercial Invoice & Packing List",
            "Certificate of Origin",
            "FSSAI / Spice Board Certification (as applicable for groceries/spices)",
            "Bill of Lading",
            "Phytosanitary Certificate (for natural/agro items)"
          ],
          hsCodeRecommendation: "Standard Chapter classification depending on specific item specification."
        }
      });
      return;
    }

    const prompt = `You are the lead Export Trade Consultant for Yalini Exim, an elite Indian B2B Exporter established in 2023. 
A prospective international buyer has submitted an inquiry. Generate a professional B2B export pre-quote proposal and consultation outline based on their request.

BUYER INQUIRY DETAILS:
- Company Name: ${companyName || "Not Specified / Individual Buy"}
- Contact Person: ${contactPerson}
- Destination Country: ${country}
- Product Category Interest: ${productCategory}
- Specific Product of Interest: ${specificProduct}
- Requested Quantity: ${quantity || "Not Specified / Standard B2B Evaluation"}
- Customer Message: ${message || "No specific details provided."}

Please generate a highly structured JSON response outlining:
1. "summary": A personalized, warm B2B greeting and consultation summary addressing their exact product and country context. Mention how Yalini Exim serves this corridor with robust shipping and customized OEM/Private Labeling.
2. "suggestedIncoterm": Recommended Incoterms (e.g., FOB Chennai, CIF destination, etc.) and brief reasoning.
3. "shippingPort": Indian export seaport or airport of origin (e.g., Chennai Port (INMAA) is primary for Yalini Exim, Tuticorin/Karaikal can also be origin ports in Tamil Nadu).
4. "hsCodeRecommendation": Likely HS code (Harmonized System) category (6-digit) and a short definition.
5. "estimatedMoq": MOQ guidelines for this category of export to ${country} to make logistics cost-effective.
6. "documentationRequired": List of key trade documents needed for exporting this specific product from India to ${country} (including government boards like Spice Board for spices, Coffee Board for coffee, FSSAI for food, APEDA, RCMC, FIEO as appropriate).
7. "customsPackagingSuggestions": Standard packaging specs for this product to prevent damage during sea transport (e.g., multi-wall bags, shrink-wrapped pallets, corrugated food-grade cartons, crate packing for granites/marbles).

Return ONLY a valid JSON object matching the following TypeScript structure (without any markdown code fences if possible, or standard JSON text):
{
  "summary": string,
  "suggestedIncoterm": string,
  "shippingPort": string,
  "hsCodeRecommendation": string,
  "estimatedMoq": string,
  "documentationRequired": string[],
  "customsPackagingSuggestions": string
}`;

    // Query Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const textResponse = response.text || "";
    try {
      const jsonResult = JSON.parse(textResponse.trim());
      res.json(jsonResult);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", textResponse);
      // Fallback response inside JSON
      res.json({
        summary: `Thank you, ${contactPerson}. We have received your request for ${specificProduct}. Yalini Exim will analyze the shipping lane to ${country} and draft a competitive commercial quote.`,
        suggestedIncoterm: "FOB Chennai Port or CIF Nearest Port",
        shippingPort: "Chennai Sea Port (INMAA)",
        hsCodeRecommendation: "Standard Indian Export Customs schedule item classification.",
        estimatedMoq: "1 x 20 Ft Container (FCL) recommended for cost efficiency.",
        documentationRequired: [
          "IEC (Importer Exporter Code)",
          "SGS Inspection / Certificate of Quality",
          "Certificate of Origin",
          "Customs Invoice & Packing List"
        ],
        customsPackagingSuggestions: "Export-grade seaworthy containerized pallet packaging."
      });
    }
  } catch (error: any) {
    console.error("Error in quote-assistant endpoint:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI consultation" });
  }
});

// Start server
async function run() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

run();
