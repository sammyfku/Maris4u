export default function Logo({ className = "h-10" }) {
  return (
    <svg 
      viewBox="0 0 200 60" 
      className={`${className} w-auto`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hanger Hook */}
      <path d="M45 15 C45 10, 48 7, 52 7 C56 7, 59 10, 59 15" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      
      {/* Hanger Body */}
      <path d="M30 25 L52 15 L74 25" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Hanger Bar */}
      <path d="M35 25 L69 25" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Clothing/Collar */}
      <path d="M42 25 L47 32 L57 32 L62 25" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Clothing Body */}
      <path d="M40 32 L38 52 L66 52 L64 32" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      
      {/* Brand Text */}
      <text x="85" y="38" fontFamily="'Poppins', sans-serif" fontSize="24" fontWeight="700" fill="#ffffff">
        Maris<tspan fill="#00d4ff">4u</tspan>
      </text>
    </svg>
  );
}
