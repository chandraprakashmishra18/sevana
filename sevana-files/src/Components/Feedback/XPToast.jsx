export default function XPToast({ visible, amount }) {
  if (!visible) return null;
  return (
    <div className="xpt" style={{
      position:'fixed', top:'45%', left:'50%', zIndex:9999, pointerEvents:'none',
      background:'#C49B2A', color:'#fff', fontFamily:"'Outfit',sans-serif",
      fontWeight:800, fontSize:20, padding:'10px 26px', borderRadius:36,
      boxShadow:'0 6px 24px rgba(196,155,42,.6)', whiteSpace:'nowrap',
      animation:'xpPop 1.6s ease forwards',
    }}>+{amount} XP ✨</div>
  );
}