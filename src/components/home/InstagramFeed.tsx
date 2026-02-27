
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface InstagramPost {
  id: string
  imageUrl: string
  postUrl: string
  likes: number
  comments: number
  caption: string
  timestamp: string
}

interface InstagramFeedProps {
  title?: string
  subtitle?: string
  limit?: number
  className?: string
  currentDate?: string
}

export default function InstagramFeed({ 
  title = "Follow us @funcorp.in", 
  subtitle = "Join our community of toy lovers",
  limit = 6,
  className = "",
  currentDate = "February 20, 2026"
}: InstagramFeedProps) {
  
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  // Instagram posts with HTTPS image URLs in the specified format
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockPosts: InstagramPost[] = [
          {
            id: '1',
            imageUrl: 'https://www.funcorp.in/cdn/shop/files/81Y6w6DzeHL._SL1500.jpg?v=1766046250',
            postUrl: 'https://www.instagram.com/p/DF8k8X3yZ1K/',
            likes: 1245,
            comments: 89,
            caption: 'New Barbie Dreamhouse just arrived! 🏠✨ The ultimate dream home for your Barbie dolls is here! With 3 floors, 10 rooms, and 75+ accessories, the storytelling possibilities are endless. #Barbie #Dreamhouse #FunCorp #NewArrival',
            timestamp: '2 hours ago'
          },
          {
            id: '2',
            imageUrl: 'https://www.funcorp.in/cdn/shop/files/71nTw_c439L._SL1500.jpg?v=1728038474',
            postUrl: 'https://www.instagram.com/p/DF8k8X3yZ2K/',
            likes: 2341,
            comments: 156,
            caption: 'LEGO I Love School set is here! 🧱📚 Time to hit the books... or build them! This detailed classroom playset comes with 3 dolls and 20+ pieces. Perfect for little learners. #LEGO #BuildingFun #EducationalToys #FunCorp',
            timestamp: '5 hours ago'
          },
          {
            id: '3',
            imageUrl: 'https://www.funcorp.in/cdn/shop/files/91N49y58gLL._SL1500.jpg?v=1717766023',
            postUrl: 'https://www.instagram.com/p/DF8k8X3yZ3K/',
            likes: 987,
            comments: 45,
            caption: 'Monopoly: Barbie Edition - Where dreams become reality! 💖🎲 Buy your favorite Barbie streets, build DreamHouses, and collect rent in this fabulous twist on the classic game. #Monopoly #Barbie #BoardGames #FunCorp',
            timestamp: '1 day ago'
          },
          {
            id: '4',
            imageUrl: 'https://www.funcorp.in/cdn/shop/files/61CAHW32c9L._SL1500.jpg?v=1722258557',
            postUrl: 'https://www.instagram.com/p/DF8k8X3yZ4K/',
            likes: 3456,
            comments: 234,
            caption: 'Nerf battles just got more intense! 🔫 The new Elite 2.0 blasters feature built-in storage and customizing options. Get ready for the ultimate battle! #Nerf #OutdoorPlay #ActionToys #FunCorp',
            timestamp: '2 days ago'
          },
          {
            id: '5',
            imageUrl: 'https://www.funcorp.in/cdn/shop/files/71UD8j5uQUL._SL1500.jpg?v=1718976287',
            postUrl: 'https://www.instagram.com/p/DF8k8X3yZ5K/',
            likes: 1678,
            comments: 98,
            caption: 'Chelsea Can Be Florist - Growing imaginations one flower at a time! 🌸🌼 This adorable set lets kids run their own flower shop. #Barbie #Chelsea #RolePlay #FunCorp',
            timestamp: '3 days ago'
          },
          {
            id: '6',
            imageUrl: 'https://www.funcorp.in/cdn/shop/files/81X9QAtQX7L._SL1500_65e332df-2432-443f-bccb-ba07471c5bde.jpg?v=1740732195',
            postUrl: 'https://www.instagram.com/p/DF8k8X3yZ6K/',
            likes: 2890,
            comments: 167,
            caption: 'Barbie Fashion Pack - Oversized T-shirt dress and accessories! 👗✨ The perfect addition to any Barbie wardrobe. Mix and match for endless style possibilities. #Barbie #Fashion #DollClothes #FunCorp',
            timestamp: '4 days ago'
          }
        ]
        
        setPosts(mockPosts.slice(0, limit))
      } catch (error) {
        console.error('Error fetching Instagram posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [limit])

  // Format number with K/M suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  if (loading) {
    return (
      <section className={`instagram-feed ${className}`} style={styles.section}>
        <div className="container" style={styles.container}>
          <div style={styles.header}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.subtitle}>{subtitle}</p>
            <p style={styles.date}>Last updated: {currentDate}</p>
          </div>
          <div style={styles.grid}>
            {[...Array(limit)].map((_, i) => (
              <div key={i} style={styles.skeletonCard}>
                <div style={styles.skeletonImage}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`instagram-feed ${className}`} style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.subtitle}>{subtitle}</p>
          <p style={styles.date}>Last updated: {currentDate}</p>
        </div>

        <div style={styles.grid}>
          {posts.map((post) => (
            <Link 
              href={post.postUrl} 
              key={post.id}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
            >
              <div style={styles.imageWrapper}>
                <img 
                  src={post.imageUrl}
                  alt={post.caption}
                  style={styles.image}
                  loading="lazy"
                />
                <div style={styles.overlay}>
                  <div style={styles.stats}>
                    <span style={styles.stat}>❤️ {formatNumber(post.likes)}</span>
                    <span style={styles.stat}>💬 {formatNumber(post.comments)}</span>
                  </div>
                </div>
              </div>
              <div style={styles.caption}>
                <p style={styles.captionText}>{post.caption}</p>
                <span style={styles.timestamp}>{post.timestamp}</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={styles.footer}>
          <a 
            href="https://www.instagram.com/funcorp.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.button}
          >
            <span style={styles.buttonIcon}>📱</span>
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    background: '#fff',
    borderTop: '1px solid #ebebeb',
    padding: '40px 0',
    width: '100%',
  },
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    padding: '0 15px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  title: {
    color: '#E9454D',
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 10px 0',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'uppercase' as const,
  },
  subtitle: {
    color: '#666',
    fontSize: '16px',
    margin: '0 0 5px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  date: {
    color: '#999',
    fontSize: '14px',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'italic' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative' as const,
    aspectRatio: '1',
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '12px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease',
  },
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  stats: {
    display: 'flex',
    gap: '20px',
  },
  stat: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
  },
  caption: {
    padding: '0 5px',
  },
  captionText: {
    color: '#232323',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0 0 5px 0',
    fontFamily: 'Poppins, sans-serif',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  timestamp: {
    color: '#999',
    fontSize: '12px',
    fontFamily: 'Poppins, sans-serif',
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '20px',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: '#E9454D',
    color: '#fff',
    padding: '12px 30px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s ease',
    border: '2px solid #E9454D',
  },
  buttonIcon: {
    fontSize: '20px',
  },
  skeletonCard: {
    aspectRatio: '1',
    background: '#f0f0f0',
    borderRadius: '10px',
    animation: 'pulse 1.5s infinite',
  },
  skeletonImage: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
}

// Add global styles for animations
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .instagram-feed a:hover {
      transform: translateY(-5px);
    }
    
    .instagram-feed a:hover img {
      transform: scale(1.1);
    }
    
    .instagram-feed a:hover .overlay {
      opacity: 1;
    }
    
    .instagram-feed button:hover {
      background: #fff;
      color: #E9454D;
    }
    
    @media (max-width: 768px) {
      .instagram-feed .grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 15px !important;
      }
    }
    
    @media (max-width: 480px) {
      .instagram-feed .grid {
        grid-template-columns: 1fr !important;
      }
      
      .instagram-feed h2 {
        font-size: 24px !important;
      }
    }
  `
  document.head.appendChild(styleElement)
}