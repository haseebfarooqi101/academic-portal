export default function PageHeader({ 
  title, 
  subtitle, 
  gradientFrom = "blue-600", 
  gradientTo = "blue-700",
  textColor = "white"
}) {
  return (
    <div 
      className="rounded-lg p-6"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DBE0E6'
      }}
    >
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{title}</h1>
      <p className="text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}