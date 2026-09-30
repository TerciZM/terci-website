import React, { useCallback, useEffect, useState } from "react";

const WA = "https://wa.me/260972888575";
const API = "https://project-rainfall-935988331.development.catalystserverless.com/server/terci_admin_api";
const ADMIN_LOGIN = "https://project-rainfall-935988331.development.catalystserverless.com/__catalyst/auth/login";

const services = [
  ["01", "Starlink & Satellite Internet", "Supply, installation, activation and support for homes, offices and remote sites.", "starlink"],
  ["02", "CCTV & Security Systems", "Professional surveillance, access control, alarms and electric-fence solutions.", "security"],
  ["03", "Fibre & Structured Cabling", "Fibre deployment, splicing, OTDR testing and dependable building networks.", "fibre"],
  ["04", "Business Wi-Fi & Networking", "MikroTik, UniFi and Omada networks built for reliable, secure coverage.", "networking"],
  ["05", "Voice & Collaboration", "3CX, PBX and enterprise telephony that keep teams and customers connected.", "voice"],
  ["06", "Electrical & Solar Support", "Clean power distribution and practical backup solutions for critical ICT equipment.", "power"],
];

const projects = [
  ["/images/fibre-route-field-work.webp", "Fibre deployment", "Field cable preparation and route work", "wide"],
  ["/images/telecommunications-tower-zambia.webp", "Infrastructure", "Telecommunications tower route", ""],
  ["/images/fibre-fusion-splicer.webp", "Fibre splicing", "Fusion splicing equipment", ""],
  ["/images/onsite-fibre-cabinet-work.webp", "Site integration", "Outdoor cabinet fibre installation", ""],
  ["/images/fibre-cable-preparation.webp", "Field works", "Fibre cable and hardware preparation", ""],
  ["/images/fibre-rack-termination.webp", "Commissioning", "Rack termination and fibre patching", "wide"],
];

const categories = [
  ["Starlink & accessories", "Satellite internet equipment, mounting accessories and professional installation.", "/images/starlink-hero.jpeg"],
  ["CCTV & security", "Cameras, recorders, access control, alarms and perimeter protection equipment.", "/images/cctv-industrial-camera.jpeg"],
  ["Networking & Wi-Fi", "Business routers, access points, switches and wireless-link equipment.", "/images/outdoor-ap.jpeg"],
  ["Fibre tools & materials", "Fibre cable, accessories, termination materials and installation tools.", "/images/fibre-rack-termination.webp"],
  ["Electrical & solar", "Reliable power distribution and backup solutions for ICT equipment.", "/images/electrical-board.jpeg"],
  ["Business technology", "Practical ICT equipment selected for Zambian homes, offices and field sites.", "/images/client-handover.jpeg"],
];


const shopSeedProducts = [
  ["cat6-rj45","CAT6 RJ45 Plug","Networking","CAT6 modular connector for structured network cabling.",3,"In Stock","/images/outdoor-ap.jpeg","BEST SELLER"],
  ["cat6-pass-through","CAT6 Pass-through RJ45 Plug","Networking","Pass-through CAT6 connector for faster termination.",5,"In Stock","/images/outdoor-ap.jpeg","POPULAR"],
  ["rj45-boot","RJ45 Boot","Networking","Protective strain-relief boot for RJ45 network connectors.",4,"In Stock","/images/outdoor-ap.jpeg",""],
  ["cat6-keystone","CAT6 Keystone Jack","Networking","CAT6 UTP keystone jack for faceplates and patching points.",35,"Low Stock","/images/outdoor-ap.jpeg","HOT DEAL"],
  ["faceplate-1","1-Port Faceplate","Networking","Single-port data faceplate for clean network outlet installations.",25,"In Stock","/images/outdoor-ap.jpeg",""],
  ["patch-panel-24","24-Port CAT6 Patch Panel","Networking","24-port CAT6 patch panel for racks and cabinets.",950,"Available on Order","/images/fibre-rack-termination.webp",""],
  ["wifi-ap","Business Wi-Fi Access Point","Networking","Dual-band access point sample for office and hospitality Wi-Fi.",1850,"Available on Order","/images/outdoor-ap.jpeg","NEW"],
  ["gigabit-switch","8-Port Gigabit Switch","Networking","Compact unmanaged gigabit switch sample for small networks.",850,"In Stock","/images/client-handover.jpeg","DEAL"],
  ["sc-pigtail","SC/UPC Pigtail 1m","Fibre","Single-mode SC/UPC fibre pigtail for splicing and termination.",30,"In Stock","/images/fibre-rack-termination.webp",""],
  ["sc-lc-patch","SC/UPC–LC/UPC Patch Cord","Fibre","Single-mode fibre patch cord for equipment and ODF interconnection.",120,"In Stock","/images/fibre-rack-termination.webp","POPULAR"],
  ["splice-sleeve","60mm Fibre Splice Sleeve","Fibre","Heat-shrink protection sleeve for fusion-spliced fibre joints.",3,"In Stock","/images/fibre-cable-preparation.webp",""],
  ["fibre-odf","12-Core Fibre ODF","Fibre","Compact fibre distribution frame sample for termination and patching.",850,"Available on Order","/images/fibre-rack-termination.webp",""],
  ["fibre-closure","24-Core Fibre Joint Closure","Fibre","Outdoor splice closure sample for aerial and underground fibre routes.",1250,"Available on Order","/images/fibre-cable-preparation.webp",""],
  ["fibre-drum","Single-Mode Fibre Cable","Fibre","Outdoor single-mode fibre cable sample. Final price depends on core count and length.",20,"Available on Order","/images/fibre-route-field-work.webp","FROM / METRE"],
  ["crimp-tool","RJ45 Crimping Tool","Tools & Test Equipment","Hand crimping tool for terminating RJ45 network connectors.",400,"In Stock","/images/fibre-cable-preparation.webp",""],
  ["network-tester","Network Cable Tester","Tools & Test Equipment","Basic LAN cable tester for continuity and wire-map checks.",750,"Low Stock","/images/client-handover.jpeg","POPULAR"],
  ["fusion-splicer","Fusion Splicer – 6 Motor","Tools & Test Equipment","Sample core-alignment fusion splicer for professional fibre work.",7500,"Available on Order","/images/fibre-fusion-splicer.webp","FEATURED"],
  ["otdr","Dual-Wavelength OTDR","Tools & Test Equipment","1310/1550nm OTDR sample for fibre testing and fault location.",6500,"Available on Order","/images/fibre-fusion-splicer.webp","NEW"],
  ["cctv-dome","4MP IP Dome Camera","CCTV & Security","4MP network dome camera sample for business and residential surveillance.",1250,"Available on Order","/images/cctv-industrial-camera.jpeg",""],
  ["cctv-bullet","4MP IP Bullet Camera","CCTV & Security","Outdoor 4MP network bullet camera sample with infrared night vision.",1350,"Available on Order","/images/hero-cctv-camera.webp","POPULAR"],
  ["nvr-8ch","8-Channel Network Video Recorder","CCTV & Security","8-channel NVR sample for small CCTV installations.",2800,"Available on Order","/images/cctv-industrial-camera.jpeg",""],
  ["ax-alarm","Wireless Alarm Starter Kit","CCTV & Security","Wireless intrusion alarm starter package sample.",4500,"Available on Order","/images/cctv-industrial-camera.jpeg","NEW"],
  ["starlink-mini","Starlink Mini Kit","Starlink","Compact Starlink kit sample for portable and remote connectivity.",4900,"Available on Order","/images/starlink-hero.jpeg","POPULAR"],
  ["starlink-standard","Starlink Standard Kit","Starlink","Standard Starlink kit sample for homes and business connectivity.",9500,"Available on Order","/images/starlink-hero.jpeg","BUSINESS PICK"],
  ["starlink-bracket","Starlink Mounting Bracket","Starlink","Mounting bracket sample for secure Starlink installations.",700,"In Stock","/images/hero-starlink-installation.webp",""],
  ["starlink-cable","Starlink Extended Cable","Starlink","Extended Starlink cable sample for installations requiring longer runs.",1800,"Available on Order","/images/hero-starlink-installation.webp",""],
  ["ups-650","650VA UPS","Power & Solar","Backup power sample for routers, switches and small ICT equipment.",1200,"Available on Order","/images/electrical-board.jpeg",""],
  ["dc-backup","Router DC Backup Unit","Power & Solar","Compact DC backup sample for routers and connectivity equipment.",850,"Available on Order","/images/electrical-board.jpeg",""],
  ["cable-ties","Cable Ties – Pack","Accessories","General-purpose cable ties for neat cable management.",50,"In Stock","/images/fibre-cable-preparation.webp",""],
  ["velcro-ties","Velcro Cable Ties – Pack","Accessories","Reusable hook-and-loop ties for network and fibre cable management.",100,"In Stock","/images/fibre-cable-preparation.webp",""],
].map(([id,name,category,description,price,stockStatus,imageUrl,promo], index) => ({
  id, name, category, description, price, stockStatus, imageUrl, promo,
  isActive: true, isFeatured: index < 8, estimated: true, demo: true,
}));
const heroSlides = [
  {
    image: "/images/hero-starlink-installation.webp",
    kicker: "Starlink installation · Across Zambia",
    title: ["Reliable internet.", "Professionally installed."],
    text: "Secure mounting, careful cable routing, activation and practical Wi-Fi support for homes, offices and remote sites.",
  },
  {
    image: "/images/hero-fibre-installation.webp",
    kicker: "Fibre optic infrastructure",
    title: ["Built in the field.", "Tested for uptime."],
    text: "Fibre deployment, fusion splicing, termination and OTDR testing delivered by one accountable technical team.",
  },
  {
    image: "/images/hero-cctv-installation.webp",
    kicker: "CCTV installation & security",
    title: ["Coverage planned.", "Protection installed."],
    text: "Professional camera positioning, secure mounting and dependable surveillance systems designed around each site.",
  },
  {
    image: "/images/hero-cctv-camera.webp",
    kicker: "Professional surveillance",
    title: ["Clear visibility.", "Where it matters."],
    text: "CCTV solutions for businesses, institutions, industrial facilities and homes—with ongoing technical support.",
  },
];

const serviceImages = {
  starlink: "/images/starlink-hero.jpeg",
  security: "/images/cctv-industrial-camera.jpeg",
  fibre: "/images/fibre-rack-termination.webp",
  networking: "/images/outdoor-ap.jpeg",
  voice: "/images/client-handover.jpeg",
  power: "/images/electrical-board.jpeg",
};

const industries = ["Mining & industrial", "Financial services", "Retail & hospitality", "Education", "Healthcare", "Homes & estates"];

function Header({ active = "home" }) {
  return <>
    <div className="topline"><div><a href="tel:+260972888575">+260 972 888 575</a><a href="mailto:info@terci.net">info@terci.net</a></div><div><span>Kitwe, Zambia</span><span>Nationwide project delivery</span></div></div>
    <header className="site-header corporate-header">
      <a className="brand" href="/" aria-label="Terci Communications home"><img src="/images/terci-mark.png" alt=""/><span><strong>TERCI</strong><small>COMMUNICATIONS LIMITED</small></span></a>
      <nav className="main-nav corporate-nav" aria-label="Main navigation">
        <a href="/" aria-current={active === "home" ? "page" : undefined}>Home</a>
        <div className="nav-item"><a href="/#about">About <span>⌄</span></a><div className="nav-panel about-panel"><a href="/#about"><b>Who we are</b><small>A Zambian technology partner</small></a><a href="/#approach"><b>Our approach</b><small>Plan · Deliver · Support</small></a><a href="/#coverage"><b>Where we work</b><small>Copperbelt hub, national reach</small></a></div></div>
        <div className="nav-item"><a href="/#services">Solutions <span>⌄</span></a><div className="nav-panel solutions-panel"><a href="/#starlink"><b>Starlink &amp; Internet</b><small>Reliable connectivity</small></a><a href="/#security"><b>CCTV &amp; Security</b><small>Integrated protection</small></a><a href="/fiber"><b>Fibre Infrastructure</b><small>Design, splice and test</small></a><a href="/#networking"><b>Networks &amp; Wi-Fi</b><small>Business-ready coverage</small></a><a href="/#voice"><b>Voice &amp; Collaboration</b><small>PBX and enterprise voice</small></a><a href="/#power"><b>Electrical &amp; Solar</b><small>Resilient ICT power</small></a></div></div>
        <a href="/#work">Projects</a><a href="/#coverage">Coverage</a><a href="/#contact">Contact</a>
      </nav>
      <details className="mobile-nav"><summary aria-label="Open navigation">Menu</summary><div><a href="/">Home</a><a href="/#about">About</a><a href="/#services">Solutions</a><a href="/fiber">Fibre</a><a href="/#work">Projects</a><a href="/#coverage">Coverage</a><a href="/#contact">Contact</a><a className="mobile-shop-link" href="/shop">Shop</a></div></details>
      <a className="header-cta" href={`${WA}?text=Hello%20Terci%20Communications%2C%20I%20would%20like%20a%20quotation.`} target="_blank" rel="noreferrer">Request a quotation <span>↗</span></a>
    </header>
  </>;
}

function Footer() {
  return <><footer className="corporate-footer"><div className="footer-intro"><a className="brand footer-brand" href="/"><img src="/images/terci-mark.png" alt=""/><span><strong>TERCI</strong><small>COMMUNICATIONS LIMITED</small></span></a><p>Integrated security, connectivity and ICT infrastructure for organisations across Zambia.</p></div><div className="footer-column"><b>Company</b><a href="/#about">About Terci</a><a href="/#work">Projects</a><a href="/#coverage">Coverage</a><a href="/#contact">Contact</a></div><div className="footer-column"><b>Solutions</b><a href="/#starlink">Starlink &amp; Internet</a><a href="/#security">CCTV &amp; Security</a><a href="/fiber">Fibre Infrastructure</a><a href="/#networking">Networks &amp; Wi-Fi</a></div><div className="footer-column footer-contact"><b>Talk to our team</b><a href="mailto:info@terci.net">info@terci.net</a><a href="tel:+260972888575">+260 972 888 575</a><span>Kitwe, Zambia</span></div><div className="footer-bottom"><small>© 2026 Terci Communications Limited. All rights reserved.</small><span>Integrated Security &amp; Connectivity Solutions</span></div></footer><a className="floating-wa" href={WA} target="_blank" rel="noreferrer" aria-label="Contact Terci on WhatsApp">WA</a></>;
}

function CategoryProducts({ compact = false }) {
  const shown = compact ? categories.slice(0, 4) : categories;
  return <div className={compact ? "category-image-grid" : "product-grid"}>{shown.map(([name, description, image]) => compact ? <a href="/shop" key={name}><img src={image} alt={name}/><span>{name}</span></a> : <article className="product-card" key={name}><div className="product-image"><img src={image} alt={name}/><span>Ask for availability</span></div><div className="product-copy"><small>TERCI SUPPLY</small><h3>{name}</h3><p>{description}</p><div><b>Request price</b><a href={`${WA}?text=${encodeURIComponent(`Hello Terci, I am interested in ${name}.`)}`} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a></div></div></article>)}</div>;
}

const categoryFallback = (category = "") => {
  const value = category.toLowerCase();
  if (value.includes("starlink") || value.includes("satellite")) return "/images/starlink-hero.jpeg";
  if (value.includes("cctv") || value.includes("security")) return "/images/cctv-industrial-camera.jpeg";
  if (value.includes("fibre") || value.includes("fiber")) return "/images/fibre-rack-termination.webp";
  if (value.includes("electric") || value.includes("solar")) return "/images/electrical-board.jpeg";
  if (value.includes("network") || value.includes("wi-fi") || value.includes("wifi")) return "/images/outdoor-ap.jpeg";
  return "/images/client-handover.jpeg";
};

function ProductCard({ product }) {
  const enquire = () => fetch(`${API}/enquiries/${product.id}`, { method: "POST" }).catch(() => {});
  return <article className="product-card">
    <div className="product-image"><img src={product.imageUrl || categoryFallback(product.category)} alt={product.name}/>{product.promo && <b className="product-promo">{product.promo}</b>}<span>{product.stockStatus || "Ask for availability"}</span></div>
    <div className="product-copy"><small>{product.category || "TERCI SUPPLY"}</small><h3>{product.name}</h3><p>{product.description || "Contact our team for specifications, availability and installation support."}</p>{product.estimated && <span className="estimate-note">Estimated price · confirm on order</span>}<div><b>{Number(product.price) > 0 ? `${product.estimated ? "From " : ""}K${Number(product.price).toLocaleString("en-ZM", { maximumFractionDigits: 2 })}` : "Request price"}</b><a href={`${WA}?text=${encodeURIComponent(`Hello Terci, I am interested in ${product.name}. Please confirm the current price and availability.`)}`} onClick={enquire} target="_blank" rel="noreferrer">Order on WhatsApp <span>↗</span></a></div></div>
  </article>;
}

function usePublicProducts() {
  const [state, setState] = useState({ loading: true, products: [] });
  useEffect(() => {
    let live = true;
    fetch(`${API}/products`).then((response) => {
      if (!response.ok) throw new Error("Catalogue unavailable");
      return response.json();
    }).then((data) => live && setState({ loading: false, products: data.products || [] }))
      .catch(() => live && setState({ loading: false, products: [] }));
    return () => { live = false; };
  }, []);
  return state;
}

function FeaturedProducts() {
  const { loading, products } = usePublicProducts();
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  if (loading) return <div className="featured-fallback loading"><CategoryProducts compact/><div><b>Loading the latest Terci products…</b></div></div>;
  if (!featured.length) return <div className="featured-fallback ready"><CategoryProducts compact/><div><b>Ask our team for the right equipment for your site.</b><a className="btn primary" href="/shop">Browse the catalogue <span>→</span></a></div></div>;
  return <div className="featured-products product-grid">{featured.map((product) => <ProductCard product={product} key={product.id}/>)}</div>;
}

function PublicCatalogue() {
  const { loading, products } = usePublicProducts();
  // The public Shop mirrors the Admin catalogue exactly. No demo products are merged here.
  const catalogue = products;
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...new Set(catalogue.map((product) => product.category).filter(Boolean))];
  const term = query.trim().toLowerCase();
  const visible = catalogue.filter((product) => {
    const matchesFilter = filter === "All" || product.category === filter;
    const haystack = [product.name, product.category, product.description].join(" ").toLowerCase();
    return matchesFilter && (!term || haystack.includes(term));
  });
  return <div className="catalogue-wrap retail-catalogue">
    <div className="catalogue-toolbar"><div className="catalogue-search"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, categories or equipment…"/><span>⌕</span></div><b>{visible.length} products</b></div>
    <div className="shop-filters" aria-label="Shop categories">{filters.map((name) => <button className={filter === name ? "active" : ""} onClick={() => setFilter(name)} key={name}>{name}</button>)}</div>
    <p className="catalogue-status">Products, prices and availability shown here are managed from the Terci Admin catalogue.</p>
    {loading && <p className="catalogue-loading">Checking the latest Terci catalogue…</p>}
    <div className="retail-shop-grid">{visible.map((product) => <ProductCard product={product} key={product.id}/>)}</div>
    {!loading && !visible.length && <div className="empty-catalog"><b>{products.length ? "No matching products" : "Catalogue being updated"}</b><p>{products.length ? "Try another search or ask Terci to source the item for you." : "Products added in Terci Admin will appear here automatically."}</p></div>}
  </div>;
}

function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);
  const current = heroSlides[slide];
  return <main className="home-corporate"><Header/><div className="home-shop-link"><a href="/shop">SHOP</a></div>
    <section className="corp-hero" id="home">
      <div className="corp-hero-images" aria-hidden="true">{heroSlides.map((item, index) => <img className={index === slide ? "active" : ""} src={item.image} alt="" key={item.image}/>)}</div><div className="corp-hero-shade"/>
      <div className="corp-hero-content"><p className="eyebrow">{current.kicker}</p><h1>{current.title[0]}<span>{current.title[1]}</span></h1><p>{current.text}</p><div className="hero-actions"><a className="btn primary" href={`${WA}?text=Hello%20Terci%20Communications%2C%20I%20would%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noreferrer">Talk to our team <span>↗</span></a><a className="btn glass" href="#services">Explore our solutions <span>↓</span></a></div></div>
      <div className="slide-controls" aria-label="Hero slides">{heroSlides.map((item, index) => <button className={index === slide ? "active" : ""} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} key={item.image}><span>0{index + 1}</span></button>)}</div>
      <div className="hero-proof"><article><b>12+</b><span>Years of technical experience</span></article><article><b>20+</b><span>Starlink installations delivered</span></article><article><b>10</b><span>Provinces within our field reach</span></article><article><b>End-to-end</b><span>Planning, supply and support</span></article></div>
    </section>

    <section className="corp-intro" id="about"><div className="section-marker"><span>01</span><b>About Terci</b></div><div className="corp-intro-main"><p className="eyebrow">A Zambian technology partner</p><h2>We build the systems that modern organisations depend on.</h2><div className="intro-columns"><p>Terci Communications Limited delivers integrated connectivity, security and ICT infrastructure for businesses, institutions, industrial operations and homes across Zambia.</p><p>Our work combines hands-on field capability with structured planning, clear documentation and ongoing technical support—from the first site survey to final handover.</p></div><a className="text-link" href="#approach">Discover how we work <span>→</span></a></div></section>

    <section className="corp-solutions" id="services"><div className="corp-section-head"><div><p className="eyebrow">Our solutions</p><h2>One accountable partner.<br/>Six connected capabilities.</h2></div><p>Practical technology designed around your site, operational risks and growth plans—not a one-size-fits-all package.</p></div><div className="solution-grid">{services.map(([n,title,text,id])=><article className="solution-card" id={id} key={title}><div className="solution-image"><img src={serviceImages[id]} alt="" loading="lazy"/><span>{n}</span></div><div><h3>{title}</h3><p>{text}</p><a href={id === "fibre" ? "/fiber" : `${WA}?text=${encodeURIComponent(`Hello Terci, I am interested in ${title}.`)}`} target={id === "fibre" ? undefined : "_blank"} rel="noreferrer">{id === "fibre" ? "Explore capability" : "Discuss this solution"} <span>↗</span></a></div></article>)}</div></section>

    <section className="corp-approach" id="approach"><div className="approach-copy"><p className="eyebrow">How we deliver</p><h2>From requirement<br/>to reliable operation.</h2><p>Our role does not end when the equipment is mounted. We scope correctly, install professionally, test thoroughly and remain available when the system needs support or expansion.</p><a className="btn primary" href={`${WA}?text=Hello%20Terci%2C%20please%20help%20me%20scope%20a%20technology%20project.`} target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a></div><div className="approach-steps">{[["01","Assess","Site survey, risks and requirements"],["02","Design","Clear scope and suitable technology"],["03","Deliver","Professional installation and testing"],["04","Support","Handover, maintenance and expansion"]].map(([n,t,d])=><article key={n}><span>{n}</span><div><b>{t}</b><small>{d}</small></div></article>)}</div></section>

    <section className="corp-projects" id="work"><div className="corp-section-head light"><div><p className="eyebrow">Projects &amp; field capability</p><h2>Real work.<br/>Visible standards.</h2></div><p>Our portfolio demonstrates the workmanship behind the promise—from secure mounting and clean cable routes to commissioned, working systems.</p></div><div className="project-grid">{projects.map(([image,label,title,cls])=><figure className={cls} key={title}><img src={image} alt={title} loading="lazy"/><figcaption><span>{label}</span><b>{title}</b></figcaption></figure>)}</div><div className="projects-note"><span>Field installations completed across Zambia</span><a href={`${WA}?text=Hello%20Terci%2C%20I%20would%20like%20to%20see%20more%20project%20examples.`} target="_blank" rel="noreferrer">Request our company profile <b>→</b></a></div></section>

    <section className="home-products corporate-products" id="products"><div className="home-products-heading"><div><p className="eyebrow">Equipment supplied by Terci</p><h2>Professional products.<br/><span>Technical support included.</span></h2></div><div><p>Selected Starlink, CCTV, networking, fibre and ICT products—available with professional installation and nationwide support.</p><a href="/shop">View the complete catalogue <span>→</span></a></div></div><FeaturedProducts/></section>

    <section className="corp-coverage" id="coverage"><div className="coverage-photo"><img src="/images/client-handover.jpeg" alt="Terci project handover in Zambia" loading="lazy"/><div><small>OPERATIONAL BASE</small><b>Copperbelt</b><span>National field deployment</span></div></div><div className="coverage-content"><p className="eyebrow">Nationwide project delivery</p><h2>Rooted on the Copperbelt.<br/>Ready across Zambia.</h2><p>Our Copperbelt hub supports fast local response while our field capability extends to projects throughout all ten provinces.</p><div className="province-list">{["Copperbelt","Lusaka","Central","North-Western","Northern","Luapula","Muchinga","Eastern","Southern","Western"].map(x=><span key={x}>{x}</span>)}</div></div></section>

    <section className="corp-industries"><div><p className="eyebrow">Industries we support</p><h2>Technology shaped around the environment it serves.</h2></div><div className="industry-grid">{industries.map((industry,index)=><span key={industry}><b>0{index + 1}</b>{industry}</span>)}</div></section>

    <section className="corp-contact" id="contact"><div><p className="eyebrow">Start your project</p><h2>Let’s build infrastructure<br/>your organisation can rely on.</h2></div><div><p>Tell us what you need. We’ll help define the right scope and provide a clear quotation.</p><a className="btn white" href={`${WA}?text=Hello%20Terci%20Communications%2C%20I%20would%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noreferrer">Chat on WhatsApp <span>↗</span></a><a href="mailto:info@terci.net">info@terci.net</a></div></section><Footer/>
  </main>;
}

function Shop() {
  return <main className="shop-page retail-shop-page"><Header active="shop"/><div className="shop-title-link"><a href="/shop">SHOP</a></div>
    <section className="retail-searchbar shop-searchbar"><a className="retail-shop-all" href="/shop">☰ <span>All products</span></a><form onSubmit={(e) => {e.preventDefault(); const input=e.currentTarget.elements.namedItem("shopSearch"); window.location.href="/shop?q="+encodeURIComponent(input.value);}}><input name="shopSearch" defaultValue={new URLSearchParams(window.location.search).get("q") || ""} placeholder="Search the Terci Shop…"/><button type="submit">Search</button></form><a className="retail-help" href={WA + "?text=Hello%20Terci%2C%20I%20need%20help%20finding%20a%20product."} target="_blank" rel="noreferrer"><small>Can't find it?</small><b>Ask Terci</b></a></section>
    <nav className="retail-category-nav"><a href="/shop">Shop all</a><a href="/shop?q=Networking">Networking</a><a href="/shop?q=Fibre">Fibre</a><a href="/shop?q=CCTV">CCTV &amp; Security</a><a href="/shop?q=Starlink">Starlink</a><a href="/shop?q=Tools">Tools &amp; Test</a><a href="/shop?q=Power">Power &amp; Solar</a></nav>
    <section className="shop-retail-benefits"><span><b>Installer pricing</b><small>Ask about bulk quantities</small></span><span><b>WhatsApp ordering</b><small>Fast confirmation and quotation</small></span><span><b>Technical guidance</b><small>Buy the right item for the job</small></span><span><b>Supply + installation</b><small>One team from purchase to handover</small></span></section>
    <section className="shop-listing retail-shop-listing" id="catalogue"><div className="shop-title retail-shop-title"><div><p className="eyebrow">SHOP THE RANGE</p><h2>Everything for the next job.</h2></div><p>Browse the demonstration catalogue below. Use search or category filters to quickly narrow down the equipment you need.</p></div><PublicCatalogue/></section>
    <section className="retail-contact"><div><small>NEED SOMETHING ELSE?</small><h2>Ask Terci to source it.</h2><p>Send us a product name, model number, photo or specification and we'll help with a quotation.</p></div><a href={WA + "?text=Hello%20Terci%2C%20please%20help%20me%20source%20an%20item."} target="_blank" rel="noreferrer">Ask on WhatsApp <span>↗</span></a></section><Footer/>
  </main>;
}

function Fiber() {
  const capabilities = [["01","Fibre network design","Route planning, cable selection, termination design and bills of quantities for dependable deployments."],["02","Fusion splicing","Low-loss fibre joining, pigtail termination, closures, ODFs and patch-panel commissioning."],["03","OTDR & power testing","Trace analysis, loss measurement, fault location and clear test results for handover."],["04","Aerial & underground builds","ADSS aerial routes, duct installations, campus backbones and building-to-building links."],["05","Emergency fibre repair","Fault finding, cable restoration and service recovery for damaged or degraded links."],["06","Maintenance & expansion","Preventive checks, documentation, core extensions and upgrades as your network grows."]];
  return <main className="fiber-page"><Header active="fiber"/><section className="fiber-hero"><div className="fiber-copy"><a className="back-link" href="/">← All services</a><p className="eyebrow">Fibre optic infrastructure · Across Zambia</p><h1>Fast networks start with <em>strong fibre.</em></h1><p>From route design and cable deployment to fusion splicing, OTDR testing and emergency repairs, Terci delivers fibre infrastructure built for uptime—wherever your Zambian project is located.</p><div className="hero-actions"><a className="btn primary" href={`${WA}?text=Hello%20Terci%2C%20I%20would%20like%20a%20site%20survey%20for%20a%20fibre%20optic%20installation.`} target="_blank" rel="noreferrer">Book a site survey <span>↗</span></a><a className="btn dark-outline" href="tel:+260972888575">Call our team</a></div></div><div className="fiber-art"><div className="fiber-glow"/><div className="strand s1"/><div className="strand s2"/><div className="strand s3"/><div className="strand s4"/><div className="fiber-terminal"><span>LINK STATUS</span><b>READY</b><small>Design · Splice · Test · Support</small></div></div></section><section className="fiber-proof"><span><b>Single &amp; multimode</b> fibre systems</span><span><b>OTDR-tested</b> commissioning</span><span><b>End-to-end</b> documentation</span><span><b>Nationwide</b> project deployment</span></section><section className="fiber-project-proof"><div className="cabinet-photo"><img src="/images/fibre-cabinet.JPG" alt="Fibre termination and network distribution cabinet completed by Terci Communications"/><span>Completed work</span></div><div><p className="eyebrow">Practical integration</p><h2>Fibre that connects cleanly into your network.</h2><p>Good fibre work does not end at the cable. We terminate, patch, organise and integrate fibre links with the active network equipment and protected power systems that keep the service usable.</p><ul><li>Fibre termination and patching</li><li>ODF and cabinet integration</li><li>Network-switch connectivity</li><li>Labelling and handover documentation</li></ul></div></section><section className="fiber-capabilities"><div className="fiber-section-head"><div><p className="eyebrow">Complete fibre services</p><h2>From the first metre<br/>to the final test.</h2></div><p>We support new deployments, extensions, restoration work and ongoing maintenance for business-critical networks.</p></div><div className="fiber-grid">{capabilities.map(([n,t,d])=><article key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section><section className="fiber-industries"><div><p className="eyebrow">Built for demanding environments</p><h2>Fibre for Zambia’s growing economy.</h2><p>Reliable backbones for mines and contractors, warehouses, schools, hospitals, offices, estates, CCTV networks and multi-building sites.</p><a href={`${WA}?text=Hello%20Terci%2C%20please%20help%20me%20scope%20a%20fibre%20project.`} target="_blank" rel="noreferrer">Discuss your requirement →</a></div><div className="industry-list">{["Mining & contractors","Commercial offices","Schools & institutions","Warehouses & plants","CCTV backbones","Residential estates"].map(x=><span key={x}>{x}</span>)}</div></section><section className="fiber-cta" id="contact"><p>Need a new link, extension or urgent repair?</p><h2>Let’s scope your fibre project.</h2><div><a className="btn white" href={`${WA}?text=Hello%20Terci%2C%20I%20need%20help%20with%20a%20fibre%20optic%20project.`} target="_blank" rel="noreferrer">WhatsApp our fibre team <span>↗</span></a><a href="mailto:info@terci.net">info@terci.net</a></div></section><Footer/></main>;
}

const emptyProduct = {
  name: "", category: "", description: "", price: "", stockStatus: "In stock",
  imageFileId: "", imageName: "", isActive: true, isFeatured: false, enquiries: 0, sortOrder: 0
};

async function adminRequest(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    credentials: "include",
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "The request could not be completed.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function fileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.readAsDataURL(file);
  });
}

function ProductForm({ product = emptyProduct, onSave, onError, busy, compact = false }) {
  const [values, setValues] = useState({ ...emptyProduct, ...product });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => { setValues({ ...emptyProduct, ...product }); setImage(null); }, [product.id]);
  const change = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setUploading(true);
    try {
      let next = { ...values, price: Number(values.price || 0), sortOrder: Number(values.sortOrder || 0) };
      if (image) {
        const uploaded = await adminRequest("/admin/upload", { method: "POST", body: JSON.stringify({ fileName: image.name, contentType: image.type, data: await fileAsDataUrl(image) }) });
        next = { ...next, imageFileId: uploaded.imageFileId, imageName: uploaded.imageName };
      }
      const saved = await onSave(next);
      if (saved !== false && !product.id) { setValues({ ...emptyProduct }); setImage(null); form.reset(); }
    } catch (error) {
      onError?.(error.message);
    } finally {
      setUploading(false);
    }
  };
  return <form className={compact ? "edit-form" : "product-form"} onSubmit={submit}>
    <label>Product name<input name="name" value={values.name} onChange={change} required maxLength="120" placeholder="e.g. Starlink Standard Kit"/></label>
    <label>Category<input name="category" value={values.category} onChange={change} required maxLength="80" placeholder="e.g. Starlink & accessories"/></label>
    <label className="wide">Description<textarea name="description" value={values.description} onChange={change} rows="4" maxLength="3000" placeholder="What is included, who it is for, and key specifications."/></label>
    <label>Price in ZMW<input name="price" value={values.price} onChange={change} type="number" min="0" step="0.01" placeholder="0 means Request price"/></label>
    <label>Stock status<select name="stockStatus" value={values.stockStatus} onChange={change} required><option>In stock</option><option>Available to order</option><option>Limited stock</option><option>Out of stock</option></select></label>
    <label>Display order<input name="sortOrder" value={values.sortOrder} onChange={change} type="number" step="1"/></label>
    <label className="file-input">Product picture<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImage(event.target.files[0] || null)}/><small>JPG, PNG, WebP or GIF, maximum 5 MB</small></label>
    <label className="feature-check"><input name="isActive" type="checkbox" checked={values.isActive} onChange={change}/><span><b>Visible in catalogue</b><small>Turn this off to hide the product.</small></span></label>
    <label className="feature-check"><input name="isFeatured" type="checkbox" checked={values.isFeatured} onChange={change}/><span><b>Feature on homepage</b><small>Show this item in the home product section.</small></span></label>
    <button disabled={busy || uploading} type="submit"><span>{busy || uploading ? "Saving…" : product.id ? "Save changes" : "Add product"}</span><span>→</span></button>
  </form>;
}

function AdminDashboard() {
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, activeProducts: 0, featuredProducts: 0, outOfStock: 0, totalEnquiries: 0 });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const loadAdmin = useCallback(async () => {
    setStatus("checking");
    setNotice(null);
    try {
      const session = await adminRequest("/admin/session");
      setUser(session.user);
      const [productData, statData] = await Promise.all([adminRequest("/admin/products"), adminRequest("/admin/stats")]);
      setProducts(productData.products || []);
      setStats(statData.stats || {});
      setStatus("ready");
    } catch (error) {
      setStatus(error.status === 401 || error.status === 403 ? "signed-out" : "error");
      setNotice({ type: "error", text: error.message });
    }
  }, []);

  useEffect(() => { loadAdmin(); }, [loadAdmin]);

  const refreshData = async () => {
    const [productData, statData] = await Promise.all([adminRequest("/admin/products"), adminRequest("/admin/stats")]);
    setProducts(productData.products || []);
    setStats(statData.stats || {});
  };

  const run = async (work, success) => {
    setBusy(true); setNotice(null);
    try { await work(); await refreshData(); setNotice({ type: "success", text: success }); return true; }
    catch (error) { setNotice({ type: "error", text: error.message }); return false; }
    finally { setBusy(false); }
  };

  if (status === "checking") return <main className="admin-denied"><div><img src="/images/terci-mark.png" alt="Terci"/><p className="eyebrow">Secure administrator area</p><h1>Checking your session…</h1><p>Please wait while Catalyst verifies your Terci administrator account.</p></div></main>;

  if (status !== "ready") return <main className="admin-denied"><div><img src="/images/terci-mark.png" alt="Terci"/><p className="eyebrow">Secure administrator area</p><h1>Sign in to manage products.</h1><p>Use the confirmed <b>info@terci.net</b> App Administrator account. Zoho opens the secure sign-in in a new tab; after signing in, return here and retry.</p><a href={ADMIN_LOGIN} target="_blank" rel="noreferrer">Open secure Zoho sign-in ↗</a><button className="admin-retry" onClick={loadAdmin}>I have signed in — retry</button><small className="admin-help">If your browser blocks cross-site cookies, allow them for catalystserverless.com and reload this page.</small></div></main>;

  return <main className="admin-page">
    <aside className="admin-sidebar"><a className="brand" href="/"><img src="/images/terci-mark.png" alt=""/><span><strong>TERCI</strong><small>ADMINISTRATION</small></span></a><nav><a className="active" href="#overview">Overview</a><a href="#add-product">Add product</a><a href="#products">Manage products</a><a href="/shop">View catalogue</a></nav><div><span>Signed in as</span><b>{user.email}</b><a href={ADMIN_LOGIN} target="_blank" rel="noreferrer">Account sign-in ↗</a></div></aside>
    <section className="admin-content" id="overview"><header><div><p className="eyebrow">Terci catalogue control</p><h1>Products &amp; statistics.</h1><p>Add stock, upload pictures and see how customers are engaging with the catalogue.</p></div><a className="admin-view-site" href="/shop" target="_blank">View live catalogue ↗</a></header>
      {notice && <div className={`admin-notice ${notice.type === "error" ? "error" : ""}`}>{notice.text}</div>}
      <div className="stat-grid"><article><span>Total products</span><b>{stats.totalProducts || 0}</b><small>All catalogue records</small></article><article><span>Visible products</span><b>{stats.activeProducts || 0}</b><small>Shown to customers</small></article><article><span>Featured</span><b>{stats.featuredProducts || 0}</b><small>Promoted on homepage</small></article><article><span>Enquiries</span><b>{stats.totalEnquiries || 0}</b><small>WhatsApp product clicks</small></article></div>
      <section className="admin-panel" id="add-product"><div className="panel-heading"><h2>Add a product</h2><p>Enter the product details. A category image will be used automatically when no picture is uploaded.</p></div><ProductForm busy={busy} onError={(text) => setNotice({ type: "error", text })} onSave={(values) => run(() => adminRequest("/admin/products", { method: "POST", body: JSON.stringify(values) }), `${values.name} was added to the catalogue.`)}/></section>
      <section className="admin-panel" id="products"><div className="panel-heading"><h2>Manage products</h2><p>Edit descriptions and prices, change pictures, feature products or hide items that are no longer available.</p></div><div className="admin-product-list">{products.length ? products.map((product) => <article className="admin-product" key={product.id}><div className="admin-product-summary">{product.imageUrl ? <img src={product.imageUrl} alt=""/> : <div className="mini-placeholder">T</div>}<div><small>{product.category}</small><h3>{product.name}</h3><p>{Number(product.price) > 0 ? `K${Number(product.price).toLocaleString("en-ZM")}` : "Request price"} · {product.stockStatus} · {product.enquiries} enquiries{product.isFeatured ? " · Featured" : ""}</p></div><span className={product.isActive ? "published" : "hidden"}>{product.isActive ? "Visible" : "Hidden"}</span></div><div className="admin-product-actions"><details><summary>Edit product</summary><ProductForm compact product={product} busy={busy} onError={(text) => setNotice({ type: "error", text })} onSave={(values) => run(() => adminRequest(`/admin/products/${product.id}`, { method: "PUT", body: JSON.stringify(values) }), `${values.name} was updated.`)}/></details><button className="featured-button" disabled={busy} onClick={() => run(() => adminRequest(`/admin/products/${product.id}`, { method: "PUT", body: JSON.stringify({ isFeatured: !product.isFeatured }) }), product.isFeatured ? "Product removed from homepage." : "Product featured on homepage.")}>{product.isFeatured ? "Remove feature" : "Feature"}</button><button className="danger" disabled={busy || !product.isActive} onClick={() => window.confirm(`Hide ${product.name} from the catalogue?`) && run(() => adminRequest(`/admin/products/${product.id}`, { method: "DELETE" }), `${product.name} was hidden.`)}>Hide</button></div></article>) : <div className="admin-empty">No products yet. Add your first product above.</div>}</div></section>
    </section>
  </main>;
}

export default function App() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/shop") return <Shop/>;
  if (path === "/fiber" || path === "/fibre") return <Fiber/>;
  if (path === "/admin") return <AdminDashboard/>;
  return <Home/>;
}
