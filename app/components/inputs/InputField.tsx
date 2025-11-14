export default function InputField({
  id,
  type,
  placeholder,
  value,
  required = true,
  onChange,
  error,
}: {
  id: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="relative mb-6 group">
      <input
        type={type}
        id={id}
        name={id}
        className="block w-full px-0 pt-6 pb-2 text-blue-80 bg-transparent border-0 border-b-2 border-blue-80/40 focus:outline-none focus:ring-0 focus:border-yellow-base peer placeholder-transparent"
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
      {error && <p className="text-red-500 pt-2 text-sm">{error}</p>}
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-blue-80/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-80/30 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-80/50 peer-focus:text-sm"
      >
        {placeholder}
      </label>
    </div>
  );
}
