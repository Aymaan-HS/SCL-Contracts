/* ============================================================
   content.js  —  All SCL Contracts site data
   ============================================================ */

const SERVICES = [
  {
    id: 1, icon: "🏗️", color: "#00D4FF",
    title: "Specialty Services",
    short: "Demolition, waterproofing, crack repair & water management using sophisticated machinery.",
    features: ["Mechanical Demolition & Disposal", "Waterproofing & Seepage Treatment", "Crack Repair Systems", "Water Management", "Roof Service Placement Advisory"]
  },
  {
    id: 2, icon: "📐", color: "#FF6B00",
    title: "Design-Build Services",
    short: "Integrated design + construction under a single contract for maximum efficiency.",
    features: ["New Building Construction", "Interior Fit-Out Works", "Single-Contract Delivery", "Risk & Cost Management", "End-to-End Coordination"]
  },
  {
    id: 3, icon: "🏛️", color: "#00FFE0",
    title: "Renovations & Facade Works",
    short: "Minor repairs to full facade restorations — structural integrity meets aesthetic appeal.",
    features: ["Facade Refurbishment (TMS)", "Stone / Tile Removal & Replacement", "Plaster Repair & Coating", "Heritage Restoration", "SKK Paints & Cemedine Sealants"]
  },
  {
    id: 4, icon: "🪨", color: "#B060FF",
    title: "Specialized Flooring & Finishes",
    short: "Premium flooring — marble, vitrified tiles, granite, SPC and specialty finishes.",
    features: ["Marble & Granite Flooring", "Vitrified Tile Systems", "SPC Flooring", "Wall Finishes & Cladding", "Heavy-Traffic Specialty Floors"]
  },
  {
    id: 5, icon: "🔊", color: "#FF4060",
    title: "Acoustic Design & Soundproofing",
    short: "Optimise sound clarity, block unwanted noise — privacy, comfort, productivity.",
    features: ["Acoustic Ceiling & Wall Systems", "Soundproof Partition Solutions", "Reverberation Control", "Studio & Conference Acoustics", "Site-Specific Products"]
  },
  {
    id: 6, icon: "🌿", color: "#40D080",
    title: "Sustainable Construction & Retrofitting",
    short: "Structural strengthening, seismic retrofitting and sustainable building upgrades.",
    features: ["Seismic / Earthquake Retrofitting", "Structural Strengthening", "Sealant & Waterproofing Works", "FRP Strengthening", "Green Building Compliance"]
  },
  {
    id: 7, icon: "🏠", color: "#FFA020",
    title: "Roofing Systems",
    short: "Flat, pitched and green roofs with full insulation, waterproofing and drainage.",
    features: ["Flat & Pitched Roof Systems", "Green / Terrace Gardens", "Roof Insulation & Waterproofing", "Gutter & Drainage Design", "Roof Deck & Flashing Works"]
  },
  {
    id: 8, icon: "🚒", color: "#FF6040",
    title: "Fire Protection & Plumbing Systems",
    short: "Active & passive fire systems plus complete plumbing installations.",
    features: ["Sprinkler & Suppression Systems", "Fire Detection & Alarm", "Passive Fire Barriers", "Water Supply & Distribution", "Drainage & Waste Management"]
  },
  {
    id: 9, icon: "💧", color: "#20B8FF",
    title: "Waterproofing Systems",
    short: "Site-specific waterproofing — carefully selected products for every substrate.",
    features: ["Basement & Podium Waterproofing", "Terrace & Wet Area Systems", "Expansion Joint Treatment", "Crystalline Waterproofing", "Injection Grouting"]
  },
  {
    id: 10, icon: "📋", color: "#A0C040",
    title: "Construction Management",
    short: "End-to-end project oversight — on time, within budget, to quality standards.",
    features: ["Project Planning & Scheduling", "Resource & Budget Management", "Quality Control Systems", "HSE & Safety Management", "Stakeholder Communication"]
  }
];

const PROJECTS = [
  {
    id: 1, category: "dismantling",
    title: "Leela Palace — Dismantling and Allied Jobs",
    tags: ["Dismantling"],
    location: "Udaipur, Rajasthan", year: 2024, area: "1,40,000 sq.ft", value: "₹12 Cr", status: "Completed",
    description: "Complete Total Maintenance System (TMS) execution — removal of existing facade coating, plaster repair, and a full SKK Paint & Cemedine Sealant solution across the tower's external facade. Delivered using gondola and RSP systems with zero disruption to occupants.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
  },
  {
    id: 2, category: "waterproofing",
    title: "Leela Palace — Cafeteria Fitout and Terrace Waterproofing",
    tags: ["Waterproofing", "cafeteria"],
    location: "Jaipur, Rajasthan", year: 2024, area: "2,20,000 sq.ft", value: "₹8.5 Cr", status: "Completed",
    description: "Comprehensive waterproofing of basement levels, podium deck and terrace areas. Site-specific product selection including crystalline waterproofing for retaining walls and liquid-applied membrane systems for podium slabs.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
  },
  {
    id: 3, category: "facade",
    title: "ITC Victoria View — Façade Renovation",
    tags: ["Design-Build", "Healthcare", "Turnkey"],
    location: "Kolkata, West Bengal", year: 2024, area: "85,000 sq.ft", value: "₹34 Cr", status: "Completed",
    description: "Turnkey design-build contract for a multi-specialty hospital extension — civil structure, facade, MEP and specialized healthcare interior fit-out under a single contract. Delivered ahead of schedule.",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80"
  },
  {
    id: 4, category: "waterproofing",
    title: "Four Season Residence — Waterproofing",
    tags: ["Retrofitting", "Seismic", "Structural"],
    location: "Mumbai, Maharashtra", year: 2023, area: "18-storey tower", value: "₹6.2 Cr", status: "Completed",
    description: "Structural assessment and seismic retrofitting of an 18-storey commercial tower using FRP wrapping, post-installed shear connectors and expansion joint treatment — executed floor by floor with occupied tenants.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"
  },
  {
    id: 5, category: "waterproofing",
    title: "Taj Hotel — Waterproofing",
    tags: ["Flooring", "Marble", "Vitrified"],
    location: "Jodhpur, Rajasthan", year: 2023, area: "60,000 sq.ft", value: "₹4.8 Cr", status: "Ongoing",
    description: "Specialized flooring package across 12 floors including imported marble in lobby areas, large-format vitrified tiles on typical floors and SPC flooring in amenity zones. Full laying, grouting and polishing in scope.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
  },
  {
    id: 6, category: "waterproofing",
    title: "Taj Hotel — Waterproofing",
    tags: ["Roofing", "Waterproofing", "Hospitality"],
    location: "Connaught Place, Delhi", year: 2023, area: "28,000 sq.ft roof", value: "₹3.1 Cr", status: "Completed",
    description: "Complete re-roofing package — removal of existing system, new insulated flat roof with liquid waterproofing membrane, flashing details, green terrace garden and revamped gutter/drainage layout.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
  }
];

const DIRECTORS = [
    {
    name: "Saiyad Salman Haider", role: "Managing Director", initials: "SSH", color: "#FF6B00", image: "./assets/images/md.png",
    bio: "With over 30 years of experience he has a proven track record of successfully managing and delivering large-scale projects across various sectors."
    
  },
{
    name: "Charitra Maheshwari", role: "DIRECTOR", initials: "CM", color: "#00D4FF", image: "./assets/images/director2.png",
    bio: "Founding architect of the Siddhika Group's growth story — steered the company from a small Delhi concept to India's largest single-brand paint contractor, listed on NSE SME. Led expansion to 6 cities and 100+ workforce."
  },
  {
    name: "Chandan Tiwari", role: "DIRECTOR", initials: "CT", color: "#00D4FF", image: "./assets/images/director3.png",
    bio: "Drives business development, client relations and operational execution across the pan-India network. His deep relationships with architects, developers, IT campuses and Japanese contractors fuel a 60% repeat-client rate."
  },
  {
    name: "Manvendra Singh", role: "DIRECTOR", initials: "MS", color: "#00D4FF", image: "./assets/images/director4.png",
    bio: "Leads technical and project delivery across Siddhika Coatings and SCL Contracts. Deep expertise in facade systems, structural retrofitting, SKK product applications and quality compliance."
  },

];

const OFFICES = [
  { city: "New Delhi", flag: "🏛️", address: "L-9, LGF, Kalkaji, New Delhi — 110019", phone: "011-4160-1441", hq: true },
  { city: "Mumbai", flag: "🌊", address: "13, GF, Hind Saurashtra, Andheri-Kurla Road, Mumbai — 400059", phone: "+91-9810021809", hq: false },
  { city: "Kolkata", flag: "🌿", address: "150, GF, Metropolitan CHSL, Kolkata — 700010", phone: "+91-9792691666", hq: false },
  { city: "Hyderabad", flag: "💠", address: "H.No. 8-2, Road No. 36, Jubilee Hills, Hyderabad — 500033", phone: "+91-9810021809", hq: false },
  { city: "Bengaluru", flag: "🌸", address: "3rd Floor, 1153, HSR Sector 2, Bengaluru — 560102", phone: "+91-9810021809", hq: false },
  { city: "Chennai", flag: "🌴", address: "197, 2nd Main Road, Ayappakkam, Tiruvallur, Chennai — 600077", phone: "+91-9810021809", hq: false }
];

const TIMELINE = [
  { year: "2002", title: "Founded Siddhika", desc: "Mr. Charitra Maheshwari started Siddhika in Delhi & Kanpur as a single-brand focused company with a team of 4." },
  { year: "2008", title: "Expanded", desc: "Expansion of total team with start of client base expansion including Japanese main contractors." },
  { year: "2010", title: "Incorporated", desc: "Became a Pvt. Ltd. company with shareholding extended to employees & associates." },
  { year: "2012", title: "TMS Division", desc: "Formed Total Maintenance System (TMS) division for complete facade renovation." },
  { year: "2017", title: "SKK Key Partner", desc: "SKK Japan recognised Siddhika as their key supply & apply partner across India — first ever in India." },
  { year: "2019", title: "Mumbai Expansion", desc: "Commenced Mumbai operations; achieved >5 Lakh sq.m. application in one year." },
  { year: "2020", title: "Siddhika", desc: "Siddhika became a public limited company." },
  { year: "2021", title: "NSE SME Listed", desc: "First ever paint contractor in India to be listed on a Stock Exchange." },
  { year: "2022", title: "Founded SCL Contracts", desc: "SCL Contracts Pvt. Ltd. launched as dedicated construction subsidiary." },
  { year: "2024", title: "Managing Director", desc: "Mr. Saiyad Salman Haider appointed as the Managing Director of SCL." }
];

const CHATBOT_INTENTS = [
  {
    patterns: ["hello", "hi", "hey", "start", "help"],
    response: "Hello! I'm <strong>ARIA</strong>, SCL Contracts' AI assistant 👋<br><br>Ask me about our <strong>services</strong>, <strong>offices</strong>, <strong>contact details</strong>, or our <strong>leadership team</strong>."
  },
  {
    patterns: ["service", "services", "what do you do", "offer", "work"],
    response: "SCL Contracts offers <strong>10 specialised service lines</strong>:<br><br>• Specialty Services (demolition, waterproofing)<br>• Design-Build Services<br>• Renovations & Facade Works (TMS)<br>• Specialized Flooring & Finishes<br>• Acoustic Design & Soundproofing<br>• Sustainable Construction & Retrofitting<br>• Roofing Systems<br>• Fire Protection & Plumbing<br>• Waterproofing Systems<br>• Construction Management"
  },
  {
    patterns: ["facade", "tms", "renovation", "restoration"],
    response: "Our <strong>Renovations & Facade Works (TMS)</strong> covers complete facade refurbishment: removal of stone/tile/existing coatings, plaster repair, and a full solution using <strong>SKK Paints</strong> and <strong>Cemedine Sealants</strong>."
  },
  {
    patterns: ["waterproof", "basement", "seepage", "wet area"],
    response: "Our <strong>Waterproofing Systems</strong> are site-specific — we evaluate each project individually and select the most suitable products based on environmental conditions, structural demands and intended use."
  },
  {
    patterns: ["contact", "phone", "email", "address", "reach", "call", "number"],
    response: "Reach SCL Contracts at:<br><br>📧 <strong>info@sclcontracts.com</strong><br>📞 <strong>011-4160-1441</strong><br>📱 <strong>+91-9810021809</strong><br>🏢 <strong>L-9, LGF, Kalkaji, New Delhi – 110019</strong>"
  },
  {
    patterns: ["office", "branch", "city", "location", "where"],
    response: "SCL Contracts has <strong>6 offices</strong> across India:<br><br>📍 New Delhi (HQ) — Kalkaji 110019<br>📍 Mumbai — Andheri 400059<br>📍 Kolkata — Metropolitan CHSL 700010<br>📍 Hyderabad — Jubilee Hills 500033<br>📍 Bengaluru — HSR Sector 2 560102<br>📍 Chennai — Ayappakkam 600077"
  },
  {
    patterns: ["director", "directors", "management", "leadership", "team", "ceo", "md"],
    response: "SCL Contracts is led by the Siddhika Coatings board:<br><br>👤 <strong>Charitra Maheshwari</strong> — Managing Director<br>👤 <strong>Gaurav Agarwal</strong> — Executive Director<br>👤 <strong>Manvendra Pratap Singh</strong> — Executive Director<br>👤 <strong>Inderpal Singh</strong> — Independent Director<br>👤 <strong>Asha Mittal</strong> — Independent Director"
  },
  {
    patterns: ["siddhika", "parent", "subsidiary", "group", "nse", "listed"],
    response: "SCL Contracts is a <strong>fully owned subsidiary of Siddhika Coatings Limited</strong> — India's largest single-brand texture paint contractor, <strong>listed on NSE SME</strong>. Siddhika has been an authorised partner for <strong>SK Kaken Ltd. (SKK), Japan</strong> for over 20 years."
  },
  {
    patterns: ["site visit", "free visit", "free consultation", "survey"],
    response: "SCL Contracts offers a <strong>Free Site Visit</strong> — expert consultation at no cost!<br><br>📞 Call: <strong>+91-9810021809</strong><br>📧 Email: <strong>info@sclcontracts.com</strong><br><br>Or fill the form in the Contact section."
  },
  {
    patterns: ["experience", "years", "history", "founded", "old"],
    response: "The Siddhika Group (parent of SCL Contracts) was founded in <strong>2002</strong> — over <strong>20+ years</strong> of experience. We manage more than <strong>5 million sq.ft</strong> of contract work annually."
  },
  {
    patterns: ["whatsapp", "chat", "message", "wa"],
    response: "You can reach us on WhatsApp: <strong>+91-9810021809</strong><br><br><a href='https://api.whatsapp.com/send?phone=+919810021809' target='_blank' style='color:#00D4FF'>Click here to open WhatsApp chat ↗</a>"
  },
  {
    patterns: ["bye", "goodbye", "thanks", "thank you", "done"],
    response: "Thank you for contacting <strong>SCL Contracts Pvt. Ltd.</strong>! Have a wonderful day 🏗️<br><br>📞 +91-9810021809 | 📧 info@sclcontracts.com"
  }
];

function chatbotReply(input) {
  const lower = input.toLowerCase().trim();
  for (const intent of CHATBOT_INTENTS) {
    if (intent.patterns.some(p => lower.includes(p))) return intent.response;
  }
  return "I'm not sure I understood that. Try asking about our <strong>services</strong>, <strong>office locations</strong>, <strong>contact details</strong>, or <strong>leadership team</strong>.";
}
