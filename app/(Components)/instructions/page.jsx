"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Chip, IconButton
} from "@mui/material";
import LoginIcon              from '@mui/icons-material/Login';
import CalendarMonthIcon      from '@mui/icons-material/CalendarMonth';
import PersonAddIcon          from '@mui/icons-material/PersonAdd';
import EventAvailableIcon     from '@mui/icons-material/EventAvailable';
import SwapHorizIcon          from '@mui/icons-material/SwapHoriz';
import DescriptionIcon        from '@mui/icons-material/Description';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleOutlineIcon   from '@mui/icons-material/AddCircleOutline';
import PeopleAltIcon          from '@mui/icons-material/PeopleAlt';
import LocalHospitalIcon      from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon       from '@mui/icons-material/ArrowForward';
import CheckCircleIcon        from '@mui/icons-material/CheckCircle';
import MenuBookIcon           from '@mui/icons-material/MenuBook';
import MenuRoundedIcon       from '@mui/icons-material/MenuRounded';

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
const SIDEBAR_W = 240;

/* ─── Steps data ────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: '01',
    title: 'Login',
    icon: <LoginIcon />,
    color: C.primary,
    bg: C.primaryBg,
    bdr: C.primaryBdr,
    gradA: C.primary,
    gradB: C.primaryDark,
    items: [
      'Log in to your Appointment account with your credentials.',
    ],
  },
  {
    number: '02',
    title: 'Go to Appointments',
    icon: <CalendarMonthIcon />,
    color: C.accent,
    bg: C.accentBg,
    bdr: C.accentBdr,
    gradA: C.accent,
    gradB: C.accentDark,
    items: [
      'From the sidebar, navigate to the Appointments section.',
    ],
  },
  {
    number: '03',
    title: 'Create New Appointment',
    icon: <EventAvailableIcon />,
    color: C.primary,
    bg: C.primaryBg,
    bdr: C.primaryBdr,
    gradA: C.primary,
    gradB: C.primaryDark,
    items: [
      'Click the New Appointment button to start booking.',
    ],
  },
  {
    number: '04',
    title: 'Add Patient',
    icon: <PersonAddIcon />,
    color: C.accent,
    bg: C.accentBg,
    bdr: C.accentBdr,
    gradA: C.accent,
    gradB: C.accentDark,
    items: [
      'If the patient is not registered, click Add Patient.',
      'Fill in the required patient details and register.',
      'Once registered, select the patient to continue.',
    ],
  },
  {
    number: '05',
    title: 'Book Appointment',
    icon: <CheckCircleIcon />,
    color: C.primary,
    bg: C.primaryBg,
    bdr: C.primaryBdr,
    gradA: C.primary,
    gradB: C.primaryDark,
    items: [
      'Select the patient from your list.',
      'Choose the doctor for the appointment.',
      'Pick the appointment date and service.',
      'Select an available time slot.',
      'Click Confirm Booking — done!',
    ],
  },
  {
    number: '06',
    title: 'Reschedule Appointment',
    icon: <SwapHorizIcon />,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    bdr: 'rgba(249,115,22,0.22)',
    gradA: '#f97316',
    gradB: '#ea6d0e',
    items: [
      'Go to Appointments and find your booking.',
      'Click Reschedule under the Action column.',
      'Select a new time slot and confirm the change.',
    ],
  },
  {
    number: '07',
    title: 'View / Download Prescription',
    icon: <DescriptionIcon />,
    color: C.accent,
    bg: C.accentBg,
    bdr: C.accentBdr,
    gradA: C.accent,
    gradB: C.accentDark,
    items: [
      'Go to Appointments.',
      'Click View Prescription under Action.',
      'Download the prescription from the preview.',
    ],
  },
  {
    number: '08',
    title: 'View / Download Token',
    icon: <ConfirmationNumberIcon />,
    color: C.amber,
    bg: C.amberBg,
    bdr: C.amberBdr,
    gradA: C.amber,
    gradB: '#d97706',
    items: [
      'Go to Appointments.',
      'Click Token under Action for your appointment.',
      'View or download the appointment token.',
    ],
  },
];

/* ─── Step Card ─────────────────────────────────────────────────────── */
const StepCard = ({ step, index, visible }) => (
  <Box sx={{
    bgcolor: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(6,143,210,0.05)',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.45s ease ${index * 60}ms, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms, box-shadow 0.22s ease`,
    '&:hover': {
      boxShadow: `0 10px 36px rgba(6,143,210,0.12)`,
      transform: visible ? 'translateY(-3px)' : 'translateY(24px)',
      borderColor: step.bdr,
    },
  }}>
    {/* Gradient top bar */}
    <Box sx={{ height: 3, background: `linear-gradient(90deg, ${step.gradA}, ${step.gradB})` }} />

    <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.8, mb: 2 }}>
        {/* Icon box */}
        <Box sx={{
          width: 44, height: 44, borderRadius: '13px', flexShrink: 0,
          bgcolor: step.bg, border: `1.5px solid ${step.bdr}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.22s cubic-bezier(0.34,1.4,0.64,1)',
          '.MuiBox-root:hover &': { transform: 'scale(1.1) rotate(-4deg)' },
        }}>
          {React.cloneElement(step.icon, { sx: { fontSize: 20, color: step.color } })}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Step number badge */}
          <Box sx={{
            display: 'inline-flex', alignItems: 'center',
            px: 1, py: 0.2, borderRadius: '6px', mb: 0.5,
            bgcolor: step.bg, border: `1px solid ${step.bdr}`,
          }}>
            {/* <Typography fontSize="0.6rem" fontWeight={900} fontFamily={FF}
              color={step.color} letterSpacing="0.08em" textTransform="uppercase">
              Step {step.number}
            </Typography> */}
          </Box>
          <Typography fontWeight={800} fontSize="1rem" color={C.text} fontFamily={FF} marginTop="-10px">
            {step.title}
          </Typography>
        </Box>
      </Box>

      {/* Steps list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {step.items.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
            <Box sx={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, mt: 0.1,
              bgcolor: step.bg, border: `1.5px solid ${step.bdr}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography fontSize="0.6rem" fontWeight={900} color={step.color} fontFamily={FF}>
                {i + 1}
              </Typography>
            </Box>
            <Typography fontSize="0.84rem" fontFamily={FF} color={C.textMid} lineHeight={1.6}>
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
  const router  = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes heroIn  { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes orbFloat { from { transform:translateY(0) scale(1) } to { transform:translateY(-14px) scale(1.04) } }
        @keyframes pillDrop { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes ctaIn    { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* ══ AppBar ══════════════════════════════════════════════════════ */}
      <Box component="header" sx={{
        position: 'fixed', top: 0, zIndex: 1200,
        left:  { xs: 0, lg: `${SIDEBAR_W}px` },
        width: { xs: '100%', lg: `calc(100% - ${SIDEBAR_W}px)` },
        bgcolor: C.surface,
        boxShadow: '0 2px 20px rgba(6,143,210,0.10)',
        borderBottom: `1px solid ${C.border}`,
        height: 64,
        display: 'flex', alignItems: 'center',
        px: { xs: 2, sm: 3 },
        gap: 1.5,
      }}>


        <IconButton
            onClick={() => window.dispatchEvent(new CustomEvent('open-sidebar'))}
            aria-label="Open menu"
            sx={{
              display: { xs: 'flex', lg: 'none' },
              width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
              bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
              color: C.primary,
              transition: 'all 0.18s cubic-bezier(0.34,1.2,0.64,1)',
              '&:hover': {
                bgcolor: 'rgba(6,143,210,0.14)', borderColor: C.primary,
                boxShadow: `0 4px 14px ${C.primaryBdr}`,
                transform: 'scale(1.06)',
              },
              '&:active': { transform: 'scale(0.94)' },
            }}
          >
            <MenuRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>



        <Box sx={{
          width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
          bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
          display: { xs: "none", sm: "none", md: "none", lg: "flex" }, alignItems: 'center', justifyContent: 'center',
        }}>
          <MenuBookIcon sx={{ color: C.primary, fontSize: 18 }} />
        </Box>
        <Box>
          <Typography fontWeight={900} color={C.text} fontFamily={FF} fontSize="1rem" lineHeight={1.2}>
            Instructions
          </Typography>
          <Typography fontSize="0.67rem" color={C.textLight} fontFamily={FF}>
            Guide to using Appointments Hospital System
          </Typography>
        </Box>
      </Box>

      {/* ══ Page Body ═══════════════════════════════════════════════════ */}
      <Box
        sx={{
        mt: '56px',
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
        {/* <Box sx={{
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 52%, ${C.primaryDeep} 100%)`,
          p: { xs: 3, sm: 4 }, mb: 3.5,
          position: 'relative', overflow: 'hidden',
          animation: 'heroIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {/* Decorative rings */}
          {/* {[{ s:320, t:-100, r:-100 }, { s:160, b:-50, r:160 }, { s:90, t:30, r:130 }].map((b, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.13)',
              top: b.t, right: b.r, bottom: b.b, pointerEvents: 'none',
            }} />
          ))}  */}
          {/* Floating orbs */}
          {/* {[
            { s: 100, top: '-30px', left: '8%',  delay: 0,    op: 0.08 },
            { s: 60,  top: '60%',  right: '12%', delay: 700,  op: 0.10 },
            { s: 45,  top: '20%',  right: '28%', delay: 1400, op: 0.07 },
          ].map((o, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: o.s, height: o.s, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)',
              top: o.top, left: o.left, right: o.right,
              opacity: o.op, pointerEvents: 'none',
              animation: `orbFloat 5s ease-in-out ${o.delay}ms infinite alternate`,
            }} />
          ))}

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Pill */}
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
            </Box>

            <Typography fontFamily={FF} fontWeight={900}
              fontSize={{ xs: '1.5rem', sm: '2rem' }} color="#fff" lineHeight={1.15} mb={1}>
              How to use the Portal
            </Typography>
            <Typography fontFamily={FF} fontSize={{ xs: '0.82rem', sm: '0.9rem' }}
              color="rgba(255,255,255,0.70)" lineHeight={1.7} maxWidth={520} mb={2.5}>
              Follow these simple steps to book appointments, manage patients, and download your prescriptions and tokens.
            </Typography> */} 

            {/* Quick stat pills */}
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
              {[
                { icon: <EventAvailableIcon />, label: '8 Steps' },
                { icon: <CalendarMonthIcon />,  label: 'Appointments' },
                { icon: <PeopleAltIcon />,       label: 'Patients' },
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
            </Box>
          </Box>
        </Box> */}

        {/* ── Section header ────────────────────────────────────────── */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: "center", mt: "10px", gap: 1.5, mb: '45px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
        }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
            bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MenuBookIcon sx={{ fontSize: 24, color: C.primary }} />
          </Box>
          <Box>
            <Typography fontFamily={FF} fontWeight={900} fontSize="1.5rem" color={C.text} lineHeight={1.2}>
              Step-by-Step Guide
            </Typography>
            <Typography fontFamily={FF} fontSize="1rem" color={C.textLight}>
              {STEPS.length} steps to use the portal
            </Typography>
          </Box>
        </Box>

        {/* ── Cards Grid ────────────────────────────────────────────── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
          gap: { xs: 2, sm: 2.5 },
          mb: 4,
        }}>
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} visible={visible} />
          ))}
        </Box>

        {/* ── CTA Section ───────────────────────────────────────────── */}
        <Box sx={{
          bgcolor: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(6,143,210,0.06)',
          animation: 'ctaIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.5s both',
        }}>
          {/* Gradient top bar */}
          <Box sx={{ height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark}, ${C.accent})` }} />

          <Box sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}>
            {/* Left text */}
            <Box>
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.8,
                px: 1.4, py: 0.5, borderRadius: '8px', mb: 1.2,
                bgcolor: C.accentBg, border: `1px solid ${C.accentBdr}`,
              }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent }} />
                <Typography fontFamily={FF} fontSize="0.68rem" fontWeight={800} color={C.accent}
                  textTransform="uppercase" letterSpacing="0.07em">
                  Ready to start?
                </Typography>
              </Box>
              <Typography fontFamily={FF} fontWeight={900} fontSize={{ xs: '1.15rem', sm: '1.35rem' }}
                color={C.text} lineHeight={1.25} mb={0.6}>
                Jump straight in
              </Typography>
              <Typography fontFamily={FF} fontSize="0.83rem" color={C.textMid} lineHeight={1.65} maxWidth={420}>
                Create a new appointment or manage your patients — everything you need is a click away.
              </Typography>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}>
              {/* Appointments CTA */}
              <Button
                onClick={() => router.push('/appointments')}
                startIcon={<AddCircleOutlineIcon sx={{ fontSize: '17px !important' }} />}
                endIcon={<ArrowForwardIcon sx={{
                  fontSize: '15px !important',
                  transition: 'transform 0.22s ease',
                }} />}
                fullWidth={false}
                sx={{
                  fontFamily: FF, fontWeight: 800, fontSize: '0.88rem',
                  textTransform: 'none', borderRadius: '13px',
                  px: { xs: 3, sm: 2.5 }, py: 1.3,
                  color: '#fff',
                  background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                  boxShadow: '0 6px 22px rgba(6,143,210,0.28)',
                  transition: 'all 0.22s ease',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primaryDeep})`,
                    boxShadow: '0 10px 30px rgba(6,143,210,0.40)',
                    transform: 'translateY(-2px)',
                    '& .MuiButton-endIcon svg': { transform: 'translateX(4px)' },
                  },
                  '&:active': { transform: 'scale(0.97)' },
                }}
              >
                New Appointment
              </Button>

              {/* Patients CTA */}
              <Button
                onClick={() => router.push('/patients')}
                startIcon={<PeopleAltIcon sx={{ fontSize: '17px !important' }} />}
                variant="outlined"
                sx={{
                  fontFamily: FF, fontWeight: 800, fontSize: '0.88rem',
                  textTransform: 'none', borderRadius: '13px',
                  px: { xs: 3, sm: 2.5 }, py: 1.3,
                  color: C.accent,
                  border: `1.5px solid ${C.accentBdr}`,
                  bgcolor: C.accentBg,
                  transition: 'all 0.22s ease',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: 'rgba(0,198,167,0.14)',
                    borderColor: C.accent,
                    boxShadow: '0 6px 20px rgba(0,198,167,0.20)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': { transform: 'scale(0.97)' },
                }}
              >
                Manage Patients
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ height: 40 }} />
      </Box>
    </>
  );
};

export default page;