export default function ProgressBar({ pct, color='#0A5C44', height=6, dark=false }) {
  return (
    <div style={{ background: dark?'#1F2820':'#E8E2D8', borderRadius:height, height, overflow:'hidden', width:'100%' }}>
      <div style={{ height:'100%', borderRadius:height, background:`linear-gradient(90deg,${color},${color}BB)`, width:`${Math.min(pct,100)}%`, transition:'width 1s ease' }} />
    </div>
  );
}