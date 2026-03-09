"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CalendarMonthRoundedIcon  from "@mui/icons-material/CalendarMonthRounded";
import PeopleAltRoundedIcon      from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import LocalHospitalRoundedIcon  from "@mui/icons-material/LocalHospitalRounded";
import DashboardIcon             from "@mui/icons-material/Dashboard";
import MenuRoundedIcon           from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon          from "@mui/icons-material/CloseRounded";
import { useDispatch } from "react-redux";
import { setHospitalCity } from "../redux/slices/hospitalSlice";

const navItems = [
  { label: "Dashboard",    href: "/",            icon: DashboardIcon },
  { label: "Appointments", href: "/appointments", icon: CalendarMonthRoundedIcon },
  { label: "Patients",     href: "/patients",     icon: PeopleAltRoundedIcon },
  { label: "Doctors",      href: "/doctors",      icon: MedicalServicesRoundedIcon },
  { label: "Hospitals",    href: "/hospitals",    icon: LocalHospitalRoundedIcon },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname  = usePathname();
  const dispatch  = useDispatch();

  /* ── Listen for external open trigger (e.g. AppBar hamburger) ── */
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-sidebar', handler);
    return () => window.removeEventListener('open-sidebar', handler);
  }, []);

  /* Lock body scroll when sidebar is open on mobile */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close sidebar on route change */
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .sidebar-root * {
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-sizing: border-box;
        }

        /* ── Sidebar panel ── */
        .sidebar-panel {
          width: 240px;
          min-width: 240px;
          max-width: 240px;
          flex-shrink: 0;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          box-shadow: 4px 0 24px rgba(6,143,210,0.20);
          overflow: hidden;
          z-index: 1201;
        }

        /* ── Nav links ── */
        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          white-space: nowrap;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e0f2fe, #f0f9ff);
          border-radius: 10px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .nav-link:hover::before { opacity: 1; }
        .nav-link:hover { color: #0284c7; transform: translateX(3px); }
        .nav-link.active {
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(14,165,233,0.35);
        }
        .nav-link.active::before { display: none; }
        .nav-link.active:hover   { transform: translateX(3px); color: #fff; }

        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; min-width: 34px; height: 34px;
          border-radius: 10px;
          background: #f1f5f9;
          flex-shrink: 0;
          transition: background 0.2s ease;
          position: relative;
          z-index: 1;
        }
        .nav-link:hover .icon-wrap  { background: #bae6fd; }
        .nav-link.active .icon-wrap { background: rgba(255,255,255,0.2); }

        .nav-label {
          position: relative;
          z-index: 1;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .active-dot {
          width: 6px; min-width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }
        .logo-icon {
          width: 42px; min-width: 42px; height: 42px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(14,165,233,0.3);
          flex-shrink: 0;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          margin: 0 16px;
          flex-shrink: 0;
        }

        /* ══ MOBILE / TABLET ══════════════════════════════════════════ */
        @media (max-width: 1023px) {

          /* Sidebar slides in from left */
          .sidebar-panel {
            position: fixed;
            top: 0; left: 0;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                        box-shadow 0.32s ease;
          }
          .sidebar-panel.open {
            transform: translateX(0);
            box-shadow: 8px 0 40px rgba(6,143,210,0.22), 24px 0 80px rgba(0,0,0,0.12);
          }

          /* Backdrop */
          .sidebar-backdrop {
            display: block;
          }

          /* Hamburger button */
          .hamburger-btn {
            display: flex;
          }
        }

        /* ══ DESKTOP — hide mobile-only elements ══════════════════════ */
        @media (min-width: 1024px) {
          .sidebar-backdrop { display: none !important; }
          .hamburger-btn    { display: none !important; }
        }

        /* ── Backdrop ── */
        .sidebar-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(3, 30, 60, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: backdropIn 0.28s ease both;
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sidebar-backdrop.closing {
          animation: backdropOut 0.26s ease both;
        }
        @keyframes backdropOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* ── Hamburger button ── */
        .hamburger-btn {
          display: none;
          position: fixed;
          top: 14px;
          left: 16px;
          z-index: 1199;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1.5px solid rgba(6,143,210,0.22);
          background: #ffffff;
          box-shadow: 0 2px 12px rgba(6,143,210,0.14);
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.2,0.64,1);
          outline: none;
          padding: 0;
        }
        .hamburger-btn:hover {
          background: rgba(6,143,210,0.08);
          border-color: rgba(6,143,210,0.45);
          box-shadow: 0 4px 18px rgba(6,143,210,0.22);
          transform: scale(1.06);
        }
        .hamburger-btn:active {
          transform: scale(0.94);
        }

        /* Hamburger icon lines animation */
        .ham-icon {
          transition: transform 0.22s ease, opacity 0.18s ease;
        }
        .ham-icon.open {
          transform: rotate(90deg);
          opacity: 0;
          position: absolute;
        }
        .close-icon {
          transition: transform 0.22s ease, opacity 0.18s ease;
          opacity: 0;
          position: absolute;
          transform: rotate(-90deg);
        }
        .close-icon.open {
          opacity: 1;
          transform: rotate(0deg);
        }

        /* Sidebar entrance animation (mobile) */
        @keyframes sidebarSlideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* ══ Hamburger button (mobile/tablet only) ══ */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        style={{ display: isOpen ? "none" : undefined }}
      >
        <MenuRoundedIcon style={{ fontSize: 21, color: "#068fd2", position: "relative", zIndex: 1 }} />
      </button>

      {/* ══ Backdrop (mobile/tablet only, shown when open) ══ */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* ══ Sidebar panel ══ */}
      <div className={`sidebar-root sidebar-panel ${isOpen ? "open" : ""}`}>

        {/* Logo row + close button (close only visible on mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 20px 20px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div className="logo-icon">
              <LocalHospitalRoundedIcon style={{ fontSize: 22, color: "#fff" }} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.2, whiteSpace: "nowrap", margin: 0 }}>
                Appointments
              </p>
              <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", margin: "2px 0 0" }}>
                Hospital System
              </p>
            </div>
          </div>

          {/* Close X — only visible on mobile/tablet */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32, height: 32,
              marginLeft: '20px',
              borderRadius: "9px",
              border: "1.5px solid rgba(6,143,210,0.20)",
              background: "rgba(6,143,210,0.06)",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.18s ease",
              outline: "none",
              padding: 0,
            }}
            className="sidebar-close-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(6,143,210,0.14)";
              e.currentTarget.style.borderColor = "rgba(6,143,210,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(6,143,210,0.06)";
              e.currentTarget.style.borderColor = "rgba(6,143,210,0.20)";
            }}
          >
            <CloseRoundedIcon style={{ fontSize: 16, color: "#068fd2" }} />
          </button>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .sidebar-close-btn { display: none !important; }
          }
        `}</style>

        <div className="divider" />

        {/* Nav */}
        <nav style={{ flex: 1, padding: "20px 12px", overflow: "hidden" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: "#94a3b8",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0 8px", marginBottom: 10, whiteSpace: "nowrap", margin: "0 0 10px",
          }}>
            Main Menu
          </p>

          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map(({ label, href, icon: Icon }, i) => {
              const isActive = pathname === href;

              const handleClick = () => {
                setIsOpen(false);
                if (label === "Doctors") dispatch(setHospitalCity(null));
              };

              return (
                <li key={href} style={{
                  animation: isOpen ? `navItemIn 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both` : "none",
                }}>
                  <style>{`
                    @keyframes navItemIn {
                      from { opacity: 0; transform: translateX(-14px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }
                  `}</style>
                  <Link
                    href={href}
                    onClick={handleClick}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    <span className="icon-wrap">
                      <Icon style={{ fontSize: 17 }} />
                    </span>
                    <span className="nav-label">{label}</span>
                    {isActive && <span className="active-dot" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </>
  );
};

export default Sidebar;