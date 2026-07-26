const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    * { -webkit-tap-highlight-color: transparent; }
    body { font-family: 'Space Grotesk', sans-serif; background: #F5F0E8; }
    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #C4B99A; border-radius: 6px; }
    ::-webkit-scrollbar-thumb:hover { background: #A89880; }
    input, textarea, select, button { font-family: 'Space Grotesk', sans-serif; }
    input:focus, textarea:focus { outline: none !important; border-color: #0A5C44 !important; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
    @keyframes slideIn  { from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);} }
    @keyframes pulse    { 0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.1);opacity:.6;} }
    @keyframes xpPop    { 0%{opacity:0;transform:translate(-50%,-50%)scale(.7);}35%{opacity:1;transform:translate(-50%,-60%)scale(1.1);}100%{opacity:0;transform:translate(-50%,-80%)scale(1);} }
    @keyframes xpt      { 0%{opacity:0;transform:translate(-50%,-50%)scale(.7);}35%{opacity:1;transform:translate(-50%,-60%)scale(1.1);}100%{opacity:0;transform:translate(-50%,-80%)scale(1);} }
    @keyframes raiseAnim{ 0%,100%{transform:rotate(0);}25%{transform:rotate(-18deg);}75%{transform:rotate(18deg);} }
    @keyframes glow     { 0%,100%{box-shadow:0 0 8px rgba(74,222,128,.25);}50%{box-shadow:0 0 22px rgba(74,222,128,.55);} }
    @keyframes modeSlide{ from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
    @keyframes shimmer  { 0%{background-position:-200% 0;}100%{background-position:200% 0;} }
    @keyframes floatUp  { from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);} }
    @keyframes pulseShadow { 0%,100%{box-shadow:0 0 0 0 rgba(201,59,59,0.45);}50%{box-shadow:0 0 0 10px rgba(201,59,59,0);} }
    @keyframes shimmerBorder { 0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;} }

    .fu  { animation: fadeUp   .32s ease forwards; }
    .si  { animation: slideIn  .26s ease forwards; }
    .rh  { animation: raiseAnim .55s ease; }
    .ms  { animation: modeSlide .3s ease forwards; }
    .glow{ animation: glow 2.5s ease infinite; }
    .float-up { animation: floatUp .38s cubic-bezier(.22,.68,0,1.2) forwards; }
    .pulse-shadow { animation: pulseShadow 1.8s ease infinite; }

    .pill {
      display: inline-flex; align-items: center;
      padding: 3px 8px; border-radius: 20px;
      font-size: 10px; font-weight: 700;
      letter-spacing: .04em; white-space: nowrap;
    }

    .card-hover {
      transition: background .18s ease, box-shadow .18s ease, transform .15s ease;
    }
    .card-hover:hover {
      background: #F0EBE0 !important;
      box-shadow: 0 4px 20px rgba(10,30,20,0.13) !important;
      transform: translateY(-1px);
    }

    .shimmer-bg {
      background: linear-gradient(90deg, #EDE8DF 25%, #F5F0E8 50%, #EDE8DF 75%);
      background-size: 200% 100%;
      animation: shimmer 1.6s infinite;
    }
  `}</style>
);
export default GlobalStyles;