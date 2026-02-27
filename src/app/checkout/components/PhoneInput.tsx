// src/app/checkout/components/PhoneInput.tsx
'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function PhoneInput({ value, onChange, disabled, required }: Props) {
  const countryCode = '+91';
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const digits = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = digits.slice(0, 10);
    onChange(limited);
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    // Format as XXX-XXX-XXXX
    const parts = [];
    for (let i = 0; i < phone.length; i += 3) {
      parts.push(phone.slice(i, i + 3));
    }
    return parts.join('-');
  };

  return (
    <div className="flex">
      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
        {countryCode}
      </span>
      <input
        type="tel"
        value={formatPhone(value)}
        onChange={handlePhoneChange}
        disabled={disabled}
        required={required}
        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
        placeholder="98765-43210"
        pattern="\d{3}-\d{3}-\d{4}"
        maxLength={12}
      />
    </div>
  );
}