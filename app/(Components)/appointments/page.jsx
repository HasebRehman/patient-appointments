"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { pdf, Document, Page, View, Text, Image as PDFImage, StyleSheet } from '@react-pdf/renderer';
import {
  Box, AppBar, Toolbar, Typography, Button, Chip, Modal, Tooltip,
  Avatar, IconButton, TextField, InputAdornment, Skeleton, CircularProgress,
} from "@mui/material";
import CalendarMonthIcon    from '@mui/icons-material/CalendarMonth';
import SearchIcon           from '@mui/icons-material/Search';
import AddIcon              from '@mui/icons-material/Add';
import SwapHorizIcon        from '@mui/icons-material/SwapHoriz';
import PersonIcon           from '@mui/icons-material/Person';
import LocalHospitalIcon    from '@mui/icons-material/LocalHospital';
import AccessTimeIcon       from '@mui/icons-material/AccessTime';
import PhoneIcon            from '@mui/icons-material/Phone';
import CheckCircleIcon      from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon   from '@mui/icons-material/HourglassEmpty';
import CancelIcon           from '@mui/icons-material/Cancel';
import EventAvailableIcon   from '@mui/icons-material/EventAvailable';
import CloseIcon            from '@mui/icons-material/Close';
import DescriptionIcon      from '@mui/icons-material/Description';
import DownloadIcon         from '@mui/icons-material/Download';
import ScheduleIcon         from '@mui/icons-material/Schedule';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MenuRoundedIcon       from '@mui/icons-material/MenuRounded';

/* ─── Design Tokens ──────────────────────────────────────────────────────────── */
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
  amberBdr:    'rgba(245,158,11,0.28)',
  surface:     '#ffffff',
  surfaceAlt:  '#f4f8fc',
  surfaceDeep: '#edf3f8',
  border:      '#e0ecf5',
  text:        '#0f1f2e',
  textMid:     '#445566',
  textLight:   '#7a96ab',
};

const SIDEBAR_W = 240;

/* ─── Status config ──────────────────────────────────────────────────────────── */
const STATUS = {
  Active:    { color: '#10b981', bg: 'rgba(16,185,129,0.09)',  bdr: 'rgba(16,185,129,0.28)', gradA: '#10b981', gradB: '#059669', icon: EventAvailableIcon  },
  Checked:   { color: C.primary, bg: C.primaryBg,              bdr: C.primaryBdr,            gradA: C.primary, gradB: C.primaryDark, icon: CheckCircleIcon   },
  Expired:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.09)',  bdr: 'rgba(245,158,11,0.25)', gradA: '#f59e0b', gradB: '#d97706', icon: HourglassEmptyIcon  },
  Cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.09)',   bdr: 'rgba(239,68,68,0.25)',  gradA: '#ef4444', gradB: '#dc2626', icon: CancelIcon           },
};
const TABS = [
  { key: 'Active',    label: 'Active'    },
  { key: 'Checked',   label: 'Checked'   },
  { key: 'Expired',   label: 'Expired'   },
  { key: 'Cancelled', label: 'Cancelled' },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
const fmtDate  = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const initials = (n) => n?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '';

/* ─── Status Dot Badge ───────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = STATUS[status] || STATUS.Active;
  return (
    <Box sx={{ display:'inline-flex', alignItems:'center', gap:0.6, px:1.3, py:0.5, borderRadius:'8px', bgcolor:cfg.bg, border:`1px solid ${cfg.bdr}`, whiteSpace:'nowrap' }}>
      <Box sx={{ width:6, height:6, borderRadius:'50%', bgcolor:cfg.color, flexShrink:0 }} />
      <Typography fontSize="0.71rem" fontWeight={800} color={cfg.color} fontFamily="'Nunito', sans-serif" lineHeight={1}>{status}</Typography>
    </Box>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PDF DOCUMENT DEFINITION  (@react-pdf/renderer)
   Builds a real PDF blob → shown in native browser <iframe> viewer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 24,
  },
  headerImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  footerImg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', marginBottom: 6 },
  label: { width: 100, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111' },
  value: { flex: 1, fontSize: 10, color: '#333' },
  stampRow: { flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', bottom: 100, left: 0, width: '100%' },
  stamp: { height: 70, resizeMode: 'contain' },
  sig: { height: 36, resizeMode: 'contain' },
  section: { marginTop: 50 },
  divider: { border: '1px solid black' },
  logo: { height: '100px', width: '100px', resizeMode: 'contain' }
});

const PrescriptionPDF = ({ data }) => {
  const pt   = data?.patientData?.[0];
  const INFO = [
    { label: 'MRN',      value: pt?.mrn         || '–' },
    { label: 'Visit No', value: String(data?.visit_no  || '–') },
    { label: 'Name',     value: pt?.patientName  || '–' },
    { label: 'GUARDIAN', value: pt?.guardiansName },
    { label: 'DOB',      value: pt?.dob          || '–' },
    { label: 'Sex',      value: pt?.gender       || '–' },
    { label: 'CITY',     value: pt?.city },
    { label: 'CNIC',     value: pt?.cnic         || '–' },
  ];
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {data?.headerUrl && <PDFImage src={data.headerUrl} style={pdfStyles.headerImg} />}
        <View style={pdfStyles.section}>
          {INFO.map(({ label, value }) => (
            <View key={label} style={pdfStyles.row}>
              <Text style={pdfStyles.label}>{label}:</Text>
              <Text style={pdfStyles.value}>{value}</Text>
            </View>
          ))}
        </View>
        {(data?.stamp || data?.signature) && (
          <View style={pdfStyles.stampRow}>
            {data?.stamp     && <PDFImage src={data.stamp}     style={pdfStyles.stamp} />}
            {data?.signature && <PDFImage src={data.signature} style={pdfStyles.sig}   />}
          </View>
        )}
        {data?.footerUrl && <PDFImage src={data.footerUrl} style={pdfStyles.footerImg} />}
      </Page>
    </Document>
  );
};

const TokenPDF = ({ data }) => {
  const pt   = data;
  const INFO = [
    { label: 'HOSPITAL',          value: pt?.hospitalName },
    { label: 'NAME',              value: pt?.patientName  || '–' },
    { label: 'DOCTOR',            value: pt?.doctorName },
    { label: 'VISIT ID',          value: pt?.visitId       || '–' },
    { label: 'APPOINTMENT DATE',  value: pt?.appointmentDate || '–' },
    { label: 'APPOINTMENT TIME',  value: `${pt?.appointmentTime?.from || ''} - ${pt?.appointmentTime?.to || ''}` || '–' },
    { label: 'TOKEN ID',          value: pt?.tokenId       || '–' },
    { label: 'DISCOUNT',          value: Number(pt?.discount) || '–' },
    { label: 'NET FEE',           value: pt?.netFee        || '–' },
    { label: 'TOTAL FEE',         value: pt?.totalFee      || '–' },
    { label: 'TOKEN STATUS',      value: pt?.tokenStatus   || '–' },
    { label: 'FEE STATUS',        value: pt?.feeStatus     || '–' },
  ];
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {data?.hospitalLogoUrl && <PDFImage src={data?.hospitalLogoUrl} style={pdfStyles.logo} />}
        <View style={pdfStyles.section}>
          {INFO.map(({ label, value }) => (
            <View key={label} style={pdfStyles.row}>
              <Text style={pdfStyles.label}>{label}:</Text>
              <Text style={pdfStyles.value}>{value}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PRESCRIPTION MODAL — native browser PDF viewer via <iframe>
   *** UNCHANGED — identical to original ***
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PrescriptionModal = ({ open, onClose, data, loading }) => {
  const [pdfUrl,      setPdfUrl]      = useState(null);
  const [generating,  setGenerating]  = useState(false);
  const urlRef = React.useRef(null);

  React.useEffect(() => {
    if (!data) { setPdfUrl(null); return; }
    let cancelled = false;
    (async () => {
      setGenerating(true);
      try {
        const blob = await pdf(<PrescriptionPDF data={data} />).toBlob();
        if (cancelled) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        setPdfUrl(url);
      } catch (e) {
        console.error('PDF generation error', e);
        toast.error('Could not generate PDF preview');
      } finally {
        if (!cancelled) setGenerating(false);
      }
    })();
    return () => { cancelled = true; };
  }, [data]);

  React.useEffect(() => {
    return () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); };
  }, []);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'prescription.pdf';
    a.click();
  };

  const pt = data?.patientData?.[0];
  const busy = loading || generating;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{ backdrop: { sx: { bgcolor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(5px)' } } }}
    >
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width:  { xs: 'calc(100vw - 12px)', sm: '92vw', md: '88vw', lg: 1080 },
        height: { xs: '94vh', sm: '90vh' },
        maxWidth: '100%',
        display: 'flex', flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        outline: 'none',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        animation: 'pdfPop 0.28s cubic-bezier(0.34,1.3,0.64,1) both',
        '@keyframes pdfPop': {
          from: { opacity: 0, transform: 'translate(-50%,-48%) scale(0.95)' },
          to:   { opacity: 1, transform: 'translate(-50%,-50%) scale(1)'    },
        },
      }}>
        <Box sx={{
          bgcolor: '#2d2d2d',
          height: 46, flexShrink: 0,
          display: 'flex', alignItems: 'center',
          px: 2, gap: 1.5,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DescriptionIcon sx={{ fontSize: 16, color: C.primary }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} fontSize="0.88rem" color="#fff" noWrap>
              Prescription
            </Typography>
            {pt?.patientName && (
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.68rem" color="rgba(255,255,255,0.55)" noWrap>
                {pt.patientName}
              </Typography>
            )}
          </Box>
          <Tooltip title="Download PDF" placement="bottom">
            <span>
              <IconButton
                size="small"
                onClick={handleDownload}
                disabled={!pdfUrl || busy}
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  borderRadius: '7px', p: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  bgcolor: 'rgba(255,255,255,0.07)',
                  transition: 'all 0.15s',
                  '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.15)' },
                  '&:disabled': { opacity: 0.35 },
                }}
              >
                <DownloadIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Close" placement="bottom">
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: 'rgba(255,255,255,0.75)',
                borderRadius: '7px', p: '6px',
                border: '1px solid rgba(255,255,255,0.15)',
                bgcolor: 'rgba(255,255,255,0.07)',
                transition: 'all 0.15s',
                '&:hover': { color: '#f87171', bgcolor: 'rgba(239,68,68,0.18)', borderColor: 'rgba(239,68,68,0.4)' },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ flex: 1, position: 'relative', bgcolor: '#404040' }}>
          {busy && (
            <Box sx={{
              position: 'absolute', inset: 0, zIndex: 2,
              bgcolor: '#404040',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            }}>
              <CircularProgress size={44} sx={{ color: C.primary }} />
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.88rem" color="rgba(255,255,255,0.65)">
                {loading ? 'Fetching prescription…' : 'Generating PDF preview…'}
              </Typography>
            </Box>
          )}
          {!busy && !pdfUrl && (
            <Box sx={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DescriptionIcon sx={{ fontSize: 30, color: 'rgba(255,255,255,0.3)' }} />
              </Box>
              <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} color="rgba(255,255,255,0.5)" fontSize="0.95rem">
                No prescription found
              </Typography>
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color="rgba(255,255,255,0.3)">
                This appointment has no prescription yet
              </Typography>
            </Box>
          )}
          {pdfUrl && (
            <Box
              component="iframe"
              src={pdfUrl}
              title="Prescription PDF"
              sx={{
                width: '100%', height: '100%',
                border: 'none', display: 'block',
                opacity: busy ? 0 : 1,
                transition: 'opacity 0.2s',
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOKEN MODAL — *** UNCHANGED — identical to original ***
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TokenModal = ({ open, onClose, data, loading }) => {
  const [pdfUrl,      setPdfUrl]      = useState(null);
  const [generating,  setGenerating]  = useState(false);
  const urlRef = React.useRef(null);

  React.useEffect(() => {
    if (!data) { setPdfUrl(null); return; }
    let cancelled = false;
    (async () => {
      setGenerating(true);
      try {
        const blob = await pdf(<TokenPDF data={data} />).toBlob();
        if (cancelled) return;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        setPdfUrl(url);
      } catch (e) {
        console.error('PDF generation error', e);
        toast.error('Could not generate PDF preview');
      } finally {
        if (!cancelled) setGenerating(false);
      }
    })();
    return () => { cancelled = true; };
  }, [data]);

  React.useEffect(() => {
    return () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); };
  }, []);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'prescription.pdf';
    a.click();
  };

  const pt = data;
  const busy = loading || generating;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{ backdrop: { sx: { bgcolor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(5px)' } } }}
    >
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width:  { xs: 'calc(100vw - 12px)', sm: '92vw', md: '88vw', lg: 1080 },
        height: { xs: '94vh', sm: '90vh' },
        maxWidth: '100%',
        display: 'flex', flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        outline: 'none',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        animation: 'pdfPop 0.28s cubic-bezier(0.34,1.3,0.64,1) both',
        '@keyframes pdfPop': {
          from: { opacity: 0, transform: 'translate(-50%,-48%) scale(0.95)' },
          to:   { opacity: 1, transform: 'translate(-50%,-50%) scale(1)'    },
        },
      }}>
        <Box sx={{
          bgcolor: '#2d2d2d',
          height: 46, flexShrink: 0,
          display: 'flex', alignItems: 'center',
          px: 2, gap: 1.5,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DescriptionIcon sx={{ fontSize: 16, color: C.primary }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} fontSize="0.88rem" color="#fff" noWrap>
              Token
            </Typography>
            {pt?.patientName && (
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.68rem" color="rgba(255,255,255,0.55)" noWrap>
                {pt.patientName}
              </Typography>
            )}
          </Box>
          <Tooltip title="Download PDF" placement="bottom">
            <span>
              <IconButton
                size="small"
                onClick={handleDownload}
                disabled={!pdfUrl || busy}
                sx={{
                  color: 'rgba(255,255,255,0.75)',
                  borderRadius: '7px', p: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  bgcolor: 'rgba(255,255,255,0.07)',
                  transition: 'all 0.15s',
                  '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.15)' },
                  '&:disabled': { opacity: 0.35 },
                }}
              >
                <DownloadIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Close" placement="bottom">
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: 'rgba(255,255,255,0.75)',
                borderRadius: '7px', p: '6px',
                border: '1px solid rgba(255,255,255,0.15)',
                bgcolor: 'rgba(255,255,255,0.07)',
                transition: 'all 0.15s',
                '&:hover': { color: '#f87171', bgcolor: 'rgba(239,68,68,0.18)', borderColor: 'rgba(239,68,68,0.4)' },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ flex: 1, position: 'relative', bgcolor: '#404040' }}>
          {busy && (
            <Box sx={{
              position: 'absolute', inset: 0, zIndex: 2,
              bgcolor: '#404040',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            }}>
              <CircularProgress size={44} sx={{ color: C.primary }} />
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.88rem" color="rgba(255,255,255,0.65)">
                {loading ? 'Fetching prescription…' : 'Generating PDF preview…'}
              </Typography>
            </Box>
          )}
          {!busy && !pdfUrl && (
            <Box sx={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DescriptionIcon sx={{ fontSize: 30, color: 'rgba(255,255,255,0.3)' }} />
              </Box>
              <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} color="rgba(255,255,255,0.5)" fontSize="0.95rem">
                No Token Found
              </Typography>
              <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color="rgba(255,255,255,0.3)">
                This appointment has no token yet
              </Typography>
            </Box>
          )}
          {pdfUrl && (
            <Box
              component="iframe"
              src={pdfUrl}
              title="Token PDF"
              sx={{
                width: '100%', height: '100%',
                border: 'none', display: 'block',
                opacity: busy ? 0 : 1,
                transition: 'opacity 0.2s',
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

/* ─── Mobile Card ────────────────────────────────────────────────────────────── */
const AppointmentCard = ({ appt, idx, status, onReschedule, handlePrescrp, handleToken }) => {
  const cfg = STATUS[status] || STATUS.Active;
  return (
    <Box sx={{
      bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(6,143,210,0.05)',
      animation: 'cardIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
      animationDelay: `${idx * 50}ms`,
      '@keyframes cardIn': { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 6px 20px rgba(6,143,210,0.10)' },
    }}>
      <Box sx={{ height: 3, background: `linear-gradient(90deg, ${cfg.gradA}, ${cfg.gradB})` }} />
      <Box sx={{ p: 2.5 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, minWidth: 0 }}>
            <Avatar sx={{ width:38, height:38, flexShrink:0, bgcolor:C.primaryBg, color:C.primary, fontFamily:"'Nunito', sans-serif", fontWeight:800, fontSize:'0.76rem', border:`1.5px solid ${C.primaryBdr}` }}>
              {initials(appt?.patientData?.patientName) || <PersonIcon sx={{ fontSize: 17 }} />}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography fontSize="0.9rem" fontWeight={800} color={C.text} fontFamily="'Nunito', sans-serif" noWrap>
                {appt?.patientData?.patientName || '—'}
              </Typography>
              {appt?.phonNumber && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, mt: 0.2 }}>
                  <PhoneIcon sx={{ fontSize: 11, color: C.textLight }} />
                  <Typography fontSize="0.71rem" color={C.textLight} fontFamily="'Nunito', sans-serif">{appt.phonNumber}</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <StatusBadge status={status} />
        </Box>

        {/* Info block */}
        <Box sx={{ bgcolor: C.surfaceAlt, borderRadius: '12px', border: `1px solid ${C.border}`, overflow: 'hidden', mb: 2 }}>
          {[
            { icon: <LocalHospitalIcon sx={{ fontSize: 13 }} />, iconColor: '#e85d7f', iconBg: 'rgba(232,93,127,0.10)', label: 'Doctor', value: appt?.doctor?.fullName || '—' },
            { icon: <CalendarMonthIcon sx={{ fontSize: 13 }} />, iconColor: C.primary, iconBg: C.primaryBg, label: 'Date', value: fmtDate(appt?.appointmentDate) },
            { icon: <AccessTimeIcon   sx={{ fontSize: 13 }} />, iconColor: C.accent,  iconBg: C.accentBg,  label: 'Slot', value: appt?.slot || '—', last: true },
          ].map(({ icon, iconColor, iconBg, label, value, last }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.3, borderBottom: last ? 'none' : `1px solid ${C.border}` }}>
              <Box sx={{ width: 26, height: 26, borderRadius: '7px', bgcolor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {React.cloneElement(icon, { sx: { fontSize: 13, color: iconColor } })}
              </Box>
              <Typography fontSize="0.7rem" fontWeight={700} color={C.textLight} fontFamily="'Nunito', sans-serif"
                textTransform="uppercase" letterSpacing="0.05em" sx={{ flexShrink: 0, width: 44 }}>
                {label}
              </Typography>
              <Typography fontSize="0.83rem" fontWeight={600} color={C.textMid} fontFamily="'Nunito', sans-serif" noWrap>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Actions — icon-only on ALL devices, Active tab only */}
        {status === 'Active' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Reschedule icon */}
            <Tooltip title="Reschedule" placement="top">
              <IconButton
                onClick={() => onReschedule(appt?._id)}
                sx={{
                  width: 42, height: 42, borderRadius: '10px',
                  color: C.primary, bgcolor: C.primaryBg,
                  border: `1.5px solid ${C.primaryBdr}`,
                  transition: 'all 0.18s ease',
                  '&:hover': { bgcolor: 'rgba(6,143,210,0.15)', borderColor: C.primary, transform: 'translateY(-1px)', boxShadow: '0 3px 12px rgba(6,143,210,0.25)' },
                  '&:active': { transform: 'scale(0.95)' },
                }}
              >
                <SwapHorizIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            {/* Prescription icon */}
            <Tooltip title="View Prescription" placement="top">
              <IconButton
                onClick={() => handlePrescrp(appt?._id)}
                sx={{
                  width: 42, height: 42, borderRadius: '10px',
                  color: C.accent, bgcolor: C.accentBg,
                  border: `1.5px solid ${C.accentBdr}`,
                  transition: 'all 0.18s ease',
                  '&:hover': { bgcolor: 'rgba(0,198,167,0.15)', borderColor: C.accent, transform: 'translateY(-1px)', boxShadow: '0 3px 12px rgba(0,198,167,0.25)' },
                  '&:active': { transform: 'scale(0.95)' },
                }}
              >
                <DescriptionIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            {/* Token icon */}
            <Tooltip title="View Token" placement="top">
              <IconButton
                onClick={() => handleToken(appt?._id)}
                sx={{
                  width: 42, height: 42, borderRadius: '10px',
                  color: C.amber, bgcolor: C.amberBg,
                  border: `1.5px solid ${C.amberBdr}`,
                  transition: 'all 0.18s ease',
                  '&:hover': { bgcolor: 'rgba(245,158,11,0.15)', borderColor: C.amber, transform: 'translateY(-1px)', boxShadow: '0 3px 12px rgba(245,158,11,0.25)' },
                  '&:active': { transform: 'scale(0.95)' },
                }}
              >
                <ConfirmationNumberIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/* ─── Desktop Table ──────────────────────────────────────────────────────────── */
const DesktopTable = ({ rows, status, loading, searchQuery, onReschedule, handlePrescrp, handleToken }) => {
  const cfg    = STATUS[status] || STATUS.Active;
  const Active = cfg.icon;

  const thStyle = {
    padding: '12px 14px', textAlign: 'left', fontSize: '0.67rem', fontWeight: 900,
    color: C.textLight, fontFamily: "'Nunito', sans-serif",
    textTransform: 'uppercase', letterSpacing: '0.07em',
    background: C.surfaceDeep, borderBottom: `2px solid ${C.border}`, whiteSpace: 'nowrap',
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontFamily: "'Nunito', sans-serif" }}>
        <colgroup>
          <col style={{ width: '4%'  }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            {['#', 'Patient', 'Doctor', 'Date', 'Slot', 'Status', 'Actions'].map(h => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {[1,2,3,4,5,6,7].map(j => (
                  <td key={j} style={{ padding: '14px', borderBottom: `1px solid ${C.border}` }}>
                    <Skeleton variant="rounded" height={16} sx={{ borderRadius: '5px', animationDelay: `${i*60+j*20}ms` }} />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '60px 20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 60, height: 60, borderRadius: '18px', bgcolor: cfg.bg, border: `1.5px solid ${cfg.bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Active sx={{ fontSize: 28, color: cfg.color }} />
                  </Box>
                  <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} color={C.textMid} fontSize="0.95rem">
                    No {status.toLowerCase()} appointments
                  </Typography>
                  <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color={C.textLight}>
                    {searchQuery ? 'Try a different search term' : 'Nothing to show here yet'}
                  </Typography>
                </Box>
              </td>
            </tr>
          ) : rows.map((appt, idx) => (
            <tr
              key={appt?._id || idx}
              style={{ cursor: 'default', transition: 'background 0.14s' }}
              onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* # */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                <Typography fontSize="0.68rem" fontWeight={900} color={C.text} fontFamily="'Nunito', sans-serif">{idx + 1}</Typography>
              </td>
              {/* Patient */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle', overflow: 'hidden' }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontSize="0.82rem" fontWeight={700} color={C.text} fontFamily="'Nunito', sans-serif"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {appt?.patientData?.patientName || '—'}
                  </Typography>
                  {appt?.phonNumber && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                      <PhoneIcon sx={{ fontSize: 10, color: C.textLight, flexShrink: 0 }} />
                      <Typography fontSize="0.67rem" color={C.textLight} fontFamily="'Nunito', sans-serif"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {appt.phonNumber}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </td>
              {/* Doctor */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle', overflow: 'hidden' }}>
                <Typography fontSize="0.8rem" fontWeight={600} color={C.textMid} fontFamily="'Nunito', sans-serif"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {appt?.doctor?.fullName || '—'}
                </Typography>
              </td>
              {/* Date */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                <Typography fontSize="0.79rem" fontWeight={600} color={C.textMid} fontFamily="'Nunito', sans-serif" noWrap>
                  {fmtDate(appt?.appointmentDate)}
                </Typography>
              </td>
              {/* Slot */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                {appt?.slot ? (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.1, py: 0.45, borderRadius: '7px', bgcolor: C.accentBg, border: `1px solid ${C.accentBdr}`, maxWidth: '100%' }}>
                    <AccessTimeIcon sx={{ fontSize: 11, color: C.accent, flexShrink: 0 }} />
                    <Typography fontSize="0.73rem" fontWeight={700} color={C.accent} fontFamily="'Nunito', sans-serif"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {appt.slot}
                    </Typography>
                  </Box>
                ) : (
                  <Typography fontSize="0.76rem" color={C.textLight} fontFamily="'Nunito', sans-serif">—</Typography>
                )}
              </td>
              {/* Status */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                <StatusBadge status={status} />
              </td>
              {/* Actions — 3 icon buttons on Active, dash on other tabs */}
              <td style={{ padding: '13px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                {status === 'Active' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    {/* Reschedule icon */}
                    <Tooltip title="Reschedule" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => onReschedule(appt?._id)}
                        sx={{
                          width: 32, height: 32, borderRadius: '8px',
                          color: C.primary, bgcolor: C.primaryBg,
                          border: `1.5px solid ${C.primaryBdr}`,
                          transition: 'all 0.18s ease',
                          '&:hover': { bgcolor: 'rgba(6,143,210,0.15)', borderColor: C.primary, transform: 'translateY(-1px)', boxShadow: '0 3px 10px rgba(6,143,210,0.20)' },
                          '&:active': { transform: 'scale(0.95)' },
                        }}
                      >
                        <SwapHorizIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    {/* Prescription icon */}
                    <Tooltip title="View Prescription" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => handlePrescrp(appt?._id)}
                        sx={{
                          width: 32, height: 32, borderRadius: '8px',
                          color: C.accent, bgcolor: C.accentBg,
                          border: `1.5px solid ${C.accentBdr}`,
                          transition: 'all 0.18s ease',
                          '&:hover': { bgcolor: 'rgba(0,198,167,0.15)', borderColor: C.accent, transform: 'translateY(-1px)', boxShadow: '0 3px 10px rgba(0,198,167,0.22)' },
                          '&:active': { transform: 'scale(0.95)' },
                        }}
                      >
                        <DescriptionIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    {/* Token icon */}
                    <Tooltip title="View Token" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => handleToken(appt?._id)}
                        sx={{
                          width: 32, height: 32, borderRadius: '8px',
                          color: C.amber, bgcolor: C.amberBg,
                          border: `1.5px solid ${C.amberBdr}`,
                          transition: 'all 0.18s ease',
                          '&:hover': { bgcolor: 'rgba(245,158,11,0.15)', borderColor: C.amber, transform: 'translateY(-1px)', boxShadow: '0 3px 10px rgba(245,158,11,0.22)' },
                          '&:active': { transform: 'scale(0.95)' },
                        }}
                      >
                        <ConfirmationNumberIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <Typography fontSize="0.74rem" color={C.textLight} fontFamily="'Nunito', sans-serif">—</Typography>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

/* ─── Skeleton card (mobile) ─────────────────────────────────────────────────── */
const SkeletonCard = ({ i }) => (
  <Box sx={{ bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', p: 2.5, overflow: 'hidden' }}>
    <Box sx={{ height: 3, bgcolor: C.surfaceDeep, mx: -2.5, mt: -2.5, mb: 2.5 }} />
    <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
      <Skeleton variant="circular" width={38} height={38} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="rounded" width="55%" height={15} sx={{ mb: 0.8, borderRadius: '5px', animationDelay: `${i*60}ms` }} />
        <Skeleton variant="rounded" width="38%" height={12} sx={{ borderRadius: '5px', animationDelay: `${i*60+25}ms` }} />
      </Box>
      <Skeleton variant="rounded" width={60} height={22} sx={{ borderRadius: '8px' }} />
    </Box>
    {[0,1,2].map(j => (
      <Skeleton key={j} variant="rounded" width="100%" height={34} sx={{ borderRadius: '8px', mb: 0.7, animationDelay: `${i*60+j*22}ms` }} />
    ))}
    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
      {[0,1,2].map(k => (
        <Skeleton key={k} variant="rounded" width={42} height={42} sx={{ borderRadius: '10px', animationDelay: `${k*30}ms` }} />
      ))}
    </Box>
  </Box>
);

/* ─── Main Page ──────────────────────────────────────────────────────────────── */
const page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router  = useRouter();

  const [appointments,    setAppointments]    = useState([]);
  const [checkedStatus,   setCheckedStatus]   = useState('Active');
  const [loading,         setLoading]         = useState(true);
  const [searchQuery,     setSearchQuery]     = useState('');

  /* Prescription state — matches your existing logic exactly */
  const [prescripData,    setPrescripData]    = useState(null);
  const [openModal,       setOpenModal]       = useState(false);
  const [prescripLoading, setPrescripLoading] = useState(false);

  // Token State
  const [openTokenModal, setOpenTokenModal] = useState('');
  const [tokenData,    setTokenData]    = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  const handleToken = async(id) => {
    setTokenData(null);
    setTokenLoading(true);
    setOpenTokenModal(true);
    try {
      const url = `${API_URL}online-appointment/generateToken/${id}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const result = await res.json();
      console.log(result);
      setTokenData(result?.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load token');
    } finally {
      setTokenLoading(false);
    }
  };

  console.log('token data', tokenData);

  /* ── Fetch prescription — unchanged ────────────────────────────────────── */
  const handlePrescrp = async (id) => {
    setPrescripData(null);
    setPrescripLoading(true);
    setOpenModal(true);
    try {
      const res    = await fetch(`${API_URL}online-appointment/getPrescripByAppointmentId/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const result = await res.json();
      setPrescripData(result.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load prescription');
    } finally {
      setPrescripLoading(false);
    }
  };

  console.log(prescripData);

  /* ── Appointments ──────────────────────────────────────────────────────── */
  const getAppointments = async (status) => {
    setLoading(true);
    try {
      const res    = await fetch(`${API_URL}hims-appointment/get-hims-appointments?checkedStatus=${status}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const result = await res.json();
      setAppointments(result?.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { getAppointments(checkedStatus); }, [checkedStatus]);

  const handleTabChange = (key) => { setCheckedStatus(key); setSearchQuery(''); };
  const rescheduleAppt  = (id)  => router.push(`/patient_appointment/${id}`);

  const filtered = appointments.filter(a =>
    !searchQuery ||
    a?.patientData?.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a?.doctor?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(a?.phonNumber || '').includes(searchQuery)
  );

  const activeCfg  = STATUS[checkedStatus] || STATUS.Active;
  const ActiveIcon = activeCfg.icon;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* ━━━ Prescription Modal ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <PrescriptionModal
        open={openModal}
        onClose={() => { setOpenModal(false); setPrescripData(null); }}
        data={prescripData}
        loading={prescripLoading}
      />

      <TokenModal
        open={openTokenModal}
        onClose={() => { setOpenTokenModal(false); setTokenData(null); }}
        data={tokenData}
        loading={tokenLoading}
      />

      {/* ═══ AppBar ═══════════════════════════════════════════════════════════ */}
      <AppBar position="fixed" elevation={0} sx={{
        left:  { xs: 0, md: `${SIDEBAR_W}px` },
        width: { xs: '100%', md: `calc(100% - ${SIDEBAR_W}px)` },
        background: C.surface,
        boxShadow: '0 0 20px 0 rgba(6,143,210,0.40)',
        zIndex: 1200,
      }}>
        <Toolbar sx={{ minHeight: '64px !important', display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 3 }, gap: 2 }}>

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
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', flexShrink: 0, bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`, display: { xs: "none", sm: "none", md: "none", lg: "flex" }, alignItems: 'center', justifyContent: 'center' }}>
              <CalendarMonthIcon sx={{ color: C.primary, fontSize: 20 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={900} color={C.text} fontFamily="'Nunito', sans-serif" fontSize="1rem" lineHeight={1.2} noWrap>My Appointments</Typography>
              <Typography fontSize="0.68rem" color={C.textLight} fontFamily="'Nunito', sans-serif" noWrap>Manage your upcoming &amp; past appointments</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            <TextField
              placeholder="Search patient or doctor…" size="small" value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: C.textLight, fontSize: 17 }} /></InputAdornment>,
                endAdornment: searchQuery ? <InputAdornment position="end"><IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.3 }}><CloseIcon sx={{ fontSize: 14, color: C.textLight }} /></IconButton></InputAdornment> : null,
              }}
              sx={{
                display: { xs: 'none', lg: 'flex' }, width: 224,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', bgcolor: C.surfaceAlt, fontFamily: "'Nunito', sans-serif", fontSize: '0.83rem',
                  '& fieldset': { borderColor: C.border },
                  '&:hover fieldset': { borderColor: C.primary },
                  '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
                },
              }}
            />
            <Button onClick={() => router.push('/patients')} startIcon={<AddIcon sx={{ fontSize: '16px !important' }} />}
              sx={{
                color: C.surface, bgcolor: C.primary, borderRadius: '11px',
                fontWeight: 800, fontFamily: "'Nunito', sans-serif", fontSize: '0.83rem',
                px: { xs: 2, sm: 2.4 }, py: 1, textTransform: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(6,143,210,0.32)', transition: 'all 0.2s ease',
                '&:hover': { bgcolor: C.primaryDark, boxShadow: '0 6px 20px rgba(6,143,210,0.44)', transform: 'translateY(-1px)' },
                '&:active': { transform: 'scale(0.97)' },
              }}>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>New Appointment</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>New</Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ═══ Page wrapper ═══════════════════════════════════════════════════ */}
      <Box sx={{
        position: 'fixed', top: 64, left: { xs: 0, md: `${SIDEBAR_W}px` },
        width: { xs: '100%', md: `calc(100% - ${SIDEBAR_W}px)` },
        height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden',
        bgcolor: C.surfaceAlt, boxSizing: 'border-box', fontFamily: "'Nunito', sans-serif",
      }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>

          {/* Hero banner */}
          <Box sx={{
            borderRadius: '15px',
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 52%, ${C.primaryDeep} 100%)`,
            p: { xs: 3, sm: 4 }, mb: 3, position: 'relative', overflow: 'hidden',
            animation: 'bIn 0.42s cubic-bezier(0.22,1,0.36,1) both',
            '@keyframes bIn': { from: { opacity: 0, transform: 'translateY(-8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            {[{s:200,t:-60,r:-60},{s:110,b:-35,r:125},{s:76,t:16,r:106}].map((b,i)=>(
              <Box key={i} sx={{ position:'absolute', width:b.s, height:b.s, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.4)', top:b.t, right:b.r, bottom:b.b, opacity:0.08, pointerEvents:'none' }}/>
            ))}
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Chip label="Appointment Manager" size="small"
                  icon={<CalendarMonthIcon style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }} />}
                  sx={{ mb: 1, height: 22, fontSize: '0.67rem', fontWeight: 700, fontFamily: "'Nunito', sans-serif", bgcolor: 'rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.22)' }}
                />
                <Typography fontFamily="'Nunito', sans-serif" fontWeight={900} fontSize={{ xs: '1rem', sm: '1.5rem' }} color="#fff" lineHeight={1.2}>My Appointments</Typography>
                <Typography fontFamily="'Nunito', sans-serif" fontSize="0.8rem" color="rgba(255,255,255,0.68)" mt={0.5}>View, manage and reschedule all your appointments</Typography>
              </Box>
              {/* Icon legend pill — shows what each icon does */}
              {/* <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 0.7, alignSelf: 'center' }}>
                {[
                  { icon: <SwapHorizIcon />,          label: 'Reschedule',   color: C.primary, bg: C.primaryBg, bdr: C.primaryBdr },
                  { icon: <DescriptionIcon />,         label: 'Prescription', color: C.accent,  bg: C.accentBg,  bdr: C.accentBdr  },
                  { icon: <ConfirmationNumberIcon />,  label: 'Token',        color: C.amber,   bg: C.amberBg,   bdr: C.amberBdr   },
                ].map(({ icon, label, color, bg, bdr }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.8, px: 1.1, py: 0.45, borderRadius: '7px', bgcolor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.16)' }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '4px', bgcolor: bg, border: `1px solid ${bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {React.cloneElement(icon, { sx: { fontSize: 11, color } })}
                    </Box>
                    <Typography fontSize="0.65rem" fontWeight={700} color="rgba(255,255,255,0.82)" fontFamily="'Nunito', sans-serif">{label}</Typography>
                  </Box>
                ))}
              </Box> */}
            </Box>
          </Box>

          {/* Tabs + search */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
            <Box sx={{ display: 'flex', flexShrink: 0, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(6,143,210,0.06)' }}>
              {TABS.map(({ key, label }, i) => {
                const cfg = STATUS[key]; const active = checkedStatus === key; const Icon = cfg.icon;
                return (
                  <Box key={key} onClick={() => handleTabChange(key)} sx={{
                    display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.8 },
                    px: { xs: 1.6, sm: 2.2 }, py: 1.3, cursor: 'pointer', position: 'relative',
                    bgcolor: active ? cfg.bg : 'transparent',
                    borderRight: i < TABS.length-1 ? `1px solid ${C.border}` : 'none',
                    transition: 'all 0.18s ease',
                    '&:hover': { bgcolor: active ? cfg.bg : C.surfaceAlt },
                  }}>
                    {active && <Box sx={{ position: 'absolute', bottom: 0, left: '16%', right: '16%', height: 2.5, borderRadius: '2px 2px 0 0', bgcolor: cfg.color }} />}
                    <Icon sx={{ fontSize: { xs: 13, sm: 14 }, color: active ? cfg.color : C.textLight, flexShrink: 0 }} />
                    <Typography fontSize={{ xs: '0.73rem', sm: '0.8rem' }} fontWeight={active ? 800 : 600}
                      color={active ? cfg.color : C.textLight} fontFamily="'Nunito', sans-serif" noWrap>
                      {label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <TextField placeholder="Search…" size="small" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: C.textLight, fontSize: 17 }} /></InputAdornment>,
                endAdornment: searchQuery ? <InputAdornment position="end"><IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.3 }}><CloseIcon sx={{ fontSize: 14, color: C.textLight }} /></IconButton></InputAdornment> : null,
              }}
              sx={{
                display: { xs: 'flex', lg: 'none' }, flexGrow: 1, minWidth: 0,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', bgcolor: C.surface, fontFamily: "'Nunito', sans-serif", fontSize: '0.83rem',
                  '& fieldset': { borderColor: C.border }, '&:hover fieldset': { borderColor: C.primary },
                  '&.Mui-focused fieldset': { borderColor: C.primary, borderWidth: 2 },
                },
              }}
            />
          </Box>

          {/* Content card */}
          <Box sx={{
            bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden',
            boxShadow: '0 2px 18px rgba(6,143,210,0.06)',
            animation: 'cIn 0.38s cubic-bezier(0.22,1,0.36,1) 0.08s both',
            '@keyframes cIn': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${activeCfg.gradA}, ${activeCfg.gradB}, ${C.accent})` }} />
            <Box sx={{
              px: 3, py: 2.2, borderBottom: `1px solid ${C.border}`,
              background: `linear-gradient(120deg, ${activeCfg.bg} 0%, ${C.surface} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '10px', flexShrink: 0, bgcolor: activeCfg.bg, border: `1.5px solid ${activeCfg.bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ActiveIcon sx={{ fontSize: 18, color: activeCfg.color }} />
                </Box>
                <Box>
                  <Typography fontWeight={800} fontSize="0.92rem" color={C.text} fontFamily="'Nunito', sans-serif" lineHeight={1.2}>{checkedStatus} Appointments</Typography>
                  <Typography fontSize="0.71rem" color={C.textLight} fontFamily="'Nunito', sans-serif">
                    {loading ? 'Loading records…' : `${filtered.length} record${filtered.length !== 1 ? 's' : ''} found`}
                  </Typography>
                </Box>
              </Box>
              {searchQuery && (
                <Chip label={`"${searchQuery}"`} size="small" onDelete={() => setSearchQuery('')}
                  sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.75rem', bgcolor: C.primaryBg, color: C.primary, border: `1px solid ${C.primaryBdr}` }}
                />
              )}
            </Box>

            {/* Mobile cards */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2, p: 2 }}>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} i={i} />)
                : filtered.length === 0
                  ? <Box sx={{ textAlign: 'center', py: 6 }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: activeCfg.bg, border: `1.5px solid ${activeCfg.bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                        <ActiveIcon sx={{ fontSize: 26, color: activeCfg.color }} />
                      </Box>
                      <Typography fontFamily="'Nunito', sans-serif" fontWeight={800} color={C.textMid} fontSize="0.95rem">No {checkedStatus.toLowerCase()} appointments</Typography>
                    </Box>
                  : filtered.map((appt, i) => (
                      <AppointmentCard key={appt?._id || i} appt={appt} idx={i} status={checkedStatus}
                        onReschedule={rescheduleAppt} handlePrescrp={handlePrescrp} handleToken={handleToken} />
                    ))
              }
            </Box>

            {/* Desktop table */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <DesktopTable rows={filtered} status={checkedStatus} loading={loading}
                searchQuery={searchQuery} onReschedule={rescheduleAppt} handlePrescrp={handlePrescrp} handleToken={handleToken} />
            </Box>

            {/* Footer */}
            {!loading && filtered.length > 0 && (
              <Box sx={{
                px: 3, py: 1.8, borderTop: `1px solid ${C.border}`, bgcolor: C.surfaceAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
              }}>
                <Typography fontSize="0.77rem" color={C.textLight} fontFamily="'Nunito', sans-serif">
                  Showing{' '}
                  <Box component="span" sx={{ color: C.text, fontWeight: 800 }}>{filtered.length}</Box>
                  {' '}of{' '}
                  <Box component="span" sx={{ color: C.text, fontWeight: 800 }}>{appointments.length}</Box>
                  {' '}{checkedStatus.toLowerCase()} appointment{appointments.length !== 1 ? 's' : ''}
                </Typography>
                <StatusBadge status={checkedStatus} />
              </Box>
            )}
          </Box>
          <Box sx={{ height: 40 }} />
        </Box>
      </Box>
    </>
  );
};

export default page;