import style from "./style.module.css";

const PixelRobot = () => {
  return (
    <div className={style.wrapper}>
      <svg
        viewBox="0 0 100 168"
        xmlns="http://www.w3.org/2000/svg"
        className={style.robot}
        aria-label="Pixel art robot"
        role="img"
      >
        <defs>
          {/* Eye glow filter */}
          <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Body shadow */}
          <filter id="bodyShadow" x="-10%" y="-5%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.35)" />
          </filter>
          {/* Soft glow for chest screen */}
          <filter id="screenGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── ANTENNA ─────────────────────────────────── */}
        <g className={style.antenna} style={{ transformOrigin: "50px 19px" }}>
          {/* stick */}
          <rect x="47" y="8" width="6" height="13" fill="#8fafc8" rx="1" />
          {/* ball */}
          <rect x="40" y="0" width="20" height="12" fill="#b8d0e8" rx="3" />
          {/* ball highlight pixel */}
          <rect x="42" y="2" width="6" height="3" fill="rgba(255,255,255,0.45)" rx="1" />
          {/* LED on ball */}
          <rect x="46" y="4" width="8" height="5" fill="#facf0f" rx="1" className={style.antennaLed} />
        </g>

        {/* ── HEAD ────────────────────────────────────── */}
        <g className={style.head} style={{ transformOrigin: "50px 43px" }}>
          {/* Ear left */}
          <rect x="8" y="26" width="11" height="16" fill="#8fafc8" rx="2" />
          <rect x="10" y="30" width="5" height="8" fill="#4a7fa5" rx="1" />
          {/* Ear right */}
          <rect x="81" y="26" width="11" height="16" fill="#8fafc8" rx="2" />
          <rect x="85" y="30" width="5" height="8" fill="#4a7fa5" rx="1" />
          {/* Head body */}
          <rect x="17" y="19" width="66" height="50" fill="#b8d0e8" rx="4" filter="url(#bodyShadow)" />
          {/* Head top highlight */}
          <rect x="21" y="21" width="58" height="5" fill="rgba(255,255,255,0.25)" rx="2" />
          {/* Visor background */}
          <rect x="23" y="28" width="54" height="24" fill="#0d1b2a" rx="3" />

          {/* Left eye */}
          <g className={style.eyeLeft} style={{ transformOrigin: "35px 40px" }}>
            <rect x="26" y="31" width="18" height="14" fill="#facf0f" rx="2" filter="url(#eyeGlow)" />
            {/* pupil */}
            <rect x="31" y="35" width="8" height="6" fill="#0d1b2a" rx="1" />
            {/* eye shine */}
            <rect x="33" y="33" width="3" height="3" fill="rgba(255,255,255,0.7)" rx="0" />
          </g>

          {/* Right eye */}
          <g className={style.eyeRight} style={{ transformOrigin: "65px 40px" }}>
            <rect x="56" y="31" width="18" height="14" fill="#facf0f" rx="2" filter="url(#eyeGlow)" />
            {/* pupil */}
            <rect x="61" y="35" width="8" height="6" fill="#0d1b2a" rx="1" />
            {/* eye shine */}
            <rect x="63" y="33" width="3" height="3" fill="rgba(255,255,255,0.7)" rx="0" />
          </g>

          {/* Mouth — pixel smile */}
          <rect x="32" y="56" width="5" height="4" fill="#4a7fa5" rx="1" />
          <rect x="38" y="58" width="5" height="4" fill="#4a7fa5" rx="1" />
          <rect x="44" y="58" width="5" height="4" fill="#4a7fa5" rx="1" />
          <rect x="50" y="58" width="5" height="4" fill="#4a7fa5" rx="1" />
          <rect x="56" y="56" width="5" height="4" fill="#4a7fa5" rx="1" />

          {/* Head bolts */}
          <rect x="20" y="21" width="5" height="5" fill="#8fafc8" rx="1" />
          <rect x="75" y="21" width="5" height="5" fill="#8fafc8" rx="1" />
          <rect x="20" y="60" width="5" height="5" fill="#8fafc8" rx="1" />
          <rect x="75" y="60" width="5" height="5" fill="#8fafc8" rx="1" />
        </g>

        {/* ── NECK ────────────────────────────────────── */}
        <rect x="39" y="69" width="22" height="9" fill="#8fafc8" rx="2" />
        <rect x="43" y="70" width="14" height="3" fill="#6a96b8" rx="1" />

        {/* ── BODY ────────────────────────────────────── */}
        <g className={style.body} style={{ transformOrigin: "50px 105px" }}>
          {/* Main body */}
          <rect x="12" y="78" width="76" height="52" fill="#b8d0e8" rx="5" filter="url(#bodyShadow)" />
          {/* Body highlight strip */}
          <rect x="16" y="80" width="68" height="5" fill="rgba(255,255,255,0.22)" rx="3" />
          {/* Body bolts */}
          <rect x="14" y="79" width="6" height="6" fill="#8fafc8" rx="1" />
          <rect x="80" y="79" width="6" height="6" fill="#8fafc8" rx="1" />
          <rect x="14" y="120" width="6" height="6" fill="#8fafc8" rx="1" />
          <rect x="80" y="120" width="6" height="6" fill="#8fafc8" rx="1" />

          {/* Chest screen */}
          <rect x="24" y="86" width="52" height="32" fill="#0d1b2a" rx="3" />
          {/* Screen scan line */}
          <rect x="25" y="87" width="50" height="3" fill="rgba(255,255,255,0.06)" rx="1" />

          {/* Screen content — pixel bars */}
          <g className={style.screenBar1}>
            <rect x="28" y="93" width="20" height="4" fill="#facf0f" rx="1" opacity="0.9" filter="url(#screenGlow)" />
          </g>
          <g className={style.screenBar2}>
            <rect x="28" y="101" width="32" height="4" fill="#facf0f" rx="1" opacity="0.7" filter="url(#screenGlow)" />
          </g>
          <g className={style.screenBar3}>
            <rect x="28" y="109" width="14" height="4" fill="#facf0f" rx="1" opacity="0.5" filter="url(#screenGlow)" />
          </g>

          {/* LED buttons row */}
          <rect x="28" y="122" width="8" height="5" fill="#4ade80" rx="1" className={style.ledGreen} />
          <rect x="40" y="122" width="8" height="5" fill="#facf0f" rx="1" className={style.ledYellow} />
          <rect x="52" y="122" width="8" height="5" fill="#f87171" rx="1" className={style.ledRed} />
          <rect x="64" y="122" width="8" height="5" fill="#60a5fa" rx="1" className={style.ledBlue} />
        </g>

        {/* ── ARM LEFT ────────────────────────────────── */}
        <g className={style.armLeft} style={{ transformOrigin: "8px 80px" }}>
          <rect x="2" y="79" width="11" height="36" fill="#b8d0e8" rx="3" />
          {/* shoulder */}
          <rect x="2" y="79" width="11" height="9" fill="#8fafc8" rx="3" />
          {/* hand */}
          <rect x="1" y="113" width="13" height="10" fill="#8fafc8" rx="3" />
          <rect x="3" y="116" width="4" height="5" fill="#6a96b8" rx="1" />
          <rect x="9" y="116" width="4" height="5" fill="#6a96b8" rx="1" />
        </g>

        {/* ── ARM RIGHT ───────────────────────────────── */}
        <g className={style.armRight} style={{ transformOrigin: "92px 80px" }}>
          <rect x="87" y="79" width="11" height="36" fill="#b8d0e8" rx="3" />
          {/* shoulder */}
          <rect x="87" y="79" width="11" height="9" fill="#8fafc8" rx="3" />
          {/* hand */}
          <rect x="86" y="113" width="13" height="10" fill="#8fafc8" rx="3" />
          <rect x="88" y="116" width="4" height="5" fill="#6a96b8" rx="1" />
          <rect x="94" y="116" width="4" height="5" fill="#6a96b8" rx="1" />
        </g>

        {/* ── LEGS ────────────────────────────────────── */}
        {/* Hip connector */}
        <rect x="28" y="130" width="44" height="8" fill="#8fafc8" rx="2" />

        {/* Leg left */}
        <g className={style.legLeft} style={{ transformOrigin: "37px 138px" }}>
          <rect x="27" y="137" width="20" height="22" fill="#b8d0e8" rx="3" />
          <rect x="27" y="137" width="20" height="7" fill="#8fafc8" rx="3" />
          {/* foot */}
          <rect x="24" y="157" width="26" height="10" fill="#8fafc8" rx="3" />
          <rect x="24" y="157" width="10" height="5" fill="#6a96b8" rx="2" />
        </g>

        {/* Leg right */}
        <g className={style.legRight} style={{ transformOrigin: "63px 138px" }}>
          <rect x="53" y="137" width="20" height="22" fill="#b8d0e8" rx="3" />
          <rect x="53" y="137" width="20" height="7" fill="#8fafc8" rx="3" />
          {/* foot */}
          <rect x="50" y="157" width="26" height="10" fill="#8fafc8" rx="3" />
          <rect x="66" y="157" width="10" height="5" fill="#6a96b8" rx="2" />
        </g>

        {/* ── SHADOW ──────────────────────────────────── */}
        <ellipse cx="50" cy="168" rx="32" ry="4" fill="rgba(0,0,0,0.18)" className={style.shadow} />
      </svg>
    </div>
  );
};

export { PixelRobot };
