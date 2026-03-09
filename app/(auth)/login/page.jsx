"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import LoginIcon        from "@mui/icons-material/Login";
import LockIcon         from "@mui/icons-material/Lock";
import PhoneIcon        from "@mui/icons-material/Phone";
import VisibilityIcon   from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ShieldIcon        from "@mui/icons-material/Shield";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon     from "@mui/icons-material/PeopleAlt";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

/* ─── Design Tokens ─────────────────────────────────────────────────── */
const C = {
  primary:     "#068fd2",
  primaryDark: "#0570a6",
  primaryDeep: "#034e76",
  primaryBg:   "rgba(6,143,210,0.08)",
  primaryBdr:  "rgba(6,143,210,0.22)",
  accent:      "#00c6a7",
  accentBg:    "rgba(0,198,167,0.08)",
  accentBdr:   "rgba(0,198,167,0.28)",
  surface:     "#ffffff",
  surfaceAlt:  "#f4f8fc",
  border:      "#e0ecf5",
  text:        "#0f1f2e",
  textMid:     "#445566",
  textLight:   "#7a96ab",
};
const FF = "'Nunito', sans-serif";

/* ─── Floating feature pill ─────────────────────────────────────────── */
const FeaturePill = ({ icon, label, delay }) => (
  <Box sx={{
    display: "inline-flex", alignItems: "center", gap: 2,
    animation: `pillIn 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
    "@keyframes pillIn": {
      from: { opacity: 0, transform: "translateY(10px)" },
      to:   { opacity: 1, transform: "translateY(0)" },
    },
  }}>
    {React.cloneElement(icon, { sx: { fontSize: 15, color: "rgba(255,255,255,0.85)" } })}
    <Typography fontFamily={FF} fontSize="0.9rem" fontWeight={700} color="rgba(255,255,255,0.88)">
      {label}
    </Typography>
  </Box>
);

/* ─── Animated background orb ──────────────────────────────────────── */
const Orb = ({ size, top, left, right, bottom, delay, opacity = 0.12 }) => (
  <Box sx={{
    position: "absolute", width: size, height: size, borderRadius: "50%",
    top, left, right, bottom, opacity, pointerEvents: "none",
    background: `radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)`,
    animation: `orbFloat 6s ease-in-out ${delay}ms infinite alternate`,
    "@keyframes orbFloat": {
      from: { transform: "translateY(0px) scale(1)" },
      to:   { transform: "translateY(-18px) scale(1.04)" },
    },
  }} />
);

/* ─── Main Component ─────────────────────────────────────────────────── */
const LoginPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [mobileNumber,  setMobileNumber]  = useState("");
  const [password,      setPassword]      = useState("");
  const [storeMobileNum,setStoreMobileNum]= useState("");
  const [loading,       setLoading]       = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showPassword,  setShowPassword]  = useState(false);
  const [focused,       setFocused]       = useState("");   // "mobile" | "password" | ""

  const router = useRouter();

  useEffect(() => {
    const mobileNumStore = sessionStorage.getItem("MobileNum");
    setStoreMobileNum(mobileNumStore);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) router.push("/");
  }, []);

  /* ── Forgot password ── */
  const handleForgot = async () => {
    if (!storeMobileNum) {
      toast.error("Mobile number not found. Please sign up first.");
      return;
    }
    setForgotLoading(true);
    try {
      const res    = await fetch(`${API_URL}patient-auth/forget_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: storeMobileNum }),
      });
      const result = await res.json();
      if (result?.isSuccess) toast.success("Password reset link sent to your phone");
      else toast.error(result?.message || "Failed to send reset link");
    } catch { toast.error("Something went wrong. Please try again."); }
    finally   { setForgotLoading(false); }
  };

  /* ── Login ── */
  const handleLogin = async () => {
    if (!mobileNumber && !password) { toast.error("Please enter Mobile Number & Password"); return; }
    if (!mobileNumber)               { toast.error("Please enter Mobile Number"); return; }
    if (!password)                   { toast.error("Please enter Password"); return; }

    setLoading(true);
    try {
      const res    = await fetch(`${API_URL}patient-auth/general_login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: mobileNumber, password }),
      });
      const result = await res.json();
      if (result?.isSuccess) {
        toast.success("Login successful!");
        setMobileNumber(""); setPassword("");
        localStorage.setItem("token",        result?.data?.token);
        localStorage.setItem("MobileNumber", mobileNumber);
        router.push("/");
      } else toast.error(result?.message || "Login failed");
    } catch { toast.error("Something went wrong. Please try again."); }
    finally   { setLoading(false); }
  };

  /* ── Field style factory ── */
  const fieldSx = (name) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      fontSize: "0.9rem",
      fontFamily: FF,
      bgcolor: focused === name ? C.surface : C.surfaceAlt,
      transition: "background 0.2s",
      "& fieldset": {
        borderColor: focused === name ? C.primary : C.border,
        borderWidth:  focused === name ? "2px" : "1.5px",
        transition: "border-color 0.2s, border-width 0.2s",
      },
      "&:hover fieldset": { borderColor: C.primaryDark },
      "&.Mui-focused fieldset": { borderColor: C.primary, borderWidth: "2px" },
    },
    "& .MuiInputLabel-root": {
      fontFamily: FF, fontSize: "0.85rem", color: C.textLight,
      "&.Mui-focused": { color: C.primary },
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* ══════════ Full-page wrapper ══════════ */}
      <Box sx={{
        minHeight: "100vh", display: "flex",
        bgcolor: C.surfaceAlt, fontFamily: FF,
        animation: "pageIn 0.4s ease both",
        "@keyframes pageIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }}>

        {/* ═══ LEFT PANEL — hero (hidden on mobile) ═══ */}
        <Box sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column", justifyContent: "space-between",
          width: "46%", flexShrink: 0, position: "relative", overflow: "hidden",
          background: `linear-gradient(145deg, ${C.primary} 0%, ${C.primaryDark} 48%, ${C.primaryDeep} 100%)`,
          p: 6,
        }}>
          {/* Animated orbs */}
          <Orb size={340} top={-80}  left={-80}  delay={0}    opacity={0.10} />
          <Orb size={200} bottom={60} right={-60} delay={800}  opacity={0.13} />
          <Orb size={110} top={200}  right={40}  delay={400}  opacity={0.09} />
          <Orb size={70}  bottom={200} left={60} delay={1200} opacity={0.12} />

          {/* Decorative rings */}
          {[
            { s: 500, t: -160, r: -160 },
            { s: 260, b: -80,  r: 80   },
            { s: 140, t: 80,   r: 110  },
          ].map((b, i) => (
            <Box key={i} sx={{
              position: "absolute", width: b.s, height: b.s, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.14)",
              top: b.t, right: b.r, bottom: b.b, pointerEvents: "none",
            }} />
          ))}

          {/* Top — logo area */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="logo-icon">
              <LocalHospitalRoundedIcon style={{ fontSize: 32, color: "#fff" }} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#eeebeb", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                Appointments
              </p>
              <p style={{ fontSize: 12, color: "#eeebeb", fontWeight: 500, marginTop: 2, whiteSpace: "nowrap" }}>
                Hospital System
              </p>
            </div>
          </div>
          </Box>

          {/* Middle — headline */}
          <Box sx={{ position: "absolute", marginTop: '200px', zIndex: 1 }}>
            <Typography fontFamily={FF} fontWeight={900}
              fontSize={{ lg: "2.4rem", xl: "2.8rem" }} color="#fff" lineHeight={1.18} mb={2}
              sx={{
                animation: "headIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both",
                "@keyframes headIn": { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
              }}
            >
              Your clinic,<br />
              <Box component="span" sx={{
                background: `linear-gradient(90deg, ${C.accent}, #7de8d8)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                ALWAYS IN SYNC.
              </Box>
            </Typography>
            <Typography fontFamily={FF} fontSize="0.92rem" color="rgba(255,255,255,0.70)"
              lineHeight={1.7} maxWidth={360} mb={4}
              sx={{ animation: "headIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.32s both" }}
            >
              Manage appointments, patients, and prescriptions from a single unified dashboard built for healthcare professionals.
            </Typography>

            {/* Feature pills */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              <FeaturePill icon={<CalendarMonthIcon />} label="Appointment Scheduling" delay={420} />
              <FeaturePill icon={<PeopleAltIcon />}     label="Patient Management"     delay={500} />
              <FeaturePill icon={<ShieldIcon />}        label="Secure & Private"       delay={580} />
            </Box>
          </Box>

          {/* Bottom — decorative stat strip */}
          <Box sx={{
            position: "relative", zIndex: 1, display: "flex", gap: 3,
            animation: "headIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}>
            {[
              { n: "500+", l: "Appointments" },
              { n: "200+", l: "Patients"     },
              { n: "50+",  l: "Doctors"      },
            ].map(({ n, l }) => (
              <Box key={l}>
                <Typography fontFamily={FF} fontWeight={900} fontSize="1.6rem" color="#fff" lineHeight={1}>{n}</Typography>
                <Typography fontFamily={FF} fontSize="0.72rem" color="rgba(255,255,255,0.60)" mt={0.3}>{l}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ═══ RIGHT PANEL — form ═══ */}
        <Box sx={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6 },
          position: "relative", overflowY: "auto",
          overflowX: "hidden",
        }}>
          {/* Subtle bg rings (visible on mobile too) */}
          <Box sx={{
            position: "absolute", width: 360, height: 360, borderRadius: "50%",
            border: `1.5px solid ${C.primaryBdr}`, top: -100, right: -100,
            opacity: 0.5, pointerEvents: "none",
          }} />
          <Box sx={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%",
            border: `1.5px solid ${C.accentBdr}`, bottom: 60, left: -60,
            opacity: 0.5, pointerEvents: "none",
          }} />

          {/* Card */}
          <Box sx={{
            width: "100%", maxWidth: { xs: 460, sm: 600, md: 900 }, position: "relative", zIndex: 1,
            animation: "cardIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.15s both",
            "@keyframes cardIn": {
              from: { opacity: 0, transform: "translateY(24px)" },
              to:   { opacity: 1, transform: "translateY(0)" },
            },
          }}>

            {/* ── Mobile logo (hidden on lg) ── */}
            <Box sx={{ position: "relative", zIndex: 1, display: { xs: "block", sm: "block", md: "block", lg: "none" }, mb: '35px' }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: 12 }}>
                <div className="logo-icon">
                  <LocalHospitalRoundedIcon style={{ fontSize: 32, color: "#0570a6" }} />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#000000", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                    Appointments
                  </p>
                  <p style={{ fontSize: 12, color: "#000000", fontWeight: 500, marginTop: 2, whiteSpace: "nowrap" }}>
                    Hospital System
                  </p>
                </div>
              </div>
            </Box>

            {/* ── Card body ── */}
            <Box sx={{
              bgcolor: C.surface, borderRadius: "28px",
              border: `1px solid ${C.border}`,
              boxShadow: "0 20px 60px rgba(6,143,210,0.10), 0 4px 20px rgba(6,143,210,0.06)",
              overflow: "hidden",
            }}>

              {/* Gradient top bar */}
              <Box sx={{ height: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark}, ${C.accent})` }} />

              <Box sx={{ px: { xs: 3, sm: 5 }, pt: 4.5, pb: 5 }}>

                {/* Header icon + title */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4.5 }}>
                  <Box sx={{
                    width: 62, height: 62, borderRadius: "18px", mb: 2.2,
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                    boxShadow: `0 8px 24px ${C.primaryBdr}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "iconPop 0.55s cubic-bezier(0.34,1.5,0.64,1) 0.3s both",
                    "@keyframes iconPop": {
                      from: { opacity: 0, transform: "scale(0.6)" },
                      to:   { opacity: 1, transform: "scale(1)" },
                    },
                  }}>
                    <LoginIcon sx={{ color: "#fff", fontSize: 28 }} />
                  </Box>
                  <Typography fontFamily={FF} fontWeight={900} fontSize="1.55rem" color={C.text} lineHeight={1.2} textAlign="center">
                    Welcome Back
                  </Typography>
                  <Typography fontFamily={FF} fontSize="0.82rem" color={C.textLight} mt={0.7} textAlign="center">
                    Sign in to continue to your dashboard
                  </Typography>
                </Box>

                {/* ── Mobile Number ── */}
                <Box sx={{ mb: 2.8 }}>
                  <Typography fontFamily={FF} fontSize="0.8rem" fontWeight={800} color={C.textMid} mb={1}
                    textTransform="uppercase" letterSpacing="0.06em">
                    Mobile Number
                  </Typography>
                  <TextField
                    fullWidth placeholder="03xxxxxxxxx"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                    onFocus={() => setFocused("mobile")}
                    onBlur={()  => setFocused("")}
                    variant="outlined" size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{
                            width: 30, height: 30, borderRadius: "8px", flexShrink: 0,
                            bgcolor: focused === "mobile" ? C.primaryBg : C.surfaceAlt,
                            border: `1px solid ${focused === "mobile" ? C.primaryBdr : C.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                          }}>
                            <PhoneIcon sx={{ fontSize: 15, color: focused === "mobile" ? C.primary : C.textLight }} />
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx("mobile")}
                  />
                </Box>

                {/* ── Password ── */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography fontFamily={FF} fontSize="0.8rem" fontWeight={800} color={C.textMid} mb={1}
                    textTransform="uppercase" letterSpacing="0.06em">
                    Password
                  </Typography>
                  <TextField
                    fullWidth placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={()  => setFocused("")}
                    variant="outlined" size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{
                            width: 30, height: 30, borderRadius: "8px", flexShrink: 0,
                            bgcolor: focused === "password" ? C.primaryBg : C.surfaceAlt,
                            border: `1px solid ${focused === "password" ? C.primaryBdr : C.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                          }}>
                            <LockIcon sx={{ fontSize: 15, color: focused === "password" ? C.primary : C.textLight }} />
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((p) => !p)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end" size="small"
                            sx={{
                              color: showPassword ? C.primary : C.textLight,
                              mr: 0.2,
                              "&:hover": { bgcolor: C.primaryBg, color: C.primary },
                              borderRadius: "8px", transition: "all 0.18s",
                            }}
                          >
                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldSx("password")}
                  />
                </Box>

                {/* ── Forgot password ── */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3.5 }}>
                  <Button size="small" onClick={handleForgot} disabled={forgotLoading} sx={{
                    fontFamily: FF, fontWeight: 700, fontSize: "0.78rem",
                    textTransform: "none", color: C.primary, p: 0, minWidth: 0,
                    "&:hover": { bgcolor: "transparent", color: C.primaryDark, textDecoration: "underline" },
                    "&:disabled": { color: C.textLight },
                  }}>
                    {forgotLoading
                      ? <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <CircularProgress size={13} sx={{ color: C.primary }} />
                          <Typography fontFamily={FF} fontSize="0.78rem" color={C.primary}>Sending…</Typography>
                        </Box>
                      : "Forgot Password?"
                    }
                  </Button>
                </Box>

                {/* ── Sign In button ── */}
                <Button
                  fullWidth variant="contained" disabled={loading}
                  onClick={handleLogin}
                  sx={{
                    fontFamily: FF, fontWeight: 800, fontSize: "0.95rem",
                    textTransform: "none", borderRadius: "14px", py: 1.55,
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                    boxShadow: `0 6px 20px rgba(6,143,210,0.30)`,
                    transition: "all 0.22s ease",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primaryDeep})`,
                      boxShadow: `0 10px 28px rgba(6,143,210,0.42)`,
                      transform: "translateY(-1px)",
                    },
                    "&:active": { transform: "scale(0.97)" },
                    "&.Mui-disabled": { background: C.border, boxShadow: "none", color: C.textLight },
                  }}
                >
                  {loading
                    ? <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <CircularProgress size={18} sx={{ color: "#fff" }} />
                        <Typography fontFamily={FF} fontWeight={800} fontSize="0.95rem" color="#fff">Signing in…</Typography>
                      </Box>
                    : <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <LoginIcon sx={{ fontSize: 18 }} />
                        Sign In
                      </Box>
                  }
                </Button>

                {/* ── Divider ── */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 3.5 }}>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: C.border }} />
                  <Typography fontFamily={FF} fontSize="0.72rem" color={C.textLight} fontWeight={700} textTransform="uppercase" letterSpacing="0.08em">
                    or
                  </Typography>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: C.border }} />
                </Box>

                {/* ── Sign Up ── */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography fontFamily={FF} fontSize="0.85rem" color={C.textMid}>
                    Don't have an account?{" "}
                    <MuiLink href="/signup" underline="none" sx={{
                      fontFamily: FF, fontWeight: 800, color: C.primary,
                      position: "relative",
                      "&::after": {
                        content: '""', position: "absolute",
                        bottom: -1, left: 0, width: "0%", height: "2px",
                        bgcolor: C.primary, transition: "width 0.22s ease",
                      },
                      "&:hover::after": { width: "100%" },
                      "&:hover": { color: C.primaryDark },
                    }}>
                      Create Account
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ── Help note ── */}
            <Box sx={{
              mt: 2.5, px: 2.5, py: 1.8, borderRadius: "16px",
              bgcolor: C.accentBg, border: `1px solid ${C.accentBdr}`,
              display: "flex", alignItems: "flex-start", gap: 1.4,
              animation: "cardIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.45s both",
            }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: "8px", flexShrink: 0,
                bgcolor: "rgba(0,198,167,0.14)", border: `1px solid ${C.accentBdr}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ShieldIcon sx={{ fontSize: 14, color: C.accent }} />
              </Box>
              <Box>
                <Typography fontFamily={FF} fontSize="0.78rem" fontWeight={800} color={C.accent} mb={0.2}>
                  Need Help?
                </Typography>
                <Typography fontFamily={FF} fontSize="0.74rem" color={C.textMid} lineHeight={1.6}>
                  Contact our support team if you're having trouble logging in.
                </Typography>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;