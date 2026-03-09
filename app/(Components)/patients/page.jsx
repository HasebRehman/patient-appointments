"use client";

import React from 'react';
import { setPatientId } from "../../redux/slices/patientSlice";
import {
  Box, AppBar, Toolbar, Button, Typography, Modal,
  Grid, Card, CardContent, Avatar, Chip, Divider,
  TextField, RadioGroup, FormControlLabel, Radio,
  FormLabel, IconButton, InputAdornment
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalHospitalIcon  from '@mui/icons-material/LocalHospital';
import ApartmentIcon      from '@mui/icons-material/Apartment';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PaymentsIcon       from '@mui/icons-material/Payments';
import AccessTimeIcon     from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FolderOffIcon      from '@mui/icons-material/FolderOff';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../../redux/slices/UserSlice';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { Skeleton } from "@mui/material";
import MenuRoundedIcon       from '@mui/icons-material/MenuRounded';

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:     '#068fd2',
  primaryDark: '#0570a6',
  primaryBg:   'rgba(6,143,210,0.08)',
  primaryBdr:  'rgba(6,143,210,0.22)',
  accent:      '#00c6a7',
  surface:     '#ffffff',
  surfaceAlt:  '#f4f8fc',
  border:      '#e0ecf5',
  text:        '#0f1f2e',
  textMid:     '#445566',
  textLight:   '#7a96ab',
};

const Color = {
  primary:     '#068fd2',
  primaryDark: '#0570a6',
  primaryDeep: '#034e76',
  primaryBg:   'rgba(6,143,210,0.07)',
  primaryBdr:  'rgba(6,143,210,0.20)',
  accent:      '#00c6a7',
  accentBg:    'rgba(0,198,167,0.07)',
  accentBdr:   'rgba(0,198,167,0.25)',
  amber:       '#f59e0b',
  amberBg:     'rgba(245,158,11,0.07)',
  amberBdr:    'rgba(245,158,11,0.22)',
  pink:        '#e85d7f',
  pinkBg:      'rgba(232,93,127,0.07)',
  pinkBdr:     'rgba(232,93,127,0.22)',
  surface:     '#ffffff',
  surfaceAlt:  '#f4f8fc',
  border:      '#e0ecf5',
  text:        '#0f1f2e',
  textMid:     '#445566',
  textLight:   '#7a96ab',
};


const SIDEBAR_W = 240;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95vw', sm: '90vw', md: 700 },
  maxHeight: '92vh',
  overflowY: 'auto',
  bgcolor: C.surface,
  borderRadius: '24px',
  boxShadow: '0 24px 80px rgba(6,143,210,0.25)',
  p: 0,
  outline: 'none',
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': { background: C.primaryBdr, borderRadius: '3px' },
};

// ─── Patient Card Skeleton ─────────────────────────────────────────────────────
const PatientCardSkeleton = ({ i = 0 }) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid #e0ecf5',
      borderRadius: '15px',
      overflow: 'hidden',
      bgcolor: '#fff',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      animation: `fadeUp 0.4s ease both`,
      animationDelay: `${i * 55}ms`,
      '@keyframes fadeUp': {
        from: { opacity: 0, transform: 'translateY(14px)' },
        to:   { opacity: 1, transform: 'translateY(0)' },
      },
    }}
  >
    {/* Top accent bar */}
    <Box sx={{ height: 4, bgcolor: '#e0ecf5' }} />
    <CardContent sx={{ p: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={52} height={52} sx={{ flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rounded" width="62%" height={17} sx={{ mb: 0.8, borderRadius: '6px', animationDelay: `${i*55+20}ms` }} />
          <Skeleton variant="rounded" width="32%" height={20} sx={{ borderRadius: '10px', animationDelay: `${i*55+35}ms` }} />
        </Box>
      </Box>
      <Skeleton variant="rounded" width="100%" height={1} sx={{ mb: 2 }} />
      {[0, 1, 2].map(j => (
        <Box key={j} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.1 }}>
          <Skeleton variant="rounded" width={30} height={30} sx={{ borderRadius: '8px', flexShrink: 0, animationDelay: `${i*55+j*25}ms` }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rounded" width="30%" height={10} sx={{ mb: 0.4, borderRadius: '4px' }} />
            <Skeleton variant="rounded" width="55%" height={14} sx={{ borderRadius: '5px' }} />
          </Box>
        </Box>
      ))}
    </CardContent>
    <Box sx={{ px: 2.5, pb: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Skeleton variant="rounded" width="100%" height={38} sx={{ borderRadius: '10px', animationDelay: `${i*55+100}ms` }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" width="50%" height={34} sx={{ borderRadius: '10px', animationDelay: `${i*55+115}ms` }} />
        <Skeleton variant="rounded" width="50%" height={34} sx={{ borderRadius: '10px', animationDelay: `${i*55+130}ms` }} />
      </Box>
    </Box>
  </Card>
);

// ─── History Card Skeleton (inside History Modal) ──────────────────────────────
const HistoryCardSkeleton = ({ i = 0 }) => (
  <Box
    sx={{
      bgcolor: Color.surface,
      border: `1px solid ${Color.border}`,
      borderRadius: '18px',
      overflow: 'hidden',
      animation: 'histSkIn 0.35s cubic-bezier(0.22,1,0.36,1) both',
      animationDelay: `${i * 80}ms`,
      '@keyframes histSkIn': {
        from: { opacity: 0, transform: 'translateY(14px)' },
        to:   { opacity: 1, transform: 'translateY(0)' },
      },
    }}
  >
    {/* Top bar */}
    <Box sx={{ height: 3, bgcolor: Color.border }} />
    {/* Header row */}
    <Box sx={{
      px: 2.5, py: 2,
      background: `linear-gradient(120deg, ${Color.primaryBg} 0%, ${Color.surface} 100%)`,
      borderBottom: `1px solid ${Color.border}`,
      display: 'flex', alignItems: 'center', gap: 1.5,
    }}>
      <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: '8px', flexShrink: 0, animationDelay: `${i*80+10}ms` }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="rounded" width="50%" height={17} sx={{ mb: 0.6, borderRadius: '6px', animationDelay: `${i*80+20}ms` }} />
        <Skeleton variant="rounded" width="32%" height={12} sx={{ borderRadius: '5px', animationDelay: `${i*80+30}ms` }} />
      </Box>
      <Skeleton variant="rounded" width={110} height={24} sx={{ borderRadius: '8px', display: { xs: 'none', sm: 'block' }, animationDelay: `${i*80+40}ms` }} />
    </Box>
    {/* Info grid — matches 2-col layout */}
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
      bgcolor: Color.surfaceAlt,
    }}>
      {[0, 1, 2, 3, 4, 5].map(j => (
        <Box
          key={j}
          sx={{
            borderBottom: j < 4 ? `1px solid ${Color.border}` : { xs: j === 4 ? `1px solid ${Color.border}` : 'none', sm: 'none' },
            borderRight: j % 2 === 0 ? { xs: 'none', sm: `1px solid ${Color.border}` } : 'none',
            px: 2, py: 1.4,
            display: 'flex', alignItems: 'center', gap: 1.5,
          }}
        >
          <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: '9px', flexShrink: 0, animationDelay: `${i*80+j*18}ms` }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rounded" width="35%" height={10} sx={{ mb: 0.5, borderRadius: '4px' }} />
            <Skeleton variant="rounded" width="65%" height={14} sx={{ borderRadius: '5px' }} />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

// ─── Reusable Field ────────────────────────────────────────────────────────────
const Field = ({ label, icon, ...props }) => (
  <TextField
    label={label} fullWidth size="small" variant="outlined"
    InputProps={{
      startAdornment: icon ? (
        <InputAdornment position="start">
          {React.cloneElement(icon, { sx: { color: C.primary, fontSize: 18 } })}
        </InputAdornment>
      ) : undefined,
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '10px', fontSize: '0.875rem',
        fontFamily: "'Nunito', sans-serif",
        '& fieldset': { borderColor: C.border },
        '&:hover fieldset': { borderColor: C.primary },
        '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
        '&.Mui-disabled': { bgcolor: C.surfaceAlt },
      },
      '& .MuiInputLabel-root': {
        fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', color: C.textMid,
        '&.Mui-focused': { color: C.primary },
      },
    }}
    {...props}
  />
);

// ─── Patient Card ──────────────────────────────────────────────────────────────
const PatientCard = ({ patient, onHistory, onEdit, index }) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  const doctorId = useSelector((state) => state.doctor.selectedDoctorId);

  const initials    = patient?.patientName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const genderColor = patient?.gender === 'Female' ? '#d26eb4' : C.primary;

  const bookAppointment = (id) => {
    if (doctorId?._id) {
      dispatch(setPatientId(id));
      router.push('/patient_appointment');
    } else {
      dispatch(setPatientId(id));
      router.push('/doctors');
    }
  };


  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${C.border}`,
        borderRadius: '15px',
        overflow: 'hidden',
        bgcolor: C.surface,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        animation: `fadeUp 0.4s ease both`,
        animationDelay: `${index * 55}ms`,
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(14px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        transition: 'all 0.26s cubic-bezier(0.34,1.4,0.64,1)',
        '&:hover': {
          boxShadow: '0 12px 36px rgba(6,143,210,0.16)',
          borderColor: C.primaryBdr,
          transform: 'translateY(-3px)',
        },
      }}
    >
      {/* Top accent bar */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` }} />

      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        {/* Avatar + name + gender */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{
            width: 52, height: 52,
            bgcolor: C.primaryBg, color: C.primary,
            fontWeight: 800, fontFamily: "'Nunito', sans-serif",
            fontSize: '1.05rem', border: `2px solid ${C.primaryBdr}`,
            flexShrink: 0,
          }}>
            {initials || <PersonIcon />}
          </Avatar>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              fontWeight={800} fontSize="0.97rem" color={C.text}
              fontFamily="'Nunito', sans-serif" noWrap
            >
              {patient?.patientName}
            </Typography>
            <Chip
              label={patient?.gender || '—'}
              size="small"
              sx={{
                mt: 0.3, height: 20, fontSize: '0.7rem', fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                bgcolor: `${genderColor}15`, color: genderColor,
                border: `1px solid ${genderColor}35`,
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 2, borderColor: C.border }} />

        {/* Info rows */}
        {[
          { icon: <PersonIcon />, label: 'Guardian', value: patient?.guardiansName, color: C.primary },
          { icon: <PhoneIcon />,  label: 'Phone',    value: patient?.phonNumber,    color: C.accent },
          { icon: <CakeIcon />,   label: 'DOB',      value: patient?.dob ? new Date(patient.dob).toLocaleDateString('en-GB') : '—', color: '#f59e0b' },
        ].map(({ icon, label, value, color }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.1 }}>
            <Box sx={{
              width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
              bgcolor: `${color}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {React.cloneElement(icon, { sx: { fontSize: 15, color } })}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography fontSize="0.68rem" color={C.textLight} fontFamily="'Nunito', sans-serif" lineHeight={1.2} textTransform="uppercase" letterSpacing="0.04em">
                {label}
              </Typography>
              <Typography fontSize="0.84rem" color={C.text} fontFamily="'Nunito', sans-serif" fontWeight={700} noWrap>
                {value || '—'}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>

      {/* ── Action Buttons ── */}
      <Box sx={{ px: 2.5, pb: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Book Appointment — primary CTA */}
        <Box
          onClick={() => bookAppointment(patient)}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            py: 1.15, borderRadius: '10px', cursor: 'pointer',
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            color: C.surface, fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
            boxShadow: '0 4px 14px rgba(6,143,210,0.28)',
            transition: 'all 0.22s ease', userSelect: 'none',
            '&:hover': { boxShadow: '0 6px 20px rgba(6,143,210,0.42)', transform: 'translateY(-1px)' },
            '&:active': { transform: 'scale(0.97)' },
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: 15 }} />
          Book Appointment
        </Box>

        {/* Secondary row: History + Edit */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<HistoryIcon sx={{ fontSize: '14px !important' }} />}
            onClick={() => onHistory(patient?._id)}
            sx={{
              flex: 1, borderRadius: '10px', fontSize: '0.76rem', fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", textTransform: 'none',
              color: C.primary, border: `1.5px solid ${C.primaryBdr}`, bgcolor: C.primaryBg,
              '&:hover': { bgcolor: 'rgba(6,143,210,0.14)', borderColor: C.primary },
            }}
          >
            History
          </Button>
          <Button
            size="small"
            startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
            onClick={() => onEdit(patient)}
            sx={{
              flex: 1, borderRadius: '10px', fontSize: '0.76rem', fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", textTransform: 'none',
              color: C.surface, bgcolor: C.primary,
              '&:hover': { bgcolor: C.primaryDark },
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [addPatientOpen, setAddPatientOpen]   = useState(false);
  const [openHistory, setOpenHistory]         = useState(false);
  const [patientName, setPatientName]         = useState('');
  const [guardianName, setGuardianName]       = useState('');
  const [gender, setGender]                   = useState('');
  const [dob, setDob]                         = useState('');
  const [age, setAge]                         = useState('');
  const [phoneNum, setPhoneNum]               = useState('');
  const [cnic, setCnic]                       = useState('');
  const [helthId, setHelthId]                 = useState('');
  const [city, setCity]                       = useState('');
  const [reference, setReference]             = useState('');
  const [allPatientData, setAllPatientData]   = useState([]);
  const [patientHistory, setPatientHistory]   = useState([]);
  const [editPatientButton, setEditPatientButton] = useState(false);
  const [patientId, setPatientId]             = useState('');
  const [originalPatient, setOriginalPatient] = useState(null);
  const [searchQuery, setSearchQuery]         = useState('');
  const [loading, setLoading] = useState(false);
  // Separate loading state for history modal so they don't conflict
  const [historyLoading, setHistoryLoading]   = useState(false);

 useEffect(() => {
   console.log('patient History', patientHistory);
 }, [patientHistory])
  

  const handleOpen = () => {
    setEditPatientButton(false);
    setPatientName(''); setGuardianName(''); setGender('');
    setDob(''); setCnic(''); setHelthId(''); setCity('');
    setReference(''); setAge('');
    setAddPatientOpen(true);
  };
  const handleClose         = () => setAddPatientOpen(false);
  const handleCloseHistory  = () => setOpenHistory(false);

  const handleDobChange = (e) => {
    const val = e.target.value;
    setDob(val);
    if (val) {
      const today = new Date(), birth = new Date(val);
      let a = today.getFullYear() - birth.getFullYear();
      if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) a--;
      setAge(a);
    } else setAge('');
  };

  const getAllPatient = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}hims-patients/getMyHimsPatients`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    setAllPatientData(result?.data || []);
    setLoading(false);
  };

  const registerPatient = async () => {
    if (!patientName || !guardianName || !gender || !dob) { toast.info('Please enter required fields'); return; }
    setLoading(true);
    const res = await fetch(`${API_URL}hims-patients/createHimsPatient`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ patientName, guardiansName: guardianName, gender, dob, phonNumber: phoneNum, cnic, helthId, city, reference }),
    });
    const result = await res.json();
    if (result?.isSuccess) { toast.success('Patient added successfully'); handleClose(); getAllPatient(); setLoading(false); }
    else toast.error('Patient not added');
  };

  const editPatient = async () => {
    if (!originalPatient) return;
    setLoading(true);
    const payload = { patientName, guardiansName: guardianName, gender, dob, phonNumber: phoneNum, cnic, helthId, city, reference };
    const unchanged = Object.keys(payload).every(k => originalPatient[k] === payload[k]);
    if (unchanged) { toast.info('No changes detected'); return; }
    const res = await fetch(`${API_URL}hims-patients/updateHimsPatient/${patientId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result?.isSuccess) { toast.success('Patient updated successfully'); handleClose(); getAllPatient(); setLoading(false); }
    else toast.error('Update failed');
  };

  const calculateAge = (bd) => {
    const today = new Date(), b = new Date(bd);
    let a = today.getFullYear() - b.getFullYear();
    if (today.getMonth() < b.getMonth() || (today.getMonth() === b.getMonth() && today.getDate() < b.getDate())) a--;
    return a;
  };

  const handleEditPatient = (p) => {
    setEditPatientButton(true); setOriginalPatient(p);
    setPatientName(p.patientName); setGuardianName(p.guardiansName);
    setGender(p.gender); setDob(p.dob); setCnic(p.cnic);
    setHelthId(p.helthId); setCity(p.city); setReference(p.reference);
    setAge(calculateAge(p.dob)); setPatientId(p._id); setPhoneNum(p.phonNumber);
    setAddPatientOpen(true);
  };

  const handlePatientHistory = async (id) => {
    setOpenHistory(true);
    setHistoryLoading(true);
    setPatientHistory([]);
    const res = await fetch(`${API_URL}hims-appointment/getPatientHistory/${id}`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const result = await res.json();
    setPatientHistory(result?.data || []);
    setHistoryLoading(false);
  };

  useEffect(() => { getAllPatient(); dispatch(getUserData()); }, []);
  useEffect(() => { if (userData?.data?.mobileNo) setPhoneNum(userData.data.mobileNo); }, [userData]);

  const filtered = allPatientData?.filter(p =>
    !searchQuery ||
    p?.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p?.phonNumber?.includes(searchQuery)
  ) || [];

  
  // fmtDate for history modal
  const fmtDate = (d) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return d; }
};


// InfoRow for history modal
const InfoRow = ({ icon, iconColor, iconBg, label, value, last }) => (
  <Box sx={{
    display: 'flex', alignItems: 'center', gap: 1.5,
    px: 2, py: 1.4,
    borderBottom: last ? 'none' : `1px solid ${Color.border}`,
  }}>
    <Box sx={{
      width: 32, height: 32, borderRadius: '9px', flexShrink: 0,
      bgcolor: iconBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {React.cloneElement(icon, { sx: { fontSize: 15, color: iconColor } })}
    </Box>
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography fontSize="0.65rem" fontWeight={700} color={Color.textLight}
        fontFamily="'Nunito', sans-serif" textTransform="uppercase" letterSpacing="0.06em" lineHeight={1} mb={0.3}>
        {label}
      </Typography>
      <Typography fontSize="0.87rem" fontWeight={700} color={Color.text}
        fontFamily="'Nunito', sans-serif" noWrap>
        {value || '—'}
      </Typography>
    </Box>
  </Box>
);

  // initials for History Modal
  const initials = (n) => n?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '';


  // History Card for history Modal
  const HistoryCard = ({ patient, index }) => {
  const doctorName   = patient?.appointments?.doctor?.fullName;
  const hospitalName = patient?.appointments?.hospitalInfo?.hospitalName;
  const service      = patient?.appointments?.services?.[0]?.serviceName;
  const fee          = patient?.appointments?.fee;
  const slot         = patient?.appointments?.slot;
  const apptDate     = patient?.appointments?.appointmentDate;

  return (
    <Box sx={{
      bgcolor: Color.surface,
      border: `1px solid ${Color.border}`,
      borderRadius: '18px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(6,143,210,0.06)',
      animation: 'histCardIn 0.35s cubic-bezier(0.22,1,0.36,1) both',
      animationDelay: `${index * 80}ms`,
      '@keyframes histCardIn': {
        from: { opacity: 0, transform: 'translateY(14px)' },
        to:   { opacity: 1, transform: 'translateY(0)' },
      },
      transition: 'box-shadow 0.2s ease',
      '&:hover': { boxShadow: '0 6px 24px rgba(6,143,210,0.11)' },
    }}>
      {/* Coloured top bar */}
      <Box sx={{ height: 3, background: `linear-gradient(90deg, ${Color.primary}, ${Color.accent})` }} />

      {/* Card header — patient name + index badge */}
      <Box sx={{
        px: 2.5, py: 2,
        background: `linear-gradient(120deg, ${Color.primaryBg} 0%, ${Color.surface} 100%)`,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', gap: 1.5,
      }}>
        {/* Index badge */}
        <Box sx={{
          width: 28, height: 28, borderRadius: '8px', flexShrink: 0,
          background: `linear-gradient(135deg, ${Color.primary}22, ${Color.accent}18)`,
          border: `1.5px solid ${Color.primaryBdr}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography fontSize="0.7rem" fontWeight={900} color={Color.primary} fontFamily="'Nunito', sans-serif">
            {index + 1}
          </Typography>
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontSize="0.95rem" fontWeight={800} color={Color.text}
            fontFamily="'Nunito', sans-serif" noWrap>
            {patient?.patientName || '—'}
          </Typography>
          {patient?.phonNumber && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.2 }}>
              <PhoneIcon sx={{ fontSize: 11, color: Color.textLight }} />
              <Typography fontSize="0.72rem" color={Color.textLight} fontFamily="'Nunito', sans-serif">
                {patient.phonNumber}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Appointment date chip (top-right) */}
        {apptDate && (
          <Chip
            icon={<CalendarMonthIcon style={{ fontSize: 12, color: Color.primary }} />}
            label={fmtDate(apptDate)}
            size="small"
            sx={{
              flexShrink: 0,
              fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.7rem',
              bgcolor: Color.primaryBg, color: Color.primary,
              border: `1px solid ${Color.primaryBdr}`,
              height: 24,
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          />
        )}
      </Box>

      {/* Info grid — 2 column on sm+, single column on xs */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        bgcolor: Color.surfaceAlt,
      }}>
        {/* Doctor */}
        <Box sx={{ borderBottom: `1px solid ${Color.border}`, borderRight: { xs: 'none', sm: `1px solid ${Color.border}` } }}>
          <InfoRow icon={<LocalHospitalIcon />}   iconColor={Color.pink}   iconBg={Color.pinkBg}   label="Doctor"   value={doctorName} />
        </Box>
        {/* Hospital */}
        <Box sx={{ borderBottom: `1px solid ${Color.border}` }}>
          <InfoRow icon={<ApartmentIcon />}        iconColor={Color.primary} iconBg={Color.primaryBg} label="Hospital" value={hospitalName} />
        </Box>
        {/* Service */}
        <Box sx={{ borderBottom: `1px solid ${Color.border}`, borderRight: { xs: 'none', sm: `1px solid ${Color.border}` } }}>
          <InfoRow icon={<MedicalServicesIcon />}  iconColor={Color.accent}  iconBg={Color.accentBg}  label="Service"  value={service} />
        </Box>
        {/* Fee */}
        <Box sx={{ borderBottom: `1px solid ${Color.border}` }}>
          <InfoRow icon={<PaymentsIcon />}         iconColor={Color.amber}   iconBg={Color.amberBg}   label="Fee"      value={fee ? `Rs ${fee}` : '—'} />
        </Box>
        {/* Slot — full width on xs, half on sm */}
        <Box sx={{
          borderRight: { xs: 'none', sm: `1px solid ${Color.border}` },
          borderBottom: { xs: `1px solid ${Color.border}`, sm: 'none' },
        }}>
          <InfoRow icon={<AccessTimeIcon />}       iconColor={Color.accent}  iconBg={Color.accentBg}  label="Time Slot" value={slot} />
        </Box>
        {/* Appointment date — full width on xs */}
        <Box>
          <InfoRow icon={<CalendarMonthIcon />}    iconColor={Color.primary} iconBg={Color.primaryBg} label="Appt Date" value={fmtDate(apptDate)} last />
        </Box>
      </Box>
    </Box>
  );
};

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── AppBar ── */}
      <AppBar position="fixed" elevation={0} sx={{
        left: { xs: 0, md: `${SIDEBAR_W}px` },
        width: { xs: '100%', md: `calc(100% - ${SIDEBAR_W}px)` },
        background: C.surface,
        boxShadow: '0 0 20px 0 rgba(6,143,210,0.40)',
        zIndex: 1200,
      }}>
        <Toolbar sx={{ minHeight: '64px !important', display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>

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


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: C.primaryBg, display: { xs: "none", sm: "none", md: "none", lg: "flex" }, alignItems: 'center', justifyContent: 'center' }}>
              <PeopleAltIcon sx={{ color: C.primary, fontSize: 20 }} />
            </Box>
            <Typography ml={{ xs: "10px", sm: "10px", md: "10px", lg: '0px' }} fontWeight={800} color={C.text} fontFamily="'Nunito', sans-serif" fontSize="1.05rem">
              Patient Information
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Desktop search in appbar */}
            <TextField
              placeholder="Search patients..."
              size="small"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: C.textLight, fontSize: 17 }} /></InputAdornment>,
              }}
              sx={{
                display: { xs: 'none', md: 'flex' }, width: 220,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', bgcolor: C.surfaceAlt,
                  fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem',
                  '& fieldset': { borderColor: C.border },
                  '&:hover fieldset': { borderColor: C.primary },
                  '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
                },
              }}
            />
            <Button
              onClick={handleOpen}
              startIcon={<PersonAddIcon sx={{ fontSize: '17px !important' }} />}
              size="small"
              sx={{
                color: C.surface, bgcolor: C.primary,
                borderRadius: '10px', fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.82rem', px: 2.5, py: 1,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(6,143,210,0.30)',
                transition: 'all 0.22s ease',
                '&:hover': { bgcolor: C.primaryDark, boxShadow: '0 6px 20px rgba(6,143,210,0.45)', transform: 'translateY(-1px)' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              Add Patient
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Main Content ── */}
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

        {/* Page Header */}
        <Box sx={{
          borderRadius: '15px',
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 55%, #034e76 100%)`,
          p: { xs: 3, sm: 4 }, mb: 3.5,
          position: 'relative', overflow: 'hidden',
        }}>
          {[
            { size: 180, top: -50, right: -50 },
            { size: 100, bottom: -30, right: 130 },
            { size: 70,  top: 15,  right: 110 },
          ].map((b, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.5)',
              top: b.top, right: b.right, bottom: b.bottom,
              opacity: 0.07, pointerEvents: 'none',
            }} />
          ))}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography fontFamily="'Nunito', sans-serif" fontWeight={900} fontSize={{ xs: '1rem', sm: '1.5rem' }} color="#fff" mb={0.5}>
              All Patients
            </Typography>
            <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color="rgba(255,255,255,0.75)" maxWidth={460}>
              Manage your registered patients, view history, and book appointments seamlessly.
            </Typography>

            {/* Mobile search */}
            <TextField
              placeholder="Search by name or phone..."
              size="small" value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: C.textLight, fontSize: 18 }} /></InputAdornment> }}
              sx={{
                display: { xs: 'flex', md: 'none' }, marginTop: "20px", width: '100%', mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', bgcolor: C.surface,
                  fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem',
                  '& fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
                },
              }}
            />
          </Box>
        </Box>

        {/* Result count */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
          <Typography fontWeight={700} fontSize="0.9rem" color={C.textMid} fontFamily="'Nunito', sans-serif">
            {loading ? 'Loading patients…' : `${filtered.length} patient${filtered.length !== 1 ? 's' : ''} found`}
          </Typography>
          {searchQuery && (
            <Chip
              label={`"${searchQuery}"`} size="small"
              onDelete={() => setSearchQuery('')}
              sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.78rem', bgcolor: C.primaryBg, color: C.primary, border: `1px solid ${C.primaryBdr}` }}
            />
          )}
        </Box>

        {/* ── Patient Grid — with skeleton loader ── */}
        {loading ? (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 2.5,
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <PatientCardSkeleton key={i} i={i} />
            ))}
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <PeopleAltIcon sx={{ fontSize: 60, color: C.primaryBdr, mb: 2 }} />
            <Typography fontWeight={700} color={C.textLight} fontSize="1.05rem">No patients found</Typography>
            <Typography color={C.textLight} fontSize="0.85rem" mt={0.5}>
              Try a different search or add a new patient
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 2.5,
          }}>
            {filtered.map((patient, i) => (
              <PatientCard key={patient?._id || i} patient={patient} onHistory={handlePatientHistory} onEdit={handleEditPatient} index={i} />
            ))}
          </Box>
        )}
      </Box>

      {/* ── Add / Edit Patient Modal ── */}
      <Modal open={addPatientOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box sx={{
            px: 4, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: `1px solid ${C.border}`,
            background: `linear-gradient(135deg, ${C.primaryBg} 0%, ${C.surface} 100%)`,
            borderRadius: '24px 24px 0 0',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: C.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${C.primaryBdr}` }}>
                {editPatientButton ? <EditIcon sx={{ color: C.primary, fontSize: 22 }} /> : <PersonAddIcon sx={{ color: C.primary, fontSize: 22 }} />}
              </Box>
              <Box>
                <Typography fontWeight={800} fontSize="1.1rem" color={C.text} fontFamily="'Nunito', sans-serif">
                  {editPatientButton ? 'Edit Patient' : 'Register New Patient'}
                </Typography>
                <Typography fontSize="0.78rem" color={C.textLight} fontFamily="'Nunito', sans-serif">
                  {editPatientButton ? 'Update patient information below' : 'Fill in the details to register a new patient'}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} size="small" sx={{ color: C.textLight, '&:hover': { color: C.text, bgcolor: C.border }, borderRadius: '8px' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Body */}
          <Box sx={{ px: 4, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <Field label="Patient Name *" icon={<PersonIcon />} value={patientName} onChange={e => setPatientName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field label="Guardian Name *" icon={<PersonIcon />} value={guardianName} onChange={e => setGuardianName(e.target.value)} />
              </Grid>
            </Grid>

            <Box sx={{ p: 2.5, border: `1px solid ${C.border}`, borderRadius: '12px', bgcolor: C.surfaceAlt }}>
              <FormLabel sx={{ fontSize: '0.82rem', color: C.textMid, fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1, display: 'block' }}>
                Gender *
              </FormLabel>
              <RadioGroup row value={gender} onChange={e => setGender(e.target.value)}>
                {['Male', 'Female'].map(g => (
                  <FormControlLabel key={g} value={g}
                    control={<Radio size="small" sx={{ color: C.primaryBdr, '&.Mui-checked': { color: C.primary } }} />}
                    label={<Typography fontSize="0.9rem" fontFamily="'Nunito', sans-serif" fontWeight={600} color={C.textMid}>{g}</Typography>}
                  />
                ))}
              </RadioGroup>
            </Box>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={4}>
                <Field label="Date of Birth *" icon={<CakeIcon />} type="date" value={dob} onChange={handleDobChange} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field label="Age (years)" value={age} disabled />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field label="Phone Number" icon={<PhoneIcon />} value={phoneNum} disabled />
              </Grid>
            </Grid>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={4}>
                <Field label="CNIC" icon={<FingerprintIcon />} value={cnic} onChange={e => setCnic(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field label="Health ID" icon={<BadgeIcon />} value={helthId} onChange={e => setHelthId(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field label="City" icon={<LocationCityIcon />} value={city} onChange={e => setCity(e.target.value)} />
              </Grid>
            </Grid>

            <Field label="Reference" value={reference} onChange={e => setReference(e.target.value)} />
          </Box>

          {/* Footer */}
          <Box sx={{ px: 4, pb: 4, display: 'flex', gap: 2 }}>
            <Button fullWidth onClick={handleClose} variant="outlined"
              sx={{
                borderRadius: '12px', fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                textTransform: 'none', fontSize: '0.9rem', py: 1.2,
                color: C.textMid, borderColor: C.border,
                '&:hover': { borderColor: C.textMid, bgcolor: C.surfaceAlt },
              }}
            >
              Cancel
            </Button>
            <Button fullWidth onClick={editPatientButton ? editPatient : registerPatient}
              sx={{
                borderRadius: '12px', fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                textTransform: 'none', fontSize: '0.9rem', py: 1.2,
                color: C.surface, bgcolor: C.primary,
                boxShadow: '0 4px 16px rgba(6,143,210,0.35)',
                '&:hover': { bgcolor: C.primaryDark },
              }}
            >
              {editPatientButton ? 'Update Patient' : 'Register Patient'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* ── Patient History Modal ── */}
      <Modal
      open={openHistory}
      onClose={handleCloseHistory}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(3,30,60,0.45)',
            backdropFilter: 'blur(6px)',
          },
        },
      }}
    >
      
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 'calc(100vw - 32px)', sm: 620, md: 680 },
        maxWidth: '100%',
        maxHeight: { xs: '90vh', sm: '85vh' },
        display: 'flex', flexDirection: 'column',
        bgcolor: Color.surface,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(6,143,210,0.22), 0 8px 32px rgba(0,0,0,0.12)',
        outline: 'none',
        border: `1px solid ${Color.border}`,
        animation: 'modalPop 0.3s cubic-bezier(0.34,1.4,0.64,1) both',
        '@keyframes modalPop': {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.94)' },
          to:   { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      }}>

        {/* ── Modal Header ─────────────────────────────────────────────────── */}
        <Box sx={{
          background: `linear-gradient(135deg, ${Color.primary} 0%, ${Color.primaryDark} 55%, ${Color.primaryDeep} 100%)`,
          px: { xs: 2.5, sm: 3.5 }, py: 2.8,
          position: 'relative', overflow: 'hidden', flexShrink: 0,
        }}>
          {/* Decorative rings */}
          {[{ s:130, t:-40, r:-40 },{ s:70, b:-22, r:80 }].map((b,i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.35)',
              top: b.t, right: b.r, bottom: b.b, opacity: 0.10, pointerEvents: 'none',
            }} />
          ))}

          <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Icon box */}
            <Box sx={{
              width: 46, height: 46, borderRadius: '13px', flexShrink: 0,
              bgcolor: 'rgba(255,255,255,0.14)', border: '1.5px solid rgba(255,255,255,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HistoryIcon sx={{ color: '#fff', fontSize: 24 }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontFamily="'Nunito', sans-serif" fontWeight={900}
                fontSize={{ xs: '1.15rem', sm: '1.35rem' }} color="#fff" lineHeight={1.2}>
                Patient History
              </Typography>
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.78rem"
                color="rgba(255,255,255,0.72)" mt={0.3}>
                {patientName ? `Viewing records for ${patientName}` : 'All appointment history'}
              </Typography>
            </Box>

            {/* Record count badge */}
            {patientHistory.length > 0 && !historyLoading && (
              <Box sx={{
                bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '10px', px: 1.5, py: 0.6, flexShrink: 0,
                display: { xs: 'none', sm: 'block' },
              }}>
                <Typography fontFamily="'Nunito', sans-serif" fontSize="0.7rem" fontWeight={800} color="rgba(255,255,255,0.9)">
                  {patientHistory.length} Record{patientHistory.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
            )}

            {/* Close button */}
            <IconButton
              onClick={handleCloseHistory}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.14)', color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.28)',
                borderRadius: '10px', width: 34, height: 34, flexShrink: 0,
                transition: 'all 0.18s ease',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.24)' },
              }}
            >
              <CloseIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>

        {/* ── Scrollable body ───────────────────────────────────────────────── */}
        <Box sx={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          px: { xs: 2, sm: 3 }, py: 2.5,
          bgcolor: Color.surfaceAlt,
          /* Custom scrollbar */
          '&::-webkit-scrollbar': { width: 5 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: Color.primaryBdr, borderRadius: 10 },
        }}>

          {/* Google font */}
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');`}</style>

          {/* ── HISTORY SKELETON — shown while fetching ── */}
          {historyLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <HistoryCardSkeleton key={i} i={i} />
              ))}
            </Box>
          ) : patientHistory.length === 0 ? (
            /* Empty state */
            <Box sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', py: 8, px: 3, textAlign: 'center',
              animation: 'fadeIn 0.3s ease both',
              '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
            }}>
              <Box sx={{
                width: 68, height: 68, borderRadius: '20px',
                bgcolor: Color.primaryBg, border: `1.5px solid ${Color.primaryBdr}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
              }}>
                <FolderOffIcon sx={{ fontSize: 32, color: Color.primaryBdr }} />
              </Box>
              <Typography fontFamily="'Nunito', sans-serif" fontWeight={800}
                color={Color.textMid} fontSize="1rem" mb={0.5}>
                No History Found
              </Typography>
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.82rem" color={Color.textLight}>
                This patient has no appointment history yet
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {patientHistory.map((patient, index) => (
                <HistoryCard key={index} patient={patient} index={index} />
              ))}
            </Box>
          )}
        </Box>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        {patientHistory.length > 0 && !historyLoading && (
          <Box sx={{
            px: 3, py: 1.8,
            borderTop: `1px solid ${Color.border}`,
            bgcolor: Color.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <Typography fontSize="0.77rem" color={Color.textLight} fontFamily="'Nunito', sans-serif">
              Showing{'  '}
              <Box component="span" sx={{ color: Color.text, fontWeight: 800 }}>{patientHistory.length}</Box>
              {' '}appointment record{patientHistory.length !== 1 ? 's' : ''}
            </Typography>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.7,
              px: 1.4, py: 0.55, borderRadius: '8px',
              bgcolor: Color.primaryBg, border: `1px solid ${Color.primaryBdr}`,
            }}>
              <HistoryIcon sx={{ fontSize: 13, color: Color.primary }} />
              <Typography fontSize="0.71rem" fontWeight={800} color={Color.primary} fontFamily="'Nunito', sans-serif">
                History
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
    </>
  );
};

export default page;