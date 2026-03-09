"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {
  TextField, Button, FormControlLabel, Checkbox,
  Box, Typography, Link as MuiLink, CircularProgress,
} from "@mui/material";
import PersonAddIcon      from "@mui/icons-material/PersonAdd";
import VisibilityIcon     from "@mui/icons-material/Visibility";
import VisibilityOffIcon  from "@mui/icons-material/VisibilityOff";
import PersonIcon         from "@mui/icons-material/Person";
import PhoneIcon          from "@mui/icons-material/Phone";
import LockIcon           from "@mui/icons-material/Lock";
import LocalHospitalIcon  from "@mui/icons-material/LocalHospital";
import ShieldIcon         from "@mui/icons-material/Shield";
import CalendarMonthIcon  from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon      from "@mui/icons-material/PeopleAlt";
import CheckCircleIcon    from "@mui/icons-material/CheckCircle";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

/* ─── Design Tokens ────────────────────────────────────────────────── */
const C = {
  primary:     "#068fd2",
  primaryDark: "#0570a6",
  primaryDeep: "#034e76",
  primaryBg:   "rgba(6,143,210,0.08)",
  primaryBdr:  "rgba(6,143,210,0.22)",
  accent:      "#00c6a7",
  accentBg:    "rgba(0,198,167,0.08)",
  accentBdr:   "rgba(0,198,167,0.28)",
  accentDark:  "#009e85",
  surface:     "#ffffff",
  surfaceAlt:  "#f4f8fc",
  border:      "#e0ecf5",
  text:        "#0f1f2e",
  textMid:     "#445566",
  textLight:   "#7a96ab",
};
const FF = "'Nunito', sans-serif";

/* ─── Floating animated orb ────────────────────────────────────────── */
const Orb = ({ size, top, left, right, bottom, delay, opacity = 0.11 }) => (
  <Box sx={{
    position: "absolute", width: size, height: size, borderRadius: "50%",
    top, left, right, bottom, opacity, pointerEvents: "none",
    background: "radial-gradient(circle, rgba(255,255,255,0.38) 0%, transparent 70%)",
    animation: `orbFloat 6s ease-in-out ${delay}ms infinite alternate`,
    "@keyframes orbFloat": {
      from: { transform: "translateY(0px) scale(1)" },
      to:   { transform: "translateY(-16px) scale(1.05)" },
    },
  }} />
);

/* ─── Feature pill (left hero panel) ───────────────────────────────── */
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

/* ─── Reusable styled field ─────────────────────────────────────────── */
const Field = ({ label, focused, name, onFocus, onBlur, startIcon, endAdornment, ...props }) => (
  <Box>
    <Typography fontFamily={FF} fontSize="0.78rem" fontWeight={800} color={C.textMid}
      textTransform="uppercase" letterSpacing="0.06em" mb={0.9}>
      {label}
    </Typography>
    <TextField
      fullWidth size="medium" variant="outlined"
      onFocus={() => onFocus(name)}
      onBlur={() => onBlur("")}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">
            <Box sx={{
              width: 30, height: 30, borderRadius: "8px", flexShrink: 0,
              bgcolor: focused === name ? C.primaryBg : C.surfaceAlt,
              border: `1px solid ${focused === name ? C.primaryBdr : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.18s",
            }}>
              {React.cloneElement(startIcon, {
                sx: { fontSize: 15, color: focused === name ? C.primary : C.textLight },
              })}
            </Box>
          </InputAdornment>
        ) : undefined,
        endAdornment,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px", fontSize: "0.9rem", fontFamily: FF,
          bgcolor: focused === name ? C.surface : C.surfaceAlt,
          transition: "background 0.2s",
          "& fieldset": {
            borderColor: focused === name ? C.primary : C.border,
            borderWidth:  focused === name ? "2px" : "1.5px",
            transition: "all 0.2s",
          },
          "&:hover fieldset": { borderColor: C.primaryDark },
          "&.Mui-focused fieldset": { borderColor: C.primary, borderWidth: "2px" },
        },
      }}
      {...props}
    />
  </Box>
);

/* ─── Main Component ────────────────────────────────────────────────── */
const Signup = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router  = useRouter();

  const [mobileNumber,     setMobileNumber]     = useState("");
  const [fullName,         setFullName]         = useState("");
  const [password,         setPassword]         = useState("");
  const [confirmPassword,  setConfirmPassword]  = useState("");
  const [checked,          setChecked]          = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [showPassword,     setShowPassword]     = useState(false);
  const [showConfirm,      setShowConfirm]      = useState(false);
  const [focused,          setFocused]          = useState("");

  /* password strength */
  const pwStrength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"][pwStrength];
  const strengthColor = ["", "#ef4444", C.amber || "#f59e0b", C.accent][pwStrength];

  const userSignUp = async () => {
    if (!mobileNumber || !fullName || !password || !confirmPassword) {
      toast.error("Please fill out all fields"); return;
    }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }

    setLoading(true);
    try {
      const res    = await fetch(`${API_URL}patient-auth/general_signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: mobileNumber, fullName, password }),
      });
      const result = await res.json();
      if (result.isSuccess) {
        toast.success("Sign up successful");
        sessionStorage.setItem("MobileNum", mobileNumber);
        router.push("/otp");
      } else toast.error(result.message || "Sign up failed");
    } catch { toast.error("Something went wrong. Please try again."); }
    finally   { setLoading(false); }
  };

  const now = new Date();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      {/* ══ Full-page wrapper ══ */}
      <Box sx={{
        minHeight: "100vh", display: "flex",
        bgcolor: C.surfaceAlt, fontFamily: FF,
        animation: "pageIn 0.38s ease both",
        "@keyframes pageIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }}>

        {/* ═══ LEFT PANEL — hero (hidden on mobile) ═══ */}
        <Box sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column", justifyContent: "space-between",
          width: "44%", flexShrink: 0,
          position: "relative", overflow: "hidden",
          background: `linear-gradient(145deg, ${C.primary} 0%, ${C.primaryDark} 48%, ${C.primaryDeep} 100%)`,
          p: 6,
        }}>
          {/* Orbs */}
          <Orb size={360} top={-100} left={-100} delay={0}    opacity={0.09} />
          <Orb size={200} bottom={70} right={-60} delay={900}  opacity={0.12} />
          <Orb size={110} top={210}  right={50}  delay={450}  opacity={0.08} />
          <Orb size={80}  bottom={220} left={50} delay={1300} opacity={0.11} />

          {/* Decorative rings */}
          {[{ s:520, t:-170, r:-170 }, { s:270, b:-90, r:90 }, { s:150, t:90, r:120 }].map((b, i) => (
            <Box key={i} sx={{
              position: "absolute", width: b.s, height: b.s, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.13)",
              top: b.t, right: b.r, bottom: b.b, pointerEvents: "none",
            }} />
          ))}

          {/* Logo */}
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

          {/* Headline */}
          <Box sx={{ position: "relative", marginTop: "-200px", zIndex: 1 }}>
            <Typography fontFamily={FF} fontWeight={900}
              fontSize={{ lg: "2.3rem", xl: "2.7rem" }} color="#fff" lineHeight={1.18} mb={2}
              sx={{
                animation: "headIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both",
                "@keyframes headIn": { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
              }}
            >
              Start your health<br />
              <Box component="span" sx={{
                background: `linear-gradient(90deg, ${C.accent}, #7de8d8)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                JOURNEY TODAY.
              </Box>
            </Typography>
            <Typography fontFamily={FF} fontSize="0.9rem" color="rgba(255,255,255,0.70)"
              lineHeight={1.7} maxWidth={360} mb={4}
              sx={{ animation: "headIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.32s both" }}
            >
              Create your account to book appointments, manage prescriptions, and connect with doctors — all in one place.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              <FeaturePill icon={<CalendarMonthIcon />} label="Book Appointments"  delay={420} />
              <FeaturePill icon={<PeopleAltIcon />}     label="Manage Patients"    delay={500} />
              <FeaturePill icon={<ShieldIcon />}        label="Secure & Private"   delay={580} />
            </Box>
          </Box>

          {/* Stats strip */}
          <Box sx={{
            position: "relative", zIndex: 1, display: "flex", gap: 3,
            animation: "headIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}>
            {[{ n: "500+", l: "Appointments" }, { n: "200+", l: "Patients" }, { n: "50+", l: "Doctors" }].map(({ n, l }) => (
              <Box key={l}>
                <Typography fontFamily={FF} fontWeight={900} fontSize="1.5rem" color="#fff" lineHeight={1}>{n}</Typography>
                <Typography fontFamily={FF} fontSize="0.72rem" color="rgba(255,255,255,0.58)" mt={0.3}>{l}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ═══ RIGHT PANEL — form ═══ */}
        <Box sx={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 5 },
          position: "relative", overflowY: "auto", overflowX: 'hidden'
        }}>
          {/* Subtle bg rings */}
          <Box sx={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", border: `1.5px solid ${C.primaryBdr}`, top: -110, right: -110, opacity: 0.45, pointerEvents: "none" }} />
          <Box sx={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: `1.5px solid ${C.accentBdr}`, bottom: 50, left: -70, opacity: 0.45, pointerEvents: "none" }} />

          {/* Card */}
          <Box sx={{
            width: "100%", maxWidth: { xs: 460, sm: 600, md: 900 }, position: "relative", zIndex: 1,
            animation: "cardIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.15s both",
            "@keyframes cardIn": {
              from: { opacity: 0, transform: "translateY(24px)" },
              to:   { opacity: 1, transform: "translateY(0)" },
            },
          }}>

            {/* Mobile logo */}
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

            {/* White card */}
            <Box sx={{
              bgcolor: C.surface, borderRadius: "28px",
              border: `1px solid ${C.border}`,
              boxShadow: "0 20px 60px rgba(6,143,210,0.10), 0 4px 20px rgba(6,143,210,0.06)",
              overflow: "hidden",
            }}>

              {/* Gradient top bar */}
              <Box sx={{ height: 4, background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark}, ${C.accent})` }} />

              <Box sx={{ px: { xs: 3, sm: 5 }, pt: 4.5, pb: 5 }}>

                {/* Header */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                  <Box sx={{
                    width: 60, height: 60, borderRadius: "18px", mb: 2,
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                    boxShadow: `0 8px 24px ${C.primaryBdr}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "iconPop 0.55s cubic-bezier(0.34,1.5,0.64,1) 0.3s both",
                    "@keyframes iconPop": {
                      from: { opacity: 0, transform: "scale(0.55)" },
                      to:   { opacity: 1, transform: "scale(1)" },
                    },
                  }}>
                    <PersonAddIcon sx={{ color: "#fff", fontSize: 26 }} />
                  </Box>
                  <Typography fontFamily={FF} fontWeight={900} fontSize="1.5rem" color={C.text} lineHeight={1.2} textAlign="center">
                    Create Your Account
                  </Typography>
                  <Typography fontFamily={FF} fontSize="0.81rem" color={C.textLight} mt={0.7} textAlign="center">
                    Sign up to start booking appointments
                  </Typography>
                </Box>

                {/* Fields */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

                  {/* Full Name */}
                  <Field
                    label="Full Name" name="name" focused={focused}
                    onFocus={setFocused} onBlur={setFocused}
                    placeholder="Enter your full name"
                    startIcon={<PersonIcon />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  {/* Phone */}
                  <Field
                    label="Phone Number" name="phone" focused={focused}
                    onFocus={setFocused} onBlur={setFocused}
                    placeholder="03xxxxxxxxx" type="tel"
                    startIcon={<PhoneIcon />}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  />

                  {/* Password */}
                  <Box>
                    <Field
                      label="Password" name="password" focused={focused}
                      onFocus={setFocused} onBlur={setFocused}
                      placeholder="Min. 6 characters"
                      type={showPassword ? "text" : "password"}
                      startIcon={<LockIcon />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((p) => !p)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end" size="small"
                            sx={{
                              color: showPassword ? C.primary : C.textLight,
                              mr: 0.2, borderRadius: "8px",
                              "&:hover": { bgcolor: C.primaryBg, color: C.primary },
                              transition: "all 0.18s",
                            }}
                          >
                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {/* Strength bar */}
                    {password.length > 0 && (
                      <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ flex: 1, display: "flex", gap: 0.5 }}>
                          {[1, 2, 3].map((lvl) => (
                            <Box key={lvl} sx={{
                              flex: 1, height: 4, borderRadius: "3px",
                              bgcolor: pwStrength >= lvl ? strengthColor : C.border,
                              transition: "background 0.22s ease",
                            }} />
                          ))}
                        </Box>
                        <Typography fontFamily={FF} fontSize="0.7rem" fontWeight={800}
                          color={strengthColor} sx={{ minWidth: 40 }}>
                          {strengthLabel}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Confirm Password */}
                  <Field
                    label="Confirm Password" name="confirm" focused={focused}
                    onFocus={setFocused} onBlur={setFocused}
                    placeholder="Re-enter your password"
                    type={showConfirm ? "text" : "password"}
                    startIcon={<LockIcon />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm((p) => !p)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end" size="small"
                          sx={{
                            color: showConfirm ? C.primary : C.textLight,
                            mr: 0.2, borderRadius: "8px",
                            "&:hover": { bgcolor: C.primaryBg, color: C.primary },
                            transition: "all 0.18s",
                          }}
                        >
                          {showConfirm ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  {/* Password match indicator */}
                  {confirmPassword.length > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: -1.2 }}>
                      <CheckCircleIcon sx={{
                        fontSize: 14,
                        color: password === confirmPassword ? C.accent : "#ef4444",
                        transition: "color 0.2s",
                      }} />
                      <Typography fontFamily={FF} fontSize="0.72rem" fontWeight={700}
                        color={password === confirmPassword ? C.accent : "#ef4444"}>
                        {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                      </Typography>
                    </Box>
                  )}

                  {/* Terms checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        size="small"
                        sx={{
                          color: C.border,
                          "&.Mui-checked": { color: C.primary },
                          "&:hover": { bgcolor: C.primaryBg },
                          borderRadius: "6px",
                          p: 0.8,
                        }}
                      />
                    }
                    label={
                      <Typography marginTop="7px" fontFamily={FF} fontSize="0.82rem" color={C.textMid}>
                        I agree to the{" "}
                        <MuiLink href="/terms&conditions" underline="none" sx={{
                          fontFamily: FF, fontWeight: 800, color: C.primary,
                          "&:hover": { color: C.primaryDark, textDecoration: "underline" },
                        }}>
                          Terms & Conditions
                        </MuiLink>
                        {" "}and{" "}
                        <MuiLink href="/privacypolicy" underline="none" sx={{
                          fontFamily: FF, fontWeight: 800, color: C.primary,
                          "&:hover": { color: C.primaryDark, textDecoration: "underline" },
                        }}>
                          Privacy Policy
                        </MuiLink>
                      </Typography>
                    }
                    sx={{ alignItems: "flex-start", mt: -0.5 }}
                  />
                </Box>

                {/* Sign Up button */}
                <Button
                  fullWidth variant="contained"
                  disabled={!checked || loading}
                  onClick={userSignUp}
                  sx={{
                    mt: 3.5, fontFamily: FF, fontWeight: 800, fontSize: "0.95rem",
                    textTransform: "none", borderRadius: "14px", py: 1.55,
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                    boxShadow: "0 6px 22px rgba(6,143,210,0.28)",
                    transition: "all 0.22s ease",
                    "&:hover:not(.Mui-disabled)": {
                      background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primaryDeep})`,
                      boxShadow: "0 10px 30px rgba(6,143,210,0.40)",
                      transform: "translateY(-1px)",
                    },
                    "&:active": { transform: "scale(0.97)" },
                    "&.Mui-disabled": {
                      background: `linear-gradient(135deg, rgba(6,143,210,0.28), rgba(5,112,166,0.28))`,
                      boxShadow: "none", color: "rgba(255,255,255,0.48)",
                    },
                  }}
                >
                  {loading
                    ? <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <CircularProgress size={18} sx={{ color: "#fff" }} />
                        <Typography fontFamily={FF} fontWeight={800} fontSize="0.95rem" color="#fff">Creating Account…</Typography>
                      </Box>
                    : <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PersonAddIcon sx={{ fontSize: 18 }} />
                        Create Account
                      </Box>
                  }
                </Button>

                {/* Divider */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 3 }}>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: C.border }} />
                  <Typography fontFamily={FF} fontSize="0.72rem" color={C.textLight} fontWeight={700} textTransform="uppercase" letterSpacing="0.08em">or</Typography>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: C.border }} />
                </Box>

                {/* Sign in link */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography fontFamily={FF} fontSize="0.85rem" color={C.textMid}>
                    Already have an account?{" "}
                    <MuiLink href="/login" underline="none" sx={{
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
                      Sign In
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Help note */}
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
                  Safe & Secure
                </Typography>
                <Typography fontFamily={FF} fontSize="0.74rem" color={C.textMid} lineHeight={1.65}>
                  Your data is encrypted and protected. We never share your personal information.
                </Typography>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;