import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { ProductService, type Product } from '@/lib/product-service';
import { useCart } from '@/lib/cart-service';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // Hero carousel data
  const heroSlides = [
    {
      id: 1,
      title: "Handcrafted Pottery",
      subtitle: "Traditional Indian ceramics made with love",
      image: "https://static.wixstatic.com/media/d7d9fb_683c5b8a65d043589b78354948dafde1~mv2.png?originWidth=1920&originHeight=704",
      cta: "Explore Pottery"
    },
    {
      id: 2,
      title: "Vibrant Paintings",
      subtitle: "Contemporary and traditional art forms",
      image: "https://static.wixstatic.com/media/d7d9fb_4a085f39873046f5b65567fb4df5b82d~mv2.png?originWidth=1920&originHeight=704",
      cta: "Discover Art"
    },
    {
      id: 3,
      title: "Exquisite Embroidery",
      subtitle: "Intricate needlework from master artisans",
      image: "https://static.wixstatic.com/media/d7d9fb_e541c46cef1246d1a2716de9e03e986c~mv2.png?originWidth=1920&originHeight=704",
      cta: "Shop Now"
    }
  ];

  // Categories data
  const categories = [
    { name: "Wedding", icon: "💍", href: "/themes/wedding" },
    { name: "Haldi", icon: "🌼", href: "/discover?category=haldi" },
    { name: "Shell Art", icon: "🐚", href: "/discover?category=shell-art" },
    { name: "Paintings", icon: "🎨", href: "/discover?category=paintings" },
    { name: "Wooden Dolls", icon: "🪆", href: "/discover?category=wooden-dolls" },
    { name: "Pottery", icon: "🏺", href: "/discover?category=pottery" },
    { name: "Ceramics", icon: "🫖", href: "/discover?category=ceramics" },
    { name: "Metal Craft", icon: "⚒️", href: "/discover?category=metal-craft" },
    { name: "Jewelry", icon: "💎", href: "/discover?category=jewelry" },
    { name: "Fridge Magnets", icon: "🧲", href: "/discover?category=magnets" },
    { name: "Showpieces", icon: "🏛️", href: "/discover?category=showpieces" },
    { name: "Vintage", icon: "📿", href: "/discover?category=vintage" },
    { name: "Become a Seller", icon: "🏪", href: "/sell" },
    { name: "Embroidery", icon: "🧵", href: "/discover?category=embroidery" }
  ];

  // Load featured products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await ProductService.getFeaturedProducts(4);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product._id,
      productName: product.name,
      productImage: product.images[0],
      artistName: product.artistName,
      price: product.price
    });
    // You could add a toast notification here
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ scale: 1.1 }}
            animate={{ scale: index === currentSlide ? 1 : 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              width={1920}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <motion.h1
                  className="font-heading text-5xl md:text-7xl font-bold mb-4 uppercase tracking-wider"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  CONNECTING ARTS TO HEARTS
                </motion.h1>
                <motion.p
                  className="font-paragraph text-xl md:text-2xl mb-8 text-white/90"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-neonaccent text-primary hover:bg-neonaccent/90 font-heading font-bold text-lg px-8 py-4 rounded-full"
                  >
                    <Link to="/discover">
                      {slide.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-neonaccent' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-primary mb-4 uppercase tracking-wide">
              EXPLORE BY CATEGORY
            </h2>
            <p className="text-lg max-w-2xl mx-auto font-heading text-color-10">
              Discover authentic Indian crafts organized by themes and occasions
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={category.href}
                    className="flex flex-col items-center group text-primary"
                  >
                    <div className="w-20 h-20 bg-neonaccent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <span className="text-sm group-hover:text-black transition-colors font-heading text-primary">
                      {category.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-primary mb-4 uppercase tracking-wide">
              FEATURED ARTWORKS
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-color-10 font-heading">
              Handpicked masterpieces from our talented artisan community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-0">
                  <CardContent className="p-0">
                    <div className="bg-gray-200 animate-pulse h-48 rounded-t-lg" />
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-200 animate-pulse h-4 rounded" />
                      <div className="bg-gray-200 animate-pulse h-3 rounded w-2/3" />
                      <div className="bg-gray-200 animate-pulse h-4 rounded w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-shadow duration-300 border-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {product.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-neonaccent text-primary text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-primary" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-heading font-bold text-lg text-primary mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm mb-2 text-color-10 font-heading">
                        by {product.artistName}
                      </p>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-paragraph text-sm text-primary ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs ml-2 font-heading text-color-10">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-heading font-bold text-lg text-primary">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm line-through text-color-10 font-heading">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          {product.colors?.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link to={`/product/${product._id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/discover">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Action Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-xl font-bold mb-3 uppercase">
                    Explore Art by Themes
                  </h3>
                  <p className="text-sm mb-4 text-primary-foreground/80 font-heading">
                    Discover curated collections for weddings, festivals, and special occasions
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-neonaccent text-primary hover:bg-neonaccent/90"
                  >
                    <Link to="/themes">Explore Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-neonaccent to-neonaccent/80 text-primary border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-xl font-bold mb-3 uppercase">
                    Explore Traditional Art
                  </h3>
                  <p className="text-sm mb-4 text-primary/80 font-heading">
                    Immerse yourself in centuries-old crafting traditions from across India
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link to="/discover?category=traditional">Explore Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-xl font-bold mb-3 uppercase text-primary">
                    Discover Section
                  </h3>
                  <p className="text-sm mb-4 text-primary/70 font-heading">
                    Browse our complete collection of authentic handcrafted artworks
                  </p>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link to="/discover">Explore Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-neonaccent/10 border-neonaccent/30">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-xl font-bold mb-3 uppercase text-primary">
                    Join Our Community
                  </h3>
                  <p className="text-sm mb-4 text-primary/70 font-heading">
                    Connect with artisans, share ideas, and learn about Indian craft traditions
                  </p>
                  <Button
                    asChild
                    className="bg-neonaccent text-primary hover:bg-neonaccent/90"
                  >
                    <Link to="/community">Join Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}