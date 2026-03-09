"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import VerifiedUserIcon  from "@mui/icons-material/VerifiedUser";
import RefreshIcon       from "@mui/icons-material/Refresh";
import ArrowBackIcon     from "@mui/icons-material/ArrowBack";
import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
import PhoneIcon         from "@mui/icons-material/Phone";
import ShieldIcon        from "@mui/icons-material/Shield";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

/* ─── Design Tokens ──────────────────────────────────────────────── */
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
const FF      = "'Nunito', sans-serif";
const OTP_LEN = 4;

/* ─── Main Component ─────────────────────────────────────────────── */
const Otp = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [digits,        setDigits]        = useState(Array(OTP_LEN).fill(""));
  const [mobileNumber,  setMobileNumber]  = useState("");
  const [loading,       setLoading]       = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer,   setResendTimer]   = useState(0);
  const [shake,         setShake]         = useState(false);
  const [success,       setSuccess]       = useState(false);

  const inputRefs         = useRef([]);
  const router            = useRouter();
  const verificationCode  = digits.join("");
  const isFull            = verificationCode.length === OTP_LEN;

  /* SVG arc for resend timer */
  const arcR    = 11;
  const arcCirc = 2 * Math.PI * arcR;
  const timerPct = resendTimer / 60;

  /* ── sessionStorage ── */
  useEffect(() => {
    const raw = sessionStorage.getItem("MobileNum");
    if (raw) {
      const cleaned = raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
      setMobileNumber(cleaned);
    }
  }, []);

  console.log(mobileNumber);

  /* ── Countdown ── */
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = window.setInterval(() => setResendTimer((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  /* ── Auto-focus first box ── */
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  /* ── Keyboard handler ── */
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[idx]) {
        const next = [...digits]; next[idx] = ""; setDigits(next);
      } else if (idx > 0) {
        const next = [...digits]; next[idx - 1] = ""; setDigits(next);
        inputRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft"  && idx > 0)            inputRefs.current[idx - 1]?.focus();
    else if   (e.key === "ArrowRight" && idx < OTP_LEN - 1)  inputRefs.current[idx + 1]?.focus();
    else if   (e.key === "Enter" && isFull)                   userOtpVerification();
  };

  /* ── Change handler ── */
  const handleChange = (e, idx) => {
    const val  = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const char = val[val.length - 1];
    const next = [...digits]; next[idx] = char; setDigits(next);
    if (idx < OTP_LEN - 1) setTimeout(() => inputRefs.current[idx + 1]?.focus(), 0);
  };

  /* ── Paste handler ── */
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, OTP_LEN);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    setTimeout(() => inputRefs.current[Math.min(pasted.length, OTP_LEN - 1)]?.focus(), 0);
  };

  /* ── Trigger shake animation ── */
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  /* ── OTP Verification ── */
  const userOtpVerification = async () => {
    if (!isFull) {
      toast.error("Please enter the 4-digit verification code");
      triggerShake(); return;
    }
    setLoading(true);
    try {
      const res    = await fetch(`${API_URL}patient-auth/varify_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: mobileNumber, token: Number(verificationCode) }),
      });
      const result = await res.json();
      if (result?.isSuccess) {
        toast.success("Verification successfully!");
        setSuccess(true);
        setTimeout(() => { setDigits(Array(OTP_LEN).fill("")); router.push("/login"); }, 700);
      } else {
        toast.error(result?.message || "Verification Failed");
        triggerShake();
      }
    } catch { toast.error("Something went wrong. Please try again."); }
    finally   { setLoading(false); }
  };

  /* ── Resend OTP ── */
  const handleResendCode = async () => {
    if (!mobileNumber) return;
    setResendLoading(true);
    try {
      const res    = await fetch(`${API_URL}patient-auth/resend_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo: mobileNumber }),
      });
      const result = await res.json();
      if (result?.isSuccess) {
        toast.success("Verification code resent successfully!");
        setResendTimer(60);
        setDigits(Array(OTP_LEN).fill(""));
        setTimeout(() => inputRefs.current[0]?.focus(), 0);
      } else toast.error(result?.message || "Failed to resend code");
    } catch { toast.error("Failed to resend code. Please try again."); }
    finally   { setResendLoading(false); }
  };

  const handleGoBack = () => router.push("/signup");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes pageIn    { from{opacity:0}                                  to{opacity:1} }
        @keyframes cardUp    { from{opacity:0;transform:translateY(28px)}       to{opacity:1;transform:translateY(0)} }
        @keyframes pillDrop  { from{opacity:0;transform:translateY(-8px)}       to{opacity:1;transform:translateY(0)} }
        @keyframes iconPop   { from{opacity:0;transform:scale(0.5)}             to{opacity:1;transform:scale(1)} }
        @keyframes boxIn     { from{opacity:0;transform:translateY(14px) scale(0.85)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shake     { 0%,100%{transform:translateX(0)} 18%{transform:translateX(-6px)} 36%{transform:translateX(6px)} 54%{transform:translateX(-5px)} 72%{transform:translateX(5px)} }
        @keyframes successPop{ 0%{transform:scale(1)} 45%{transform:scale(1.14)} 100%{transform:scale(1)} }
        @keyframes orbFloat  { from{transform:translateY(0) scale(1)}           to{transform:translateY(-18px) scale(1.05)} }
        @keyframes pulseRing { 0%,100%{opacity:0.06} 50%{opacity:0.13} }

        .otp-single-input {
          width: 100%; height: 100%;
          background: transparent; border: none; outline: none;
          text-align: center; caret-color: transparent;
          font-family: 'Nunito', sans-serif; font-weight: 900;
          font-size: clamp(1.55rem, 5vw, 2.6rem);
          color: #068fd2; -webkit-text-fill-color: #068fd2;
          cursor: pointer;
        }
        .otp-single-input.success { color:#00c6a7; -webkit-text-fill-color:#00c6a7; }
        .otp-single-input::selection { background: transparent; }
      `}</style>

      {/* ══ Page ══ */}
      <Box sx={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        bgcolor: C.surfaceAlt, fontFamily: FF,
        px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 6 },
        animation: "pageIn 0.38s ease both",
      }}>

        {/* Mesh background */}
        <Box sx={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `
            radial-gradient(ellipse 700px 550px at 5%  15%,  rgba(6,143,210,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 500px 400px at 95% 85%,  rgba(0,198,167,0.06) 0%, transparent 70%)
          `,
        }} />

        {/* Decorative rings */}
        {[
          { s: 500, top: -150, right: -150 },
          { s: 300, bottom: -90, left: -90 },
          { s: 160, top: 80,   right: 60   },
        ].map((b, i) => (
          <Box key={i} sx={{
            position: "fixed", width: b.s, height: b.s, borderRadius: "50%",
            border: `1.5px solid ${C.primaryBdr}`, opacity: 0.38,
            top: b.top, right: b.right, bottom: b.bottom, left: b.left,
            pointerEvents: "none", zIndex: 0,
            animation: `pulseRing 4s ease-in-out ${i * 1.4}s infinite`,
          }} />
        ))}

        {/* ══ Card ══ */}
        <Box sx={{
          width: "100%", maxWidth: { xs: 460, sm: 600, md: 900 }, position: "relative", zIndex: 1,
          animation: "cardUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.08s both",
        }}>

          {/* Logo pill */}
          {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box sx={{
              display: "inline-flex", alignItems: "center", gap: 1.2,
              px: 2, py: 1.1, borderRadius: "14px",
              bgcolor: C.primaryBg, border: `1.5px solid ${C.primaryBdr}`,
              animation: "pillDrop 0.48s cubic-bezier(0.22,1,0.36,1) 0.05s both",
            }}>
              <Box sx={{
                width: 30, height: 30, borderRadius: "8px",
                background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <LocalHospitalIcon sx={{ fontSize: 16, color: "#fff" }} />
              </Box>
              <Typography fontFamily={FF} fontWeight={900} fontSize="0.9rem" color={C.text}>
                HIMS Portal
              </Typography>
            </Box>
          </Box> */}

          {/* White card */}
          <Box sx={{
            bgcolor: C.surface, borderRadius: "28px",
            border: `1px solid ${C.border}`,
            boxShadow: "0 24px 64px rgba(6,143,210,0.11), 0 4px 20px rgba(6,143,210,0.06)",
            overflow: "hidden",
          }}>

            {/* Gradient top bar */}
            <Box sx={{ height: 4, width: '100%', background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark}, ${C.accent})` }} />

            {/* ── Hero header ── */}
            <Box sx={{
              background: `linear-gradient(145deg, ${C.primary} 0%, ${C.primaryDark} 50%, ${C.primaryDeep} 100%)`,
              px: { xs: 3, sm: 6, md: 8 }, pt: 4, pb: 4.5,
              position: "relative", overflow: "hidden",
            }}>
              {/* Orbs */}
              {[{ s:200, t:-60, r:-50, d:0 }, { s:100, b:-28, l:20, d:700 }, { s:70, t:20, r:100, d:350 }].map((o, i) => (
                <Box key={i} sx={{
                  position: "absolute", width: o.s, height: o.s, borderRadius: "50%",
                  top: o.t, right: o.r, bottom: o.b, left: o.l,
                  background: "radial-gradient(circle, rgba(255,255,255,0.30) 0%, transparent 70%)",
                  opacity: 0.10, pointerEvents: "none",
                  animation: `orbFloat 6s ease-in-out ${o.d}ms infinite alternate`,
                }} />
              ))}
              {[{ s:280, t:-90, r:-90 }, { s:140, b:-40, r:60 }].map((b, i) => (
                <Box key={i} sx={{
                  position: "absolute", width: b.s, height: b.s, borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.10)",
                  top: b.t, right: b.r, bottom: b.b, pointerEvents: "none",
                }} />
              ))}

              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                {/* Icon */}
                <Box sx={{
                  width: 66, height: 66, borderRadius: "20px", mx: "auto", mb: 2.2,
                  bgcolor: "rgba(255,255,255,0.13)", border: "1.5px solid rgba(255,255,255,0.26)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "iconPop 0.52s cubic-bezier(0.34,1.6,0.64,1) 0.22s both",
                }}>
                  <VerifiedUserIcon sx={{ fontSize: 30, color: "#fff" }} />
                </Box>

                <Typography fontFamily={FF} fontWeight={900}
                  fontSize={{ xs: "1.3rem", sm: "1.55rem" }} color="#fff" lineHeight={1.2} mb={1}>
                  Verify Your Number
                </Typography>
                <Typography fontFamily={FF} fontSize="0.82rem" color="rgba(255,255,255,0.70)" mb={1.2}>
                  Enter the 4-digit code sent to
                </Typography>
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 0.8,
                  px: 1.8, py: 0.75, borderRadius: "10px",
                  bgcolor: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)",
                }}>
                  <PhoneIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }} />
                  <Typography fontFamily={FF} fontSize="0.83rem" fontWeight={800} color="rgba(255,255,255,0.93)">
                    {mobileNumber || "03xxxxxxxxx"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ── Form body ── */}
            <Box sx={{ px: { xs: 3, sm: 6, md: 8 }, pt: 4.5, pb: 5 }}>

              <Typography fontFamily={FF} fontSize="0.77rem" fontWeight={800} color={C.textMid}
                textTransform="uppercase" letterSpacing="0.08em" textAlign="center" mb={2.8}>
                Enter Verification Code
              </Typography>

              {/* ══ 4 OTP input boxes ══ */}
              <Box
                onPaste={handlePaste}
                sx={{
                  display: "flex", justifyContent: "center",
                  gap: { xs: 1.5, sm: 2.5, md: 3 }, mb: 1.5,
                  animation: shake ? "shake 0.52s ease both" : "none",
                }}
              >
                {digits.map((digit, idx) => (
                  <Box
                    key={idx}
                    onClick={() => inputRefs.current[idx]?.focus()}
                    sx={{
                      width:  { xs: 64, sm: 90, md: 104 },
                      height: { xs: 74, sm: 104, md: 120 },
                      borderRadius: { xs: "18px", sm: "22px" },
                      position: "relative",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `2.5px solid ${success ? C.accent : digit ? C.primary : C.border}`,
                      bgcolor: success ? C.accentBg : digit ? C.primaryBg : C.surfaceAlt,
                      boxShadow: digit
                        ? success
                          ? `0 0 0 4px rgba(0,198,167,0.14)`
                          : `0 0 0 4px rgba(6,143,210,0.11), 0 4px 16px rgba(6,143,210,0.14)`
                        : "none",
                      cursor: "text",
                      transition: "all 0.18s cubic-bezier(0.34,1.2,0.64,1)",
                      transform: digit ? "scale(1.05)" : "scale(1)",
                      animation: `boxIn 0.42s cubic-bezier(0.22,1,0.36,1) ${idx * 65}ms both${success ? ", successPop 0.48s ease both" : ""}`,
                      "&:focus-within": {
                        border: `2.5px solid ${C.primary}`,
                        bgcolor: C.primaryBg,
                        boxShadow: `0 0 0 5px rgba(6,143,210,0.14), 0 4px 18px rgba(6,143,210,0.18)`,
                        transform: "scale(1.07)",
                      },
                      "&:hover:not(:focus-within)": {
                        borderColor: C.primaryBdr,
                        bgcolor: "rgba(6,143,210,0.04)",
                      },
                    }}
                  >
                    {/* Cursor blink line when empty + focused */}
                    <Box sx={{
                      position: "absolute", bottom: 14, left: "50%",
                      transform: "translateX(-50%)",
                      width: "28%", height: "2.5px", borderRadius: "2px",
                      bgcolor: C.primaryBdr,
                      display: digit ? "none" : "block",
                    }} />

                    <input
                      ref={(el) => (inputRefs.current[idx] = el)}
                      className={`otp-single-input${success ? " success" : ""}`}
                      type="tel"
                      inputMode="numeric"
                      maxLength={2}
                      value={digit}
                      onChange={(e) => handleChange(e, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      onPaste={handlePaste}
                      autoComplete={idx === 0 ? "one-time-code" : "off"}
                    />
                  </Box>
                ))}
              </Box>

              {/* ── Progress pills ── */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 4 }}>
                {digits.map((d, i) => (
                  <Box key={i} sx={{
                    height: 6, borderRadius: "3px",
                    width: d ? 24 : 8,
                    bgcolor: d ? (success ? C.accent : C.primary) : C.border,
                    transition: "all 0.22s cubic-bezier(0.34,1.2,0.64,1)",
                    boxShadow: d ? `0 2px 8px ${success ? "rgba(0,198,167,0.35)" : "rgba(6,143,210,0.30)"}` : "none",
                  }} />
                ))}
              </Box>

              {/* ── Verify button ── */}
              <Button fullWidth variant="contained"
                disabled={!isFull || loading}
                onClick={userOtpVerification}
                sx={{
                  fontFamily: FF, fontWeight: 800, fontSize: "0.95rem",
                  textTransform: "none", borderRadius: "14px", py: 1.55, mb: 1.5,
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
                  ? <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
                      <CircularProgress size={18} sx={{ color:"#fff" }} />
                      <Typography fontFamily={FF} fontWeight={800} fontSize="0.95rem" color="#fff">Verifying…</Typography>
                    </Box>
                  : <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
                      <CheckCircleIcon sx={{ fontSize:18 }} />
                      Verify Code
                    </Box>
                }
              </Button>

              {/* ── Resend button ── */}
              <Button fullWidth variant="outlined"
                disabled={resendTimer > 0 || resendLoading}
                onClick={handleResendCode}
                sx={{
                  fontFamily: FF, fontWeight: 700, fontSize: "0.9rem",
                  textTransform: "none", borderRadius: "14px", py: 1.4, mb: 1.2,
                  color: resendTimer > 0 ? C.textLight : C.accent,
                  borderColor: resendTimer > 0 ? C.border : C.accentBdr,
                  borderWidth: "1.5px",
                  bgcolor: resendTimer > 0 ? "transparent" : C.accentBg,
                  transition: "all 0.22s ease",
                  "&:hover:not(.Mui-disabled)": {
                    bgcolor: "rgba(0,198,167,0.13)", borderColor: C.accent, color: C.accentDark,
                    transform: "translateY(-1px)",
                  },
                  "&:active": { transform: "scale(0.97)" },
                  "&.Mui-disabled": { borderColor: C.border, color: C.textLight, bgcolor: "transparent" },
                }}
              >
                {resendLoading
                  ? <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
                      <CircularProgress size={17} sx={{ color: C.accent }} />
                      <Typography fontFamily={FF} fontWeight={700} fontSize="0.9rem" color={C.accent}>Sending…</Typography>
                    </Box>
                  : resendTimer > 0
                  ? <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
                      {/* SVG arc timer */}
                      <Box component="svg" width={28} height={28} viewBox="0 0 28 28" sx={{ flexShrink: 0 }}>
                        <circle cx="14" cy="14" r={arcR} fill="none" stroke={C.border} strokeWidth="2.2" />
                        <circle cx="14" cy="14" r={arcR} fill="none" stroke={C.primary} strokeWidth="2.2"
                          strokeDasharray={arcCirc} strokeDashoffset={arcCirc * (1 - timerPct)}
                          strokeLinecap="round" transform="rotate(-90 14 14)"
                          style={{ transition: "stroke-dashoffset 1s linear" }} />
                        <text x="14" y="18.5" textAnchor="middle"
                          style={{ fontSize:"7.5px", fontFamily:FF, fontWeight:900, fill:C.primary }}>
                          {resendTimer}
                        </text>
                      </Box>
                      Resend in {resendTimer}s
                    </Box>
                  : <Box sx={{ display:"flex", alignItems:"center", gap:0.9 }}>
                      <RefreshIcon sx={{ fontSize:17 }} />
                      Resend Code
                    </Box>
                }
              </Button>

              {/* ── Go back ── */}
              <Button fullWidth variant="text"
                onClick={handleGoBack}
                sx={{
                  fontFamily: FF, fontWeight: 700, fontSize: "0.87rem",
                  textTransform: "none", borderRadius: "14px", py: 1.2,
                  color: C.textMid,
                  "&:hover": { bgcolor: C.surfaceAlt, color: C.text },
                  "&:active": { transform: "scale(0.97)" },
                }}
              >
                <Box sx={{ display:"flex", alignItems:"center", gap:0.8 }}>
                  <ArrowBackIcon sx={{ fontSize:16 }} />
                  Go Back to Sign Up
                </Box>
              </Button>
            </Box>
          </Box>

          {/* ── Help note ── */}
          <Box sx={{
            mt: 2.5, px: 2.5, py: 1.8, borderRadius: "16px",
            bgcolor: C.accentBg, border: `1px solid ${C.accentBdr}`,
            display: "flex", alignItems: "flex-start", gap: 1.4,
            animation: "cardUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.38s both",
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
                Didn't receive the code?
              </Typography>
              <Typography fontFamily={FF} fontSize="0.74rem" color={C.textMid} lineHeight={1.65}>
                Check your SMS inbox or wait 60 seconds before requesting a new code.
              </Typography>
            </Box>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default Otp;