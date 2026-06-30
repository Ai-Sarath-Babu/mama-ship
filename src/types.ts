export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: {
    material: string;
    sizes: string[];
    packaging: string;
    moq: string;
    hsCode: string;
    originPort: string;
  };
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imagePlaceholder: string; // Describes visual design for tailwind placeholder rendering
  keywords: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string;
  displayId: string;
  badgeType: 'green' | 'gold' | 'blue';
}

export interface Lead {
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
  status: 'New' | 'Contacted' | 'Negotiating' | 'Quoted' | 'Converted' | 'Archived';
  date: string;
  leadSource: string;
}

export const PRODUCT_CATEGORIES: Category[] = [
  {
    id: "biodegradable",
    name: "Bio Degradable Dining Ware",
    description: "Premium eco-friendly tableware crafted from 100% organic sugarcane bagasse. Durable, hot/cold resistant, and fully compostable.",
    imagePlaceholder: "bg-gradient-to-br from-emerald-900 via-emerald-850 to-green-800 text-white",
    keywords: [
      "biodegradable dining ware exporter",
      "sugarcane bagasse products exporter",
      "sugarcane bagasse plates supplier",
      "compostable tableware exporter",
      "eco friendly dining products exporter",
      "biodegradable food containers supplier",
      "sustainable packaging exporter"
    ]
  },
  {
    id: "cornstarch",
    name: "Corn Starch Dining Ware",
    description: "Bio-based eco tableware and containers manufactured using renewable corn starch materials. High density and heat tolerant.",
    imagePlaceholder: "bg-gradient-to-br from-green-900 via-emerald-900 to-green-700 text-white",
    keywords: [
      "corn starch dining ware exporter",
      "corn starch plates supplier",
      "biodegradable corn starch products",
      "compostable corn starch tableware",
      "eco friendly corn starch containers",
      "bioplastic food containers exporter"
    ]
  },
  {
    id: "plastic",
    name: "Plastic Food Containers",
    description: "Heavy-duty takeaway and meal prep packaging for restaurants and brands. Supports custom print, OEM branding, and microwave use.",
    imagePlaceholder: "bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white",
    keywords: [
      "plastic food container exporter",
      "custom printed food containers",
      "takeaway food packaging supplier",
      "restaurant packaging containers",
      "microwave food containers exporter"
    ]
  },
  {
    id: "fmcg",
    name: "FMCG Products",
    description: "Leading brands and essential consumer goods including personal care, household, packaged snacks, and daily necessities.",
    imagePlaceholder: "bg-gradient-to-br from-emerald-900 via-green-900 to-green-850 text-white",
    keywords: [
      "FMCG products exporter",
      "Indian FMCG exporter",
      "wholesale FMCG supplier",
      "private label FMCG products",
      "branded FMCG products exporter",
      "consumer goods exporter India"
    ]
  },
  {
    id: "grocery-supermarket",
    name: "Supermarket Grocery Items",
    description: "A-Grade Indian provisions, essential retail grocery supplies, grains, cooking oils, and condiments for international retail chains.",
    imagePlaceholder: "bg-gradient-to-br from-green-950 via-emerald-900 to-green-800 text-white",
    keywords: [
      "Indian grocery exporter",
      "Indian supermarket products exporter",
      "wholesale Indian grocery exporter",
      "Indian food products exporter",
      "bulk grocery supplier India"
    ]
  },
  {
    id: "grocery-restaurant",
    name: "Restaurant Grocery Supplies",
    description: "Bulk spices, whole grains, pulses, tea, filter coffee, and hotel condiments for wholesale restaurant supply chains.",
    imagePlaceholder: "bg-gradient-to-br from-emerald-900 via-emerald-950 to-green-900 text-white",
    keywords: [
      "restaurant grocery supplier",
      "wholesale grocery distributor",
      "Indian spices exporter",
      "wholesale spices supplier India",
      "Indian masala exporter",
      "Indian tea exporter",
      "South Indian coffee exporter"
    ]
  },
  {
    id: "crockeries",
    name: "Restaurant Dining Crockeries",
    description: "Professional hospitality tableware, fine ceramic plates, porcelain serving bowls, custom cutlery, and kitchen linens.",
    imagePlaceholder: "bg-gradient-to-br from-green-950 via-emerald-900 to-emerald-950 text-white",
    keywords: [
      "restaurant dining ware",
      "hotel tableware",
      "hospitality crockeries",
      "ceramic plates exporter",
      "porcelain bowls supplier",
      "hotel tableware supply"
    ]
  },
  {
    id: "granites",
    name: "Indian Granite Export",
    description: "First-choice Indian structural and architectural granite slabs, tiles, monument granites, Ruby Red, and Black Galaxy.",
    imagePlaceholder: "bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-900 text-white",
    keywords: [
      "Indian granite exporter",
      "granite slabs exporter",
      "granite tiles exporter",
      "black granite supplier India",
      "monument granite exporter",
      "Ruby Red granite supplier"
    ]
  },
  {
    id: "marbles",
    name: "Indian Marble Export",
    description: "Finest quality Indian white marble slabs, tiles, imported decorative stones, and craft sculptures direct from quarries.",
    imagePlaceholder: "bg-gradient-to-br from-green-900 via-emerald-900 to-green-950 text-white",
    keywords: [
      "marble exporter India",
      "Indian marble supplier",
      "marble slabs exporter",
      "marble tiles supplier",
      "wholesale marble exporter"
    ]
  }
];

export const PRODUCTS: Product[] = [
  // 1. Bio Degradable Dining Ware
  {
    id: "bio-bagasse-plates",
    name: "Sugarcane Bagasse Plates",
    category: "biodegradable",
    description: "100% compostable plates made from sugarcane dry fiber. Highly robust, oil-proof, microwave and freezer safe. Elegant natural white texture.",
    specifications: {
      material: "Organic Sugarcane Bagasse Fiber (Plant-based)",
      sizes: ["6 Inch (Dessert/Appetizer)", "7 Inch", "9 Inch (Lunch)", "10 Inch (Dinner)", "3-Compartment / 4-Compartment Plates"],
      packaging: "50 pcs shrink-wrapped in PE, 500 pcs/carton or custom B2B bulk retail boxes",
      moq: "50,000 Pieces",
      hsCode: "48237010 (Moulded paper/pulp tableware)",
      originPort: "Chennai Port (INMAA) / Tuticorin Port (INTUT)"
    },
    features: ["100% Biodegradable & Home Compostable in 90 Days", "Handles temperatures up to 120°C (Hot Oil) & 95°C (Water)", "No chemical coatings, toxins, or heavy metals", "Sturdy structure, won't buckle under heavy food weight"]
  },
  {
    id: "bio-bagasse-bowls",
    name: "Sugarcane Bagasse Bowls",
    category: "biodegradable",
    description: "Premium natural compostable bowls perfect for soups, desserts, salads, and hot gravy dishes. Liquid resistant design.",
    specifications: {
      material: "Sugarcane Bagasse Pulp",
      sizes: ["180ml (6 oz)", "250ml (8 oz)", "350ml (12 oz)", "500ml (16 oz)", "750ml (24 oz)"],
      packaging: "100 pcs/pack, 1000 pcs per master export carton",
      moq: "100,000 Pieces",
      hsCode: "48237010",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["Oil-resistant and liquid tight leakproof design", "Microwaveable (up to 2 mins) and freezer safe", "FSSAI & FDA approved food grade material"]
  },
  {
    id: "bio-bagasse-cups-containers",
    name: "Sugarcane Containers & Cups",
    category: "biodegradable",
    description: "Eco clamshell take-out containers and hot cups with tight sealing bio-lids, ideal for eco-conscious cafes and restaurants.",
    specifications: {
      material: "Premium Sugarcane Pulp & PLA Lining",
      sizes: ["8 oz / 12 oz Hot Cups", "450ml Clamshell Box", "600ml Clamshell", "1000ml Compartment Box"],
      packaging: "Cartons of 250 - 500 Pieces with premium export moisture protection",
      moq: "30,000 Pieces",
      hsCode: "48236900",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["Secure locking tabs to prevent transit spillage", "Excellent thermal insulation for hot/cold beverages", "Ideal for high-volume quick service restaurants (QSR)"]
  },
  
  // 2. Corn Starch Dining Ware
  {
    id: "cornstarch-plates",
    name: "Corn Starch Plates & Bowls",
    category: "cornstarch",
    description: "Bioplastic eco tableware made from Corn Starch (PLA). Sturdier than traditional paper plates, translucent matte finish, outstanding modern look.",
    specifications: {
      material: "Corn Starch Resin (70% Corn Starch, 30% PP compound for flexibility)",
      sizes: ["7 Inch Plates", "9 Inch Plates", "250ml Bowls", "400ml Bowls"],
      packaging: "50 pcs per inner pack, 1000 pcs per master carton",
      moq: "100,000 Pieces",
      hsCode: "39241090 (Plastic tableware - eco modified)",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["Reduces carbon footprint by over 60% compared to fossil plastics", "Starch-based composition naturally decomposes in industrial facilities", "Waterproof and oil-proof without chemical treatment", "Available in natural corn ivory color or custom pastel tones"]
  },
  {
    id: "cornstarch-containers",
    name: "Corn Starch Food Packaging Boxes",
    category: "cornstarch",
    description: "Highly structural, multi-compartment food boxes, containers, and eco-friendly cutlery kits for modern catering delivery.",
    specifications: {
      material: "Natural Corn Starch Extract (PLA Composite)",
      sizes: ["3-Compartment Bento Box", "Single Compartment 750ml Box", "Heavy-duty forks, knives, spoons"],
      packaging: "Inner polybag with double corrugated export carton packaging",
      moq: "50,000 Pieces",
      hsCode: "39241090",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["Exceptional structural rigidity for safe stackable transport", "Non-toxic, chemical-free raw material profile", "Custom branded embossing option available"]
  },

  // 3. Plastic Food Containers
  {
    id: "plastic-takeaway-containers",
    name: "Microwaveable Takeaway Containers (PP/PET)",
    category: "plastic",
    description: "Premium grade, BPA-free plastic food delivery boxes. Superb crystal clarity for PET and high heat resistance for PP. Ideal for custom printing.",
    specifications: {
      material: "Food Grade PP (Polypropylene) or PET (Polyethylene Terephthalate)",
      sizes: ["500ml Rectangular", "650ml Rectangular", "750ml Rectangular", "1000ml Rectangular", "Round Containers (250ml, 500ml)"],
      packaging: "300 to 500 Sets (Container + Matching Leakproof Lid) per carton",
      moq: "50,000 Sets (Supports custom OEM orders)",
      hsCode: "39241010 (Insulated ware/plastic containers)",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["100% Spill-proof and leakproof snap-on lid closure", "Microwave friendly (PP only) and dishwasher-safe", "Custom high-precision screen printing or offset printing for logos", "Reinforced ribs on outer wall for safe stacking up to 5 tiers"]
  },

  // 4. FMCG Products
  {
    id: "fmcg-branded-goods",
    name: "Branded Packaged Foods & Essentials",
    category: "fmcg",
    description: "Consolidated international wholesale supply of India's leading FMCG brand products. Branded snacks, household essentials, cosmetics, and body care.",
    specifications: {
      material: "Genuine Branded consumer goods direct from authorized factory chains",
      sizes: ["Assorted SKU packing as per client requirements", "20ft and 40ft mixed containers", "Standard commercial retail cases"],
      packaging: "Custom palletization, shrink-wrapped and security locked for export",
      moq: "Mixed container volume with a minimum invoice value of USD 10,000",
      hsCode: "21069099 (Food preparations, assorted)",
      originPort: "Chennai Port (INMAA) / Mumbai Port (INBOM)"
    },
    features: ["One-stop consolidation of multiple premium brands in a single shipping container", "Fresh product inventory sourced directly with maximum expiry shelf life", "Documentation compliance for labelling (multilingual labels) as per importing country"]
  },

  // 5. Supermarket Grocery Items
  {
    id: "supermarket-rice",
    name: "Premium Basmati & Non-Basmati Rice",
    category: "grocery-supermarket",
    description: "Exquisite long grain Traditional Basmati, 1121 Sella, Ponni, and Sona Masoori rice. Carefully aged, polished, and moisture-monitored.",
    specifications: {
      material: "A-Grade Indian Agricultural Paddy (Rice)",
      sizes: ["1 kg Retail Pouches", "5 kg Bags", "10 kg Bags", "20 kg / 25 kg Jute or Non-Woven PP Bags"],
      packaging: "High density food-grade laminated pouches, jute sacks with inner lining",
      moq: "1 x 20ft Container (approx 20-24 Metric Tons)",
      hsCode: "10063020 (Basmati Rice) / 10063090 (Other Non-Basmati Rice)",
      originPort: "Chennai Port (INMAA) / Tuticorin Port (INTUT)"
    },
    features: ["Pristine elongation ratio up to 2.2x upon cooking", "Zero debris, zero stone, moisture controlled under 12%", "Comprehensive FSSAI, APEDA, and Phytosanitary certification"]
  },
  {
    id: "supermarket-grains-flour",
    name: "Grains, Lentils, Wheat Flour (Atta)",
    category: "grocery-supermarket",
    description: "Premium wholesale staples including Chakki Fresh Atta, high-protein Wheat, Red Lentils (Masoor Dal), Chickpeas (Kabuli Chana), and Toor Dal.",
    specifications: {
      material: "Sourced direct from organic and certified Indian cooperatives",
      sizes: ["500g, 1kg, 2kg packs, and 25kg bulk commercial sacks"],
      packaging: "Biaxially Oriented Polypropylene (BOPP) heavy-duty bags",
      moq: "12 Metric Tons",
      hsCode: "11010000 (Wheat Flour) / 07130000 (Dried Leguminous Vegetables)",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["Chakki-ground 100% whole wheat with zero additives or bleach", "Strict pesticide residue analysis (Eurofins certified or equivalent)", "Nutrient rich pulses with high protein profile and fast cooking time"]
  },

  // 6. Restaurant Grocery Supplies
  {
    id: "restaurant-spices-powders",
    name: "Premium Whole Spices & Indian Masalas",
    category: "grocery-restaurant",
    description: "Aromatic wholesale spices: Turmeric (high curcumin), Chilli (high ASTA color), Coriander, Cumin, Garam Masala, Sambar powder, and specific regional restaurant spice blends.",
    specifications: {
      material: "Handpicked premium spices processed by Spice Board certified facilities",
      sizes: ["100g Retail Box", "500g Catering Pouch", "1kg Catering Pouch", "25kg Bulk Kraft Paper Sacks"],
      packaging: "Double barrier moisture-proof aluminum foil laminated bags to lock aroma",
      moq: "3 Metric Tons (assorted spices)",
      hsCode: "09042211 (Chilli Powder) / 09103030 (Turmeric Powder) / 09083110 (Cardamom)",
      originPort: "Chennai Port (INMAA) / Cochin Port (INCOK)"
    },
    features: ["Spice Board of India export certification issued for every consignment", "Curcumin levels strictly verified, zero adulteration, zero artificial colors", "Custom custom blend formulations (OEM formulation) for hotel chains"]
  },
  {
    id: "restaurant-tea-coffee",
    name: "Assam Tea & South Indian Filter Coffee",
    category: "grocery-restaurant",
    description: "Strong premium CTC tea powder, Orthodox leaf tea, and roasted South Indian Chicory-blend Filter Coffee. Ideal for hospitality, diners, and bulk brewers.",
    specifications: {
      material: "Sourced directly from premium estates in Assam, Nilgiri, and Chikmagalur",
      sizes: ["500g Packs", "1kg Packs", "10kg / 20kg Bulk Catering Bags"],
      packaging: "Nitrogen flushed vacuum packing for ultimate shelf-freshness",
      moq: "2 Metric Tons",
      hsCode: "09024020 (CTC Tea) / 09012190 (Roasted Coffee Powder)",
      originPort: "Chennai Port (INMAA) / Cochin Port (INCOK)"
    },
    features: ["Rich full-bodied cup strength, gorgeous golden liquor", "Coffee Board of India certificate of grading & export compliance", "Customizable chicory blend ratios (e.g. 80:20, 70:30) as requested"]
  },

  // 7. Restaurant Dining Crockeries
  {
    id: "restaurant-crockeries-plates",
    name: "Fine Ceramic & Porcelain Tableware",
    category: "crockeries",
    description: "Superb commercial-grade porcelain plates, stackable serving bowls, cups, and custom tableware designed to withstand high-volume restaurant handling.",
    specifications: {
      material: "Super-vitrified Porcelain & Fine Bone China",
      sizes: ["9 Inch Flat Plates", "11 Inch Charger Plates", "Serving Bowls (15cm to 25cm)", "Espresso & Cappuccino Cup Sets"],
      packaging: "Each piece individually wrapped in protective foam, packed in heavy-duty grid cartons, fully palletized",
      moq: "5,000 Pieces",
      hsCode: "69111011 (Porcelain Tableware)",
      originPort: "Chennai Port (INMAA)"
    },
    features: ["Highly scratch resistant, glaze-strengthened surface", "Dishwasher, microwave, and salamander oven safe up to 300°C", "Thermal shock tested to prevent chipping or cracking in peak hours"]
  },

  // 8. Granite Export
  {
    id: "granite-slabs",
    name: "Indian Granite Slabs & Tiles",
    category: "granites",
    description: "Elite quality Indian granite. Slabs and pre-cut tiles in high-demand colors: Black Galaxy, Absolute Black, Steel Grey, Ruby Red, and Tan Brown.",
    specifications: {
      material: "Premium Natural Quarry Granite Stone",
      sizes: ["Gangsaw Slabs (280cm up x 160cm up)", "Mini Slabs (240cm up x 70cm up)", "Tiles (60x60cm, 60x30cm, 30x30cm)", "Thickness: 18mm, 20mm, 30mm"],
      packaging: "Fumigated seaworthy strong wooden crates with interior foam padding, strapped",
      moq: "1 Container (approx 400-450 sqm of 20mm slabs)",
      hsCode: "68022310 (Polished Granite Slabs)",
      originPort: "Chennai Port (INMAA) / Tuticorin Port (INTUT)"
    },
    features: ["Premium diamond-polished shine (above 90 gloss scale)", "Perfect caliper calibration with +/- 1mm thickness tolerance", "Extremely low water absorption rate (under 0.4%)", "Highly resistant to frost, stains, and scratches for outdoor/indoor use"]
  },

  // 9. Marble Export
  {
    id: "marble-slabs",
    name: "Indian White & Decorative Marble Slabs",
    category: "marbles",
    description: "Breathtaking Makrana White, Morwad Marble, Forest Green, and custom decorative Indian Marbles. Hand-selected slabs of extraordinary veining.",
    specifications: {
      material: "Natural Metamorphic Calcium Carbonate Marble",
      sizes: ["Large Slabs (200cm up x 120cm up)", "Tiles: 30x60cm, 60x60cm", "Thickness: 16mm, 18mm, 20mm"],
      packaging: "Secure metal-reinforced export wooden bundles, protective sheet separators",
      moq: "1 Container (approx 18-20 Tons net weight limit)",
      hsCode: "68022110 (Marble Slabs)",
      originPort: "Mundra Port (INMUN) / Chennai Port (INMAA)"
    },
    features: ["Exquisite natural veining and structural purity", "Sourced from the heart of Rajasthan and South Indian quarry networks", "Polished, Honed, Brushed, or Sandblasted finish selections"]
  }
];

export const CERTIFICATIONS: Certificate[] = [
  {
    id: "fssai",
    name: "FSSAI License",
    issuer: "Food Safety and Standards Authority of India",
    description: "Central Licensing authorizing the processing, packing, and global exportation of premium food preparations and grocery goods.",
    displayId: "No. 12423000000000 (Central Exporter Category)",
    badgeType: "green"
  },
  {
    id: "spiceboard",
    name: "Spice Board Certification",
    issuer: "Spice Board of India (Ministry of Commerce & Industry)",
    description: "Authorized registration ensuring pure, grade-certified, and quality-vetted export of whole spices and spice mixtures worldwide.",
    displayId: "Reg: SB/EXP/ME/2023",
    badgeType: "gold"
  },
  {
    id: "coffee-board",
    name: "Coffee Board Registration",
    issuer: "Coffee Board of India",
    description: "Registered exporter validation certifying South Indian coffee seeds, roasted powders, and chicory mixtures for global retail trading.",
    displayId: "Reg No. CB/EXP/2023-24",
    badgeType: "blue"
  },
  {
    id: "iec",
    name: "IEC (Importer-Exporter Code)",
    issuer: "Directorate General of Foreign Trade (DGFT), Govt. of India",
    description: "Primary government license validating international trade capability and custom clearance compliance in India.",
    displayId: "IEC: 4123005829",
    badgeType: "gold"
  },
  {
    id: "fieo",
    name: "FIEO (Registration cum Membership)",
    issuer: "Federation of Indian Export Organisations",
    description: "Corporate exporter membership validating high credit-worthiness, business authenticity, and export documentation protocols.",
    displayId: "RCMC/FIEO/2023/8390",
    badgeType: "green"
  },
  {
    id: "gst",
    name: "GSTIN Registration",
    issuer: "Department of Revenue, Govt. of India",
    description: "Official tax registry authorizing legitimate commercial operations, wholesale trade tracking, and international commercial invoices.",
    displayId: "GSTIN: 33AAFCY8392J1Z3",
    badgeType: "blue"
  }
];

export const COUNTRIES_SERVED = [
  { name: "United Kingdom", code: "GB", primary: true },
  { name: "Singapore", code: "SG", primary: true },
  { name: "New Zealand", code: "NZ", primary: true },
  { name: "Canada", code: "CA", primary: true },
  { name: "United Arab Emirates", code: "AE", primary: false },
  { name: "Saudi Arabia", code: "SA", primary: false },
  { name: "Oman", code: "OM", primary: false },
  { name: "Kuwait", code: "KW", primary: false },
  { name: "Australia", code: "AU", primary: false },
  { name: "United States", code: "US", primary: false }
];

export const FAQS = [
  {
    question: "What are biodegradable dining ware products?",
    answer: "Biodegradable dining ware refers to plates, bowls, cups, and packaging containers made from plant-based biomass. They are engineered to replace single-use plastics and will naturally decompose back into rich soil nutrients without releasing toxic residues."
  },
  {
    question: "What is sugarcane bagasse tableware?",
    answer: "Bagasse is the natural dry fiber residue left after sugarcane stalks are crushed to extract juice. We mould this premium fiber under high heat and pressure to create elegant plates, trays, and bowls. It is water-resistant, oil-resistant, microwave-safe, and 100% compostable within 90 days."
  },
  {
    question: "Are corn starch products compostable?",
    answer: "Yes! Corn starch dining ware is made using PLA, a compostable bioplastic resin extracted from corn. These products decompose fully in industrial composting facilities. They offer excellent structural rigidity, perfect for stackable takeouts and high-strength cutlery."
  },
  {
    question: "Can you export FMCG products worldwide?",
    answer: "Absolutely. Yalini Exim specializes in consolidating leading Indian FMCG brand goods in single shipments (mixed-SKU containers). We handle all labeling modifications, barcode requirements, and language stickers requested by custom laws in the destination country, including the UK, Canada, and Middle East."
  },
  {
    question: "What are the minimum order quantities (MOQ)?",
    answer: "Our standard MOQ is designed for cargo viability. For customized biodegradable items and containers, the MOQ ranges from 30,000 to 100,000 pieces. For heavy commodities like Granites and Marbles, the MOQ is 1 full container load (FCL). However, we support lower trial volumes for verified enterprise buyers on their initial order."
  },
  {
    question: "Do you provide private labeling or OEM services?",
    answer: "Yes, we are a major OEM sourcing partner. We support custom sizing, embossed logo designs, and bespoke packaging boxes for biodegradable items, custom printed plastic food containers, and branded FMCG groceries. Contact our team to send your design specs."
  },
  {
    question: "Which countries do you export to?",
    answer: "Our primary export corridors are the United Kingdom (UK), Singapore, New Zealand, and Canada. We also actively ship to the UAE, Saudi Arabia, Oman, USA, Australia, and parts of Europe and Africa. We serve any international port with container accessibility."
  },
  {
    question: "Can you provide export documentation?",
    answer: "Export documentation is our core strength. Yalini Exim manages and provides all required documents including the Commercial Invoice, Packing List, Certificate of Origin, Bill of Lading, Phytosanitary Certificate, Spice Board Certificate, Coffee Board certificates, and FSSAI Central exporter clearances to guarantee seamless customs entry in your home country."
  },
  {
    question: "Do you offer custom packaging?",
    answer: "Yes. All products can be packed in retail-ready high-fidelity packaging, mixed carton setups, or heavy industrial shipping pallets depending on product type. For stones, we use highly robust fumigated wooden crates with thick rubber padding."
  },
  {
    question: "What are your shipping options?",
    answer: "Our primary shipping model is FOB (Free On Board) Chennai Port (INMAA), India, which is our closest high-capacity terminal. We also offer CIF (Cost, Insurance & Freight) or CFR rates to your preferred destination port globally, utilizing tier-1 ocean carrier networks."
  }
];

export interface BlogPost {
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

