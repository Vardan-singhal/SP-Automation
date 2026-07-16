import React, { useState, useEffect } from 'react';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const TYPE_ICON = {
  hours: 'bi-clock-fill',
  address: 'bi-geo-alt-fill',
  email: 'bi-envelope-fill',
  phone: 'bi-telephone-outbound-fill',
};

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState([]);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Top navbar (address / hours / email / phone) — admin managed
  const [topBarItems, setTopBarItems] = useState([]);

  // Products dropdown (categories + standalone products) — admin managed
  const [productsMenu, setProductsMenu] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 110);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-visible', showMobileMenu);
  }, [showMobileMenu]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios
      .get(`${API_URL}/topbar`)
      .then((res) => setTopBarItems(res.data))
      .catch(() => setTopBarItems([])); // fail silently, header just won't show the strip
  }, []);

  // NEW: fetch the admin-managed Products dropdown structure
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    axios
      .get(`${API_URL}/navbar/products-menu`)
      .then((res) => setProductsMenu(res.data))
      .catch(() => setProductsMenu([])); // fail silently, dropdown just shows "All Products" only
  }, []);

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    setOpenSubmenu([]);
  };

  const handleSubmenuToggle = (e, key) => {
    e.preventDefault();
    setOpenSubmenu(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };


  const searchData = [
    // Company
    { label: "About Us", href: "/ourcompany/about" },
    { label: "Mission & Vision", href: "/ourcompany/mission-vision" },
    { label: "Why Choose Us", href: "/ourcompany/chooseus" },
    { label: "Our Team", href: "/ourcompany/team" },
    { label: "FAQs", href: "/ourcompany/spautomationfaqs" },

    // Products (still static for search — not part of this update)
    { label: "All Products", href: "/products" },
    { label: "Mono-Crystalline Solar Panel 550W", href: "/products/1" },
    { label: "Poly-Crystalline Solar Panel 330W", href: "/products/2" },
    { label: "On-Grid Solar Inverter", href: "/products/3" },
    { label: "Hybrid Solar MPPT Inverter 10.2kW", href: "/products/4" },
    { label: "LFP Battery 25.6V 310Ah", href: "/products/5" },
    { label: "LFP Battery 25.6V 120Ah", href: "/products/6" },
    { label: "LFP Battery 48V 230Ah", href: "/products/7" },
    { label: "LFP Battery 25.6V 240Ah", href: "/products/8" },
    { label: "LFP Battery 25.6V 100Ah", href: "/products/9" },
    { label: "LFP Battery 25.6V 344Ah", href: "/products/10" },
    { label: "MPPT Solar Charge Controller (Solar Series)", href: "/products/11" },
    { label: "DC Surge Protection Device", href: "/products/12" },
    { label: "Rooftop Solar Mounting Structure", href: "/products/13" },
    { label: "3kW Grid-Tie Inverter", href: "/products/14" },

    // Services
    { label: 'Solar Project Consultancy', href: '/ourservices/solar-consultancy-services' },
    { label: 'System Design & Engineering', href: '/ourservices/system-design-engineering' },
    { label: 'EPC (Engineering, Procurement & Construction)', href: '/ourservices/engineering-procurement-container' },
    { label: 'Rooftop Solar Services', href: '/ourservices/rooftop-solar-services' },
    { label: 'Energy Storage Integration', href: '/ourservices/energy-storage-integration' },
    { label: 'Custom Solar Solutions', href: '/ourservices/custom-solar-solution' },
    { label: 'Turnkey Solutions for Enterprises', href: '/ourservices/turnkey-solution-for-enterprises' },
    { label: 'Operations & Maintenance (O&M)', href: '/ourservices/operation-maintenance' },
    { label: 'Remote Monitoring & Energy Analytics', href: '/ourservices/remote-monitoring-energy-analytics' },
    { label: 'Training & Technical Support', href: '/ourservices/training-technical-support' },

    // Blog
    { label: "Blogs", href: "/blogs" },

    // Contact
    { label: "Contact Us", href: "/contact" },

    // Home
    { label: "Home", href: "/" },
  ];



  // =============================================
  // 🔍 HANDLE SEARCH INPUT
  // =============================================
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // =============================================
  // NEW: Turn the API's productsMenu data into the
  // { label, href, submenu } shape the rest of this
  // file already knows how to render.
  // =============================================
  const productsSubmenu = [
    { label: 'All Products', href: '/products' },
    ...productsMenu.map((entry) =>
      entry.type === 'category'
        ? {
            label: entry.label,
            href: '#',
            submenu: (entry.children || []).map((child) => ({
              label: child.label,
              href: `/products/${child.id}`,
            })),
          }
        : { label: entry.label, href: `/products/${entry.id}` }
    ),
  ];

  // =============================================
  // HEADER MENU ITEMS
  // =============================================
  const menuItems = [
    { label: 'Home', href: '/', current: true },

    {
      label: 'Our Company',
      href: '#',
      submenu: [
        { label: 'About Us', href: '/ourcompany/about' },
        { label: 'Mission & Vision', href: '/ourcompany/mission-vision' },
        { label: 'Why Choose Us', href: '/ourcompany/chooseus' },
        { label: 'Our Team', href: '/ourcompany/team' },
        { label: 'FAQs', href: '/ourcompany/spautomationfaqs' },
      ],
    },

    {
      label: 'Products',
      href: '#',
      submenu: productsSubmenu, // <-- now dynamic, admin-controlled
    },

    {
      label: 'Services',
      href: '#',
      submenu: [
        { label: 'Solar Project Consultancy', href: '/ourservices/solar-consultancy-services' },
        { label: 'System Design & Engineering', href: '/ourservices/system-design-engineering' },
        { label: 'EPC (Engineering, Procurement & Construction)', href: '/ourservices/engineering-procurement-container' },
        { label: 'Rooftop Solar Services', href: '/ourservices/rooftop-solar-services' },
        { label: 'Energy Storage Integration', href: '/ourservices/energy-storage-integration' },
        { label: 'Custom Solar Solutions', href: '/ourservices/custom-solar-solution' },
        { label: 'Turnkey Solutions for Enterprises', href: '/ourservices/turnkey-solution-for-enterprises' },
        { label: 'Operations & Maintenance (O&M)', href: '/ourservices/operation-maintenance' },
        { label: 'Remote Monitoring & Energy Analytics', href: '/ourservices/remote-monitoring-energy-analytics' },
        { label: 'Training & Technical Support', href: '/ourservices/training-technical-support' }
      ],
    },

    { label: 'Blog', href: '/blogs' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const logoUrl = "/assets/Banners/sp-icon.png";
  const logoFallback = "/assets/Banners/sp-icon.png";

  // Recursive render for desktop submenu
  const renderDesktopSubmenu = (subs, level = 0) => (
    <ul className={`submenu ${level > 0 ? 'submenu-level-' + level : ''}`}>
      {subs.map((sub, subIdx) => (
        <li key={subIdx} className={sub.submenu ? 'dropdown' : ''}>
          <a
          href={sub.href}>
            {sub.label} {sub.submenu && <i className="bi bi-chevron-down"></i>}
          </a>
          {sub.submenu && renderDesktopSubmenu(sub.submenu, level + 1)}
        </li>
      ))}
    </ul>
  );

  // Recursive render for mobile submenu
  const renderMobileSubmenu = (subs, parentKey) => (
    <>
      {subs.map((sub, subIdx) => {
        const subKey = `${parentKey}-${subIdx}`;
        return (
          <li key={subIdx} className={sub.submenu ? 'dropdown' : ''}>
            <div
              className="mobile-menu-item"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <a
                href={sub.href}
                onClick={sub.submenu ? (e) => e.preventDefault() : closeMobileMenu}
                className="mobile-link"
              >
                {sub.label}
              </a>
              {sub.submenu && (
                <button
                  className="dropdown-btn"
                  aria-expanded={openSubmenu.includes(subKey)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmenuToggle(e, subKey);
                  }}
                >
                  <i className={`bi ${openSubmenu.includes(subKey) ? 'bi-dash' : 'bi-plus'}`}></i>
                </button>
              )}
            </div>
            {sub.submenu && (
              <ul className={`submenu ${openSubmenu.includes(subKey) ? 'open' : ''}`}>
                {renderMobileSubmenu(sub.submenu, subKey)}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );

  return (
    <>
      {/* 🔍 SEARCH POPUP */}
      <div className={`search-popup ${showSearch ? 'popup-visible' : ''}`}>
        <div className="popup-inner">
          <div className="upper-box">
            <figure className="logo-box">
              <a href="/">

              </a>
            </figure>

            <div className="close-search" onClick={toggleSearch}>
              <i className="bi bi-x-lg"></i>
            </div>
          </div>

          <div className="auto-container">
            <div className="search-form">

              {/* Search Input */}
              <input
                type="text"
                className="form-control"
                placeholder="Type something..."
                value={query}
                onChange={handleSearchInput}
                autoFocus
              />

              {/* Suggestions List */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((item, i) => (
                    <li key={i} onClick={() => (window.location.href = item.href)}>
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER START */}
      <header className={`main-header ${isSticky ? 'fixed-header' : ''}`}>
        <div className="header-top">
          <div className="top-inner display-flex">
            <ul className="info flex justify-between items-center">
              {topBarItems.map((item) => (
                <li key={item._id}>
                  <i className={`bi ${item.icon || TYPE_ICON[item.type]}`}></i>{' '}
                  {item.link ? <a href={item.link}>{item.value}</a> : item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`header-lower ${isSticky ? 'sticky-header' : ''}`}>
          <div className="outer-box">
            <div className="logo-box">
              <figure className="logo">
                <a href="/">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    onError={(e) => { e.target.onerror = null; e.target.src = logoFallback; }}
                  />
                </a>
              </figure>
            </div>

            <div className="menu-area">
              <nav className="main-menu">
                <ul className="navigation">
                  {menuItems.map((item, idx) => (
                    <li
                      key={idx}
                      className={`${item.current ? 'current' : ''} ${item.submenu ? 'dropdown' : ''}`}
                    >
                      <a href={item.href}>
                        {item.label} {item.submenu && <i className="bi bi-chevron-down"></i>}
                      </a>

                      {item.submenu && renderDesktopSubmenu(item.submenu)}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="nav-right ">
              <div className="search-box-outer" onClick={toggleSearch}>
                <i className="bi bi-search"></i>
              </div>

<a
  href="/assets/Banners/Catalogue Inverter.pdf"
  download
  className="theme-btn btn-one"
>
  <i className="bi bi-file-arrow-down mr-3"></i>
  Catalogues
</a>

              <div className="mobile-nav-toggler" onClick={toggleMobileMenu}>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${showMobileMenu ? 'mobile-menu-visible' : ''}`}>
        <div className="menu-backdrop" onClick={closeMobileMenu}></div>
        <div className="menu-box">
          <div className="close-btn" onClick={closeMobileMenu}><i className="bi bi-x-lg"></i></div>

          <div className="nav-logo">
            <img src={logoUrl} alt="Logo" />
          </div>

          <div className="menu-outer">
            <ul className="navigation">
              {menuItems.map((item, idx) => (
                <li key={idx} className={`${item.submenu ? 'dropdown' : ''}`}>
                  <div
                    className="mobile-menu-item"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <a
                      href={item.href}
                      onClick={item.submenu ? (e) => e.preventDefault() : closeMobileMenu}
                      className="mobile-link"
                    >
                      {item.label}
                    </a>

                    {item.submenu && (
                      <button
                        className="dropdown-btn"
                        aria-expanded={openSubmenu.includes(idx.toString())}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubmenuToggle(e, idx.toString());
                        }}
                      >
                        <i className={`bi ${openSubmenu.includes(idx.toString()) ? 'bi-dash' : 'bi-plus'}`}></i>
                      </button>
                    )}
                  </div>

                  {item.submenu && (
                    <ul className={`submenu ${openSubmenu.includes(idx.toString()) ? 'open' : ''}`}>
                      {renderMobileSubmenu(item.submenu, idx.toString())}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;