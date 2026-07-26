export default function Card({ children, style={}, onClick, dark=false }) {
  const bg   = dark ? '#131A15' : '#FFFDF9';
  const brd  = dark ? '#1E3024' : '#EDE8DF';
  const hBg  = dark ? '#192019' : '#F0EBE0';
  const hBrd = dark ? '#2A4A32' : '#DED8CC';
  return (
    <div onClick={onClick} style={{
      background:bg, borderRadius:14, border:`1px solid ${brd}`,
      padding:14, boxShadow:'0 1px 6px rgba(10,30,20,0.05)',
      cursor:onClick?'pointer':'default', transition:'all .15s', ...style,
    }}
      onMouseEnter={e=>{ if(onClick){ e.currentTarget.style.background=hBg; e.currentTarget.style.borderColor=hBrd; }}}
      onMouseLeave={e=>{ if(onClick){ e.currentTarget.style.background=bg;  e.currentTarget.style.borderColor=brd;  }}}
    >{children}</div>
  );
}