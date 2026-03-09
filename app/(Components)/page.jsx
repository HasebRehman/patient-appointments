"use client";

import { useRouter } from "next/navigation";
import {
  Box, AppBar, Toolbar, Button, Typography, Avatar,
  Chip, Skeleton, IconButton,
} from "@mui/material";
import LogoutRoundedIcon     from '@mui/icons-material/LogoutRounded';
import CalendarMonthIcon     from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon         from '@mui/icons-material/PeopleAlt';
import LocalHospitalIcon     from '@mui/icons-material/LocalHospital';
import CheckCircleIcon       from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon    from '@mui/icons-material/HourglassEmpty';
import DashboardIcon         from '@mui/icons-material/Dashboard';
import TrendingUpIcon        from '@mui/icons-material/TrendingUp';
import AccessTimeIcon        from '@mui/icons-material/AccessTime';
import PersonIcon            from '@mui/icons-material/Person';
import PhoneIcon             from '@mui/icons-material/Phone';
import EventAvailableIcon    from '@mui/icons-material/EventAvailable';
import MenuRoundedIcon       from '@mui/icons-material/MenuRounded';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/slices/UserSlice";

/* ─── Design Tokens ─────────────────────────────────────────────────────────── */
const C = {
  primary:     '#068fd2',
  primaryDark: '#0570a6',
  primaryDeep: '#034e76',
  primaryBg:   'rgba(6,143,210,0.07)',
  primaryBdr:  'rgba(6,143,210,0.20)',
  accent:      '#00c6a7',
  accentBg:    'rgba(0,198,167,0.07)',
  accentBdr:   'rgba(0,198,167,0.25)',
  accentDark:  '#009e85',
  amber:       '#f59e0b',
  amberBg:     'rgba(245,158,11,0.08)',
  amberBdr:    'rgba(245,158,11,0.25)',
  green:       '#10b981',
  greenBg:     'rgba(16,185,129,0.08)',
  greenBdr:    'rgba(16,185,129,0.25)',
  rose:        '#ef4444',
  roseBg:      'rgba(239,68,68,0.08)',
  roseBdr:     'rgba(239,68,68,0.22)',
  surface:     '#ffffff',
  surfaceAlt:  '#f4f8fc',
  surfaceDeep: '#edf3f8',
  border:      '#e0ecf5',
  text:        '#0f1f2e',
  textMid:     '#445566',
  textLight:   '#7a96ab',
};

const SIDEBAR_W = 240;
const FF = "'Nunito', sans-serif";

/* ─── Stat Card ─────────────────────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, color, bg, bdr, gradA, gradB, delay = 0, loading }) => (
  <Box sx={{
    bgcolor: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(6,143,210,0.05)',
    animation: 'cardIn 0.42s cubic-bezier(0.22,1,0.36,1) both',
    animationDelay: `${delay}ms`,
    '@keyframes cardIn': {
      from: { opacity: 0, transform: 'translateY(16px)' },
      to:   { opacity: 1, transform: 'translateY(0)' },
    },
    transition: 'all 0.24s cubic-bezier(0.34,1.3,0.64,1)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: `0 12px 32px ${color}22`,
      borderColor: bdr,
    },
  }}>
    {/* gradient top bar */}
    <Box sx={{ height: 3, background: `linear-gradient(90deg, ${gradA}, ${gradB})` }} />

    <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
        {/* Icon */}
        <Box sx={{
          width: 48, height: 48, borderRadius: '14px',
          bgcolor: bg, border: `1.5px solid ${bdr}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {icon}
        </Box>
        {/* Trend pill */}
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.5,
          px: 1.2, py: 0.5, borderRadius: '8px',
          bgcolor: bg, border: `1px solid ${bdr}`,
        }}>
          <TrendingUpIcon sx={{ fontSize: 13, color }} />
          <Typography fontSize="0.68rem" fontWeight={800} color={color} fontFamily={FF}>Live</Typography>
        </Box>
      </Box>

      {/* Value */}
      {loading ? (
        <>
          <Skeleton variant="rounded" width="45%" height={36} sx={{ borderRadius: '10px', mb: 0.8 }} />
          <Skeleton variant="rounded" width="60%" height={14} sx={{ borderRadius: '6px' }} />
        </>
      ) : (
        <>
          <Typography
            fontFamily={FF} fontWeight={900} lineHeight={1}
            fontSize={{ xs: '2rem', sm: '2.4rem' }} color={C.text}
            sx={{
              mb: 0.5,
              background: `linear-gradient(135deg, ${gradA}, ${gradB})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            {value ?? '—'}
          </Typography>
          <Typography fontFamily={FF} fontSize="0.8rem" fontWeight={700} color={C.textLight}>
            {label}
          </Typography>
        </>
      )}
    </Box>
  </Box>
);

/* ─── Appointment Row ────────────────────────────────────────────────────────── */
const ApptRow = ({ appt, idx }) => {
  const name  = appt?.patientData?.patientName || '—';
  const phone = appt?.phonNumber || '';
  const doc   = appt?.doctor?.fullName || '—';
  const slot  = appt?.slot || '—';
  const date  = appt?.appointmentDate
    ? new Date(appt.appointmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : '—';
  const ini   = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 },
      px: { xs: 2, sm: 3 }, py: 1.8,
      borderBottom: `1px solid ${C.border}`,
      transition: 'background 0.14s',
      animation: 'rowIn 0.32s cubic-bezier(0.22,1,0.36,1) both',
      animationDelay: `${idx * 45}ms`,
      '@keyframes rowIn': {
        from: { opacity: 0, transform: 'translateX(-6px)' },
        to:   { opacity: 1, transform: 'translateX(0)' },
      },
      '&:last-child': { borderBottom: 'none' },
      '&:hover': { bgcolor: C.surfaceAlt },
    }}>
      {/* Index + Avatar */}
      <Avatar sx={{
        width: 36, height: 36, flexShrink: 0,
        bgcolor: C.primaryBg, color: C.primary,
        fontFamily: FF, fontWeight: 800, fontSize: '0.72rem',
        border: `1.5px solid ${C.primaryBdr}`,
      }}>
        {ini || <PersonIcon sx={{ fontSize: 16 }} />}
      </Avatar>

      {/* Name + phone */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography fontSize="0.85rem" fontWeight={800} color={C.text} fontFamily={FF} noWrap>{name}</Typography>
        {phone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <PhoneIcon sx={{ fontSize: 10, color: C.textLight }} />
            <Typography fontSize="0.68rem" color={C.textLight} fontFamily={FF}>{phone}</Typography>
          </Box>
        )}
      </Box>

      {/* Doctor */}
      <Box sx={{ minWidth: 0, display: { xs: 'none', md: 'block' }, width: 130 }}>
        <Typography fontSize="0.68rem" fontWeight={700} color={C.textLight} fontFamily={FF}
          textTransform="uppercase" letterSpacing="0.05em" lineHeight={1}>Doctor</Typography>
        <Typography fontSize="0.79rem" fontWeight={700} color={C.textMid} fontFamily={FF} noWrap>{doc}</Typography>
      </Box>

      {/* Slot */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5, px: 1.1, py: 0.4, borderRadius: '7px', bgcolor: C.accentBg, border: `1px solid ${C.accentBdr}`, flexShrink: 0 }}>
        <AccessTimeIcon sx={{ fontSize: 11, color: C.accent }} />
        <Typography fontSize="0.71rem" fontWeight={700} color={C.accent} fontFamily={FF} noWrap>{slot}</Typography>
      </Box>

      {/* Date chip */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 0.5,
        px: 1.1, py: 0.4, borderRadius: '7px',
        bgcolor: C.primaryBg, border: `1px solid ${C.primaryBdr}`, flexShrink: 0,
      }}>
        <CalendarMonthIcon sx={{ fontSize: 11, color: C.primary }} />
        <Typography fontSize="0.71rem" fontWeight={700} color={C.primary} fontFamily={FF}>{date}</Typography>
      </Box>
    </Box>
  );
};

/* ─── Skeleton Row ──────────────────────────────────────────────────────────── */
const ApptRowSkeleton = ({ i }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 1.8, borderBottom: `1px solid ${C.border}`, '&:last-child': { borderBottom: 'none' } }}>
    <Skeleton variant="circular" width={36} height={36} sx={{ flexShrink: 0 }} />
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="rounded" width="52%" height={14} sx={{ mb: 0.5, borderRadius: '5px', animationDelay: `${i*40}ms` }} />
      <Skeleton variant="rounded" width="32%" height={11} sx={{ borderRadius: '4px' }} />
    </Box>
    <Skeleton variant="rounded" width={80} height={26} sx={{ borderRadius: '7px', display: { xs: 'none', sm: 'block' } }} />
    <Skeleton variant="rounded" width={68} height={26} sx={{ borderRadius: '7px' }} />
  </Box>
);

/* ─── Main Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  const API_URL  = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const router   = useRouter();

  const [totalDoctors,   setTotalDoctors]   = useState(null);
  const [totalAppt,      setTotalAppt]      = useState(null);
  const [totalPatients,  setTotalPatients]  = useState(null);
  const [apptData,       setApptData]       = useState([]);
  const [statsLoading,   setStatsLoading]   = useState(true);
  const [apptLoading,    setApptLoading]    = useState(true);

  useEffect(() => { dispatch(getUserData()); }, []);

  const getAllAppointments = async () => {
    setApptLoading(true);
    const res = await fetch(`${API_URL}hims-appointment/get-hims-appointments?checkedStatus=Active`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    if (result?.isSuccess) {
      setTotalAppt(result?.totalCount);
      setApptData(result?.data || []);
    }
    setApptLoading(false);
  };

  const getAllPatients = async () => {
    const res = await fetch(`${API_URL}hims-patients/getMyHimsPatients`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    setTotalPatients(result?.totalCount ?? null);
  };

  const getAllDoctors = async () => {
    const res = await fetch(`${API_URL}patient-auth/getAllDoctors`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    setTotalDoctors(result?.totalCount ?? null);
  };

  useEffect(() => {
    (async () => {
      setStatsLoading(true);
      await Promise.all([getAllAppointments(), getAllPatients(), getAllDoctors()]);
      setStatsLoading(false);
    })();
  }, []);

  let countChecked = 0, countPending = 0;
  apptData.forEach(d => {
    if (d?.isChecked === true)  countChecked++;
    else if (d?.isChecked === false) countPending++;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const userName = userData?.data?.name || userData?.data?.fullName || 'Doctor';
  const now      = new Date();
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  const STATS = [
    {
      label: 'Total Appointments', value: totalAppt,
      icon: <CalendarMonthIcon sx={{ fontSize: 22, color: C.primary }} />,
      color: C.primary, bg: C.primaryBg, bdr: C.primaryBdr,
      gradA: C.primary, gradB: C.primaryDark, delay: 0,
    },
    {
      label: 'Total Patients', value: totalPatients,
      icon: <PeopleAltIcon sx={{ fontSize: 22, color: C.accent }} />,
      color: C.accent, bg: C.accentBg, bdr: C.accentBdr,
      gradA: C.accent, gradB: C.accentDark, delay: 70,
    },
    {
      label: 'Total Doctors', value: totalDoctors,
      icon: <LocalHospitalIcon sx={{ fontSize: 22, color: C.amber }} />,
      color: C.amber, bg: C.amberBg, bdr: C.amberBdr,
      gradA: C.amber, gradB: '#d97706', delay: 140,
    },
    {
      label: 'Visited Appointments', value: countChecked,
      icon: <CheckCircleIcon sx={{ fontSize: 22, color: C.green }} />,
      color: C.green, bg: C.greenBg, bdr: C.greenBdr,
      gradA: C.green, gradB: '#059669', delay: 210,
    },
    {
      label: 'Pending Appointments', value: countPending,
      icon: <HourglassEmptyIcon sx={{ fontSize: 22, color: C.rose }} />,
      color: C.rose, bg: C.roseBg, bdr: C.roseBdr,
      gradA: C.rose, gradB: '#dc2626', delay: 280,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* ═══ AppBar ══════════════════════════════════════════════════════════ */}
      <AppBar position="fixed" elevation={0} sx={{
        left:  { xs: 0, lg: `${SIDEBAR_W}px` },
        width: { xs: '100%', lg: `calc(100% - ${SIDEBAR_W}px)` },
        background: C.surface,
        boxShadow: '0 2px 20px rgba(6,143,210,0.10)',
        zIndex: 1200,
      }}>
        <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>

          {/* ── Hamburger (mobile / tablet only) ── */}
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
          {/* Page title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`, display: { xs: "none", sm: "none", md: "none", lg: "flex" }, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DashboardIcon sx={{ color: C.primary, fontSize: 19 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={900} color={C.text} fontFamily={FF} fontSize="1rem" lineHeight={1.2} noWrap>
                Dashboard
              </Typography>
              <Typography fontSize="0.67rem" color={C.textLight} fontFamily={FF} noWrap>
                Overview &amp; live statistics
              </Typography>
            </Box>
          </Box>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            startIcon={<LogoutRoundedIcon sx={{ fontSize: '16px !important', transition: 'transform 0.22s ease' }} />}
            size="small"
            sx={{
              color: '#ef4444', border: '1.5px solid rgba(239,68,68,0.28)',
              bgcolor: 'rgba(239,68,68,0.07)',
              borderRadius: '10px', fontWeight: 700, fontFamily: FF,
              fontSize: '0.82rem', px: 2, py: 1, textTransform: 'none', flexShrink: 0,
              transition: 'all 0.22s ease',
              '&:hover': {
                bgcolor: 'rgba(239,68,68,0.14)', borderColor: 'rgba(239,68,68,0.55)',
                boxShadow: '0 4px 16px rgba(239,68,68,0.18)', transform: 'translateY(-1px)',
                '& .MuiButton-startIcon svg': { transform: 'translateX(3px) rotate(-10deg)' },
              },
              '&:active': { transform: 'scale(0.96)' },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ═══ Page Wrapper ════════════════════════════════════════════════════ */}
      <Box sx={{
        position: 'fixed', top: 64,
        left: { xs: 0, lg: `${SIDEBAR_W}px` },
        width: { xs: '100%', lg: `calc(100% - ${SIDEBAR_W}px)` },
        height: 'calc(100vh - 64px)',
        overflowY: 'auto', overflowX: 'hidden',
        bgcolor: C.surfaceAlt, boxSizing: 'border-box',
        fontFamily: FF,
      }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>

          {/* ── Hero Banner ── */}
          <Box sx={{
            borderRadius: '24px',
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 52%, ${C.primaryDeep} 100%)`,
            p: { xs: 3, sm: 4 }, mb: 3.5,
            position: 'relative', overflow: 'hidden',
            animation: 'bIn 0.44s cubic-bezier(0.22,1,0.36,1) both',
            '@keyframes bIn': { from: { opacity: 0, transform: 'translateY(-10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            {/* Decorative rings */}
            {[
              { s: 220, t: -70, r: -60 },
              { s: 120, b: -40, r: 140 },
              { s: 80,  t: 20,  r: 120 },
            ].map((b, i) => (
              <Box key={i} sx={{
                position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.4)',
                top: b.t, right: b.r, bottom: b.b, opacity: 0.08, pointerEvents: 'none',
              }} />
            ))}

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Chip
                  label="Live Overview"
                  size="small"
                  icon={<TrendingUpIcon style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }} />}
                  sx={{
                    mb: 1.2, height: 22, fontSize: '0.67rem', fontWeight: 700, fontFamily: FF,
                    bgcolor: 'rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(255,255,255,0.22)',
                  }}
                />
                <Typography fontFamily={FF} fontWeight={900} fontSize={{ xs: '1.3rem', sm: '1.75rem' }} color="#fff" lineHeight={1.2}>
                  {greeting}, {userName}
                </Typography>
                <Typography fontFamily={FF} fontSize="0.86rem" color="rgba(255,255,255,0.70)" mt={0.6}>
                  Here's what's happening at your clinic today
                </Typography>
              </Box>

              {/* Quick date/time pill */}
              {/* <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.8,
                display: { xs: 'none', sm: 'flex' },
              }}>
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 0.8,
                  px: 1.6, py: 0.8, borderRadius: '10px',
                  bgcolor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)',
                }}>
                  <CalendarMonthIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }} />
                  <Typography fontFamily={FF} fontSize="0.75rem" fontWeight={700} color="rgba(255,255,255,0.88)">
                    {now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 0.8,
                  px: 1.6, py: 0.8, borderRadius: '10px',
                  bgcolor: 'rgba(0,198,167,0.18)', border: '1px solid rgba(0,198,167,0.35)',
                }}>
                  <EventAvailableIcon sx={{ fontSize: 14, color: C.accent }} />
                  <Typography fontFamily={FF} fontSize="0.75rem" fontWeight={700} color={C.accent}>
                    {apptLoading ? '…' : `${totalAppt ?? 0} Active Appointments`}
                  </Typography>
                </Box>
              </Box> */}
            </Box>
          </Box>

          {/* ── Stat Cards Grid ── */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              sm: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 2.5,
            mb: 3.5,
          }}>
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} loading={statsLoading || apptLoading} />
            ))}
          </Box>

          {/* ── Active Appointments Table ── */}
          {/* <Box sx={{
            bgcolor: C.surface, border: `1px solid ${C.border}`,
            borderRadius: '20px', overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(6,143,210,0.06)',
            animation: 'tblIn 0.42s cubic-bezier(0.22,1,0.36,1) 0.18s both',
            '@keyframes tblIn': { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}> */}
            {/* Gradient top bar */}
            {/* <Box sx={{ height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark}, ${C.accent})` }} /> */}

            {/* Table header */}
            {/* <Box sx={{
              px: 3, py: 2.2,
              borderBottom: `1px solid ${C.border}`,
              background: `linear-gradient(120deg, ${C.primaryBg} 0%, ${C.surface} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '10px', flexShrink: 0, bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarMonthIcon sx={{ fontSize: 18, color: C.primary }} />
                </Box>
                <Box>
                  <Typography fontWeight={800} fontSize="0.92rem" color={C.text} fontFamily={FF} lineHeight={1.2}>
                    Active Appointments
                  </Typography>
                  <Typography fontSize="0.71rem" color={C.textLight} fontFamily={FF}>
                    {apptLoading ? 'Loading…' : `${apptData.length} record${apptData.length !== 1 ? 's' : ''} today`}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.6,
                px: 1.3, py: 0.5, borderRadius: '8px',
                bgcolor: C.greenBg, border: `1px solid ${C.greenBdr}`,
              }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.green }} />
                <Typography fontSize="0.71rem" fontWeight={800} color={C.green} fontFamily={FF}>Active</Typography>
              </Box>
            </Box> */}

            {/* Rows */}
            {/* {apptLoading ? (
              Array.from({ length: 5 }).map((_, i) => <ApptRowSkeleton key={i} i={i} />)
            ) : apptData.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Box sx={{ width: 58, height: 58, borderRadius: '18px', bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                  <CalendarMonthIcon sx={{ fontSize: 26, color: C.primaryBdr }} />
                </Box>
                <Typography fontFamily={FF} fontWeight={800} color={C.textMid} fontSize="0.95rem">No active appointments</Typography>
                <Typography fontFamily={FF} fontSize="0.8rem" color={C.textLight} mt={0.4}>Nothing scheduled right now</Typography>
              </Box>
            ) : (
              apptData.map((appt, i) => <ApptRow key={appt?._id || i} appt={appt} idx={i} />)
            )} */}

            {/* Footer */}
            {/* {!apptLoading && apptData.length > 0 && (
              <Box sx={{
                px: 3, py: 1.8, borderTop: `1px solid ${C.border}`, bgcolor: C.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
              }}>
                <Typography fontSize="0.77rem" color={C.textLight} fontFamily={FF}>
                  Showing{' '}
                  <Box component="span" sx={{ color: C.text, fontWeight: 800 }}>{apptData.length}</Box>
                  {' '}active appointment{apptData.length !== 1 ? 's' : ''}
                </Typography>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.3, py: 0.5, borderRadius: '8px', bgcolor: C.primaryBg, border: `1px solid ${C.primaryBdr}` }}>
                  <CalendarMonthIcon sx={{ fontSize: 13, color: C.primary }} />
                  <Typography fontSize="0.71rem" fontWeight={800} color={C.primary} fontFamily={FF}>Appointments</Typography>
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ height: 40 }} /> */}
        </Box>
      </Box>
    </>
  );
}