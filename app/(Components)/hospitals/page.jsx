"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { setHospitalCity } from '../../redux/slices/hospitalSlice';
import {
  Box, Typography, TextField, InputAdornment,
  Chip, Avatar, Skeleton, AppBar, Toolbar, IconButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuRoundedIcon       from '@mui/icons-material/MenuRounded';

// ─── Design Tokens (matches your site's #068fd2 palette) ──────────────────────
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

// ─── Hospital Card ─────────────────────────────────────────────────────────────
const HospitalCard = ({ hospital, onViewDoctors, index }) => {
  const [imgError, setImgError] = useState(false);
  const initials = hospital?.hospitalName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Box
      sx={{
        bgcolor: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '15px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        animation: `fadeSlideUp 0.45s ease both`,
        animationDelay: `${index * 60}ms`,
        '@keyframes fadeSlideUp': {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        '&:hover': {
          boxShadow: '0 12px 40px rgba(6,143,210,0.18)',
          borderColor: C.primaryBdr,
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Card top accent bar */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` }} />

      <Box sx={{ p: 3, flexGrow: 1 }}>
        {/* Header: logo + name + verified */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            {hospital?.hospitalLogoUrl && !imgError ? (
              <Box
                component="img"
                src={hospital.hospitalLogoUrl}
                alt={hospital.hospitalName}
                onError={() => setImgError(true)}
                sx={{
                  width: 64, height: 64,
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: `2px solid ${C.border}`,
                  display: 'block',
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 64, height: 64,
                  borderRadius: '16px',
                  bgcolor: C.primaryBg,
                  color: C.primary,
                  fontWeight: 800,
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: '1.2rem',
                  border: `2px solid ${C.primaryBdr}`,
                }}
              >
                {initials || <LocalHospitalIcon />}
              </Avatar>
            )}
            {/* Verified badge */}
            <Box sx={{
              position: 'absolute', bottom: -4, right: -4,
              bgcolor: C.surface, borderRadius: '50%',
              width: 22, height: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1.5px solid ${C.border}`,
            }}>
              <VerifiedIcon sx={{ fontSize: 16, color: C.primary }} />
            </Box>
          </Box>

          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              fontWeight={800}
              fontSize="1rem"
              color={C.text}
              fontFamily="'Nunito', sans-serif"
              sx={{ lineHeight: 1.3, mb: 0.5 }}
            >
              {hospital?.hospitalName}
            </Typography>
            <Chip
              label="Verified"
              size="small"
              icon={<VerifiedIcon style={{ fontSize: 12, color: C.primary }} />}
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                bgcolor: C.primaryBg,
                color: C.primary,
                border: `1px solid ${C.primaryBdr}`,
                '& .MuiChip-icon': { ml: 0.5 },
              }}
            />
          </Box>
        </Box>

        {/* Info rows */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {[
            { icon: <LocationOnIcon />, value: hospital?.city || 'N/A', color: '#e85d7f' },
            { icon: <PhoneIcon />,      value: hospital?.phoneNo || 'N/A', color: C.primary },
            { icon: <AccessTimeIcon />, value: '24/7 Open', color: C.accent },
          ].map(({ icon, value, color }) => (
            <Box key={value} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
                bgcolor: `${color}14`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {React.cloneElement(icon, { sx: { fontSize: 15, color } })}
              </Box>
              <Typography
                fontSize="0.83rem"
                fontFamily="'Nunito', sans-serif"
                color={C.textMid}
                fontWeight={600}
                noWrap
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA Button */}
      <Box sx={{ px: 3, pb: 3 }}>
        <Box
          onClick={() => onViewDoctors(hospital?.city)}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            py: 1.3, borderRadius: '10px',
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`,
            color: C.surface,
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(6,143,210,0.30)',
            transition: 'all 0.22s ease',
            userSelect: 'none',
            '&:hover': {
              boxShadow: '0 6px 22px rgba(6,143,210,0.45)',
              transform: 'translateY(-1px)',
            },
            '&:active': { transform: 'scale(0.97)' },
          }}
        >
          View Doctors
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    </Box>
  );
};

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <Box sx={{ bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" height={4} sx={{ bgcolor: C.primaryBg }} />
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
        <Skeleton variant="rounded" width={64} height={64} sx={{ borderRadius: '16px' }} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton width="70%" height={22} sx={{ mb: 0.8 }} />
          <Skeleton width="40%" height={18} />
        </Box>
      </Box>
      {[1, 2, 3].map(i => <Skeleton key={i} height={30} sx={{ borderRadius: '8px', mb: 1 }} />)}
      <Skeleton variant="rounded" height={44} sx={{ borderRadius: '12px', mt: 1 }} />
    </Box>
  </Box>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const dispatch = useDispatch();

  const [hospitalData, setHospitalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getAllHospitals = async () => {
    try {
      const res = await fetch(`${API_URL}patient-auth/getAllHospital`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const result = await res.json();
      setHospitalData(result?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const viewDoctors = (city) => {
    dispatch(setHospitalCity(city));
    router.push('/doctors');
  };

  useEffect(() => { getAllHospitals(); }, []);

  const filtered = hospitalData.filter(h =>
    !searchQuery ||
    h?.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h?.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Google Font */}
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
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              bgcolor: C.primaryBg,
              display: { xs: "none", sm: "none", md: "none", lg: "flex" }, alignItems: 'center', justifyContent: 'center',
            }}>
              <LocalHospitalIcon sx={{ color: C.primary, fontSize: 20 }} />
            </Box>
            <Typography ml={{ xs: "10px", sm: "10px", md: "10px", lg: '0px' }} fontWeight={800} color={C.text} fontFamily="'Nunito', sans-serif" fontSize="1.05rem">
              Find Hospitals
            </Typography>
          </Box>

          {/* Search in AppBar on desktop */}
          <TextField
            placeholder="Search hospitals or cities..."
            size="small"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: C.textLight, fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: 280,
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
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 60%, #034e76 100%)`,
          p: { xs: 3, sm: 4 },
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          {[
            { size: 200, top: -60, right: -60, opacity: 0.08 },
            { size: 130, top: 20, right: 80, opacity: 0.06 },
            { size: 90, bottom: -30, left: 40, opacity: 0.07 },
          ].map((c, i) => (
            <Box key={i} sx={{
              position: 'absolute',
              width: c.size, height: c.size,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.5)',
              top: c.top, right: c.right, bottom: c.bottom, left: c.left,
              opacity: c.opacity,
              pointerEvents: 'none',
            }} />
          ))}

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              fontFamily="'Nunito', sans-serif"
              fontWeight={900}
              fontSize={{ xs: '1rem', sm: '1.5rem' }}
              color="#ffffff"
              sx={{ mb: 0.5 }}
            >
              Find the Right Hospital
            </Typography>
            <Typography
              fontFamily="'Nunito', sans-serif"
              fontSize="0.8rem"
              color="rgba(255,255,255,0.78)"
              sx={{ maxWidth: 460 }}
            >
              Browse verified hospitals near you and connect with the best doctors in your city.
            </Typography>

            {/* Mobile search */}
            <TextField
              placeholder="Search by hospital name or city..."
              size="small"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: C.textLight, fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                marginTop: "20px",
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', bgcolor: C.surface,
                  fontFamily: "'Nunito', sans-serif", fontSize: '0.875rem',
                  '& fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
                },
              }}
            />

            {/* Stats row */}
            {/* <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: { xs: 2, sm: 0 } }}>
              {[
                { label: 'Hospitals', value: hospitalData.length || '—' },
                { label: 'Verified', value: '100%' },
                { label: 'Available', value: '24/7' },
              ].map(({ label, value }) => (
                <Box key={label}>
                  <Typography fontFamily="'Nunito', sans-serif" fontWeight={900} fontSize="1.4rem" color="#ffffff">{value}</Typography>
                  <Typography fontFamily="'Nunito', sans-serif" fontSize="0.75rem" color="rgba(255,255,255,0.65)">{label}</Typography>
                </Box>
              ))}
            </Box> */}
          </Box>
        </Box>

        {/* Results count */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
          <Typography fontWeight={700} fontSize="0.95rem" color={C.textMid} fontFamily="'Nunito', sans-serif">
            {loading ? 'Loading...' : `${filtered.length} hospital${filtered.length !== 1 ? 's' : ''} found`}
          </Typography>
          {searchQuery && (
            <Chip
              label={`"${searchQuery}"`}
              size="small"
              onDelete={() => setSearchQuery('')}
              sx={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.78rem',
                bgcolor: C.primaryBg, color: C.primary, border: `1px solid ${C.primaryBdr}`,
              }}
            />
          )}
        </Box>  */}

        {/* Hospital Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
          gap: 2.5,
        }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
              ? filtered.map((hospital, i) => (
                  <HospitalCard
                    key={hospital?._id || i}
                    hospital={hospital}
                    onViewDoctors={viewDoctors}
                    index={i}
                  />
                ))
              : (
                <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 10 }}>
                  <LocalHospitalIcon sx={{ fontSize: 60, color: C.primaryBdr, mb: 2 }} />
                  <Typography fontFamily="'Nunito', sans-serif" fontWeight={700} color={C.textLight} fontSize="1.05rem">
                    No hospitals found
                  </Typography>
                  <Typography fontFamily="'Nunito', sans-serif" color={C.textLight} fontSize="0.85rem" mt={0.5}>
                    Try a different search term
                  </Typography>
                </Box>
              )
          }
        </Box>
      </Box>
    </>
  );
};

export default page;