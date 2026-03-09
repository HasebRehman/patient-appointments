"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import PrivacyTipIcon         from '@mui/icons-material/PrivacyTip';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ManageAccountsIcon      from '@mui/icons-material/ManageAccounts';
import LockIcon                from '@mui/icons-material/Lock';
import CookieIcon              from '@mui/icons-material/Cookie';
import StorageIcon             from '@mui/icons-material/Storage';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import VerifiedUserIcon        from '@mui/icons-material/VerifiedUser';
import AutorenewIcon           from '@mui/icons-material/Autorenew';
import LocalHospitalIcon       from '@mui/icons-material/LocalHospital';
import CheckCircleOutlineIcon  from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon       from '@mui/icons-material/CalendarMonth';
import ShieldIcon              from '@mui/icons-material/Shield';

/* ─── Design Tokens ─────────────────────────────────────────────────── */
const C = {
  primary:     '#068fd2',
  primaryDark: '#0570a6',
  primaryDeep: '#034e76',
  primaryBg:   'rgba(6,143,210,0.08)',
  primaryBdr:  'rgba(6,143,210,0.22)',
  accent:      '#00c6a7',
  accentBg:    'rgba(0,198,167,0.08)',
  accentBdr:   'rgba(0,198,167,0.28)',
  accentDark:  '#009e85',
  amber:       '#f59e0b',
  amberBg:     'rgba(245,158,11,0.08)',
  amberBdr:    'rgba(245,158,11,0.22)',
  surface:     '#ffffff',
  surfaceAlt:  '#f4f8fc',
  border:      '#e0ecf5',
  text:        '#0f1f2e',
  textMid:     '#445566',
  textLight:   '#7a96ab',
};
const FF        = "'Nunito', sans-serif";
const SIDEBAR_W = 260;

/* ─── Sections data ─────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: '01', title: 'Information Collection',
    icon: <CollectionsBookmarkIcon />,
    color: C.primary, bg: C.primaryBg, bdr: C.primaryBdr,
    gradA: C.primary, gradB: C.primaryDark,
    items: [
      'We collect personal information such as name, contact details, medical record number (MRN), and appointment details to provide booking services.',
      'We also collect data automatically through website usage for analytics and service improvement.',
    ],
  },
  {
    id: '02', title: 'Use of Information',
    icon: <ManageAccountsIcon />,
    color: C.accent, bg: C.accentBg, bdr: C.accentBdr,
    gradA: C.accent, gradB: C.accentDark,
    items: [
      'Personal data is used to manage appointments, communicate with patients, and improve the website\'s functionality.',
      'We do not sell or share personal information with third parties for marketing purposes.',
    ],
  },
  {
    id: '03', title: 'Security',
    icon: <LockIcon />,
    color: C.primary, bg: C.primaryBg, bdr: C.primaryBdr,
    gradA: C.primary, gradB: C.primaryDark,
    items: [
      'We implement industry-standard security measures to protect your data.',
      'Users are responsible for keeping their account credentials confidential.',
    ],
  },
  {
    id: '04', title: 'Cookies',
    icon: <CookieIcon />,
    color: C.amber, bg: C.amberBg, bdr: C.amberBdr,
    gradA: C.amber, gradB: '#d97706',
    items: [
      'The website may use cookies for session management and user experience improvement.',
      'You can disable cookies via your browser settings, but some features may not function properly.',
    ],
  },
  {
    id: '05', title: 'Data Retention',
    icon: <StorageIcon />,
    color: C.accent, bg: C.accentBg, bdr: C.accentBdr,
    gradA: C.accent, gradB: C.accentDark,
    items: [
      'Personal data will be retained only as long as necessary for providing services or as required by law.',
    ],
  },
  {
    id: '06', title: 'Third-Party Services',
    icon: <IntegrationInstructionsIcon />,
    color: '#f97316', bg: 'rgba(249,115,22,0.08)', bdr: 'rgba(249,115,22,0.22)',
    gradA: '#f97316', gradB: '#ea6d0e',
    items: [
      'Any third-party integrations (e.g., payment gateways, APIs) are governed by their own privacy policies.',
    ],
  },
  {
    id: '07', title: 'User Rights',
    icon: <VerifiedUserIcon />,
    color: C.primary, bg: C.primaryBg, bdr: C.primaryBdr,
    gradA: C.primary, gradB: C.primaryDark,
    items: [
      'Users can request access to, correction, or deletion of their personal information by contacting the website administrators.',
    ],
  },
  {
    id: '08', title: 'Changes to Privacy Policy',
    icon: <AutorenewIcon />,
    color: C.accent, bg: C.accentBg, bdr: C.accentBdr,
    gradA: C.accent, gradB: C.accentDark,
    items: [
      'We may update this policy periodically.',
      'Continued use of the website implies acceptance of the updated privacy policy.',
    ],
  },
];

/* ─── Section Card ──────────────────────────────────────────────────── */
const SectionCard = ({ section, index, visible }) => (
  <Box sx={{
    bgcolor: C.surface, border: `1px solid ${C.border}`,
    borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 2px 14px rgba(6,143,210,0.05)',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.42s ease ${index * 55}ms, transform 0.42s cubic-bezier(0.22,1,0.36,1) ${index * 55}ms, box-shadow 0.22s ease, border-color 0.22s ease`,
    '&:hover': {
      boxShadow: `0 10px 34px rgba(6,143,210,0.11)`,
      borderColor: section.bdr,
      transform: visible ? 'translateY(-2px)' : 'translateY(22px)',
    },
  }}>
    <Box sx={{ height: 3, background: `linear-gradient(90deg, ${section.gradA}, ${section.gradB})` }} />
    <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, mb: 2 }}>
        <Box sx={{
          width: 42, height: 42, borderRadius: '13px', flexShrink: 0,
          bgcolor: section.bg, border: `1.5px solid ${section.bdr}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1)',
          '.MuiBox-root:hover &': { transform: 'scale(1.1) rotate(-5deg)' },
        }}>
          {React.cloneElement(section.icon, { sx: { fontSize: 19, color: section.color } })}
        </Box>
        <Box>
          {/* <Box sx={{
            display: 'inline-flex', alignItems: 'center',
            px: 1, py: 0.2, borderRadius: '6px', mb: 0.4,
            bgcolor: section.bg, border: `1px solid ${section.bdr}`,
          }}>
            <Typography fontSize="0.58rem" fontWeight={900} fontFamily={FF}
              color={section.color} letterSpacing="0.08em" textTransform="uppercase">
              Section {section.id}
            </Typography>
          </Box> */}
          <Typography fontWeight={800} fontSize="0.95rem" color={C.text} fontFamily={FF} lineHeight={1.2}>
            {section.title}
          </Typography>
        </Box>
      </Box>

      {/* Items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
        {section.items.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.3 }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: 0.15,
              bgcolor: section.bg, border: `1.5px solid ${section.bdr}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 12, color: section.color }} />
            </Box>
            <Typography fontSize="0.84rem" fontFamily={FF} color={C.textMid} lineHeight={1.7}>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

/* ─── Main Page ─────────────────────────────────────────────────────── */
const page = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);
  const lastUpdated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes heroIn   { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes orbFloat { from { transform:translateY(0) scale(1) } to { transform:translateY(-14px) scale(1.04) } }
        @keyframes pillDrop { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* ══ AppBar ══════════════════════════════════════════════════════ */}
      {/* <Box component="header" sx={{
        position: 'fixed', top: 0, zIndex: 1200,
        left: { xs: 0, lg: `${SIDEBAR_W}px` },
        width: { xs: '100%', lg: `calc(100% - ${SIDEBAR_W}px)` },
        bgcolor: C.surface,
        boxShadow: '0 2px 20px rgba(6,143,210,0.10)',
        borderBottom: `1px solid ${C.border}`,
        height: 64,
        display: 'flex', alignItems: 'center',
        px: { xs: 2, sm: 3 }, gap: 1.5,
      }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
          bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PrivacyTipIcon sx={{ color: C.primary, fontSize: 18 }} />
        </Box>
        <Box>
          <Typography fontWeight={900} color={C.text} fontFamily={FF} fontSize="1rem" lineHeight={1.2}>
            Privacy Policy
          </Typography>
          <Typography fontSize="0.67rem" color={C.textLight} fontFamily={FF}>
            Last updated: {lastUpdated}
          </Typography>
        </Box>
      </Box> */}

      {/* ══ Page Body ═══════════════════════════════════════════════════ */}
      <Box
        sx={{
        // mt: '56px',
        width: '100%',
        maxWidth: '1400px',
        mx: 'auto',
        bgcolor: C.surfaceAlt,
        minHeight: 'calc(100vh - 64px)',
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        fontFamily: "'Nunito', sans-serif",
        overflowX: 'hidden',
        boxSizing: 'border-box',
        }}
    >

        {/* ── Hero Banner ──────────────────────────────────────────── */}
        <Box sx={{
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 52%, ${C.primaryDeep} 100%)`,
          p: { xs: 3, sm: 4 }, mb: 3.5,
          position: 'relative', overflow: 'hidden',
          animation: 'heroIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {/* Rings */}
          {[{ s:300,t:-90,r:-90 },{ s:150,b:-45,r:155 },{ s:85,t:25,r:125 }].map((b, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.13)',
              top: b.t, right: b.r, bottom: b.b, pointerEvents: 'none',
            }} />
          ))}
          {/* Orbs */}
          {[
            { s:90,  top:'-20px', left:'6%',  delay:0,    op:0.09 },
            { s:55,  top:'55%',   right:'10%',delay:800,  op:0.10 },
            { s:38,  top:'18%',   right:'26%',delay:1500, op:0.07 },
          ].map((o, i) => (
            <Box key={i} sx={{
              position:'absolute', width:o.s, height:o.s, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(255,255,255,0.38) 0%, transparent 70%)',
              top:o.top, left:o.left, right:o.right,
              opacity:o.op, pointerEvents:'none',
              animation:`orbFloat 5.5s ease-in-out ${o.delay}ms infinite alternate`,
            }} />
          ))}

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Logo pill */}
            {/* <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 1.8, py: 0.8, borderRadius: '10px', mb: 1.8,
              bgcolor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)',
              animation: 'pillDrop 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s both',
            }}>
              <LocalHospitalIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }} />
              <Typography fontFamily={FF} fontSize="0.72rem" fontWeight={800} color="rgba(255,255,255,0.92)">
                HIMS Portal
              </Typography>
            </Box> */}

            <Typography fontFamily={FF} fontWeight={900}
              fontSize={{ xs: '1.5rem', sm: '2rem' }} color="#fff" lineHeight={1.15} mb={1}>
              Privacy Policy
            </Typography>
            <Typography fontFamily={FF} fontSize={{ xs: '0.82rem', sm: '0.88rem' }}
              color="rgba(255,255,255,0.70)" lineHeight={1.75} maxWidth={540}>
              Your privacy matters to us. This policy explains how we collect, use, and protect your personal information when you use the HIMS appointment portal.
            </Typography>

            {/* Info pills */}
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
              {[
                { icon: <ShieldIcon />,         label: `${SECTIONS.length} Sections` },
                { icon: <CalendarMonthIcon />,  label: `Updated ${lastUpdated}` },
                { icon: <PrivacyTipIcon />,     label: 'Data Protection' },
              ].map(({ icon, label }) => (
                <Box key={label} sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.8,
                  px: 1.5, py: 0.7, borderRadius: '10px',
                  bgcolor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)',
                }}>
                  {React.cloneElement(icon, { sx: { fontSize: 13, color: 'rgba(255,255,255,0.80)' } })}
                  <Typography fontFamily={FF} fontSize="0.72rem" fontWeight={700} color="rgba(255,255,255,0.88)">
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box> */}
          </Box>
        </Box>

        {/* ── Section header ────────────────────────────────────────── */}
        {/* <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5,
          opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.1s',
        }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
            bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PrivacyTipIcon sx={{ fontSize: 17, color: C.primary }} />
          </Box>
          <Box>
            <Typography fontFamily={FF} fontWeight={900} fontSize="1rem" color={C.text} lineHeight={1.2}>
              Our Privacy Commitments
            </Typography>
            <Typography fontFamily={FF} fontSize="0.72rem" color={C.textLight}>
              {SECTIONS.length} sections covering how we handle your data
            </Typography>
          </Box>
        </Box> */}

        {/* ── Cards Grid ────────────────────────────────────────────── */}
        <Box sx={{
          display: 'grid',
          mt: "50px",
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
          gap: { xs: 2, sm: 2.5 },
          mb: 3.5,
        }}>
          {SECTIONS.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} visible={visible} />
          ))}
        </Box>

        {/* ── Footer note ───────────────────────────────────────────── */}
        <Box sx={{
          bgcolor: C.surface, border: `1px solid ${C.border}`,
          borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 2px 14px rgba(6,143,210,0.05)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 0.42s ease ${SECTIONS.length * 55 + 80}ms, transform 0.42s cubic-bezier(0.22,1,0.36,1) ${SECTIONS.length * 55 + 80}ms`,
        }}>
          <Box sx={{ height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark}, ${C.accent})` }} />
          <Box sx={{
            px: { xs: 2.5, sm: 4 }, py: { xs: 2.5, sm: 3 },
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2,
          }}>
            <Box sx={{
              width: 42, height: 42, borderRadius: '13px', flexShrink: 0,
              bgcolor: C.accentBg, border: `1.5px solid ${C.accentBdr}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldIcon sx={{ fontSize: 20, color: C.accent }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontFamily={FF} fontWeight={800} fontSize="0.92rem" color={C.text} mb={0.4}>
                Your data is protected under this policy
              </Typography>
              <Typography fontFamily={FF} fontSize="0.8rem" color={C.textLight} lineHeight={1.65}>
                This policy was last updated on{' '}
                <Box component="span" sx={{ color: C.primary, fontWeight: 700 }}>{lastUpdated}</Box>.
                {' '}Continued use of the platform following any updates constitutes acceptance of the revised privacy policy.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ height: 40 }} />
      </Box>
    </>
  );
};

export default page;