import { useScreenSize } from "../../hooks/useScreenSize";

const getFieldStyle = (isMobile, width, getFieldWidth, getMaxFieldWidth, hasError) => ({
  width: isMobile ? getFieldWidth() : '416px',
  maxWidth: isMobile ? getMaxFieldWidth() : '416px',
  height: '44px',
  paddingTop: '12px',
  paddingRight: '16px',
  paddingBottom: '12px',
  paddingLeft: '16px',
  borderRadius: '8px',
  borderWidth: hasError ? '2px' : '1px',
  borderColor: hasError ? '#EF4444' : '#DBE0E6', // Red border for errors
  backgroundColor: '#FFFFFF',
  fontFamily: 'Readex Pro',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0%',
  color: '#09090B',
  boxShadow: hasError ? '0px 0px 0px 4px rgba(239, 68, 68, 0.1)' : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
});

const getFocusedFieldStyle = (isMobile, width, getFieldWidth, getMaxFieldWidth, hasError) => ({
  ...getFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError),
  borderWidth: '2px',
  borderColor: hasError ? '#EF4444' : '#8A36D0',
  boxShadow: hasError ? '0px 0px 0px 4px rgba(239, 68, 68, 0.1)' : '0px 0px 0px 4px rgba(145, 65, 211, 0.08)'
});

const placeholderStyle = `
  ::placeholder {
    color: #707070;
  }
  ::-webkit-input-placeholder {
    color: #707070;
  }
  ::-moz-placeholder {
    color: #707070;
  }
  :-ms-input-placeholder {
    color: #707070;
  }
`;

export function TextInput({ value, onChange, placeholder, error, type = "text" }) {
  const { isMobile, width, getFieldWidth, getMaxFieldWidth } = useScreenSize();
  const hasError = !!error;
  const fieldStyle = getFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError);
  const focusedFieldStyle = getFocusedFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError);

  return (
    <div>
      <style jsx>{placeholderStyle}</style>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="focus:outline-none transition"
        style={fieldStyle}
        onFocus={(e) => Object.assign(e.target.style, focusedFieldStyle)}
        onBlur={(e) => Object.assign(e.target.style, fieldStyle)}
        placeholder={placeholder}
      />
    </div>
  );
}

export function SelectInput({ value, onChange, options, placeholder, error }) {
  const { isMobile, width, getFieldWidth, getMaxFieldWidth } = useScreenSize();
  const hasError = !!error;
  const fieldStyle = getFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError);
  const focusedFieldStyle = getFocusedFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError);

  return (
    <div>
      <style jsx>{placeholderStyle}</style>
      <select
        value={value}
        onChange={onChange}
        className="focus:outline-none transition bg-white"
        style={{
          ...fieldStyle,
          color: value ? '#09090B' : '#707070'
        }}
        onFocus={(e) => Object.assign(e.target.style, { ...focusedFieldStyle, color: value ? '#09090B' : '#707070' })}
        onBlur={(e) => Object.assign(e.target.style, { ...fieldStyle, color: value ? '#09090B' : '#707070' })}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export function PasswordInput({ value, onChange, placeholder, error, showPassword, onToggleShow }) {
  const { isMobile, width, getFieldWidth, getMaxFieldWidth } = useScreenSize();
  const hasError = !!error;
  const fieldStyle = getFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError);
  const focusedFieldStyle = getFocusedFieldStyle(isMobile, width, getFieldWidth, getMaxFieldWidth, hasError);

  return (
    <div>
      <style jsx>{placeholderStyle}</style>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="focus:outline-none transition"
          style={{
            ...fieldStyle,
            paddingRight: '50px'
          }}
          onFocus={(e) => Object.assign(e.target.style, { ...focusedFieldStyle, paddingRight: '50px' })}
          onBlur={(e) => Object.assign(e.target.style, { ...fieldStyle, paddingRight: '50px' })}
          placeholder={placeholder}
        />
        <button 
          type="button" 
          onClick={onToggleShow} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}