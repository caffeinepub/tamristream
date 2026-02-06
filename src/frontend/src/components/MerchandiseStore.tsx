import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ShoppingCart, Heart, Star, Plus, Search, Filter, Truck, CreditCard, Package, Shirt, Sticker, Image, Download, Gift, Zap, Crown, Eye, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'apparel' | 'accessories' | 'digital' | 'collectibles';
  type: 'physical' | 'digital';
  creator: string;
  creatorAvatar: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  isLimitedEdition: boolean;
  isNew: boolean;
  sizes?: string[];
  colors?: string[];
}

interface CartItem {
  item: MerchandiseItem;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: Date;
  trackingNumber?: string;
}

export function MerchandiseStore() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MerchandiseItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCartDialog, setShowCartDialog] = useState(false);
  const [newItemData, setNewItemData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'apparel' as MerchandiseItem['category'],
    type: 'physical' as MerchandiseItem['type'],
    stockCount: 100,
    isLimitedEdition: false
  });

  // Mock data - would come from backend
  const merchandiseItems: MerchandiseItem[] = [
    {
      id: '1',
      name: 'Hearts of Gold Official T-Shirt',
      description: 'Premium cotton t-shirt featuring the iconic Hearts of Gold movie poster design. Comfortable fit and high-quality print.',
      price: 25,
      category: 'apparel',
      type: 'physical',
      creator: 'Hearts of Gold Official',
      creatorAvatar: '/assets/generated/african-filmmaker.jpg',
      images: ['/assets/generated/creator-merchandise-storefront.png'],
      inStock: true,
      stockCount: 47,
      rating: 4.8,
      reviewCount: 124,
      tags: ['Movie', 'Official', 'Cotton', 'Unisex'],
      isLimitedEdition: false,
      isNew: true,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Navy']
    },
    {
      id: '2',
      name: 'Kemi Adetiba Signed Poster',
      description: 'Limited edition signed poster by rising Afrobeats star Kemi Adetiba. Only 100 copies available worldwide.',
      price: 45,
      category: 'collectibles',
      type: 'physical',
      creator: 'Kemi Adetiba',
      creatorAvatar: '/assets/generated/african-musician-portrait.jpg',
      images: ['/assets/generated/african-music-albums.jpg'],
      inStock: true,
      stockCount: 23,
      rating: 5.0,
      reviewCount: 67,
      tags: ['Music', 'Signed', 'Limited Edition', 'Collectible'],
      isLimitedEdition: true,
      isNew: false
    },
    {
      id: '3',
      name: 'TamriStream Sticker Pack',
      description: 'Collection of 12 vibrant stickers featuring African cinema and music themes. Perfect for laptops, phones, and notebooks.',
      price: 8,
      category: 'accessories',
      type: 'physical',
      creator: 'TamriStream',
      creatorAvatar: '/assets/generated/app-logo.png',
      images: ['/assets/generated/merchandise-store-interface.png'],
      inStock: true,
      stockCount: 156,
      rating: 4.6,
      reviewCount: 89,
      tags: ['Stickers', 'Collection', 'Affordable', 'Fun'],
      isLimitedEdition: false,
      isNew: false
    },
    {
      id: '4',
      name: 'Exclusive Desktop Wallpapers Pack',
      description: 'High-resolution wallpapers featuring scenes from top African films and artist photography. Instant download.',
      price: 5,
      category: 'digital',
      type: 'digital',
      creator: 'TamriStream Artists',
      creatorAvatar: '/assets/generated/creator-spotlight-filmmaker.jpg',
      images: ['/assets/generated/african-cinema-hero.jpg'],
      inStock: true,
      stockCount: 999,
      rating: 4.4,
      reviewCount: 203,
      tags: ['Digital', 'Wallpapers', 'HD', 'Instant'],
      isLimitedEdition: false,
      isNew: true
    },
    {
      id: '5',
      name: 'Super Eagles Fan Jersey',
      description: 'Official replica jersey of the Nigerian national football team. Show your support in style.',
      price: 65,
      category: 'apparel',
      type: 'physical',
      creator: 'Super Eagles Official',
      creatorAvatar: '/assets/generated/sports-creator-studio.jpg',
      images: ['/assets/generated/african-football-match.jpg'],
      inStock: true,
      stockCount: 89,
      rating: 4.9,
      reviewCount: 156,
      tags: ['Sports', 'Jersey', 'Official', 'Football'],
      isLimitedEdition: false,
      isNew: false,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Green', 'White']
    },
    {
      id: '6',
      name: 'African Cinema NFT Collection',
      description: 'Unique digital collectibles featuring iconic moments from African cinema. Blockchain verified authenticity.',
      price: 50,
      category: 'digital',
      type: 'digital',
      creator: 'Cinema Collective',
      creatorAvatar: '/assets/generated/african-filmmaker.jpg',
      images: ['/assets/generated/african-cinema-categories.png'],
      inStock: true,
      stockCount: 50,
      rating: 4.2,
      reviewCount: 34,
      tags: ['NFT', 'Digital', 'Collectible', 'Blockchain'],
      isLimitedEdition: true,
      isNew: true
    }
  ];

  const myOrders: Order[] = [
    {
      id: 'ORD-001',
      items: [
        {
          item: merchandiseItems[0],
          quantity: 1,
          selectedSize: 'M',
          selectedColor: 'Black'
        }
      ],
      total: 25,
      status: 'shipped',
      orderDate: new Date('2024-12-20'),
      trackingNumber: 'TRK123456789'
    }
  ];

  const filteredItems = merchandiseItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MerchandiseItem, selectedSize?: string, selectedColor?: string) => {
    const existingItem = cart.find(cartItem => 
      cartItem.item.id === item.id && 
      cartItem.selectedSize === selectedSize && 
      cartItem.selectedColor === selectedColor
    );

    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem === existingItem 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { item, quantity: 1, selectedSize, selectedColor }]);
    }

    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
    toast.success('Item removed from cart');
  };

  const handleCreateItem = () => {
    if (!newItemData.name.trim() || !newItemData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock creation - would call backend
    toast.success('Merchandise item created successfully!');
    setShowCreateDialog(false);
    setNewItemData({
      name: '',
      description: '',
      price: 0,
      category: 'apparel',
      type: 'physical',
      stockCount: 100,
      isLimitedEdition: false
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-green-500';
      case 'delivered': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const ItemCard = ({ item }: { item: MerchandiseItem }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedItem(item)}>
      <div className="relative">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {item.isNew && (
          <Badge className="absolute top-2 right-2 bg-green-600">
            New
          </Badge>
        )}
        {item.isLimitedEdition && (
          <Badge className="absolute top-2 left-2 bg-purple-600">
            <Crown className="w-3 h-3 mr-1" />
            Limited
          </Badge>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {item.description.length > 80 
                ? `${item.description.substring(0, 80)}...` 
                : item.description
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={item.creatorAvatar} />
            <AvatarFallback>{item.creator[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">by {item.creator}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {item.type === 'digital' ? <Download className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
            {item.type}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${item.price}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toast.success('Added to wishlist!');
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              disabled={!item.inStock}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ItemDetailView = ({ item }: { item: MerchandiseItem }) => {
    const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(item.colors?.[0] || '');
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img 
              src={item.images[0]} 
              alt={item.name}
              className="w-full rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold">{item.name}</h1>
                {item.isNew && <Badge className="bg-green-600">New</Badge>}
                {item.isLimitedEdition && (
                  <Badge className="bg-purple-600">
                    <Crown className="w-3 h-3 mr-1" />
                    Limited Edition
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.creatorAvatar} />
                  <AvatarFallback>{item.creator[0]}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">by {item.creator}</span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.rating} ({item.reviewCount} reviews)
                </span>
              </div>

              <p className="text-muted-foreground mb-6">{item.description}</p>

              <div className="text-3xl font-bold mb-6">${item.price}</div>

              {item.sizes && (
                <div className="mb-4">
                  <Label className="text-sm font-semibold mb-2 block">Size</Label>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {item.colors && (
                <div className="mb-4">
                  <Label className="text-sm font-semibold mb-2 block">Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {item.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Label className="text-sm font-semibold mb-2 block">Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 border rounded">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  className="flex-1"
                  disabled={!item.inStock}
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      handleAddToCart(item, selectedSize, selectedColor);
                    }
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
              </div>

              {!item.inStock && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-800 font-semibold">Out of Stock</p>
                  <p className="text-red-600 text-sm">This item is currently unavailable</p>
                </div>
              )}

              {item.stockCount < 10 && item.inStock && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-yellow-800 font-semibold">Limited Stock</p>
                  <p className="text-yellow-600 text-sm">Only {item.stockCount} left in stock</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  if (selectedItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setSelectedItem(null)}>
            ← Back to Store
          </Button>
        </div>
        <ItemDetailView item={selectedItem} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Merchandise Store</h1>
            <p className="text-muted-foreground">
              Support your favorite creators with official merchandise and exclusive items
            </p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={showCartDialog} onOpenChange={setShowCartDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 text-xs px-1">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Shopping Cart</DialogTitle>
                  <DialogDescription>
                    Review your items before checkout
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <ScrollArea className="max-h-96">
                        <div className="space-y-4">
                          {cart.map((cartItem, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <img 
                                src={cartItem.item.images[0]} 
                                alt={cartItem.item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{cartItem.item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {cartItem.selectedSize && `Size: ${cartItem.selectedSize}`}
                                  {cartItem.selectedColor && ` • Color: ${cartItem.selectedColor}`}
                                </p>
                                <p className="text-sm">Quantity: {cartItem.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${cartItem.item.price * cartItem.quantity}</p>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRemoveFromCart(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <Separator />
                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total: ${getCartTotal()}</span>
                        <Button>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Merchandise</DialogTitle>
                  <DialogDescription>
                    Create a new item for your store
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input
                      id="item-name"
                      value={newItemData.name}
                      onChange={(e) => setNewItemData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea
                      id="item-description"
                      value={newItemData.description}
                      onChange={(e) => setNewItemData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your item"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="item-price">Price ($)</Label>
                      <Input
                        id="item-price"
                        type="number"
                        value={newItemData.price}
                        onChange={(e) => setNewItemData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="item-stock">Stock Count</Label>
                      <Input
                        id="item-stock"
                        type="number"
                        value={newItemData.stockCount}
                        onChange={(e) => setNewItemData(prev => ({ ...prev, stockCount: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="item-category">Category</Label>
                      <Select 
                        value={newItemData.category} 
                        onValueChange={(value: MerchandiseItem['category']) => 
                          setNewItemData(prev => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apparel">Apparel</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="digital">Digital</SelectItem>
                          <SelectItem value="collectibles">Collectibles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="item-type">Type</Label>
                      <Select 
                        value={newItemData.type} 
                        onValueChange={(value: MerchandiseItem['type']) => 
                          setNewItemData(prev => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="physical">Physical</SelectItem>
                          <SelectItem value="digital">Digital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="limited-edition"
                      checked={newItemData.isLimitedEdition}
                      onChange={(e) => setNewItemData(prev => ({ ...prev, isLimitedEdition: e.target.checked }))}
                    />
                    <Label htmlFor="limited-edition">Limited Edition</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateItem} className="flex-1">
                      Create Item
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="creators">By Creator</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search merchandise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="collectibles">Collectibles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-6">
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Browse by Creator</h3>
            <p className="text-muted-foreground mb-4">
              Discover merchandise from your favorite filmmakers, artists, and sports creators
            </p>
            <Button onClick={() => setActiveTab('browse')}>
              Browse All Items
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {myOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start shopping to see your orders here
              </p>
              <Button onClick={() => setActiveTab('browse')}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order {order.id}</CardTitle>
                        <CardDescription>
                          Placed on {order.orderDate.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="text-lg font-semibold mt-1">${order.total}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <img 
                            src={item.item.images[0]} 
                            alt={item.item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                              {item.selectedSize && ` • Size: ${item.selectedSize}`}
                              {item.selectedColor && ` • Color: ${item.selectedColor}`}
                            </p>
                          </div>
                          <p className="font-semibold">${item.item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                    {order.trackingNumber && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4" />
                          <span className="text-sm font-semibold">Tracking: {order.trackingNumber}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <div className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Items in Wishlist</h3>
            <p className="text-muted-foreground mb-4">
              Save items you love for later
            </p>
            <Button onClick={() => setActiveTab('browse')}>
              Browse Items
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
