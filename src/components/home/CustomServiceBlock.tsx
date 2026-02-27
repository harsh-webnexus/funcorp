import { FaShieldAlt, FaTruck, FaHeadset, FaRupeeSign, FaLock } from 'react-icons/fa'

const services = [
  { icon: FaShieldAlt, title: 'Original Products', color: '#fccf39' },
  { icon: FaTruck, title: 'Shipping Across India', color: '#fccf39' },
  { icon: FaHeadset, title: 'A+ Customer Service', color: '#fccf39' },
  { icon: FaRupeeSign, title: 'COD Available', color: '#fccf39' },
  { icon: FaLock, title: 'Secured Payments', color: '#fccf39' },
]

export default function CustomServiceBlock() {
  return (
    <section className="py-6 md:py-10 border-t border-gray-200">
      <div className="container-custom">
        <div className="section-title">
          <h2>Why Choose Us?</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {services.map((service) => (
            <div key={service.title} className="text-center group cursor-pointer">
              <div className="flex justify-center mb-4">
                <service.icon 
                  size={40} 
                  className="text-[#fccf39] group-hover:scale-110 transition-transform" 
                />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#E9454D]">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}