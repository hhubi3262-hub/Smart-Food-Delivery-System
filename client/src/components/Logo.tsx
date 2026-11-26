interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  imageOnly?: boolean;
}

const Logo = ({ size = 'md', showText = true, className = '', imageOnly = false }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    '2xl': 'w-36 h-36'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl'
  };

  const subTextSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
    '2xl': 'text-lg'
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Real Logo Image */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <img
          src="/logo.jpg"
          alt="AFAMIA Cafe & Restaurant Logo"
          className="w-full h-full object-cover rounded-lg shadow-xl ring-4 ring-gold-400/50 hover:ring-gold-500 transition-all duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback to SVG if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        
        {/* Fallback SVG Logo (hidden by default) */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full hidden"
        >
          {/* Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary-600"
            fill="white"
          />
          
          {/* Coffee Cup */}
          <path
            d="M30 40 C30 38 32 36 34 36 L66 36 C68 36 70 38 70 40 L66 60 C66 64 62 68 58 68 L42 68 C38 68 34 64 34 60 Z"
            fill="currentColor"
            className="text-primary-700"
          />
          
          {/* Cup Handle */}
          <path
            d="M70 42 C75 42 78 45 78 50 C78 55 75 58 70 58"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-primary-700"
            strokeLinecap="round"
          />
          
          {/* Steam Lines */}
          <path
            d="M40 28 Q42 24 40 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary-500"
            strokeLinecap="round"
          />
          <path
            d="M50 30 Q52 26 50 22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary-500"
            strokeLinecap="round"
          />
          <path
            d="M60 28 Q62 24 60 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary-500"
            strokeLinecap="round"
          />
          
          {/* Inner Circle Detail */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gold-400 opacity-30"
            fill="none"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {!imageOnly && showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold text-primary-700 tracking-wide ${textSizes[size]}`}>
            AFAMIA
          </span>
          <span className={`text-gold-600 font-semibold tracking-wider ${subTextSizes[size]}`}>
            CAFE & RESTAURANT
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
