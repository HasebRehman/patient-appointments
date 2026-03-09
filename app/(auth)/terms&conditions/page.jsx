"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider } from "@mui/material";
import GavelIcon              from '@mui/icons-material/Gavel';
import PersonIcon             from '@mui/icons-material/Person';
import CalendarMonthIcon      from '@mui/icons-material/CalendarMonth';
import SwapHorizIcon          from '@mui/icons-material/SwapHoriz';
import SecurityIcon           from '@mui/icons-material/Security';
import WarningAmberIcon       from '@mui/icons-material/WarningAmber';
import AutorenewIcon          from '@mui/icons-material/Autorenew';
import LocalHospitalIcon      from '@mui/icons-material/LocalHospital';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
const FF = "'Nunito', sans-serif";
const SIDEBAR_W = 260;

/* ─── Sections data ─────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: '01',
    title: 'Acceptance of Terms',
    icon: <GavelIcon />,
    color: C.primary,
    bg: C.primaryBg,
    bdr: C.primaryBdr,
    gradA: C.primary,
    gradB: C.primaryDark,
    type: 'paragraph',
    content: 'By using this website, you agree to comply with these terms and conditions. If you do not agree, you must not use the website.',
  },
  {
    id: '02',
    title: 'User Accounts',
    icon: <PersonIcon />,
    color: C.accent,
    bg: C.accentBg,
    bdr: C.accentBdr,
    gradA: C.accent,
    gradB: C.accentDark,
    type: 'list',
    content: [
      'You must register with accurate information.',
      'You are responsible for keeping your login credentials safe.',
      'Unauthorized access or sharing of your account is strictly prohibited.',
    ],
  },
  {
    id: '03',
    title: 'Appointment Booking',
    icon: <CalendarMonthIcon />,
    color: C.primary,
    bg: C.primaryBg,
    bdr: C.primaryBdr,
    gradA: C.primary,
    gradB: C.primaryDark,
    type: 'list',
    content: [
      'All appointments are subject to availability.',
      'Booking does not guarantee immediate service; the hospital or doctor\'s schedule must be confirmed.',
      'You must provide accurate patient information when registering or booking an appointment.',
    ],
  },
  {
    id: '04',
    title: 'Rescheduling and Cancellation',
    icon: <SwapHorizIcon />,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    bdr: 'rgba(249,115,22,0.22)',
    gradA: '#f97316',
    gradB: '#ea6d0e',
    type: 'list',
    content: [
      'You may reschedule or cancel appointments according to the website\'s guidelines.',
      'Frequent cancellations or rescheduling may result in restrictions from booking.',
    ],
  },
  {
    id: '05',
    title: 'User Conduct',
    icon: <SecurityIcon />,
    color: C.accent,
    bg: C.accentBg,
    bdr: C.accentBdr,
    gradA: C.accent,
    gradB: C.accentDark,
    type: 'list',
    content: [
      'Users must not misuse the website or submit false information.',
      'Any activity that interferes with the website\'s operations is prohibited.',
    ],
  },
  {
    id: '06',
    title: 'Limitation of Liability',
    icon: <WarningAmberIcon />,
    color: C.amber,
    bg: C.amberBg,
    bdr: C.amberBdr,
    gradA: C.amber,
    gradB: '#d97706',
    type: 'list',
    content: [
      'The website is not responsible for medical services provided by doctors or hospitals.',
      'Users agree that the website is a platform for booking appointments only.',
    ],
  },
  {
    id: '07',
    title: 'Changes to Terms',
    icon: <AutorenewIcon />,
    color: C.primary,
    bg: C.primaryBg,
    bdr: C.primaryBdr,
    gradA: C.primary,
    gradB: C.primaryDark,
    type: 'list',
    content: [
      'The website may update these terms at any time.',
      'Continued use of the website implies acceptance of the updated terms.',
    ],
  },
];

/* ─── Section Card ──────────────────────────────────────────────────── */
const SectionCard = ({ section, index, visible }) => (
  <Box sx={{
    bgcolor: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: '20px',
    overflow: 'hidden',
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
    {/* Gradient top bar */}
    <Box sx={{ height: 3, background: `linear-gradient(90deg, ${section.gradA}, ${section.gradB})` }} />

    <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, mb: section.type === 'paragraph' ? 1.5 : 2 }}>
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

      {/* Content */}
      {section.type === 'paragraph' ? (
        <Typography fontSize="0.86rem" fontFamily={FF} color={C.textMid} lineHeight={1.75}
          sx={{
            pl: 0.5, borderLeft: `3px solid ${section.bdr}`,
            paddingLeft: '12px', fontStyle: 'italic',
          }}>
          {section.content}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
          {section.content.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.3 }}>
              <Box sx={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: 0.15,
                bgcolor: section.bg, border: `1.5px solid ${section.bdr}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 12, color: section.color }} />
              </Box>
              <Typography fontSize="0.84rem" fontFamily={FF} color={C.textMid} lineHeight={1.68}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
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
        left:  { xs: 0, lg: `${SIDEBAR_W}px` },
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
          <GavelIcon sx={{ color: C.primary, fontSize: 18 }} />
        </Box>
        <Box>
          <Typography fontWeight={900} color={C.text} fontFamily={FF} fontSize="1rem" lineHeight={1.2}>
            Terms &amp; Conditions
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
          {[{ s:300, t:-90, r:-90 }, { s:150, b:-45, r:155 }, { s:85, t:25, r:125 }].map((b, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.13)',
              top: b.t, right: b.r, bottom: b.b, pointerEvents: 'none',
            }} />
          ))}
          {/* Orbs */}
          {[
            { s: 90,  top: '-20px', left: '6%',   delay: 0,    op: 0.09 },
            { s: 55,  top: '55%',   right: '10%',  delay: 800,  op: 0.10 },
            { s: 38,  top: '18%',   right: '26%',  delay: 1500, op: 0.07 },
          ].map((o, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: o.s, height: o.s, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.38) 0%, transparent 70%)',
              top: o.top, left: o.left, right: o.right,
              opacity: o.op, pointerEvents: 'none',
              animation: `orbFloat 5.5s ease-in-out ${o.delay}ms infinite alternate`,
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
              Terms &amp; Conditions
            </Typography>
            <Typography fontFamily={FF} fontSize={{ xs: '0.82rem', sm: '0.88rem' }}
              color="rgba(255,255,255,0.70)" lineHeight={1.75} maxWidth={540}>
              Please read these terms carefully before using the HIMS appointment portal. By accessing this platform you agree to be bound by these conditions.
            </Typography>

            {/* Info pills */}
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
              {[
                { icon: <GavelIcon />,         label: `${SECTIONS.length} Sections` },
                { icon: <CalendarMonthIcon />, label: `Updated ${lastUpdated}` },
                { icon: <SecurityIcon />,      label: 'User Agreement' },
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
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
        }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
            bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GavelIcon sx={{ fontSize: 17, color: C.primary }} />
          </Box>
          <Box>
            <Typography fontFamily={FF} fontWeight={900} fontSize="1rem" color={C.text} lineHeight={1.2}>
              Legal Agreement
            </Typography>
            <Typography fontFamily={FF} fontSize="0.72rem" color={C.textLight}>
              {SECTIONS.length} sections governing use of this platform
            </Typography>
          </Box>
        </Box> */}

        {/* ── Cards Grid ────────────────────────────────────────────── */}
        <Box sx={{
          display: 'grid',
          mt: '50px',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
          gap: { xs: 2, sm: 2.5 },
          mb: 3.5,
        }}>
          {SECTIONS.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} visible={visible} />
          ))}
        </Box>

        {/* ── Agreement footer ──────────────────────────────────────── */}
        <Box sx={{
          bgcolor: C.surface, border: `1px solid ${C.border}`,
          borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 2px 14px rgba(6,143,210,0.05)',
          opacity: visible ? 1 : 0,
          transition: `opacity 0.42s ease ${SECTIONS.length * 55 + 80}ms, transform 0.42s cubic-bezier(0.22,1,0.36,1) ${SECTIONS.length * 55 + 80}ms`,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
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
              <CheckCircleOutlineIcon sx={{ fontSize: 20, color: C.accent }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontFamily={FF} fontWeight={800} fontSize="0.92rem" color={C.text} mb={0.4}>
                By using HIMS Portal you accept these terms
              </Typography>
              <Typography fontFamily={FF} fontSize="0.8rem" color={C.textLight} lineHeight={1.65}>
                These terms were last updated on <Box component="span" sx={{ color: C.primary, fontWeight: 700 }}>{lastUpdated}</Box>. Continued use of the platform following any updates constitutes acceptance of the revised terms.
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