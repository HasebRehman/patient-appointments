"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDoctorId } from "../../redux/slices/doctorSlice";
import { useRouter } from "next/navigation";
import {
  Box, Typography, TextField, InputAdornment,
  Avatar, Chip, AppBar, Toolbar, Skeleton, IconButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import StarIcon from '@mui/icons-material/Star';
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

const SIDEBAR_W = 240;

// Day abbreviation map
const DAY_SHORT = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' };

// ─── Doctor Card ───────────────────────────────────────────────────────────────
const DoctorCard = ({ doctor, onSelect, index }) => {
  const [imgError, setImgError] = useState(false);
  const initials = doctor?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Box
      sx={{
        bgcolor: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '15px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: `fadeUp 0.4s ease both`,
        animationDelay: `${index * 55}ms`,
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        transition: 'all 0.26s cubic-bezier(0.34,1.4,0.64,1)',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(6,143,210,0.16)',
          borderColor: C.primaryBdr,
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Top gradient bar */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` }} />

      <Box sx={{ p: 3, flexGrow: 1 }}>
        {/* Photo + Name */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5, alignItems: 'flex-start' }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            {doctor?.photoUrl && !imgError ? (
              <Box
                component="img"
                src={doctor.photoUrl}
                alt={doctor.fullName}
                onError={() => setImgError(true)}
                sx={{
                  width: 68, height: 68, borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${C.primaryBdr}`,
                  display: 'block',
                }}
              />
            ) : (
              <Avatar sx={{
                width: 68, height: 68,
                bgcolor: C.primaryBg, color: C.primary,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800, fontSize: '1.2rem',
                border: `3px solid ${C.primaryBdr}`,
              }}>
                {initials || '?'}
              </Avatar>
            )}
            {/* Online dot */}
            <Box sx={{
              position: 'absolute', bottom: 3, right: 3,
              width: 12, height: 12, borderRadius: '50%',
              bgcolor: C.accent, border: `2px solid ${C.surface}`,
            }} />
          </Box>

          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              fontWeight={800} fontSize="0.97rem" color={C.text}
              fontFamily="'Nunito', sans-serif"
              sx={{ lineHeight: 1.3, mb: 0.5 }} noWrap
            >
              {doctor?.fullName}
            </Typography>
            <Chip
              label={doctor?.specialization || 'General'}
              size="small"
              sx={{
                height: 22, fontSize: '0.7rem', fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                bgcolor: C.primaryBg, color: C.primary,
                border: `1px solid ${C.primaryBdr}`,
              }}
            />
            {/* Star rating placeholder */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, mt: 0.6 }}>
              {[1,2,3,4,5].map(s => (
                <StarIcon key={s} sx={{ fontSize: 12, color: s <= 4 ? '#f59e0b' : C.border }} />
              ))}
              <Typography fontSize="0.7rem" color={C.textLight} fontFamily="'Nunito', sans-serif" ml={0.4}>4.0</Typography>
            </Box>
          </Box>
        </Box>

        {/* Designation */}
        {doctor?.designationDetail && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
            <Box sx={{
              width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
              bgcolor: 'rgba(245,158,11,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <WorkIcon sx={{ fontSize: 15, color: '#f59e0b' }} />
            </Box>
            <Typography
              fontSize="0.8rem" color={C.textMid}
              fontFamily="'Nunito', sans-serif" fontWeight={600}
              sx={{ pt: 0.5, lineHeight: 1.4 }}
            >
              {doctor.designationDetail}
            </Typography>
          </Box>
        )}

        {/* Available Days */}
        {doctor?.availableDays?.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarMonthIcon sx={{ fontSize: 14, color: C.textLight }} />
              <Typography fontSize="0.72rem" color={C.textLight} fontFamily="'Nunito', sans-serif" fontWeight={700} textTransform="uppercase" letterSpacing="0.05em">
                Available Days
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
              {doctor.availableDays.map((day, i) => (
                <Chip
                  key={i}
                  label={DAY_SHORT[day] || day}
                  size="small"
                  sx={{
                    height: 22, fontSize: '0.68rem', fontWeight: 700,
                    fontFamily: "'Nunito', sans-serif",
                    bgcolor: `${C.accent}15`, color: C.accent,
                    border: `1px solid ${C.accent}40`,
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* CTA */}
      <Box sx={{ px: 3, pb: 3 }}>
        <Box
          onClick={() => onSelect(doctor?._id)}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            py: 1.3, borderRadius: '10px', cursor: 'pointer',
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            color: C.surface, fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: '0.875rem',
            boxShadow: '0 4px 14px rgba(6,143,210,0.28)',
            transition: 'all 0.22s ease', userSelect: 'none',
            '&:hover': { boxShadow: '0 6px 22px rgba(6,143,210,0.42)', transform: 'translateY(-1px)' },
            '&:active': { transform: 'scale(0.97)' },
          }}
        >
          Book Appointment
          <ArrowForwardIcon sx={{ fontSize: 15 }} />
        </Box>
      </Box>
    </Box>
  );
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <Box sx={{ bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" height={4} sx={{ bgcolor: C.primaryBg }} />
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
        <Skeleton variant="circular" width={68} height={68} />
        <Box sx={{ flexGrow: 1, pt: 0.5 }}>
          <Skeleton width="65%" height={20} sx={{ mb: 0.8 }} />
          <Skeleton width="45%" height={18} />
        </Box>
      </Box>
      <Skeleton height={30} sx={{ borderRadius: '8px', mb: 1 }} />
      <Skeleton height={30} sx={{ borderRadius: '8px', mb: 1.5 }} />
      <Box sx={{ display: 'flex', gap: 0.8, mb: 2 }}>
        {[1,2,3].map(i => <Skeleton key={i} variant="rounded" width={44} height={22} sx={{ borderRadius: '11px' }} />)}
      </Box>
      <Skeleton variant="rounded" height={44} sx={{ borderRadius: '12px' }} />
    </Box>
  </Box>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const hospitalCity = useSelector((state) => state.hospital.selectedHospitalCity);
  const router = useRouter();
  const dispatch = useDispatch();

  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        if (hospitalCity) {
          const res = await fetch(`${API_URL}patient-auth/getAllHospital?city=${hospitalCity}`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const result = await res.json();
          setDoctorsData(result?.data[0]?.doctors || []);
        } else {
          const res = await fetch(`${API_URL}patient-auth/getAllDoctors`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const result = await res.json();
          setDoctorsData(result?.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [hospitalCity]);

  const patientId = useSelector((state) => state.patient.selectedPatientId);
  const doctorId = useSelector(
      (state) => state.doctor.selectedDoctorId
    );

    console.log('pid',patientId);

    // console.log('did',doctorId);
    
    

  const selectDoctor = (doctor) => {

    if (patientId?._id) {
      console.log('patientId', patientId);
      dispatch(setDoctorId(doctor));
      console.log('appointment page');
      router.push('/patient_appointment');
      
    } else {
      dispatch(setDoctorId(doctor));
      console.log('doctor');
      
      router.push('/patients');
    }
  };

  

  // Unique specializations for filter pills
  const specializations = ['All', ...Array.from(new Set(doctorsData.map(d => d?.specialization).filter(Boolean)))];

  const filtered = doctorsData.filter(d => {
    const matchSearch = !searchQuery ||
      d?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d?.specialization?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === 'All' || d?.specialization === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* AppBar */}
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
              <MedicalServicesIcon sx={{ color: C.primary, fontSize: 20 }} />
            </Box>
            <Box>
              <Typography ml={{ xs: "10px", sm: "10px", md: "10px", lg: '0px' }} fontWeight={800} color={C.text} fontFamily="'Nunito', sans-serif" fontSize="1.05rem" lineHeight={1.2}>
                Find Your Doctor
              </Typography>
              {hospitalCity && (
                <Typography fontSize="0.73rem" color={C.textLight} fontFamily="'Nunito', sans-serif">
                  Showing doctors in {hospitalCity}
                </Typography>
              )}
            </Box>
          </Box>

          <TextField
            placeholder="Search doctors or specializations..."
            size="small"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: C.textLight, fontSize: 18 }} /></InputAdornment>,
            }}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: 290,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', bgcolor: C.surfaceAlt,
                fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem',
                '& fieldset': { borderColor: C.border },
                '&:hover fieldset': { borderColor: C.primary },
                '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
              },
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
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

        {/* Hero Banner */}
        <Box sx={{
          borderRadius: '15px',
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 55%, #034e76 100%)`,
          p: { xs: 3, sm: 4 }, mb: 3.5,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative blobs */}
          {[
            { w: 180, h: 180, top: -50, right: -50 },
            { w: 100, h: 100, bottom: -30, right: 120 },
            { w: 70,  h: 70,  top: 20,   right: 100 },
          ].map((b, i) => (
            <Box key={i} sx={{
              position: 'absolute', width: b.w, height: b.h, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.45)',
              top: b.top, right: b.right, bottom: b.bottom,
              opacity: 0.07, pointerEvents: 'none',
            }} />
          ))}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography fontFamily="'Nunito', sans-serif" fontWeight={900} fontSize={{ xs: '1rem', sm: '1.5rem' }} color="#fff" mb={0.5}>
              {hospitalCity ? `Doctors in ${hospitalCity}` : 'All Available Doctors'}
            </Typography>
            <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color="rgba(255,255,255,0.75)" maxWidth={460}>
              Choose from our network of verified, experienced specialists and book your appointment today.
            </Typography>

            {/* Mobile search */}
            <TextField
              placeholder="Search doctors..."
              size="small" value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: C.textLight, fontSize: 18 }} /></InputAdornment> }}
              sx={{
                display: { xs: 'flex', sm: 'none' }, marginTop: '20px', width: '100%', mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', bgcolor: C.surface,
                  fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem',
                  '& fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
                },
              }}
            />

            {/* <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {[
                { value: loading ? '—' : doctorsData.length, label: 'Doctors' },
                { value: loading ? '—' : specializations.length - 1, label: 'Specializations' },
                { value: '24/7', label: 'Available' },
              ].map(({ value, label }) => (
                <Box key={label}>
                  <Typography fontFamily="'Nunito', sans-serif" fontWeight={900} fontSize="1.4rem" color="#fff">{value}</Typography>
                  <Typography fontFamily="'Nunito', sans-serif" fontSize="0.75rem" color="rgba(255,255,255,0.65)">{label}</Typography>
                </Box>
              ))}
            </Box> */}
          </Box>
        </Box>

        {/* Specialization Filter Pills */}
        {!loading && specializations.length > 1 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
            {specializations.map(spec => (
              <Chip
                key={spec}
                label={spec}
                onClick={() => setActiveFilter(spec)}
                sx={{
                  fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ...(activeFilter === spec
                    ? { bgcolor: C.primary, color: '#fff', border: `1px solid ${C.primary}`, boxShadow: '0 3px 10px rgba(6,143,210,0.3)' }
                    : { bgcolor: C.surface, color: C.textMid, border: `1px solid ${C.border}`, '&:hover': { borderColor: C.primaryBdr, bgcolor: C.primaryBg } }
                  ),
                }}
              />
            ))}
          </Box>
        )}

        {/* Results count */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
          <Typography fontWeight={700} fontSize="0.9rem" color={C.textMid} fontFamily="'Nunito', sans-serif">
            {loading ? 'Loading doctors...' : `${filtered.length} doctor${filtered.length !== 1 ? 's' : ''} found`}
          </Typography>
          {searchQuery && (
            <Chip label={`"${searchQuery}"`} size="small" onDelete={() => setSearchQuery('')}
              sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.78rem', bgcolor: C.primaryBg, color: C.primary, border: `1px solid ${C.primaryBdr}` }}
            />
          )}
        </Box>

        {/* Doctors Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(3,1fr)' },
          gap: 2.5,
        }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
              ? filtered.map((doctor, i) => (
                  <DoctorCard
                    key={doctor?._id || i}
                    doctor={doctor}
                    onSelect={() => selectDoctor(doctor)} // <-- send entire doctor object
                    index={i}
                  />
                ))
              : (
                <Box sx={{ gridColumn: '1/-1', textAlign: 'center', py: 10 }}>
                  <PersonSearchIcon sx={{ fontSize: 60, color: C.primaryBdr, mb: 2 }} />
                  <Typography fontFamily="'Nunito', sans-serif" fontWeight={700} color={C.textLight} fontSize="1.05rem">
                    No doctors found
                  </Typography>
                  <Typography fontFamily="'Nunito', sans-serif" color={C.textLight} fontSize="0.85rem" mt={0.5}>
                    Try adjusting your search or filter
                  </Typography>
                </Box>
              )
          }
      </Box>
      </Box>
    </>
  );
};

export default Page;