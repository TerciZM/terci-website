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
  ["/images/starlink-sunset.jfif", "Starlink", "Business connectivity installation", "wide"],
  ["/images/cctv-install.jpeg", "Security", "Hikvision CCTV deployment", ""],
  ["/images/wireless-link.jpeg", "Networking", "Point-to-point wireless link", ""],
  ["/images/cctv-team-install.jpeg", "Security", "Industrial CCTV installation", ""],
  ["/images/cctv-industrial-camera.jpeg", "CCTV", "Protected camera mounting", ""],
  ["/images/starlink-install.jpeg", "Starlink", "Custom wall-mounted installation", "wide"],
];

const categories = [
  ["Starlink & accessories", "Satellite internet equipment, mounting accessories and professional installation.", "/images/starlink-hero.jpeg"],
  ["CCTV & security", "Cameras, recorders, access control, alarms and perimeter protection equipment.", "/images/cctv-industrial-camera.jpeg"],
  ["Networking & Wi-Fi", "Business routers, access points, switches and wireless-link equipment.", "/images/outdoor-ap.jpeg"],
  ["Fibre tools & materials", "Fibre cable, accessories, termination materials and installation tools.", "/images/fibre-cabinet.JPG"],
  ["Electrical & solar", "Reliable power distribution and backup solutions for ICT equipment.", "/images/electrical-board.jpeg"],
  ["Business technology", "Practical ICT equipment selected for Zambian homes, offices and field sites.", "/images/client-handover.jpeg"],
];

function Header({ active = "home" }) {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Terci Communications home"><img src="/images/terci-mark.png" alt=""/><span><strong>TERCI</strong><small>COMMUNICATIONS LIMITED</small></span></a>
    <nav className="main-nav" aria-label="Main navigation"><a href="/" aria-current={active === "home" ? "page" : undefined}>Home</a><a href="/#services">Services</a><a href="/fiber" aria-current={active === "fiber" ? "page" : undefined}>Fibre</a><a href="/shop" aria-current={active === "shop" ? "page" : undefined}>Products</a><a href="/#work">Projects</a><a href="/#coverage">Coverage</a><a href="/#contact">Contact</a></nav>
    <details className="mobile-nav"><summary aria-label="Open navigation">Menu</summary><div><a href="/">Home</a><a href="/#services">Services</a><a href="/fiber">Fibre</a><a href="/shop">Products</a><a href="/#work">Projects</a><a href="/#coverage">Coverage</a><a href="/#contact">Contact</a></div></details>
    <a className="header-cta" href={`${WA}?text=Hello%20Terci%20Communications%2C%20I%20would%20like%20a%20quotation.`} target="_blank" rel="noreferrer">Get a quotation</a>
  </header>;
}

function Footer() {
  return <><footer><a className="brand footer-brand" href="/"><img src="/images/terci-mark.png" alt=""/><span><strong>TERCI</strong><small>COMMUNICATIONS LIMITED</small></span></a><p>Integrated Security &amp; Connectivity Solutions</p><div><a href="mailto:info@terci.net">info@terci.net</a><a href="tel:+260972888575">+260 972 888 575</a></div><small>© 2026 Terci Communications Limited. Zambia.</small></footer><a className="floating-wa" href={WA} target="_blank" rel="noreferrer" aria-label="Contact Terci on WhatsApp">WA</a></>;
}

function CategoryProducts({ compact = false }) {
  const shown = compact ? categories.slice(0, 4) : categories;
  return <div className={compact ? "category-image-grid" : "product-grid"}>{shown.map(([name, description, image]) => compact ? <a href="/shop" key={name}><img src={image} alt={name}/><span>{name}</span></a> : <article className="product-card" key={name}><div className="product-image"><img src={image} alt={name}/><span>Ask for availability</span></div><div className="product-copy"><small>TERCI SUPPLY</small><h3>{name}</h3><p>{description}</p><div><b>Request price</b><a href={`${WA}?text=${encodeURIComponent(`Hello Terci, I am interested in ${name}.`)}`} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a></div></div></article>)}</div>;
}

const categoryFallback = (category = "") => {
  const value = category.toLowerCase();
  if (value.includes("starlink") || value.includes("satellite")) return "/images/starlink-hero.jpeg";
  if (value.includes("cctv") || value.includes("security")) return "/images/cctv-industrial-camera.jpeg";
  if (value.includes("fibre") || value.includes("fiber")) return "/images/fibre-cabinet.JPG";
  if (value.includes("electric") || value.includes("solar")) return "/images/electrical-board.jpeg";
  if (value.includes("network") || value.includes("wi-fi") || value.includes("wifi")) return "/images/outdoor-ap.jpeg";
  return "/images/client-handover.jpeg";
};

function ProductCard({ product }) {
  const enquire = () => fetch(`${API}/enquiries/${product.id}`, { method: "POST" }).catch(() => {});
  return <article className="product-card">
    <div className="product-image"><img src={product.imageUrl || categoryFallback(product.category)} alt={product.name}/><span>{product.stockStatus || "Ask for availability"}</span></div>
    <div className="product-copy"><small>{product.category || "TERCI SUPPLY"}</small><h3>{product.name}</h3><p>{product.description || "Contact our team for specifications, availability and installation support."}</p><div><b>{Number(product.price) > 0 ? `K${Number(product.price).toLocaleString("en-ZM", { maximumFractionDigits: 2 })}` : "Request price"}</b><a href={`${WA}?text=${encodeURIComponent(`Hello Terci, I am interested in ${product.name}.`)}`} onClick={enquire} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a></div></div>
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
  if (loading) return <div className="empty-catalog"><b>Loading the Terci catalogue…</b><p>Please wait while we fetch the latest products.</p></div>;
  if (!products.length) return <CategoryProducts/>;
  return <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.id}/>)}</div>;
}

function Home() {
  return <main><Header/>
    <section className="hero" id="home"><div className="hero-grid" aria-hidden="true"/><div className="hero-copy"><div className="availability"><span/> Available for projects across Zambia</div><p className="eyebrow">Security systems · Connectivity · ICT infrastructure</p><h1>Technology that keeps your <em>business moving.</em></h1><p className="hero-text">Terci Communications delivers dependable connectivity, security and network infrastructure across Zambia—from first survey to installation and ongoing support.</p><div className="hero-actions"><a className="btn primary" href={`${WA}?text=Hello%20Terci%20Communications%2C%20I%20need%20help%20with...`} target="_blank" rel="noreferrer">Talk to our team <span>↗</span></a><a className="btn secondary" href="#work">See our work <span>↓</span></a></div><div className="trust-row"><span><b>20+</b> Starlink installations</span><span><b>Nationwide</b> field capability</span><span><b>End-to-end</b> technical support</span></div></div><div className="hero-visual"><div className="photo-frame"><img src="/images/starlink-hero.jpeg" alt="A completed Starlink installation by Terci Communications"/></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="signal-card"><span className="pulse"/> <b>Connected.</b><small>Built for reliable service.</small></div><div className="experience-card"><b>12+</b><span>years of<br/>technical experience</span></div></div></section>
    <section className="marquee" aria-label="Terci services"><div><b>STARLINK INSTALLATION</b><i>✦</i><b>CCTV &amp; SECURITY</b><i>✦</i><b>FIBRE NETWORKS</b><i>✦</i><b>BUSINESS WI-FI</b><i>✦</i><b>ACCESS CONTROL</b><i>✦</i><b>TECHNICAL SUPPORT</b><i>✦</i></div></section>
    <section className="section services" id="services"><div className="section-heading"><div><p className="eyebrow">What we deliver</p><h2>One partner. <span className="outline-text">Complete</span> ICT solutions.</h2></div><p>Practical systems designed around your site, your risks and your growth plans—not a one-size-fits-all package.</p></div><div className="service-grid">{services.map(([n,title,text,id])=><article className="service-card" id={id} key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p><a href={id === "fibre" ? "/fiber" : `${WA}?text=${encodeURIComponent(`Hello Terci, I am interested in ${title}.`)}`} target={id === "fibre" ? undefined : "_blank"} rel="noreferrer">{id === "fibre" ? "Explore fibre" : "Enquire"} <b>→</b></a></article>)}</div></section>
    <section className="coverage-section" id="coverage"><div><p className="eyebrow">Nationwide project delivery</p><h2>Built on the Copperbelt.<br/><span>Ready across Zambia.</span></h2><p>Our Copperbelt hub gives customers fast local response, while our field teams deploy connectivity, security, fibre and ICT infrastructure for projects throughout Zambia.</p><div className="coverage-note"><b>Rapid response</b><span>Kitwe, Ndola and the wider Copperbelt</span></div></div><div className="zambia-coverage"><div className="coverage-hub"><small>OPERATIONAL HUB</small><b>Copperbelt</b><span>National field deployment</span></div><div className="province-grid">{["Copperbelt","Lusaka","Central","North-Western","Northern","Luapula","Muchinga","Eastern","Southern","Western"].map(x=><span key={x}>{x}</span>)}</div></div></section>
    <section className="section work" id="work"><div className="section-heading light"><div><p className="eyebrow">Proof in the field</p><h2>Real installations.<br/><span className="red-script">Real capability.</span></h2></div><p>Our portfolio shows the workmanship behind the promise—from clean cable routes and secure mounts to commissioned, working systems.</p></div><div className="project-grid">{projects.map(([image,label,title,cls])=><figure className={cls} key={title}><img src={image} alt={title} loading="lazy"/><figcaption><span>{label}</span><b>{title}</b></figcaption></figure>)}</div></section>
    <section className="home-products" id="products"><div className="home-products-heading"><div><p className="eyebrow">Equipment supplied by Terci</p><h2>Products you can buy.<br/><span>Expert support included.</span></h2></div><div><p>Selected Starlink, CCTV, networking, fibre and ICT products—available with professional installation and nationwide support.</p><a href="/shop">View all products <span>→</span></a></div></div><FeaturedProducts/></section>
    <section className="section why" id="about"><div className="why-image"><img src="/images/outdoor-ap.jpeg" alt="Outdoor networking equipment installed by Terci Communications"/><span>Zambian-owned.<br/>Built for local realities.</span></div><div className="why-copy"><p className="eyebrow">Why Terci</p><h2>Technical depth.<br/>Business understanding.</h2><p>We combine hands-on field experience with an enterprise approach to planning, safety and support. That means solutions that work on installation day—and remain supportable as your organisation grows.</p><ul><li><span>✓</span><div><b>Qualified, hands-on technicians</b><small>Experienced across connectivity, networking and security systems.</small></div></li><li><span>✓</span><div><b>Clear scopes and honest recommendations</b><small>We design for the requirement, not simply the biggest invoice.</small></div></li><li><span>✓</span><div><b>Support beyond installation</b><small>Maintenance, troubleshooting and expansion when you need it.</small></div></li></ul></div></section>
    <section className="cta-section" id="contact"><div className="cta-ring ring-a"/><div className="cta-ring ring-b"/><p className="eyebrow">Start your project</p><h2>Let’s build a solution<br/>that works for you.</h2><p>Tell us what you need. We’ll help you define the right scope and provide a clear quotation.</p><div className="cta-actions"><a className="btn white" href={`${WA}?text=Hello%20Terci%20Communications%2C%20I%20would%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noreferrer">Chat on WhatsApp <span>↗</span></a><a href="tel:+260972888575">Call +260 972 888 575</a></div></section><Footer/>
  </main>;
}

function Shop() {
  return <main className="shop-page"><Header active="shop"/><section className="shop-hero"><div><p className="eyebrow">Terci equipment catalogue</p><h1>Technology selected for <em>real-world use.</em></h1><p>Browse connectivity, security, fibre and networking products supplied by Terci Communications. Ask our team for pricing, delivery and installation anywhere in Zambia.</p></div><div className="shop-orbit" aria-hidden="true"><span>STARLINK</span><span>CCTV</span><span>FIBRE</span><span>NETWORKING</span><b>TERCI<br/>SUPPLY</b></div></section><section className="shop-listing"><div className="shop-title"><div><p className="eyebrow">What we supply</p><h2>Equipment for your next project.</h2></div><p>The catalogue is managed securely from the Terci admin dashboard. When a product has no picture, a matching generic category image is used.</p></div><PublicCatalogue/></section><section className="shop-support"><p className="eyebrow">More than a product</p><h2>Supply, installation and support—from one team.</h2><p>Terci can help you select the right equipment, install it professionally and support it after commissioning.</p><a className="btn white" href={`${WA}?text=Hello%20Terci%2C%20please%20help%20me%20scope%20an%20equipment%20and%20installation%20requirement.`} target="_blank" rel="noreferrer">Discuss your requirement <span>↗</span></a></section><Footer/></main>;
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
