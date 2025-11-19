// src/components/FormError.jsx
export default function FormError({ message }) {
  if (!message) return null;
  return <p style={{ color: 'red', marginTop: '5px' }}>{message}</p>;
}
