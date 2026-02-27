import Link from 'next/link'
import Image from 'next/image'
import { ageGroups } from '@/lib/data'

export default function AgeSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="container-custom">
        <div className="section-title">
          <h2>SHOP BY AGE</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ageGroups.map((age) => (
            <Link key={age.name} href={age.href} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={age.image}
                  alt={age.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}