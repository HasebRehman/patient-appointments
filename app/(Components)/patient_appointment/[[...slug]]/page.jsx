"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import {
  Box, AppBar, Toolbar, Typography, Button, Avatar,
  Chip, Divider, IconButton, TextField,
  Select, MenuItem, FormControl, InputLabel, CircularProgress
} from "@mui/material";
import ArrowBackIcon        from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon    from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon       from '@mui/icons-material/AccessTime';
import MedicalServicesIcon  from '@mui/icons-material/MedicalServices';
import PersonIcon           from '@mui/icons-material/Person';
import CheckCircleIcon      from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon    from '@mui/icons-material/LocalHospital';
import PaymentsIcon         from '@mui/icons-material/Payments';
import EventAvailableIcon   from '@mui/icons-material/EventAvailable';
import UpdateIcon           from '@mui/icons-material/Update';
import StarIcon             from '@mui/icons-material/Star';
import SwapHorizIcon        from '@mui/icons-material/SwapHoriz';
import InfoOutlinedIcon     from '@mui/icons-material/InfoOutlined';

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:     '#068fd2',
  primaryDark: '#0570a6',
  primaryDeep: '#034e76',
  primaryBg:   'rgba(6,143,210,0.07)',
  primaryBdr:  'rgba(6,143,210,0.20)',
  accent:      '#00c6a7',
  accentDark:  '#009e86',
  accentBg:    'rgba(0,198,167,0.07)',
  accentBdr:   'rgba(0,198,167,0.25)',
  amber:       '#f59e0b',
  amberBg:     'rgba(245,158,11,0.08)',
  amberBdr:    'rgba(245,158,11,0.22)',
  orange:      '#f97316',
  orangeBg:    'rgba(249,115,22,0.08)',
  orangeBdr:   'rgba(249,115,22,0.22)',
  red:         '#ef4444',
  redBg:       'rgba(239,68,68,0.08)',
  surface:     '#ffffff',
  surfaceAlt:  '#f4f8fc',
  border:      '#e0ecf5',
  text:        '#0f1f2e',
  textMid:     '#445566',
  textLight:   '#7a96ab',
};

const SIDEBAR_W = 240;
const TODAY     = new Date().toISOString().split('T')[0];
const fmtDate   = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  : '';

// ─── Section Card ──────────────────────────────────────────────────────────────
const SectionCard = ({ icon, title, subtitle, children, color, noPad }) => {
  const col = color || C.primary;
  const bg  = col === C.accent  ? C.accentBg
            : col === C.amber   ? C.amberBg
            : col === C.orange  ? C.orangeBg
            : C.primaryBg;
  const bdr = col === C.accent  ? C.accentBdr
            : col === C.amber   ? C.amberBdr
            : col === C.orange  ? C.orangeBdr
            : C.primaryBdr;
  return (
    <Box sx={{
      bgcolor: C.surface, border: `1px solid ${C.border}`,
      borderRadius: '20px', overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(6,143,210,0.05)',
      transition: 'box-shadow 0.22s ease',
      '&:hover': { boxShadow: '0 8px 30px rgba(6,143,210,0.10)' },
    }}>
      {/* Top accent line */}
      <Box sx={{ height: 3, background: `linear-gradient(90deg, ${col}, ${col === C.accent ? '#00e5c8' : col === C.amber ? '#fbbf24' : col === C.orange ? '#fb923c' : C.accent})` }} />
      <Box sx={{
        px: 3, py: 2.2, borderBottom: `1px solid ${C.border}`,
        background: `linear-gradient(120deg, ${bg} 0%, ${C.surface} 100%)`,
        display: 'flex', alignItems: 'center', gap: 1.5,
      }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: '10px',
          bgcolor: bg, border: `1.5px solid ${bdr}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {React.cloneElement(icon, { sx: { fontSize: 18, color: col } })}
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography fontWeight={800} fontSize="0.92rem" color={C.text} fontFamily="'Nunito', sans-serif" lineHeight={1.2}>
            {title}
          </Typography>
          {subtitle && (
            <Typography fontSize="0.71rem" color={C.textLight} fontFamily="'Nunito', sans-serif" noWrap>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ p: noPad ? 0 : 3 }}>{children}</Box>
    </Box>
  );
};

// ─── Info Row ──────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, color, last }) => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5 }}>
      <Box sx={{
        width: 34, height: 34, borderRadius: '10px', flexShrink: 0,
        bgcolor: `${color || C.primary}10`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {React.cloneElement(icon, { sx: { fontSize: 17, color: color || C.primary } })}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography fontSize="0.65rem" color={C.textLight} fontFamily="'Nunito', sans-serif"
          textTransform="uppercase" letterSpacing="0.06em" lineHeight={1}>
          {label}
        </Typography>
        <Typography fontSize="0.9rem" fontWeight={700} color={C.text} fontFamily="'Nunito', sans-serif" noWrap>
          {value || '—'}
        </Typography>
      </Box>
    </Box>
    {!last && <Divider sx={{ borderColor: C.border }} />}
  </Box>
);

// ─── Slot status resolver ──────────────────────────────────────────────────────
const getSlotStatus = (slot, selectedDate) => {
  // API: status === 1 means this slot is already booked
  if (slot?.status === 1) return 'booked';

  // Time passed — only relevant for today
  if (selectedDate === TODAY) {
    try {
      const startPart = (slot?.slot || '').split(' - ')[0].trim();
      if (startPart) {
        const [time, period] = startPart.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        const slotDate = new Date();
        slotDate.setHours(hours, minutes, 0, 0);
        if (slotDate < new Date()) return 'past';
      }
    } catch (_) {}
  }

  return 'available';
};

// ─── Slot Pill ─────────────────────────────────────────────────────────────────
const SLOT_STYLES = {
  available: {
    border: C.accentBdr,
    bg: C.accentBg,
    color: C.accent,
    iconColor: C.accent,
    cursor: 'pointer',
    label: 'Available',
    labelColor: C.accent,
    labelBg: C.accentBg,
  },
  selected: {
    border: C.primary,
    bg: C.primaryBg,
    color: C.primary,
    iconColor: C.primary,
    cursor: 'pointer',
    label: null,
    labelColor: null,
    labelBg: null,
  },
  booked: {
    border: 'rgba(100,116,139,0.25)',
    bg: 'rgba(100,116,139,0.06)',
    color: '#94a3b8',
    iconColor: '#94a3b8',
    cursor: 'not-allowed',
    label: 'Booked',
    labelColor: '#64748b',
    labelBg: 'rgba(100,116,139,0.10)',
  },
  past: {
    border: 'rgba(239,68,68,0.22)',
    bg: 'rgba(239,68,68,0.05)',
    color: C.red,
    iconColor: C.red,
    cursor: 'not-allowed',
    label: 'Passed',
    labelColor: C.red,
    labelBg: C.redBg,
  },
};

const SlotPill = ({ slot, selected, onClick, selectedDate }) => {
  const status   = selected ? 'selected' : getSlotStatus(slot, selectedDate);
  const disabled = status === 'booked' || status === 'past';
  const st       = SLOT_STYLES[status];

  return (
    <Box
      onClick={disabled ? undefined : onClick}
      sx={{
        position: 'relative',
        py: 1, px: 0.8,
        borderRadius: '11px',
        textAlign: 'center',
        border: `1.5px solid ${st.border}`,
        bgcolor: st.bg,
        cursor: st.cursor,
        opacity: disabled ? 0.75 : 1,
        transition: 'all 0.18s cubic-bezier(0.34,1.4,0.64,1)',
        boxShadow: selected ? '0 4px 14px rgba(6,143,210,0.18)' : 'none',
        animation: 'slotIn 0.25s ease both',
        '@keyframes slotIn': { from: { opacity: 0, transform: 'scale(0.92)' }, to: { opacity: 1, transform: 'scale(1)' } },
        ...(!disabled && {
          '&:hover': {
            borderColor: status === 'available' ? C.accentDark : C.primary,
            bgcolor: status === 'available' ? 'rgba(0,198,167,0.13)' : C.primaryBg,
            transform: 'translateY(-2px)', boxShadow: '0 5px 14px rgba(6,143,210,0.14)',
          },
          '&:active': { transform: 'scale(0.97)' },
        }),
      }}
    >
      {/* Selected checkmark */}
      {selected && (
        <CheckCircleIcon sx={{ position: 'absolute', top: 4, right: 4, fontSize: 11, color: C.primary }} />
      )}

      <AccessTimeIcon sx={{ fontSize: 14, color: st.iconColor, display: 'block', mx: 'auto', mb: 0.4 }} />

      <Typography
        fontSize="0.72rem" fontWeight={selected ? 800 : 600}
        color={st.color} fontFamily="'Nunito', sans-serif"
        lineHeight={1.25}
        sx={{ wordBreak: 'break-word' }}
      >
        {slot?.slot}
      </Typography>

      {/* Status label badge */}
      {st.label && (
        <Box sx={{
          mt: 0.5, mx: 'auto',
          display: 'inline-flex', alignItems: 'center',
          px: 0.8, py: 0.2, borderRadius: '5px',
          bgcolor: st.labelBg,
        }}>
          <Typography fontSize="0.6rem" fontWeight={800} color={st.labelColor} fontFamily="'Nunito', sans-serif">
            {st.label}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// ─── Step indicator ────────────────────────────────────────────────────────────
const StepBar = ({ steps }) => (
  <Box sx={{ display: 'flex', mb: 3.5, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${C.border}`, bgcolor: C.surface }}>
    {steps.map(({ label, done }, i) => (
      <Box key={label} sx={{
        flex: 1, py: 1.5, px: { xs: 1, sm: 2 },
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
        bgcolor: done ? C.primaryBg : C.surface,
        borderRight: i < steps.length - 1 ? `1px solid ${C.border}` : 'none',
        transition: 'background 0.2s ease',
      }}>
        <Box sx={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
          bgcolor: done ? C.primary : C.surfaceAlt,
          border: `1.5px solid ${done ? C.primary : C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}>
          {done
            ? <CheckCircleIcon sx={{ fontSize: 14, color: '#fff' }} />
            : <Typography fontSize="0.65rem" fontWeight={800} color={C.textLight} fontFamily="'Nunito', sans-serif">{i + 1}</Typography>
          }
        </Box>
        <Typography fontSize={{ xs: '0.68rem', sm: '0.78rem' }} fontWeight={700}
          color={done ? C.primary : C.textLight} fontFamily="'Nunito', sans-serif" noWrap>
          {label}
        </Typography>
      </Box>
    ))}
  </Box>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const page = () => {
  const API_URL   = process.env.NEXT_PUBLIC_API_URL;
  const router    = useRouter();
  const params    = useParams();
  const ptID      = params?.slug?.[0] ?? null;           // reschedule mode if ptID exists

  const patientId = useSelector((state) => state.patient.selectedPatientId);
  const doctorId  = useSelector((state) => state.doctor.selectedDoctorId);

  const [patientName,          setPatientName]          = useState('');
  const [doctorData,           setDoctorData]           = useState({});
  const [doctorProjectId,      setDoctorProjectId]      = useState('');
  const [doctorFee,            setDoctorFee]            = useState('');
  const [date,                 setDate]                 = useState(TODAY);   // ← auto today
  const [doctorTimeSlots,      setDoctorTimeSlots]      = useState([]);
  const [selectedTimeSlot,     setSelectedTimeSlot]     = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState('');   // single selected service
  const [projectId,            setProjectId]            = useState('');
  const [onePatientId,         setOnePatientId]         = useState(null);
  const [apptData,             setApptData]             = useState(null);
  const [loadingSlots,         setLoadingSlots]         = useState(false);
  const [submitting,           setSubmitting]           = useState(false);
  const [imgError,             setImgError]             = useState(false);

  const isReschedule = !!ptID;

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const displayName           = isReschedule ? apptData?.patientData?.patientName    : patientName;
  const displayDoctorName     = isReschedule ? apptData?.doctor?.fullName            : doctorData?.fullName;
  const displaySpecialization = isReschedule ? apptData?.doctor?.specialization      : doctorData?.specialization;
  const displayPhoto          = isReschedule ? apptData?.doctor?.photoUrl            : doctorData?.doctorDetails?.photoUrl;
  const displayFee            = isReschedule ? apptData?.fee                         : doctorFee;
  const displayServices       = isReschedule ? apptData?.services                    : doctorData?.services;
  const doctorInitials        = displayDoctorName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const selectedSlotLabel     = doctorTimeSlots.find(s => s?.slotId === selectedTimeSlot)?.slot;

  // ── Data fetchers ─────────────────────────────────────────────────────────────
  const getOneAppointmentData = async () => {
    const res    = await fetch(`${API_URL}hims-appointment/get-hims-appointments?checkedStatus=Active`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    if (result?.isSuccess) {
      const found = result.data.find(a => a?._id === onePatientId);
      setApptData(found || null);
    }
  };

  const getPatients = async () => {
    const res    = await fetch(`${API_URL}hims-patients/getMyHimsPatients`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    if (result?.isSuccess) {
      const found = result.data.find(p => p._id === patientId?._id);
      if (found) setPatientName(found.patientName);
    }
  };

  const getDoctorData = async () => {
    const res    = await fetch(`${API_URL}patient-auth/getDoctorById/${doctorId?._id}`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    setProjectId(result?.data?.projectId);
    setDoctorData(result?.data);
  };

  const fetchTimeSlots = async (d) => {
    const did = isReschedule ? apptData?.doctor?._id : doctorId?._id;
    if (!did || !d) return;
    setLoadingSlots(true);
    setSelectedTimeSlot(null);
    try {
      const res    = await fetch(`${API_URL}time-slots/get_all_time_slots?doctorId=${did}&date=${d}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const result = await res.json();
      setDoctorTimeSlots(result?.data || []);
    } catch (e) { console.error(e); }
    finally { setLoadingSlots(false); }
  };

  // ── Effects ───────────────────────────────────────────────────────────────────
  useEffect(() => { if (ptID) setOnePatientId(ptID); }, [ptID]);
  useEffect(() => { if (onePatientId) getOneAppointmentData(); }, [onePatientId]);
  useEffect(() => { getPatients(); }, []);
  useEffect(() => { if (doctorId?._id) getDoctorData(); }, [doctorId?._id]);
  useEffect(() => {
    if (doctorData?.projectId)          setDoctorProjectId(doctorData.projectId);
    if (doctorData?.services?.[0]?.fee) setDoctorFee(doctorData.services[0].fee);
    // Auto-select first service (new booking only)
    if (!isReschedule && doctorData?.services?.length > 0 && !selectedServiceId)
      setSelectedServiceId(doctorData.services[0]._id);
  }, [doctorData]);

  // Auto-select first service for reschedule mode once apptData loads
  useEffect(() => {
    if (isReschedule && apptData?.services?.length > 0 && !selectedServiceId)
      setSelectedServiceId(apptData.services[0]._id);
  }, [apptData]);

  // Fetch time slots whenever date changes (also on mount via TODAY default)
  useEffect(() => { fetchTimeSlots(date); }, [date, apptData]);

  // ── Service handler — single select ──────────────────────────────────────────
  const handleServiceChange = (e) => setSelectedServiceId(e.target.value);

  // ── Actions ───────────────────────────────────────────────────────────────────
  const handleDone = async () => {
    if (!date)             { toast.info('Please select an appointment date'); return; }
    if (!selectedTimeSlot) { toast.info('Please select a time slot'); return; }
    setSubmitting(true);
    const res = await fetch(`${API_URL}hims-appointment/create-hims-appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({
        doctorId: doctorId?._id, patientId: patientId?._id,
        services: selectedServiceId ? [selectedServiceId] : [], feeStatus: 'unpaid',
        appointmentDate: date, extra: {}, discount: 0,
        discountInPercentage: 0, slotId: selectedTimeSlot,
        himsPatientId: String(patientId?._id), projectId,
      }),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result?.isSuccess) { toast.success('Appointment booked successfully!'); router.push('/appointments'); }
    else toast.error('Failed to book appointment');
  };

  const handleReschedule = async () => {
    if (!date)             { toast.info('Please select a new date'); return; }
    if (!selectedTimeSlot) { toast.info('Please select a time slot'); return; }
    setSubmitting(true);
    const res = await fetch(`${API_URL}hims-appointment/reschedule-hims-appointment`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ id: apptData?._id, appointmentDate: date, slotId: selectedTimeSlot }),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result?.isSuccess) { toast.success('Appointment rescheduled successfully!'); router.push('/appointments'); }
    else toast.error('Failed to reschedule appointment');
  };

  // ── Derived ───────────────────────────────────────────────────────────────────
  const selectedServiceObj  = (displayServices || []).find(s => s._id === selectedServiceId) || null;
  const steps = [
    { label: 'Patient & Doctor', done: true },
    { label: isReschedule ? 'New Date' : 'Date & Service', done: !!date && (isReschedule || !!selectedServiceId) },
    { label: 'Time Slot', done: !!selectedTimeSlot },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ══ AppBar ══════════════════════════════════════════════════════════════ */}
      <AppBar position="fixed" elevation={0} sx={{
        left: { xs: 0, md: `${SIDEBAR_W}px` },
        width: { xs: '100%', md: `calc(100% - ${SIDEBAR_W}px)` },
        background: C.surface,
        boxShadow: '0 0 20px 0 rgba(6,143,210,0.40)',
        zIndex: 1200,
      }}>
        <Toolbar sx={{ minHeight: '64px !important', display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton onClick={() => router.back()} size="small" sx={{
              bgcolor: C.primaryBg, color: C.primary, border: `1.5px solid ${C.primaryBdr}`,
              borderRadius: '10px', width: 36, height: 36,
              '&:hover': { bgcolor: 'rgba(6,143,210,0.14)' },
            }}>
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </IconButton>
            {/* <Box sx={{ width: 1, height: 22, bgcolor: C.border, mx: 0.3 }} />
            <Box sx={{
              width: 34, height: 34, borderRadius: '9px',
              bgcolor: isReschedule ? C.orangeBg : C.primaryBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {isReschedule
                ? <SwapHorizIcon sx={{ color: C.orange, fontSize: 19 }} />
                : <EventAvailableIcon sx={{ color: C.primary, fontSize: 19 }} />
              }
            </Box> */}
            <Box>
              <Typography fontWeight={900} color={C.text} fontFamily="'Nunito', sans-serif" fontSize="1rem" lineHeight={1.2}>
                {isReschedule ? 'Reschedule Appointment' : 'Book Appointment'}
              </Typography>
              <Typography fontSize="0.7rem" color={C.textLight} fontFamily="'Nunito', sans-serif">
                {fmtDate(date) || 'Select a date to begin'}
              </Typography>
            </Box>
          </Box>

          {/* Desktop CTA */}
          <Button
            onClick={isReschedule ? handleReschedule : handleDone}
            disabled={submitting}
            startIcon={submitting
              ? <CircularProgress size={14} color="inherit" />
              : isReschedule ? <UpdateIcon sx={{ fontSize: '17px !important' }} /> : <CheckCircleIcon sx={{ fontSize: '17px !important' }} />
            }
            sx={{
              display: { xs: 'none', sm: 'flex' },
              color: C.surface,
              bgcolor: isReschedule ? C.orange : C.primary,
              borderRadius: '12px', fontWeight: 800,
              fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem',
              px: 3, py: 1.1, textTransform: 'none',
              boxShadow: isReschedule
                ? '0 4px 14px rgba(249,115,22,0.32)'
                : '0 4px 14px rgba(6,143,210,0.32)',
              transition: 'all 0.22s ease',
              '&:hover': {
                bgcolor: isReschedule ? '#ea6d0e' : C.primaryDark,
                transform: 'translateY(-1px)',
                boxShadow: isReschedule ? '0 6px 20px rgba(249,115,22,0.45)' : '0 6px 20px rgba(6,143,210,0.45)',
              },
              '&:active': { transform: 'scale(0.97)' },
              '&:disabled': { bgcolor: C.border, color: C.textLight },
            }}
          >
            {submitting ? (isReschedule ? 'Rescheduling…' : 'Booking…') : isReschedule ? 'Confirm Reschedule' : 'Confirm Booking'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* ══ Page Body ═══════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          mt: '64px',
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
          bgcolor: C.surfaceAlt,
          minHeight: 'calc(100vh - 64px)',
          px: { xs: 1.5, sm: 2.5, md: 4 },
          py: 4,
          fontFamily: "'Nunito', sans-serif",
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >

        {/* ── Reschedule notice banner ──────────────────────────────────────── */}
        {isReschedule && (
          <Box sx={{
            display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5,
            p: 2, mb: 2.5, borderRadius: '14px',
            bgcolor: C.orangeBg, border: `1.5px solid ${C.orangeBdr}`,
          }}>
            <InfoOutlinedIcon sx={{ color: C.orange, fontSize: 20, flexShrink: 0, mt: { xs: 0.2, sm: 0 } }} />
            <Typography fontSize="0.85rem" fontFamily="'Nunito', sans-serif" fontWeight={600} color={C.orange}>
              You are rescheduling an existing appointment. Select a new date and time slot to confirm the change.
            </Typography>
          </Box>
        )}

        {/* ── Hero Banner ──────────────────────────────────────────────────── */}
        <Box sx={{
          borderRadius: '24px',
          // display: { xs: 'flex', sm: 'flex' },
          // alignItems: { xs: 'center', sm: "center" },
          // justifyContent: { xs: "center", sm: "center" },
          background: isReschedule
            ? `linear-gradient(135deg, ${C.orange} 0%, #dc6a10 50%, #b85a0d 100%)`
            : `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 50%, ${C.primaryDeep} 100%)`,
          p: { xs: 3, sm: 4 }, mb: 3.5,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative rings */}
          {[{ s:220,t:-70,r:-70 },{ s:120,b:-40,r:140 },{ s:80,t:20,r:120 }].map((b,i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.4)',
              top: b.t, right: b.r, bottom: b.b, opacity: 0.08, pointerEvents: 'none',
            }} />
          ))}
          <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: { xs: 'center', sm: 'center' }, gap: { xs: 2, sm: 3 }, flexWrap: { xs: 'wrap' } }}>
            {/* Doctor photo */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              {displayPhoto && !imgError ? (
                <Box component="img" src={displayPhoto} alt={displayDoctorName}
                  onError={() => setImgError(true)}
                  sx={{ width: { xs: 72, sm: 88 }, height: { xs: 72, sm: 88 }, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.45)', display: 'block' }}
                />
              ) : (
                <Avatar sx={{
                  width: { xs: 72, sm: 88 }, height: { xs: 72, sm: 88 },
                  bgcolor: 'rgba(255,255,255,0.12)', color: '#fff',
                  fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: '1.5rem',
                  border: '3px solid rgba(255,255,255,0.32)',
                }}>
                  {doctorInitials || <LocalHospitalIcon sx={{ fontSize: 32 }} />}
                </Avatar>
              )}
              <Box sx={{ position: 'absolute', bottom: 3, right: 3, width: 15, height: 15, borderRadius: '50%', bgcolor: C.accent, border: '2.5px solid rgba(255,255,255,0.9)' }} />
            </Box>

            {/* Doctor info */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Chip
                label={isReschedule ? 'Rescheduling' : 'New Appointment'}
                size="small"
                icon={isReschedule
                  ? <SwapHorizIcon style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }} />
                  : <EventAvailableIcon style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }} />
                }
                sx={{ mb: 0.8, height: 22, fontSize: '0.68rem', fontWeight: 700, fontFamily: "'Nunito', sans-serif", bgcolor: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.22)' }}
              />
              <Typography fontFamily="'Nunito', sans-serif" fontWeight={900} fontSize={{ xs: '1.3rem', sm: '1.75rem' }} color="#fff" lineHeight={1.2}>
                {displayDoctorName || 'Loading…'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                <Typography fontFamily="'Nunito', sans-serif" fontSize="0.88rem" color="rgba(255,255,255,0.75)">
                  {displaySpecialization || '—'}
                </Typography>
                {displaySpecialization && <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.4)' }} />}
                <Box sx={{ display: 'flex', gap: 0.3 }}>
                  {[1,2,3,4,5].map(s => <StarIcon key={s} sx={{ fontSize: 12, color: s <= 4 ? '#fbbf24' : 'rgba(255,255,255,0.25)' }} />)}
                </Box>
              </Box>
            </Box>

            {/* Live summary pills (desktop) */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1, alignItems: 'flex-end', flexShrink: 0 }}>
              {[
                { icon: <PersonIcon />,        v: displayName || 'Patient' },
                { icon: <CalendarMonthIcon />, v: date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Today' },
                { icon: <AccessTimeIcon />,    v: selectedSlotLabel || 'No slot selected' },
              ].map(({ icon, v }) => (
                <Box key={v} sx={{
                  display: 'flex', alignItems: 'center', gap: 0.8,
                  bgcolor: 'rgba(255,255,255,0.12)', borderRadius: '8px',
                  px: 1.5, py: 0.7, border: '1px solid rgba(255,255,255,0.18)',
                }}>
                  {React.cloneElement(icon, { sx: { fontSize: 13, color: 'rgba(255,255,255,0.75)' } })}
                  <Typography fontSize="0.73rem" color="rgba(255,255,255,0.88)" fontFamily="'Nunito', sans-serif" fontWeight={600} noWrap>
                    {v}
                  </Typography>
                </Box>
              ))}
            </Box> */}
          </Box>
        </Box>

        {/* ── Progress stepper ──────────────────────────────────────────────── */}
        <StepBar steps={steps} />

        {/* ── Two-column grid ───────────────────────────────────────────────── */}
        {/* ── Two-column grid ───────────────────────────────────────────────── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr',
            lg: '420px 1fr'
          },
          gap: 3,
          /* Don't stretch — let left column be natural height, right card is fixed */
          alignItems: 'start',
        }}>

          {/* ─── LEFT ──────────────────────────────────────────────────────── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Booking Summary */}
            <SectionCard icon={<PersonIcon />} title="Booking Summary" subtitle="Patient & doctor details" noPad>
              <Box sx={{ px: 3, pt: 0.5 }}>
                <InfoRow icon={<PersonIcon />}          label="Patient"        value={displayName}             color={C.primary} />
                <InfoRow icon={<LocalHospitalIcon />}   label="Doctor"         value={displayDoctorName}       color="#e85d7f" />
                <InfoRow icon={<MedicalServicesIcon />} label="Specialization" value={displaySpecialization}   color={C.accent} last />
              </Box>
              {/* Reschedule: show current appt date */}
              {isReschedule && apptData?.appointmentDate && (
                <Box sx={{ mx: 3, mb: 3, mt: 1, p: 2, bgcolor: C.orangeBg, borderRadius: '12px', border: `1px solid ${C.orangeBdr}` }}>
                  <Typography fontSize="0.67rem" color={C.orange} fontFamily="'Nunito', sans-serif" textTransform="uppercase" letterSpacing="0.05em" mb={0.3}>
                    Current Appointment Date
                  </Typography>
                  <Typography fontSize="0.87rem" fontWeight={700} color={C.text} fontFamily="'Nunito', sans-serif">
                    {fmtDate(apptData.appointmentDate)}
                  </Typography>
                </Box>
              )}
            </SectionCard>

            {/* Date Picker */}
            <SectionCard
              icon={<CalendarMonthIcon />}
              title="Appointment Date"
              subtitle={isReschedule ? 'Pick a new date for rescheduling' : 'Today is pre-filled — change if needed'}
              color={isReschedule ? C.orange : C.primary}
            >
              <TextField
                type="date" fullWidth size="small"
                value={date}
                onChange={e => { setDate(e.target.value); setSelectedTimeSlot(null); }}
                inputProps={{ min: TODAY }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px', fontFamily: "'Nunito', sans-serif",
                    fontSize: '0.92rem', fontWeight: 700, bgcolor: C.surfaceAlt,
                    '& fieldset': { borderColor: C.border },
                    '&:hover fieldset': { borderColor: isReschedule ? C.orange : C.primary },
                    '&.Mui-focused fieldset': { borderColor: isReschedule ? C.orange : C.primary, borderWidth: 2 },
                  },
                }}
              />
              {date && (
                <Box sx={{
                  mt: 1.5, display: 'flex', alignItems: 'center', gap: 1.2,
                  p: 1.5, borderRadius: '10px',
                  bgcolor: isReschedule ? C.orangeBg : C.primaryBg,
                  border: `1px solid ${isReschedule ? C.orangeBdr : C.primaryBdr}`,
                }}>
                  <CalendarMonthIcon sx={{ fontSize: 16, color: isReschedule ? C.orange : C.primary, flexShrink: 0 }} />
                  <Typography fontSize="0.82rem" fontFamily="'Nunito', sans-serif" fontWeight={700}
                    color={isReschedule ? C.orange : C.primary}>
                    {fmtDate(date)}
                  </Typography>
                </Box>
              )}
            </SectionCard>

            {/* Services — single select dropdown */}
            {!isReschedule && (
              <SectionCard icon={<MedicalServicesIcon />} title="Select Service" subtitle="First service pre-selected — change if needed" color={C.accent}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', '&.Mui-focused': { color: C.accent } }}>
                    Service
                  </InputLabel>
                  <Select
                    label="Service"
                    value={selectedServiceId}
                    onChange={handleServiceChange}
                    sx={{
                      borderRadius: '12px', fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.accent },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.accent, borderWidth: 2 },
                    }}
                  >
                    {Array.isArray(displayServices) && displayServices.map(s => (
                      <MenuItem key={s._id} value={s._id}
                        sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
                        {s.serviceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Selected service summary pill */}
                {selectedServiceObj && (
                  <Box sx={{
                    mt: 2, display: 'flex', alignItems: 'center', gap: 1.5,
                    p: 1.8, bgcolor: C.accentBg, borderRadius: '12px',
                    border: `1.5px solid ${C.accentBdr}`,
                  }}>
                    <Box sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: `${C.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MedicalServicesIcon sx={{ fontSize: 17, color: C.accent }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontSize="0.67rem" color={C.accent} fontFamily="'Nunito', sans-serif" textTransform="uppercase" letterSpacing="0.06em" lineHeight={1}>
                        Selected Service
                      </Typography>
                      <Typography fontSize="0.9rem" fontWeight={800} color={C.text} fontFamily="'Nunito', sans-serif" noWrap>
                        {selectedServiceObj.serviceName}
                      </Typography>
                    </Box>
                    <CheckCircleIcon sx={{ color: C.accent, fontSize: 20, ml: 'auto', flexShrink: 0 }} />
                  </Box>
                )}
              </SectionCard>
            )}

            {/* Services in reschedule mode — single select dropdown */}
            {isReschedule && Array.isArray(apptData?.services) && apptData.services.length > 0 && (
              <SectionCard icon={<MedicalServicesIcon />} title="Select Service" subtitle="Change service if needed" color={C.accent}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', '&.Mui-focused': { color: C.accent } }}>
                    Service
                  </InputLabel>
                  <Select
                    label="Service"
                    value={selectedServiceId}
                    onChange={handleServiceChange}
                    sx={{
                      borderRadius: '12px', fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.accent },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.accent, borderWidth: 2 },
                    }}
                  >
                    {apptData.services.map(s => (
                      <MenuItem key={s._id} value={s._id}
                        sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
                        {s.serviceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedServiceObj && (
                  <Box sx={{
                    mt: 2, display: 'flex', alignItems: 'center', gap: 1.5,
                    p: 1.8, bgcolor: C.accentBg, borderRadius: '12px',
                    border: `1.5px solid ${C.accentBdr}`,
                  }}>
                    <Box sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: `${C.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MedicalServicesIcon sx={{ fontSize: 17, color: C.accent }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontSize="0.67rem" color={C.accent} fontFamily="'Nunito', sans-serif" textTransform="uppercase" letterSpacing="0.06em" lineHeight={1}>
                        Selected Service
                      </Typography>
                      <Typography fontSize="0.9rem" fontWeight={800} color={C.text} fontFamily="'Nunito', sans-serif" noWrap>
                        {selectedServiceObj.serviceName}
                      </Typography>
                    </Box>
                    <CheckCircleIcon sx={{ color: C.accent, fontSize: 20, ml: 'auto', flexShrink: 0 }} />
                  </Box>
                )}
              </SectionCard>
            )}

            {/* Fee */}
            {displayFee && (
              <SectionCard icon={<PaymentsIcon />} title="Consultation Fee" subtitle="Payable at the clinic" color={C.amber}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2, bgcolor: C.amberBg, borderRadius: '14px', border: `1px solid ${C.amberBdr}` }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PaymentsIcon sx={{ color: C.amber, fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography fontSize="0.7rem" color={C.textLight} fontFamily="'Nunito', sans-serif" textTransform="uppercase" letterSpacing="0.06em">Amount Due</Typography>
                    <Typography fontSize="1.5rem" fontWeight={900} color={C.text} fontFamily="'Nunito', sans-serif" lineHeight={1.2}>
                      Rs. {displayFee}
                    </Typography>
                  </Box>
                  <Chip label="Unpaid" size="small"
                    sx={{ ml: 'auto', fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.72rem', bgcolor: C.redBg, color: C.red, border: `1px solid rgba(239,68,68,0.22)` }}
                  />
                </Box>
              </SectionCard>
            )}
          </Box>

          {/* ─── RIGHT — Time Slots — fixed height, inner scroll ──────────── */}
          <Box sx={{
            position: { xs: 'static', lg: 'sticky' },
            top: { lg: '80px' },
            /* Height equals viewport minus appbar + padding so it never causes page scroll */
            height: { xs: 'auto', lg: '900px' },
            display: 'flex', flexDirection: 'column',
          }}>
            <Box sx={{
              bgcolor: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(6,143,210,0.05)',
              transition: 'box-shadow 0.22s ease',
              '&:hover': { boxShadow: '0 8px 30px rgba(6,143,210,0.10)' },
              display: 'flex',
              flexDirection: 'column',
              /* Fill parent sticky wrapper exactly — inner grid scrolls, page does not */
              flex: 1,
              minHeight: 0,
              maxHeight: { xs: 600, lg: '100%' },
            }}>
              {/* Top accent line */}
              <Box sx={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${isReschedule ? C.orange : C.primary}, ${C.accent})` }} />

              {/* Card header */}
              <Box sx={{
                px: 3, py: 2.2, flexShrink: 0,
                borderBottom: `1px solid ${C.border}`,
                background: `linear-gradient(120deg, ${isReschedule ? C.orangeBg : C.primaryBg} 0%, ${C.surface} 100%)`,
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                  bgcolor: isReschedule ? C.orangeBg : C.primaryBg,
                  border: `1.5px solid ${isReschedule ? C.orangeBdr : C.primaryBdr}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AccessTimeIcon sx={{ fontSize: 18, color: isReschedule ? C.orange : C.primary }} />
                </Box>
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography fontWeight={800} fontSize="0.92rem" color={C.text} fontFamily="'Nunito', sans-serif" lineHeight={1.2}>
                    Available Time Slots
                  </Typography>
                  <Typography fontSize="0.71rem" color={C.textLight} fontFamily="'Nunito', sans-serif" noWrap>
                    {date
                      ? `${loadingSlots ? 'Loading…' : `${doctorTimeSlots.length} slot${doctorTimeSlots.length !== 1 ? 's' : ''}`} · ${new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}`
                      : 'Select a date first'}
                  </Typography>
                </Box>
              </Box>

              {/* Body — flex, inner area scrolls */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, p: 2.5 }}>

                {loadingSlots ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 2 }}>
                    <CircularProgress size={36} sx={{ color: isReschedule ? C.orange : C.primary }} />
                    <Typography fontSize="0.82rem" color={C.textLight} fontFamily="'Nunito', sans-serif">
                      Fetching available slots…
                    </Typography>
                  </Box>

                ) : doctorTimeSlots.length === 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: C.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 28, color: C.primaryBdr }} />
                    </Box>
                    <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} color={C.textMid} fontSize="0.95rem">
                      No slots available
                    </Typography>
                    <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color={C.textLight} mt={0.5}>
                      Try selecting a different date
                    </Typography>
                  </Box>

                ) : (
                  <>
                    {/* Legend */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2, flexShrink: 0 }}>
                      {[
                        { dot: C.accent,  label: 'Available'   },
                        { dot: C.primary, label: 'Selected'    },
                        { dot: '#94a3b8', label: 'Booked'      },
                        { dot: C.red,     label: 'Time Passed' },
                      ].map(({ dot, label }) => (
                        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: dot, flexShrink: 0 }} />
                          <Typography fontSize="0.67rem" fontWeight={700} color={C.textLight} fontFamily="'Nunito', sans-serif">
                            {label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* ── Scrollable slot grid — this scrolls, NOT the page ── */}
                    <Box sx={{
                      flex: 1,
                      minHeight: 0,           /* critical: lets flex child shrink below content size */
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      mb: 2,
                      pr: 0.5,
                      '&::-webkit-scrollbar': { width: 4 },
                      '&::-webkit-scrollbar-track': { background: 'transparent' },
                      '&::-webkit-scrollbar-thumb': { background: C.primaryBdr, borderRadius: 8 },
                    }}>
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: 'repeat(2, 1fr)',
                          sm: 'repeat(3, 1fr)',
                          md: 'repeat(4, 1fr)',
                          lg: 'repeat(auto-fill, minmax(90px, 1fr))'
                        },
                        gap: 1,
                      }}>
                        {doctorTimeSlots.map((slot, i) => (
                          <SlotPill
                            key={slot?._id || `slot-${i}`}
                            slot={slot}
                            selected={selectedTimeSlot === slot?.slotId}
                            selectedDate={date}
                            onClick={() => {
                              const st = getSlotStatus(slot, date);
                              if (st === 'booked' || st === 'past') return;
                              setSelectedTimeSlot(slot?.slotId);
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Confirmation bar — always pinned at bottom */}
                    <Box sx={{
                      flexShrink: 0,
                      p: 2, borderRadius: '14px',
                      bgcolor: selectedTimeSlot ? (isReschedule ? C.orangeBg : C.primaryBg) : C.surfaceAlt,
                      border: `2px ${selectedTimeSlot ? 'solid' : 'dashed'} ${selectedTimeSlot ? (isReschedule ? C.orangeBdr : C.primaryBdr) : C.border}`,
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      transition: 'all 0.25s ease',
                    }}>
                      <Box sx={{
                        width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                        bgcolor: selectedTimeSlot ? (isReschedule ? C.orange : C.primary) : C.border,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.25s ease',
                      }}>
                        {selectedTimeSlot
                          ? <CheckCircleIcon sx={{ color: '#fff', fontSize: 20 }} />
                          : <AccessTimeIcon sx={{ color: C.textLight, fontSize: 18 }} />
                        }
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography fontSize="0.67rem" color={C.textLight} fontFamily="'Nunito', sans-serif"
                          textTransform="uppercase" letterSpacing="0.06em" lineHeight={1}>
                          {selectedTimeSlot ? 'Selected Slot' : 'No slot selected'}
                        </Typography>
                        <Typography fontSize="0.9rem" fontWeight={800} fontFamily="'Nunito', sans-serif" noWrap
                          color={selectedTimeSlot ? (isReschedule ? C.orange : C.primary) : C.textLight}>
                          {selectedTimeSlot ? selectedSlotLabel : 'Tap a slot above to choose'}
                        </Typography>
                      </Box>
                      {selectedTimeSlot && (
                        <Chip label="Confirmed" size="small"
                          icon={<CheckCircleIcon style={{ fontSize: 11, color: C.accent }} />}
                          sx={{ flexShrink: 0, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.7rem', bgcolor: C.accentBg, color: C.accent, border: `1px solid ${C.accentBdr}` }}
                        />
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── Mobile CTA ────────────────────────────────────────────────────── */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, mt: 3, gap: 1.5 }}>
          <Button fullWidth onClick={() => router.back()} variant="outlined"
            sx={{ borderRadius: '14px', fontWeight: 700, fontFamily: "'Nunito', sans-serif", textTransform: 'none', fontSize: '0.9rem', py: 1.5, color: C.textMid, borderColor: C.border, '&:hover': { borderColor: C.textMid, bgcolor: C.surfaceAlt } }}>
            Back
          </Button>
          <Button fullWidth onClick={isReschedule ? handleReschedule : handleDone} disabled={submitting}
            startIcon={submitting ? <CircularProgress size={15} color="inherit" /> : isReschedule ? <UpdateIcon /> : <CheckCircleIcon />}
            sx={{
              borderRadius: '14px', fontWeight: 800, fontFamily: "'Nunito', sans-serif",
              textTransform: 'none', fontSize: '0.9rem', py: 1.5,
              color: C.surface, bgcolor: isReschedule ? C.orange : C.primary,
              boxShadow: isReschedule ? '0 4px 16px rgba(249,115,22,0.35)' : '0 4px 16px rgba(6,143,210,0.35)',
              '&:hover': { bgcolor: isReschedule ? '#ea6d0e' : C.primaryDark },
              '&:disabled': { bgcolor: C.border, color: C.textLight },
            }}>
            {submitting
              ? (isReschedule ? 'Rescheduling…' : 'Booking…')
              : (isReschedule ? 'Confirm Reschedule' : 'Confirm Booking')
            }
          </Button>
        </Box>
        <Box sx={{ height: 40 }} />
      </Box>
    </>
  );
};

export default page;