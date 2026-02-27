// components/Categories.tsx
import Link from 'next/link';
import React from 'react';

interface Category {
  title: string;
  href: string;
}

const categories: Category[] = [
  { title: 'Action Figures', href: '/collections/action-figures' },
  { title: 'Activity Toys & Kits', href: '#' },
  { title: 'Baby & Toddler Toys', href: '/collections/baby-toddler-toys' },
  { title: 'Books for Kids', href: '/collections/books' },
  { title: 'Building & Construction', href: '/collections/building-construction' },
  { title: 'Cars, Vehicles, Trains & Tracks', href: '#' },
  { title: 'Collectibles', href: '/collections/collectibles' },
  { title: 'Dolls', href: '/collections/dolls-accessories' },
  { title: 'Games & Puzzles', href: '#' },
  { title: 'Outdoor Play & Sports', href: '/collections/outdoor-sports' },
  { title: 'Play & School Furniture', href: '/collections/play-school-furniture' },
  { title: 'Soft Toys & Plush', href: '/collections/soft-toys' },
  { title: 'Toy Guns & Bullets', href: '/collections/toy-guns-bullets' },
  { title: 'Other Toys & Games', href: '/collections/toys-games' },
  { title: 'Party Decorations', href: '/collections/party-decorations-1' },
];

interface CategoriesProps {
  title?: string;
  className?: string;
  initialDisplayCount?: number;
}

const Categories: React.FC<CategoriesProps> = ({ 
  title = "TOP CATEGORIES", 
  className = "",
  initialDisplayCount = 9
}) => {
  const [showAll, setShowAll] = React.useState(false);
  
  const displayedCategories = showAll ? categories : categories.slice(0, initialDisplayCount);

  return (
    <section className={`brand-tab-block ${className}`} style={styles.section}>
      <div className="brands-block" style={styles.brandsBlock}>
        <div className="container" style={styles.container}>
          <div className="brand__custom--tab">
            <ul className="tab-panel tab-title" style={styles.tabList}>
              <li className="active" style={styles.tabItem}>
                <a href="javascript:void(0)" style={styles.tabLink}>{title}</a>
              </li>
            </ul>
            
            <div className="tab-content--block active text-center" style={styles.tabContent}>
              <div className="halo-row" style={styles.grid}>
                {displayedCategories.map((category, index) => (
                  <div 
                    key={index} 
                    className="halo-item" 
                    style={{
                      ...styles.gridItem,
                      ...(index >= 9 ? styles.hideMobile : {})
                    }}
                  >
                    <div className="wrapper-item" style={styles.wrapperItem}>
                      <div className="wrapper-image">
                        <Link 
                          href={category.href} 
                          title={category.title} 
                          style={styles.link}
                        >
                          <h3 style={styles.title}>{category.title}</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {categories.length > initialDisplayCount && (
                <button 
                  type="button" 
                  className="btn button" 
                  style={styles.button}
                  onClick={() => setShowAll(!showAll)}
                >
                  <span>{showAll ? "Show Less" : "Show More Collections"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Styles object for the component
const styles = {
  section: {
    background: '#fff',
    borderTop: '1px solid #ebebeb',
    paddingTop: '30px',
    paddingBottom: '30px',
    width: '100%',
  },
  brandsBlock: {
    width: '100%',
  },
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    padding: '0 15px',
  },
  tabList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 15px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  tabItem: {
    marginBottom: '15px',
  },
  tabLink: {
    color: '#202020',
    fontSize: '22px',
    fontWeight: '600',
    textDecoration: 'none',
    borderBottom: '2px solid #ea4226',
    paddingBottom: '5px',
    fontFamily: 'Poppins, sans-serif',
  },
  tabContent: {
    textAlign: 'center' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '5px',
    marginBottom: '20px',
  },
  gridItem: {
    padding: '5px',
  },
  wrapperItem: {
    padding: '15px 10px',
    border: '1px solid #d0d0d0',
    borderRadius: '5px',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    width: '100%',
  },
  title: {
    color: '#f60808',
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'uppercase' as const,
    lineHeight: '1.4',
  },
  button: {
    background: '#ffc206',
    color: '#ffffff',
    border: '1px solid #ffc206',
    padding: '10px 30px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
    borderRadius: '0',
    marginTop: '15px',
    transition: 'all 0.3s ease',
  },
  hideMobile: {
    display: 'block',
  },
};

// Responsive styles (to be added via media queries in your global CSS or CSS-in-JS solution)
// Add this to your global styles or use styled-jsx
const globalStyles = `
  @media (max-width: 1024px) {
    .halo-row {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  
  @media (max-width: 768px) {
    .halo-row {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    [style*="hideMobile"] {
      display: block !important;
    }
  }
  
  @media (max-width: 480px) {
    .halo-row {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .tab-link {
      font-size: 18px !important;
    }
    
    .wrapper-item {
      padding: 12px 8px !important;
    }
    
    .wrapper-item h3 {
      font-size: 12px !important;
    }
  }
  
  .wrapper-item:hover {
    background-color: #f8f8f8;
    border-color: #e9454d !important;
  }
  
  .wrapper-item:hover h3 {
    color: #e9454d !important;
  }
  
  .button:hover {
    background: #e9454d !important;
    border-color: #e9454d !important;
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

export default Categories;