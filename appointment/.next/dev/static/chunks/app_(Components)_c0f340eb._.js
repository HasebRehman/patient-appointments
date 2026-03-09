(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(Components)/Sidebar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CalendarMonthRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CalendarMonthRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$PeopleAltRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/PeopleAltRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$MedicalServicesRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/MedicalServicesRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LocalHospitalRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/LocalHospitalRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Dashboard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$MenuRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/MenuRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CloseRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CloseRounded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$hospitalSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/redux/slices/hospitalSlice.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const navItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    {
        label: "Appointments",
        href: "/appointments",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CalendarMonthRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    {
        label: "Patients",
        href: "/patients",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$PeopleAltRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    {
        label: "Doctors",
        href: "/doctors",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$MedicalServicesRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    {
        label: "Hospitals",
        href: "/hospitals",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LocalHospitalRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
];
const Sidebar = ()=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    /* ── Listen for external open trigger (e.g. AppBar hamburger) ── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const handler = {
                "Sidebar.useEffect.handler": ()=>setIsOpen(true)
            }["Sidebar.useEffect.handler"];
            window.addEventListener('open-sidebar', handler);
            return ({
                "Sidebar.useEffect": ()=>window.removeEventListener('open-sidebar', handler)
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    /* Lock body scroll when sidebar is open on mobile */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (typeof document === "undefined") return;
            document.body.style.overflow = isOpen ? "hidden" : "";
            return ({
                "Sidebar.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], [
        isOpen
    ]);
    /* Close sidebar on route change */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            setIsOpen(false);
        }
    }["Sidebar.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/app/(Components)/Sidebar.jsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "hamburger-btn",
                onClick: ()=>setIsOpen(true),
                "aria-label": "Open menu",
                style: {
                    display: isOpen ? "none" : undefined
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$MenuRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    style: {
                        fontSize: 21,
                        color: "#068fd2",
                        position: "relative",
                        zIndex: 1
                    }
                }, void 0, false, {
                    fileName: "[project]/app/(Components)/Sidebar.jsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/(Components)/Sidebar.jsx",
                lineNumber: 272,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sidebar-backdrop",
                onClick: ()=>setIsOpen(false),
                "aria-label": "Close menu"
            }, void 0, false, {
                fileName: "[project]/app/(Components)/Sidebar.jsx",
                lineNumber: 283,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `sidebar-root sidebar-panel ${isOpen ? "open" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "24px 20px 20px",
                            justifyContent: "space-between"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "logo-icon",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LocalHospitalRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            style: {
                                                fontSize: 22,
                                                color: "#fff"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/(Components)/Sidebar.jsx",
                                            lineNumber: 297,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            overflow: "hidden"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 15,
                                                    fontWeight: 700,
                                                    color: "#0f172a",
                                                    lineHeight: 1.2,
                                                    whiteSpace: "nowrap",
                                                    margin: 0
                                                },
                                                children: "Appointments"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                lineNumber: 300,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: "#94a3b8",
                                                    fontWeight: 500,
                                                    marginTop: 2,
                                                    whiteSpace: "nowrap",
                                                    margin: "2px 0 0"
                                                },
                                                children: "Hospital System"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                lineNumber: 303,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsOpen(false),
                                "aria-label": "Close sidebar",
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 32,
                                    height: 32,
                                    marginLeft: '20px',
                                    borderRadius: "9px",
                                    border: "1.5px solid rgba(6,143,210,0.20)",
                                    background: "rgba(6,143,210,0.06)",
                                    cursor: "pointer",
                                    flexShrink: 0,
                                    transition: "all 0.18s ease",
                                    outline: "none",
                                    padding: 0
                                },
                                className: "sidebar-close-btn",
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = "rgba(6,143,210,0.14)";
                                    e.currentTarget.style.borderColor = "rgba(6,143,210,0.45)";
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = "rgba(6,143,210,0.06)";
                                    e.currentTarget.style.borderColor = "rgba(6,143,210,0.20)";
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CloseRounded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    style: {
                                        fontSize: 16,
                                        color: "#068fd2"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(Components)/Sidebar.jsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
          @media (min-width: 1024px) {
            .sidebar-close-btn { display: none !important; }
          }
        `
                    }, void 0, false, {
                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divider"
                    }, void 0, false, {
                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            flex: 1,
                            padding: "20px 12px",
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#94a3b8",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    padding: "0 8px",
                                    marginBottom: 10,
                                    whiteSpace: "nowrap",
                                    margin: "0 0 10px"
                                },
                                children: "Main Menu"
                            }, void 0, false, {
                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: {
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4
                                },
                                children: navItems.map(({ label, href, icon: Icon }, i)=>{
                                    const isActive = pathname === href;
                                    const handleClick = ()=>{
                                        setIsOpen(false);
                                        if (label === "Doctors") dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$redux$2f$slices$2f$hospitalSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHospitalCity"])(null));
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        style: {
                                            animation: isOpen ? `navItemIn 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both` : "none"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                                children: `
                    @keyframes navItemIn {
                      from { opacity: 0; transform: translateX(-14px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }
                  `
                                            }, void 0, false, {
                                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                lineNumber: 373,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: href,
                                                onClick: handleClick,
                                                className: `nav-link ${isActive ? "active" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "icon-wrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            style: {
                                                                fontSize: 17
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                            lineNumber: 385,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                        lineNumber: 384,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "nav-label",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "active-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                        lineNumber: 388,
                                                        columnNumber: 34
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, href, true, {
                                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/(Components)/Sidebar.jsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(Components)/Sidebar.jsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/(Components)/Sidebar.jsx",
                lineNumber: 291,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Sidebar, "8h98tu24XKEDBZzGqRxlrWAqao4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
_c = Sidebar;
const __TURBOPACK__default__export__ = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(Components)/layout.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Componentsl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$Components$292f$Sidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(Components)/Sidebar.jsx [app-client] (ecmascript)");
"use client";
;
;
function Componentsl({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$Components$292f$Sidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/(Components)/layout.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/(Components)/layout.jsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(Components)/layout.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(Components)/layout.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Componentsl;
var _c;
__turbopack_context__.k.register(_c, "Componentsl");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28Components%29_c0f340eb._.js.map