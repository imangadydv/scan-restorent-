import type {
  User,
  Restaurant,
  Branch,
  Table,
  Category,
  MenuItem,
  Order,
  Plan,
  Subscription,
  Payment,
  SupportTicket,
  DashboardStats,
  Coupon,
  TaxConfig,
} from './types';

// ============================================================
// USERS
// ============================================================

export const users: User[] = [
  {
    id: 'usr-001',
    name: 'Super Admin',
    email: 'superadmin@tap2menu.com',
    password: 'admin123',
    role: 'superadmin',
    avatar: '/avatars/superadmin.png',
    phone: '+91-9000000001',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
  },
  // Spice Garden staff
  {
    id: 'usr-010',
    name: 'Rajesh Kumar',
    email: 'admin@spicegarden.com',
    password: 'admin123',
    role: 'restaurant_admin',
    avatar: '/avatars/rajesh.png',
    restaurantId: 'rest-001',
    branchId: 'branch-001',
    phone: '+91-9800000010',
    isActive: true,
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'usr-011',
    name: 'Amit Sharma',
    email: 'waiter1@spicegarden.com',
    password: 'admin123',
    role: 'waiter',
    avatar: '/avatars/amit.png',
    restaurantId: 'rest-001',
    branchId: 'branch-001',
    phone: '+91-9800000011',
    isActive: true,
    createdAt: '2025-02-01T00:00:00Z',
  },
  {
    id: 'usr-012',
    name: 'Priya Patel',
    email: 'waiter2@spicegarden.com',
    password: 'admin123',
    role: 'waiter',
    avatar: '/avatars/priya.png',
    restaurantId: 'rest-001',
    branchId: 'branch-001',
    phone: '+91-9800000012',
    isActive: true,
    createdAt: '2025-02-01T00:00:00Z',
  },
  {
    id: 'usr-013',
    name: 'Suresh Reddy',
    email: 'kitchen@spicegarden.com',
    password: 'admin123',
    role: 'kitchen',
    avatar: '/avatars/suresh.png',
    restaurantId: 'rest-001',
    branchId: 'branch-001',
    phone: '+91-9800000013',
    isActive: true,
    createdAt: '2025-02-05T00:00:00Z',
  },
  {
    id: 'usr-014',
    name: 'Deepa Nair',
    email: 'manager@spicegarden.com',
    password: 'admin123',
    role: 'restaurant_admin',
    avatar: '/avatars/deepa.png',
    restaurantId: 'rest-001',
    branchId: 'branch-002',
    phone: '+91-9800000014',
    isActive: true,
    createdAt: '2025-02-10T00:00:00Z',
  },
  // The Italian Corner staff
  {
    id: 'usr-020',
    name: 'Marco Rossi',
    email: 'admin@italiancorner.com',
    password: 'admin123',
    role: 'restaurant_admin',
    avatar: '/avatars/marco.png',
    restaurantId: 'rest-002',
    branchId: 'branch-003',
    phone: '+91-9800000020',
    isActive: true,
    createdAt: '2025-01-20T00:00:00Z',
  },
  {
    id: 'usr-021',
    name: 'Ravi Menon',
    email: 'waiter1@italiancorner.com',
    password: 'admin123',
    role: 'waiter',
    avatar: '/avatars/ravi.png',
    restaurantId: 'rest-002',
    branchId: 'branch-003',
    phone: '+91-9800000021',
    isActive: true,
    createdAt: '2025-02-15T00:00:00Z',
  },
  {
    id: 'usr-022',
    name: 'Sneha Gupta',
    email: 'waiter2@italiancorner.com',
    password: 'admin123',
    role: 'waiter',
    avatar: '/avatars/sneha.png',
    restaurantId: 'rest-002',
    branchId: 'branch-003',
    phone: '+91-9800000022',
    isActive: true,
    createdAt: '2025-02-15T00:00:00Z',
  },
  {
    id: 'usr-023',
    name: 'Antonio Bianchi',
    email: 'kitchen@italiancorner.com',
    password: 'admin123',
    role: 'kitchen',
    avatar: '/avatars/antonio.png',
    restaurantId: 'rest-002',
    branchId: 'branch-003',
    phone: '+91-9800000023',
    isActive: true,
    createdAt: '2025-02-20T00:00:00Z',
  },
  {
    id: 'usr-024',
    name: 'Kavita Joshi',
    email: 'manager@italiancorner.com',
    password: 'admin123',
    role: 'restaurant_admin',
    avatar: '/avatars/kavita.png',
    restaurantId: 'rest-002',
    branchId: 'branch-004',
    phone: '+91-9800000024',
    isActive: true,
    createdAt: '2025-03-01T00:00:00Z',
  },
  // Sushi Master staff
  {
    id: 'usr-030',
    name: 'Takeshi Yamamoto',
    email: 'admin@sushimaster.com',
    password: 'admin123',
    role: 'restaurant_admin',
    avatar: '/avatars/takeshi.png',
    restaurantId: 'rest-003',
    branchId: 'branch-005',
    phone: '+91-9800000030',
    isActive: true,
    createdAt: '2025-02-01T00:00:00Z',
  },
  {
    id: 'usr-031',
    name: 'Ankit Verma',
    email: 'waiter1@sushimaster.com',
    password: 'admin123',
    role: 'waiter',
    avatar: '/avatars/ankit.png',
    restaurantId: 'rest-003',
    branchId: 'branch-005',
    phone: '+91-9800000031',
    isActive: true,
    createdAt: '2025-03-01T00:00:00Z',
  },
  {
    id: 'usr-032',
    name: 'Meera Singh',
    email: 'waiter2@sushimaster.com',
    password: 'admin123',
    role: 'waiter',
    avatar: '/avatars/meera.png',
    restaurantId: 'rest-003',
    branchId: 'branch-005',
    phone: '+91-9800000032',
    isActive: true,
    createdAt: '2025-03-01T00:00:00Z',
  },
  {
    id: 'usr-033',
    name: 'Hiroshi Tanaka',
    email: 'kitchen@sushimaster.com',
    password: 'admin123',
    role: 'kitchen',
    avatar: '/avatars/hiroshi.png',
    restaurantId: 'rest-003',
    branchId: 'branch-005',
    phone: '+91-9800000033',
    isActive: true,
    createdAt: '2025-03-05T00:00:00Z',
  },
  {
    id: 'usr-034',
    name: 'Pooja Desai',
    email: 'manager@sushimaster.com',
    password: 'admin123',
    role: 'restaurant_admin',
    avatar: '/avatars/pooja.png',
    restaurantId: 'rest-003',
    branchId: 'branch-006',
    phone: '+91-9800000034',
    isActive: true,
    createdAt: '2025-03-10T00:00:00Z',
  },
];

// ============================================================
// RESTAURANTS
// ============================================================

export const restaurants: Restaurant[] = [
  {
    id: 'rest-001',
    name: 'Spice Garden',
    slug: 'spice-garden',
    logo: '/logos/spice-garden.png',
    coverImage: '/covers/spice-garden.jpg',
    description: 'Authentic North Indian and Mughlai cuisine crafted with traditional recipes passed down through generations. Experience the rich flavors of India in every bite.',
    cuisine: ['North Indian', 'Mughlai', 'Tandoori', 'Biryani'],
    address: '42, MG Road, Near City Mall',
    city: 'Bangalore',
    phone: '+91-80-42001234',
    email: 'contact@spicegarden.com',
    website: 'https://spicegarden.com',
    planId: 'plan-002',
    isActive: true,
    createdAt: '2025-01-15T00:00:00Z',
    ownerId: 'usr-010',
    settings: {
      currency: 'INR',
      currencySymbol: '\u20B9',
      taxRate: 5,
      serviceCharge: 10,
      theme: { primaryColor: '#D32F2F', accentColor: '#FF6F00' },
      orderAutoAccept: false,
      enableTips: true,
    },
  },
  {
    id: 'rest-002',
    name: 'The Italian Corner',
    slug: 'the-italian-corner',
    logo: '/logos/italian-corner.png',
    coverImage: '/covers/italian-corner.jpg',
    description: 'A cozy Italian bistro serving handmade pastas, wood-fired pizzas, and classic Mediterranean dishes. Buon appetito!',
    cuisine: ['Italian', 'Mediterranean', 'Continental'],
    address: '15, Brigade Road, Opposite Central Park',
    city: 'Bangalore',
    phone: '+91-80-42005678',
    email: 'contact@italiancorner.com',
    website: 'https://italiancorner.com',
    planId: 'plan-003',
    isActive: true,
    createdAt: '2025-01-20T00:00:00Z',
    ownerId: 'usr-020',
    settings: {
      currency: 'INR',
      currencySymbol: '\u20B9',
      taxRate: 5,
      serviceCharge: 10,
      theme: { primaryColor: '#2E7D32', accentColor: '#C62828' },
      orderAutoAccept: true,
      enableTips: true,
    },
  },
  {
    id: 'rest-003',
    name: 'Sushi Master',
    slug: 'sushi-master',
    logo: '/logos/sushi-master.png',
    coverImage: '/covers/sushi-master.jpg',
    description: 'Premium Japanese dining featuring fresh sushi, sashimi, ramen, and authentic Japanese delicacies prepared by master chefs.',
    cuisine: ['Japanese', 'Sushi', 'Ramen', 'Asian'],
    address: '88, Indiranagar 100ft Road',
    city: 'Bangalore',
    phone: '+91-80-42009012',
    email: 'contact@sushimaster.com',
    website: 'https://sushimaster.com',
    planId: 'plan-001',
    isActive: true,
    createdAt: '2025-02-01T00:00:00Z',
    ownerId: 'usr-030',
    settings: {
      currency: 'INR',
      currencySymbol: '\u20B9',
      taxRate: 5,
      serviceCharge: 8,
      theme: { primaryColor: '#1565C0', accentColor: '#E65100' },
      orderAutoAccept: false,
      enableTips: true,
    },
  },
];

// ============================================================
// BRANCHES
// ============================================================

export const branches: Branch[] = [
  {
    id: 'branch-001',
    restaurantId: 'rest-001',
    name: 'Spice Garden - MG Road',
    address: '42, MG Road, Near City Mall',
    city: 'Bangalore',
    phone: '+91-80-42001234',
    isActive: true,
    floors: 2,
    sections: ['Main Hall', 'Private Dining', 'Terrace'],
  },
  {
    id: 'branch-002',
    restaurantId: 'rest-001',
    name: 'Spice Garden - Koramangala',
    address: '78, 5th Block, Koramangala',
    city: 'Bangalore',
    phone: '+91-80-42001235',
    isActive: true,
    floors: 1,
    sections: ['Main Hall', 'Garden Area'],
  },
  {
    id: 'branch-003',
    restaurantId: 'rest-002',
    name: 'The Italian Corner - Brigade Road',
    address: '15, Brigade Road, Opposite Central Park',
    city: 'Bangalore',
    phone: '+91-80-42005678',
    isActive: true,
    floors: 2,
    sections: ['Ground Floor', 'Rooftop', 'Bar Area'],
  },
  {
    id: 'branch-004',
    restaurantId: 'rest-002',
    name: 'The Italian Corner - Whitefield',
    address: '22, ITPL Main Road, Whitefield',
    city: 'Bangalore',
    phone: '+91-80-42005679',
    isActive: true,
    floors: 1,
    sections: ['Main Hall', 'Patio'],
  },
  {
    id: 'branch-005',
    restaurantId: 'rest-003',
    name: 'Sushi Master - Indiranagar',
    address: '88, Indiranagar 100ft Road',
    city: 'Bangalore',
    phone: '+91-80-42009012',
    isActive: true,
    floors: 1,
    sections: ['Sushi Bar', 'Tatami Room', 'Main Hall'],
  },
  {
    id: 'branch-006',
    restaurantId: 'rest-003',
    name: 'Sushi Master - JP Nagar',
    address: '55, 15th Cross, JP Nagar 2nd Phase',
    city: 'Bangalore',
    phone: '+91-80-42009013',
    isActive: true,
    floors: 1,
    sections: ['Main Hall', 'Private Dining'],
  },
];

// ============================================================
// TABLES
// ============================================================

function generateTables(branchId: string, restaurantId: string, count: number, floor: number, section: string, startNum: number): Table[] {
  const statuses: Table['status'][] = ['available', 'occupied', 'available', 'available', 'reserved', 'available', 'occupied', 'available', 'available', 'maintenance', 'available', 'available'];
  const result: Table[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: `table-${branchId}-${startNum + i}`,
      restaurantId,
      branchId,
      number: startNum + i,
      capacity: [2, 4, 4, 6, 2, 4, 8, 4, 2, 6, 4, 4][i % 12],
      floor,
      section,
      status: statuses[i % statuses.length],
      qrCode: `https://tap2menu.com/qr/${restaurantId}/${branchId}/table-${startNum + i}`,
    });
  }
  return result;
}

export const tables: Table[] = [
  ...generateTables('branch-001', 'rest-001', 6, 1, 'Main Hall', 1),
  ...generateTables('branch-001', 'rest-001', 3, 1, 'Private Dining', 7),
  ...generateTables('branch-001', 'rest-001', 3, 2, 'Terrace', 10),
  ...generateTables('branch-002', 'rest-001', 5, 1, 'Main Hall', 1),
  ...generateTables('branch-002', 'rest-001', 3, 1, 'Garden Area', 6),
  ...generateTables('branch-003', 'rest-002', 5, 1, 'Ground Floor', 1),
  ...generateTables('branch-003', 'rest-002', 4, 2, 'Rooftop', 6),
  ...generateTables('branch-003', 'rest-002', 3, 1, 'Bar Area', 10),
  ...generateTables('branch-004', 'rest-002', 5, 1, 'Main Hall', 1),
  ...generateTables('branch-004', 'rest-002', 3, 1, 'Patio', 6),
  ...generateTables('branch-005', 'rest-003', 4, 1, 'Sushi Bar', 1),
  ...generateTables('branch-005', 'rest-003', 3, 1, 'Tatami Room', 5),
  ...generateTables('branch-005', 'rest-003', 3, 1, 'Main Hall', 8),
  ...generateTables('branch-006', 'rest-003', 5, 1, 'Main Hall', 1),
  ...generateTables('branch-006', 'rest-003', 3, 1, 'Private Dining', 6),
];

// ============================================================
// CATEGORIES
// ============================================================

export const categories: Category[] = [
  // Spice Garden categories
  { id: 'cat-sg-01', restaurantId: 'rest-001', name: 'Starters', description: 'Crispy and flavorful appetizers to kick off your meal', image: '/categories/starters.jpg', sortOrder: 1, isActive: true },
  { id: 'cat-sg-02', restaurantId: 'rest-001', name: 'Soups', description: 'Warm and comforting soups made fresh daily', image: '/categories/soups.jpg', sortOrder: 2, isActive: true },
  { id: 'cat-sg-03', restaurantId: 'rest-001', name: 'Main Course', description: 'Rich curries and gravies with authentic spices', image: '/categories/main-course.jpg', sortOrder: 3, isActive: true },
  { id: 'cat-sg-04', restaurantId: 'rest-001', name: 'Breads', description: 'Freshly baked Indian breads from the tandoor', image: '/categories/breads.jpg', sortOrder: 4, isActive: true },
  { id: 'cat-sg-05', restaurantId: 'rest-001', name: 'Rice & Biryani', description: 'Fragrant basmati rice dishes and aromatic biryanis', image: '/categories/biryani.jpg', sortOrder: 5, isActive: true },
  { id: 'cat-sg-06', restaurantId: 'rest-001', name: 'Desserts', description: 'Traditional Indian sweets and desserts', image: '/categories/desserts.jpg', sortOrder: 6, isActive: true },
  { id: 'cat-sg-07', restaurantId: 'rest-001', name: 'Beverages', description: 'Refreshing drinks and traditional beverages', image: '/categories/beverages.jpg', sortOrder: 7, isActive: true },
  { id: 'cat-sg-08', restaurantId: 'rest-001', name: 'Special Combos', description: 'Value meal combos and thali platters', image: '/categories/combos.jpg', sortOrder: 8, isActive: true },
  // Italian Corner categories
  { id: 'cat-ic-01', restaurantId: 'rest-002', name: 'Antipasti', description: 'Classic Italian starters and appetizers', image: '/categories/antipasti.jpg', sortOrder: 1, isActive: true },
  { id: 'cat-ic-02', restaurantId: 'rest-002', name: 'Soups & Salads', description: 'Fresh soups and garden-fresh salads', image: '/categories/soups-salads.jpg', sortOrder: 2, isActive: true },
  { id: 'cat-ic-03', restaurantId: 'rest-002', name: 'Pizza', description: 'Wood-fired pizzas with authentic Italian toppings', image: '/categories/pizza.jpg', sortOrder: 3, isActive: true },
  { id: 'cat-ic-04', restaurantId: 'rest-002', name: 'Pasta', description: 'Handmade pastas with signature sauces', image: '/categories/pasta.jpg', sortOrder: 4, isActive: true },
  { id: 'cat-ic-05', restaurantId: 'rest-002', name: 'Risotto & Mains', description: 'Creamy risottos and Italian main courses', image: '/categories/risotto.jpg', sortOrder: 5, isActive: true },
  { id: 'cat-ic-06', restaurantId: 'rest-002', name: 'Desserts', description: 'Traditional Italian dolci and sweets', image: '/categories/italian-desserts.jpg', sortOrder: 6, isActive: true },
  { id: 'cat-ic-07', restaurantId: 'rest-002', name: 'Beverages', description: 'Italian coffees, fresh juices, and sodas', image: '/categories/italian-beverages.jpg', sortOrder: 7, isActive: true },
  // Sushi Master categories
  { id: 'cat-sm-01', restaurantId: 'rest-003', name: 'Starters', description: 'Light Japanese appetizers and small plates', image: '/categories/jp-starters.jpg', sortOrder: 1, isActive: true },
  { id: 'cat-sm-02', restaurantId: 'rest-003', name: 'Sushi & Sashimi', description: 'Fresh hand-pressed sushi and sliced sashimi', image: '/categories/sushi.jpg', sortOrder: 2, isActive: true },
  { id: 'cat-sm-03', restaurantId: 'rest-003', name: 'Maki Rolls', description: 'Creative maki rolls with premium fillings', image: '/categories/maki.jpg', sortOrder: 3, isActive: true },
  { id: 'cat-sm-04', restaurantId: 'rest-003', name: 'Ramen & Noodles', description: 'Rich ramen broths and stir-fried noodles', image: '/categories/ramen.jpg', sortOrder: 4, isActive: true },
  { id: 'cat-sm-05', restaurantId: 'rest-003', name: 'Rice Bowls', description: 'Donburi and specialty rice bowls', image: '/categories/donburi.jpg', sortOrder: 5, isActive: true },
  { id: 'cat-sm-06', restaurantId: 'rest-003', name: 'Desserts', description: 'Japanese sweets and ice cream', image: '/categories/jp-desserts.jpg', sortOrder: 6, isActive: true },
  { id: 'cat-sm-07', restaurantId: 'rest-003', name: 'Beverages', description: 'Japanese teas, sodas, and fresh juices', image: '/categories/jp-beverages.jpg', sortOrder: 7, isActive: true },
];

// ============================================================
// MENU ITEMS
// ============================================================

export const menuItems: MenuItem[] = [
  // ---- SPICE GARDEN MENU ----
  // Starters
  {
    id: 'mi-sg-001', restaurantId: 'rest-001', categoryId: 'cat-sg-01',
    name: 'Paneer Tikka', description: 'Succulent cottage cheese cubes marinated in yogurt and Indian spices, chargrilled in the tandoor until smoky and golden.', price: 299,
    image: '/menu/paneer-tikka.jpg', foodType: 'veg', spiceLevel: 'medium', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['bestseller', 'tandoor'], allergens: ['dairy'], nutritionInfo: { calories: 320, protein: 18, carbs: 12, fat: 22 },
  },
  {
    id: 'mi-sg-002', restaurantId: 'rest-001', categoryId: 'cat-sg-01',
    name: 'Chicken Seekh Kebab', description: 'Minced chicken mixed with fresh herbs, green chillies, and aromatic spices, skewered and grilled to perfection in the tandoor.', price: 349,
    image: '/menu/seekh-kebab.jpg', foodType: 'non-veg', spiceLevel: 'hot', isAvailable: true, isPopular: true, preparationTime: 18,
    tags: ['tandoor', 'bestseller'], allergens: [], nutritionInfo: { calories: 380, protein: 28, carbs: 8, fat: 25 },
  },
  {
    id: 'mi-sg-003', restaurantId: 'rest-001', categoryId: 'cat-sg-01',
    name: 'Veg Spring Rolls', description: 'Crispy rolls stuffed with finely chopped vegetables and glass noodles, served with sweet chilli sauce.', price: 229,
    image: '/menu/spring-rolls.jpg', foodType: 'veg', spiceLevel: 'mild', isAvailable: true, isPopular: false, preparationTime: 12,
    tags: ['crispy', 'fusion'], allergens: ['gluten'],
  },
  {
    id: 'mi-sg-004', restaurantId: 'rest-001', categoryId: 'cat-sg-01',
    name: 'Tandoori Chicken', description: 'Half chicken marinated overnight in yogurt, Kashmiri red chilli, and a secret blend of spices, roasted in a clay tandoor.', price: 399,
    image: '/menu/tandoori-chicken.jpg', foodType: 'non-veg', spiceLevel: 'hot', isAvailable: true, isPopular: true, preparationTime: 25,
    tags: ['signature', 'tandoor'], allergens: ['dairy'], nutritionInfo: { calories: 450, protein: 38, carbs: 6, fat: 28 },
  },
  {
    id: 'mi-sg-005', restaurantId: 'rest-001', categoryId: 'cat-sg-01',
    name: 'Hara Bhara Kebab', description: 'Crispy vegetarian kebabs made with spinach, green peas, and potatoes, lightly spiced and shallow fried.', price: 249,
    image: '/menu/hara-bhara.jpg', foodType: 'veg', spiceLevel: 'mild', isAvailable: true, isPopular: false, preparationTime: 15,
    tags: ['healthy', 'vegetarian'], allergens: [],
  },
  // Soups
  {
    id: 'mi-sg-006', restaurantId: 'rest-001', categoryId: 'cat-sg-02',
    name: 'Tomato Shorba', description: 'A velvety Indian-style tomato soup tempered with cumin, curry leaves, and a hint of cream.', price: 179,
    image: '/menu/tomato-shorba.jpg', foodType: 'veg', spiceLevel: 'mild', isAvailable: true, isPopular: false, preparationTime: 10,
    tags: ['comfort', 'soup'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-007', restaurantId: 'rest-001', categoryId: 'cat-sg-02',
    name: 'Murgh Shorba', description: 'A rich and aromatic chicken broth infused with whole spices, ginger, and fresh coriander.', price: 219,
    image: '/menu/murgh-shorba.jpg', foodType: 'non-veg', spiceLevel: 'medium', isAvailable: true, isPopular: false, preparationTime: 12,
    tags: ['soup', 'warming'], allergens: [],
  },
  // Main Course
  {
    id: 'mi-sg-008', restaurantId: 'rest-001', categoryId: 'cat-sg-03',
    name: 'Butter Chicken', description: 'Tender tandoori chicken pieces simmered in a luscious tomato-butter gravy with kasuri methi and cream. Our signature dish.', price: 389,
    image: '/menu/butter-chicken.jpg', foodType: 'non-veg', spiceLevel: 'mild', isAvailable: true, isPopular: true, preparationTime: 20,
    tags: ['signature', 'bestseller', 'creamy'], allergens: ['dairy'], nutritionInfo: { calories: 490, protein: 32, carbs: 18, fat: 32 },
  },
  {
    id: 'mi-sg-009', restaurantId: 'rest-001', categoryId: 'cat-sg-03',
    name: 'Paneer Butter Masala', description: 'Soft paneer cubes in a rich, creamy tomato-based gravy with butter, cream, and aromatic spices.', price: 329,
    image: '/menu/paneer-butter-masala.jpg', foodType: 'veg', spiceLevel: 'mild', isAvailable: true, isPopular: true, preparationTime: 18,
    tags: ['bestseller', 'creamy'], allergens: ['dairy'], nutritionInfo: { calories: 420, protein: 16, carbs: 22, fat: 30 },
  },
  {
    id: 'mi-sg-010', restaurantId: 'rest-001', categoryId: 'cat-sg-03',
    name: 'Dal Makhani', description: 'Black lentils and kidney beans slow-cooked overnight with butter, cream, and tomatoes. A Punjabi classic.', price: 279,
    image: '/menu/dal-makhani.jpg', foodType: 'veg', spiceLevel: 'mild', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['comfort', 'punjabi'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-011', restaurantId: 'rest-001', categoryId: 'cat-sg-03',
    name: 'Mutton Rogan Josh', description: 'Tender lamb pieces braised in a Kashmiri-style gravy with aromatic spices, fennel, and dried ginger.', price: 459,
    image: '/menu/rogan-josh.jpg', foodType: 'non-veg', spiceLevel: 'hot', isAvailable: true, isPopular: false, preparationTime: 25,
    tags: ['kashmiri', 'premium'], allergens: [],
  },
  {
    id: 'mi-sg-012', restaurantId: 'rest-001', categoryId: 'cat-sg-03',
    name: 'Palak Paneer', description: 'Fresh spinach puree cooked with cottage cheese cubes, garlic, and a touch of cream.', price: 299,
    image: '/menu/palak-paneer.jpg', foodType: 'veg', spiceLevel: 'mild', isAvailable: true, isPopular: false, preparationTime: 15,
    tags: ['healthy', 'iron-rich'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-013', restaurantId: 'rest-001', categoryId: 'cat-sg-03',
    name: 'Chicken Chettinad', description: 'Spicy South Indian chicken curry made with freshly ground Chettinad masala, curry leaves, and coconut.', price: 379,
    image: '/menu/chicken-chettinad.jpg', foodType: 'non-veg', spiceLevel: 'extra-hot', isAvailable: true, isPopular: false, preparationTime: 22,
    tags: ['south-indian', 'spicy'], allergens: [],
  },
  // Breads
  {
    id: 'mi-sg-014', restaurantId: 'rest-001', categoryId: 'cat-sg-04',
    name: 'Butter Naan', description: 'Soft leavened bread baked in the tandoor and brushed with melted butter.', price: 69,
    image: '/menu/butter-naan.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['tandoor', 'bread'], allergens: ['gluten', 'dairy'],
  },
  {
    id: 'mi-sg-015', restaurantId: 'rest-001', categoryId: 'cat-sg-04',
    name: 'Garlic Naan', description: 'Naan bread topped with minced garlic and fresh coriander, baked in the clay oven.', price: 79,
    image: '/menu/garlic-naan.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['tandoor', 'garlic'], allergens: ['gluten', 'dairy'],
  },
  {
    id: 'mi-sg-016', restaurantId: 'rest-001', categoryId: 'cat-sg-04',
    name: 'Laccha Paratha', description: 'Flaky, layered whole wheat bread cooked with ghee on a tawa.', price: 69,
    image: '/menu/laccha-paratha.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 8,
    tags: ['flaky', 'bread'], allergens: ['gluten', 'dairy'],
  },
  {
    id: 'mi-sg-017', restaurantId: 'rest-001', categoryId: 'cat-sg-04',
    name: 'Stuffed Kulcha', description: 'Tandoor-baked bread stuffed with spiced potatoes and onions.', price: 99,
    image: '/menu/stuffed-kulcha.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 8,
    tags: ['stuffed', 'tandoor'], allergens: ['gluten', 'dairy'],
  },
  // Rice & Biryani
  {
    id: 'mi-sg-018', restaurantId: 'rest-001', categoryId: 'cat-sg-05',
    name: 'Hyderabadi Chicken Biryani', description: 'Fragrant basmati rice layered with marinated chicken, fried onions, saffron, and fresh mint, slow-cooked in a sealed pot (dum style).', price: 369,
    image: '/menu/chicken-biryani.jpg', foodType: 'non-veg', spiceLevel: 'hot', isAvailable: true, isPopular: true, preparationTime: 30,
    tags: ['signature', 'dum', 'bestseller'], allergens: ['dairy'], nutritionInfo: { calories: 580, protein: 28, carbs: 65, fat: 22 },
  },
  {
    id: 'mi-sg-019', restaurantId: 'rest-001', categoryId: 'cat-sg-05',
    name: 'Veg Biryani', description: 'Aromatic basmati rice cooked with seasonal vegetables, whole spices, saffron, and fried onions.', price: 289,
    image: '/menu/veg-biryani.jpg', foodType: 'veg', spiceLevel: 'medium', isAvailable: true, isPopular: false, preparationTime: 25,
    tags: ['biryani', 'aromatic'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-020', restaurantId: 'rest-001', categoryId: 'cat-sg-05',
    name: 'Mutton Biryani', description: 'Premium goat meat slow-cooked with aged basmati rice, caramelized onions, and a rich blend of Mughlai spices.', price: 449,
    image: '/menu/mutton-biryani.jpg', foodType: 'non-veg', spiceLevel: 'hot', isAvailable: true, isPopular: true, preparationTime: 35,
    tags: ['premium', 'dum'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-021', restaurantId: 'rest-001', categoryId: 'cat-sg-05',
    name: 'Jeera Rice', description: 'Fluffy basmati rice tempered with cumin seeds and ghee.', price: 169,
    image: '/menu/jeera-rice.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 10,
    tags: ['rice', 'simple'], allergens: ['dairy'],
  },
  // Desserts
  {
    id: 'mi-sg-022', restaurantId: 'rest-001', categoryId: 'cat-sg-06',
    name: 'Gulab Jamun', description: 'Soft and spongy milk-solid dumplings deep fried and soaked in warm rose-cardamom sugar syrup. Served warm (2 pcs).', price: 149,
    image: '/menu/gulab-jamun.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['sweet', 'classic'], allergens: ['dairy', 'gluten'],
  },
  {
    id: 'mi-sg-023', restaurantId: 'rest-001', categoryId: 'cat-sg-06',
    name: 'Rasmalai', description: 'Delicate flattened paneer balls soaked in chilled sweetened saffron milk, garnished with pistachios.', price: 179,
    image: '/menu/rasmalai.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 5,
    tags: ['bengali', 'chilled'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-024', restaurantId: 'rest-001', categoryId: 'cat-sg-06',
    name: 'Kulfi Falooda', description: 'Traditional Indian ice cream made with reduced milk and pistachios, served with falooda noodles and rose syrup.', price: 199,
    image: '/menu/kulfi-falooda.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['frozen', 'traditional'], allergens: ['dairy', 'nuts'],
  },
  // Beverages
  {
    id: 'mi-sg-025', restaurantId: 'rest-001', categoryId: 'cat-sg-07',
    name: 'Masala Chai', description: 'Aromatic Indian tea brewed with ginger, cardamom, cinnamon, and fresh milk.', price: 79,
    image: '/menu/masala-chai.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['hot', 'traditional'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-026', restaurantId: 'rest-001', categoryId: 'cat-sg-07',
    name: 'Mango Lassi', description: 'Creamy yogurt blended with sweet Alphonso mango pulp, served chilled.', price: 149,
    image: '/menu/mango-lassi.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['chilled', 'yogurt'], allergens: ['dairy'],
  },
  {
    id: 'mi-sg-027', restaurantId: 'rest-001', categoryId: 'cat-sg-07',
    name: 'Fresh Lime Soda', description: 'Freshly squeezed lime juice with soda water, available sweet or salted.', price: 99,
    image: '/menu/lime-soda.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 3,
    tags: ['refreshing', 'chilled'], allergens: [],
  },
  // Special Combos
  {
    id: 'mi-sg-028', restaurantId: 'rest-001', categoryId: 'cat-sg-08',
    name: 'Veg Thali', description: 'A complete meal with dal makhani, paneer butter masala, seasonal sabzi, raita, 3 rotis, jeera rice, salad, and gulab jamun.', price: 449,
    image: '/menu/veg-thali.jpg', foodType: 'veg', spiceLevel: 'medium', isAvailable: true, isPopular: true, preparationTime: 20,
    tags: ['value', 'complete-meal'], allergens: ['dairy', 'gluten'],
  },
  {
    id: 'mi-sg-029', restaurantId: 'rest-001', categoryId: 'cat-sg-08',
    name: 'Non-Veg Thali', description: 'A grand spread with butter chicken, mutton curry, dal, raita, 3 rotis, chicken biryani, salad, and kulfi.', price: 599,
    image: '/menu/non-veg-thali.jpg', foodType: 'non-veg', spiceLevel: 'medium', isAvailable: true, isPopular: true, preparationTime: 25,
    tags: ['value', 'premium', 'complete-meal'], allergens: ['dairy', 'gluten'],
  },

  // ---- THE ITALIAN CORNER MENU ----
  // Antipasti
  {
    id: 'mi-ic-001', restaurantId: 'rest-002', categoryId: 'cat-ic-01',
    name: 'Bruschetta Classica', description: 'Toasted ciabatta topped with diced Roma tomatoes, fresh basil, garlic, and extra virgin olive oil.', price: 279,
    image: '/menu/bruschetta.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 10,
    tags: ['classic', 'light'], allergens: ['gluten'],
  },
  {
    id: 'mi-ic-002', restaurantId: 'rest-002', categoryId: 'cat-ic-01',
    name: 'Arancini', description: 'Golden-fried risotto balls stuffed with mozzarella and sun-dried tomatoes, served with marinara dip.', price: 329,
    image: '/menu/arancini.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 15,
    tags: ['fried', 'cheesy'], allergens: ['gluten', 'dairy'],
  },
  {
    id: 'mi-ic-003', restaurantId: 'rest-002', categoryId: 'cat-ic-01',
    name: 'Chicken Wings Italiano', description: 'Crispy chicken wings tossed in garlic-parmesan butter with Italian herbs, served with blue cheese dip.', price: 399,
    image: '/menu/italian-wings.jpg', foodType: 'non-veg', spiceLevel: 'medium', isAvailable: true, isPopular: true, preparationTime: 18,
    tags: ['crispy', 'garlic'], allergens: ['dairy'],
  },
  // Soups & Salads
  {
    id: 'mi-ic-004', restaurantId: 'rest-002', categoryId: 'cat-ic-02',
    name: 'Minestrone Soup', description: 'Hearty Italian vegetable soup with beans, pasta, tomatoes, and fresh herbs.', price: 229,
    image: '/menu/minestrone.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 10,
    tags: ['soup', 'hearty'], allergens: ['gluten'],
  },
  {
    id: 'mi-ic-005', restaurantId: 'rest-002', categoryId: 'cat-ic-02',
    name: 'Caesar Salad', description: 'Crisp romaine lettuce with house-made Caesar dressing, garlic croutons, shaved Parmigiano, and anchovies.', price: 299,
    image: '/menu/caesar-salad.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 8,
    tags: ['salad', 'classic'], allergens: ['dairy', 'gluten', 'fish'],
  },
  // Pizza
  {
    id: 'mi-ic-006', restaurantId: 'rest-002', categoryId: 'cat-ic-03',
    name: 'Margherita Pizza', description: 'Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella di bufala, basil, and olive oil.', price: 399,
    image: '/menu/margherita.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['classic', 'wood-fired', 'bestseller'], allergens: ['gluten', 'dairy'], nutritionInfo: { calories: 680, protein: 24, carbs: 72, fat: 28 },
  },
  {
    id: 'mi-ic-007', restaurantId: 'rest-002', categoryId: 'cat-ic-03',
    name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni, mozzarella, and our signature tomato sauce on a crispy wood-fired base.', price: 499,
    image: '/menu/pepperoni.jpg', foodType: 'non-veg', spiceLevel: 'medium', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['popular', 'wood-fired'], allergens: ['gluten', 'dairy'], nutritionInfo: { calories: 820, protein: 32, carbs: 68, fat: 42 },
  },
  {
    id: 'mi-ic-008', restaurantId: 'rest-002', categoryId: 'cat-ic-03',
    name: 'Quattro Formaggi', description: 'Four-cheese pizza with mozzarella, gorgonzola, fontina, and Parmigiano-Reggiano on a white base.', price: 549,
    image: '/menu/quattro-formaggi.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 15,
    tags: ['cheesy', 'premium'], allergens: ['gluten', 'dairy'],
  },
  {
    id: 'mi-ic-009', restaurantId: 'rest-002', categoryId: 'cat-ic-03',
    name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce base topped with grilled chicken, red onions, bell peppers, and smoked gouda.', price: 529,
    image: '/menu/bbq-chicken-pizza.jpg', foodType: 'non-veg', spiceLevel: 'mild', isAvailable: true, isPopular: false, preparationTime: 18,
    tags: ['bbq', 'smoky'], allergens: ['gluten', 'dairy'],
  },
  // Pasta
  {
    id: 'mi-ic-010', restaurantId: 'rest-002', categoryId: 'cat-ic-04',
    name: 'Spaghetti Carbonara', description: 'Al dente spaghetti tossed with crispy pancetta, egg yolk, Pecorino Romano, and cracked black pepper.', price: 429,
    image: '/menu/carbonara.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['classic', 'creamy'], allergens: ['gluten', 'dairy', 'egg'], nutritionInfo: { calories: 620, protein: 22, carbs: 58, fat: 32 },
  },
  {
    id: 'mi-ic-011', restaurantId: 'rest-002', categoryId: 'cat-ic-04',
    name: 'Penne Arrabbiata', description: 'Penne pasta in a fiery tomato sauce with garlic, red chilli flakes, and fresh parsley. A spicy Italian classic.', price: 349,
    image: '/menu/arrabbiata.jpg', foodType: 'veg', spiceLevel: 'hot', isAvailable: true, isPopular: false, preparationTime: 12,
    tags: ['spicy', 'vegan-option'], allergens: ['gluten'],
  },
  {
    id: 'mi-ic-012', restaurantId: 'rest-002', categoryId: 'cat-ic-04',
    name: 'Fettuccine Alfredo', description: 'Ribbon pasta in a velvety parmesan cream sauce with garlic and a hint of nutmeg.', price: 399,
    image: '/menu/alfredo.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 12,
    tags: ['creamy', 'comfort'], allergens: ['gluten', 'dairy'],
  },
  {
    id: 'mi-ic-013', restaurantId: 'rest-002', categoryId: 'cat-ic-04',
    name: 'Lasagna Bolognese', description: 'Layers of fresh pasta sheets, slow-cooked beef ragu, bechamel, and melted mozzarella, baked until bubbly.', price: 479,
    image: '/menu/lasagna.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 25,
    tags: ['baked', 'hearty', 'signature'], allergens: ['gluten', 'dairy'],
  },
  // Risotto & Mains
  {
    id: 'mi-ic-014', restaurantId: 'rest-002', categoryId: 'cat-ic-05',
    name: 'Mushroom Risotto', description: 'Creamy Arborio rice slowly stirred with porcini and button mushrooms, white wine, parmesan, and truffle oil.', price: 449,
    image: '/menu/mushroom-risotto.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 22,
    tags: ['creamy', 'truffle'], allergens: ['dairy'],
  },
  {
    id: 'mi-ic-015', restaurantId: 'rest-002', categoryId: 'cat-ic-05',
    name: 'Grilled Chicken Parmigiana', description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella, served with spaghetti.', price: 529,
    image: '/menu/chicken-parm.jpg', foodType: 'non-veg', isAvailable: true, isPopular: false, preparationTime: 20,
    tags: ['grilled', 'cheesy'], allergens: ['gluten', 'dairy'],
  },
  // Desserts
  {
    id: 'mi-ic-016', restaurantId: 'rest-002', categoryId: 'cat-ic-06',
    name: 'Tiramisu', description: 'Classic Italian dessert with layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.', price: 349,
    image: '/menu/tiramisu.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['classic', 'coffee'], allergens: ['dairy', 'gluten', 'egg'], nutritionInfo: { calories: 380, protein: 6, carbs: 42, fat: 20 },
  },
  {
    id: 'mi-ic-017', restaurantId: 'rest-002', categoryId: 'cat-ic-06',
    name: 'Panna Cotta', description: 'Silky vanilla bean panna cotta served with a mixed berry compote and fresh mint.', price: 299,
    image: '/menu/panna-cotta.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 5,
    tags: ['creamy', 'elegant'], allergens: ['dairy'],
  },
  {
    id: 'mi-ic-018', restaurantId: 'rest-002', categoryId: 'cat-ic-06',
    name: 'Chocolate Lava Cake', description: 'Warm dark chocolate cake with a molten center, served with vanilla gelato.', price: 379,
    image: '/menu/lava-cake.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 12,
    tags: ['chocolate', 'warm'], allergens: ['dairy', 'gluten', 'egg'],
  },
  // Beverages
  {
    id: 'mi-ic-019', restaurantId: 'rest-002', categoryId: 'cat-ic-07',
    name: 'Espresso', description: 'Double shot of premium Italian espresso, rich and aromatic.', price: 149,
    image: '/menu/espresso.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 3,
    tags: ['coffee', 'classic'], allergens: [],
  },
  {
    id: 'mi-ic-020', restaurantId: 'rest-002', categoryId: 'cat-ic-07',
    name: 'Cappuccino', description: 'Espresso topped with steamed milk and a thick layer of velvety foam, dusted with cocoa.', price: 199,
    image: '/menu/cappuccino.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['coffee', 'hot'], allergens: ['dairy'],
  },
  {
    id: 'mi-ic-021', restaurantId: 'rest-002', categoryId: 'cat-ic-07',
    name: 'Italian Lemonade', description: 'Sparkling homemade lemonade with fresh basil and a hint of elderflower.', price: 179,
    image: '/menu/italian-lemonade.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 5,
    tags: ['refreshing', 'sparkling'], allergens: [],
  },

  // ---- SUSHI MASTER MENU ----
  // Starters
  {
    id: 'mi-sm-001', restaurantId: 'rest-003', categoryId: 'cat-sm-01',
    name: 'Edamame', description: 'Steamed young soybeans lightly salted and sprinkled with sea salt flakes. A classic Japanese starter.', price: 199,
    image: '/menu/edamame.jpg', foodType: 'vegan', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['healthy', 'light'], allergens: ['soy'],
  },
  {
    id: 'mi-sm-002', restaurantId: 'rest-003', categoryId: 'cat-sm-01',
    name: 'Gyoza (6 pcs)', description: 'Pan-fried Japanese dumplings filled with chicken, cabbage, and ginger, served with ponzu dipping sauce.', price: 329,
    image: '/menu/gyoza.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 12,
    tags: ['pan-fried', 'dumplings'], allergens: ['gluten', 'soy'],
  },
  {
    id: 'mi-sm-003', restaurantId: 'rest-003', categoryId: 'cat-sm-01',
    name: 'Tempura Vegetables', description: 'Assorted seasonal vegetables in a light, crispy tempura batter, served with tentsuyu dipping sauce.', price: 299,
    image: '/menu/veg-tempura.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 10,
    tags: ['crispy', 'tempura'], allergens: ['gluten'],
  },
  {
    id: 'mi-sm-004', restaurantId: 'rest-003', categoryId: 'cat-sm-01',
    name: 'Chicken Karaage', description: 'Japanese-style fried chicken marinated in soy, ginger, and sake, served with kewpie mayo.', price: 349,
    image: '/menu/karaage.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 12,
    tags: ['fried', 'crispy'], allergens: ['soy', 'gluten'],
  },
  // Sushi & Sashimi
  {
    id: 'mi-sm-005', restaurantId: 'rest-003', categoryId: 'cat-sm-02',
    name: 'Salmon Nigiri (2 pcs)', description: 'Hand-pressed sushi rice topped with premium fresh Atlantic salmon slices.', price: 299,
    image: '/menu/salmon-nigiri.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 8,
    tags: ['fresh', 'premium'], allergens: ['fish'],
  },
  {
    id: 'mi-sm-006', restaurantId: 'rest-003', categoryId: 'cat-sm-02',
    name: 'Tuna Nigiri (2 pcs)', description: 'Delicate sushi rice topped with slices of fresh yellowfin tuna.', price: 349,
    image: '/menu/tuna-nigiri.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 8,
    tags: ['fresh', 'premium'], allergens: ['fish'],
  },
  {
    id: 'mi-sm-007', restaurantId: 'rest-003', categoryId: 'cat-sm-02',
    name: 'Prawn Nigiri (2 pcs)', description: 'Butterflied tiger prawns over seasoned sushi rice with a touch of wasabi.', price: 329,
    image: '/menu/prawn-nigiri.jpg', foodType: 'non-veg', isAvailable: true, isPopular: false, preparationTime: 8,
    tags: ['fresh', 'seafood'], allergens: ['shellfish'],
  },
  {
    id: 'mi-sm-008', restaurantId: 'rest-003', categoryId: 'cat-sm-02',
    name: 'Sashimi Platter (12 pcs)', description: 'Chef\'s selection of 12 pieces of the freshest sashimi - salmon, tuna, yellowtail, and octopus.', price: 899,
    image: '/menu/sashimi-platter.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 12,
    tags: ['premium', 'chef-special', 'signature'], allergens: ['fish', 'shellfish'],
  },
  // Maki Rolls
  {
    id: 'mi-sm-009', restaurantId: 'rest-003', categoryId: 'cat-sm-03',
    name: 'California Roll (8 pcs)', description: 'Inside-out roll with crab stick, avocado, cucumber, and tobiko, finished with sesame seeds.', price: 399,
    image: '/menu/california-roll.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 10,
    tags: ['classic', 'popular'], allergens: ['shellfish', 'soy'], nutritionInfo: { calories: 350, protein: 12, carbs: 48, fat: 12 },
  },
  {
    id: 'mi-sm-010', restaurantId: 'rest-003', categoryId: 'cat-sm-03',
    name: 'Spicy Tuna Roll (8 pcs)', description: 'Fresh tuna mixed with spicy mayo, rolled with cucumber and topped with sriracha drizzle.', price: 449,
    image: '/menu/spicy-tuna-roll.jpg', foodType: 'non-veg', spiceLevel: 'hot', isAvailable: true, isPopular: true, preparationTime: 10,
    tags: ['spicy', 'popular'], allergens: ['fish', 'soy'],
  },
  {
    id: 'mi-sm-011', restaurantId: 'rest-003', categoryId: 'cat-sm-03',
    name: 'Dragon Roll (8 pcs)', description: 'Tempura prawn inside, topped with sliced avocado, eel sauce, and tobiko. Our signature roll.', price: 549,
    image: '/menu/dragon-roll.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['signature', 'premium'], allergens: ['shellfish', 'gluten', 'soy'],
  },
  {
    id: 'mi-sm-012', restaurantId: 'rest-003', categoryId: 'cat-sm-03',
    name: 'Avocado Maki (6 pcs)', description: 'Simple and fresh avocado roll with seasoned sushi rice and nori.', price: 249,
    image: '/menu/avocado-maki.jpg', foodType: 'vegan', isAvailable: true, isPopular: false, preparationTime: 8,
    tags: ['vegan', 'light'], allergens: ['soy'],
  },
  // Ramen & Noodles
  {
    id: 'mi-sm-013', restaurantId: 'rest-003', categoryId: 'cat-sm-04',
    name: 'Tonkotsu Ramen', description: 'Rich pork bone broth simmered for 18 hours, served with chashu pork, soft-boiled egg, bamboo shoots, nori, and spring onions.', price: 499,
    image: '/menu/tonkotsu-ramen.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['signature', 'hearty', 'bestseller'], allergens: ['gluten', 'soy', 'egg'], nutritionInfo: { calories: 720, protein: 35, carbs: 62, fat: 35 },
  },
  {
    id: 'mi-sm-014', restaurantId: 'rest-003', categoryId: 'cat-sm-04',
    name: 'Miso Ramen', description: 'Fermented soybean paste broth with chicken, sweetcorn, bean sprouts, butter, and a soft-boiled egg.', price: 449,
    image: '/menu/miso-ramen.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['umami', 'warming'], allergens: ['gluten', 'soy', 'egg', 'dairy'],
  },
  {
    id: 'mi-sm-015', restaurantId: 'rest-003', categoryId: 'cat-sm-04',
    name: 'Vegetable Yakisoba', description: 'Stir-fried Japanese wheat noodles with mixed vegetables, yakisoba sauce, pickled ginger, and bonito flakes.', price: 349,
    image: '/menu/yakisoba.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 12,
    tags: ['stir-fried', 'noodles'], allergens: ['gluten', 'soy'],
  },
  // Rice Bowls
  {
    id: 'mi-sm-016', restaurantId: 'rest-003', categoryId: 'cat-sm-05',
    name: 'Chicken Teriyaki Don', description: 'Grilled chicken glazed with house-made teriyaki sauce, served over steamed Japanese rice with pickled vegetables.', price: 399,
    image: '/menu/teriyaki-don.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 15,
    tags: ['bowl', 'teriyaki'], allergens: ['soy', 'gluten'],
  },
  {
    id: 'mi-sm-017', restaurantId: 'rest-003', categoryId: 'cat-sm-05',
    name: 'Salmon Poke Bowl', description: 'Cubed fresh salmon over sushi rice with edamame, avocado, seaweed salad, cucumber, and spicy mayo.', price: 549,
    image: '/menu/poke-bowl.jpg', foodType: 'non-veg', isAvailable: true, isPopular: true, preparationTime: 10,
    tags: ['healthy', 'fresh'], allergens: ['fish', 'soy'],
  },
  {
    id: 'mi-sm-018', restaurantId: 'rest-003', categoryId: 'cat-sm-05',
    name: 'Katsu Curry Rice', description: 'Crispy panko-breaded chicken cutlet with Japanese golden curry, steamed rice, and pickled radish.', price: 449,
    image: '/menu/katsu-curry.jpg', foodType: 'non-veg', spiceLevel: 'mild', isAvailable: true, isPopular: true, preparationTime: 18,
    tags: ['curry', 'crispy'], allergens: ['gluten', 'soy'],
  },
  // Desserts
  {
    id: 'mi-sm-019', restaurantId: 'rest-003', categoryId: 'cat-sm-06',
    name: 'Mochi Ice Cream (3 pcs)', description: 'Soft glutinous rice cake filled with premium ice cream in matcha, strawberry, and mango flavors.', price: 249,
    image: '/menu/mochi.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 3,
    tags: ['frozen', 'japanese'], allergens: ['dairy'],
  },
  {
    id: 'mi-sm-020', restaurantId: 'rest-003', categoryId: 'cat-sm-06',
    name: 'Matcha Cheesecake', description: 'Light and fluffy Japanese-style cheesecake infused with premium Uji matcha.', price: 299,
    image: '/menu/matcha-cheesecake.jpg', foodType: 'veg', isAvailable: true, isPopular: false, preparationTime: 5,
    tags: ['matcha', 'baked'], allergens: ['dairy', 'gluten', 'egg'],
  },
  // Beverages
  {
    id: 'mi-sm-021', restaurantId: 'rest-003', categoryId: 'cat-sm-07',
    name: 'Hot Matcha Latte', description: 'Ceremonial grade Uji matcha whisked with steamed milk, lightly sweetened.', price: 199,
    image: '/menu/matcha-latte.jpg', foodType: 'veg', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['matcha', 'hot'], allergens: ['dairy'],
  },
  {
    id: 'mi-sm-022', restaurantId: 'rest-003', categoryId: 'cat-sm-07',
    name: 'Ramune Soda', description: 'Classic Japanese marble soda available in original, strawberry, and melon flavors.', price: 149,
    image: '/menu/ramune.jpg', foodType: 'vegan', isAvailable: true, isPopular: false, preparationTime: 2,
    tags: ['soda', 'japanese'], allergens: [],
  },
  {
    id: 'mi-sm-023', restaurantId: 'rest-003', categoryId: 'cat-sm-07',
    name: 'Japanese Green Tea', description: 'Premium sencha green tea brewed traditionally, served hot.', price: 129,
    image: '/menu/green-tea.jpg', foodType: 'vegan', isAvailable: true, isPopular: true, preparationTime: 5,
    tags: ['tea', 'traditional'], allergens: [],
  },
];

// ============================================================
// ORDERS
// ============================================================

export const orders: Order[] = [
  {
    id: 'ord-001', orderNumber: 'SG-20260330-001',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-2', tableNumber: 2,
    customerName: 'Vikram Malhotra',
    items: [
      { id: 'oi-001', menuItemId: 'mi-sg-008', menuItemName: 'Butter Chicken', quantity: 2, price: 389, total: 778, foodType: 'non-veg' },
      { id: 'oi-002', menuItemId: 'mi-sg-014', menuItemName: 'Butter Naan', quantity: 4, price: 69, total: 276, foodType: 'veg' },
      { id: 'oi-003', menuItemId: 'mi-sg-026', menuItemName: 'Mango Lassi', quantity: 2, price: 149, total: 298, foodType: 'veg' },
    ],
    status: 'new', subtotal: 1352, tax: 67.6, serviceCharge: 135.2, discount: 0, total: 1554.8,
    waiterId: 'usr-011', createdAt: '2026-03-30T12:15:00Z', updatedAt: '2026-03-30T12:15:00Z',
    statusHistory: [{ status: 'new', timestamp: '2026-03-30T12:15:00Z', updatedBy: 'system' }],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-002', orderNumber: 'SG-20260330-002',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-5', tableNumber: 5,
    customerName: 'Neha Kapoor',
    items: [
      { id: 'oi-004', menuItemId: 'mi-sg-001', menuItemName: 'Paneer Tikka', quantity: 1, price: 299, total: 299, foodType: 'veg' },
      { id: 'oi-005', menuItemId: 'mi-sg-009', menuItemName: 'Paneer Butter Masala', quantity: 1, price: 329, total: 329, foodType: 'veg' },
      { id: 'oi-006', menuItemId: 'mi-sg-015', menuItemName: 'Garlic Naan', quantity: 3, price: 79, total: 237, foodType: 'veg' },
      { id: 'oi-007', menuItemId: 'mi-sg-022', menuItemName: 'Gulab Jamun', quantity: 2, price: 149, total: 298, foodType: 'veg' },
    ],
    status: 'accepted', subtotal: 1163, tax: 58.15, serviceCharge: 116.3, discount: 0, total: 1337.45,
    waiterId: 'usr-011', createdAt: '2026-03-30T12:30:00Z', updatedAt: '2026-03-30T12:32:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T12:30:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T12:32:00Z', updatedBy: 'usr-011' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-003', orderNumber: 'SG-20260330-003',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-8', tableNumber: 8,
    customerName: 'Arjun Mehta',
    items: [
      { id: 'oi-008', menuItemId: 'mi-sg-018', menuItemName: 'Hyderabadi Chicken Biryani', quantity: 2, price: 369, total: 738, foodType: 'non-veg' },
      { id: 'oi-009', menuItemId: 'mi-sg-002', menuItemName: 'Chicken Seekh Kebab', quantity: 1, price: 349, total: 349, foodType: 'non-veg' },
      { id: 'oi-010', menuItemId: 'mi-sg-025', menuItemName: 'Masala Chai', quantity: 2, price: 79, total: 158, foodType: 'veg' },
    ],
    status: 'preparing', subtotal: 1245, tax: 62.25, serviceCharge: 124.5, discount: 100, total: 1331.75,
    notes: 'Extra raita on the side please',
    waiterId: 'usr-012', createdAt: '2026-03-30T12:45:00Z', updatedAt: '2026-03-30T12:50:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T12:45:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T12:47:00Z', updatedBy: 'usr-012' },
      { status: 'preparing', timestamp: '2026-03-30T12:50:00Z', updatedBy: 'usr-013' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-004', orderNumber: 'SG-20260330-004',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-3', tableNumber: 3,
    customerName: 'Sanya Iyer',
    items: [
      { id: 'oi-011', menuItemId: 'mi-sg-028', menuItemName: 'Veg Thali', quantity: 2, price: 449, total: 898, foodType: 'veg' },
      { id: 'oi-012', menuItemId: 'mi-sg-027', menuItemName: 'Fresh Lime Soda', quantity: 2, price: 99, total: 198, foodType: 'veg' },
    ],
    status: 'ready', subtotal: 1096, tax: 54.8, serviceCharge: 109.6, discount: 0, total: 1260.4,
    waiterId: 'usr-011', createdAt: '2026-03-30T11:30:00Z', updatedAt: '2026-03-30T12:10:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T11:30:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T11:32:00Z', updatedBy: 'usr-011' },
      { status: 'preparing', timestamp: '2026-03-30T11:35:00Z', updatedBy: 'usr-013' },
      { status: 'ready', timestamp: '2026-03-30T12:10:00Z', updatedBy: 'usr-013' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-005', orderNumber: 'SG-20260330-005',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-1', tableNumber: 1,
    customerName: 'Rohit Sharma',
    items: [
      { id: 'oi-013', menuItemId: 'mi-sg-004', menuItemName: 'Tandoori Chicken', quantity: 1, price: 399, total: 399, foodType: 'non-veg' },
      { id: 'oi-014', menuItemId: 'mi-sg-011', menuItemName: 'Mutton Rogan Josh', quantity: 1, price: 459, total: 459, foodType: 'non-veg' },
      { id: 'oi-015', menuItemId: 'mi-sg-020', menuItemName: 'Mutton Biryani', quantity: 1, price: 449, total: 449, foodType: 'non-veg' },
      { id: 'oi-016', menuItemId: 'mi-sg-015', menuItemName: 'Garlic Naan', quantity: 2, price: 79, total: 158, foodType: 'veg' },
      { id: 'oi-017', menuItemId: 'mi-sg-024', menuItemName: 'Kulfi Falooda', quantity: 2, price: 199, total: 398, foodType: 'veg' },
    ],
    status: 'served', subtotal: 1863, tax: 93.15, serviceCharge: 186.3, discount: 150, total: 1992.45,
    waiterId: 'usr-012', createdAt: '2026-03-30T11:00:00Z', updatedAt: '2026-03-30T12:00:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T11:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T11:02:00Z', updatedBy: 'usr-012' },
      { status: 'preparing', timestamp: '2026-03-30T11:05:00Z', updatedBy: 'usr-013' },
      { status: 'ready', timestamp: '2026-03-30T11:45:00Z', updatedBy: 'usr-013' },
      { status: 'served', timestamp: '2026-03-30T12:00:00Z', updatedBy: 'usr-012' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-006', orderNumber: 'SG-20260329-006',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-4', tableNumber: 4,
    customerName: 'Priya Verma',
    items: [
      { id: 'oi-018', menuItemId: 'mi-sg-010', menuItemName: 'Dal Makhani', quantity: 1, price: 279, total: 279, foodType: 'veg' },
      { id: 'oi-019', menuItemId: 'mi-sg-012', menuItemName: 'Palak Paneer', quantity: 1, price: 299, total: 299, foodType: 'veg' },
      { id: 'oi-020', menuItemId: 'mi-sg-016', menuItemName: 'Laccha Paratha', quantity: 2, price: 69, total: 138, foodType: 'veg' },
      { id: 'oi-021', menuItemId: 'mi-sg-023', menuItemName: 'Rasmalai', quantity: 1, price: 179, total: 179, foodType: 'veg' },
    ],
    status: 'completed', subtotal: 895, tax: 44.75, serviceCharge: 89.5, discount: 0, total: 1029.25,
    waiterId: 'usr-011', createdAt: '2026-03-29T19:30:00Z', updatedAt: '2026-03-29T20:45:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-29T19:30:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-29T19:32:00Z', updatedBy: 'usr-011' },
      { status: 'preparing', timestamp: '2026-03-29T19:35:00Z', updatedBy: 'usr-013' },
      { status: 'ready', timestamp: '2026-03-29T20:05:00Z', updatedBy: 'usr-013' },
      { status: 'served', timestamp: '2026-03-29T20:10:00Z', updatedBy: 'usr-011' },
      { status: 'completed', timestamp: '2026-03-29T20:45:00Z', updatedBy: 'usr-011' },
    ],
    paymentStatus: 'paid', paymentMethod: 'upi',
  },
  {
    id: 'ord-007', orderNumber: 'SG-20260329-007',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-6', tableNumber: 6,
    customerName: 'Karan Agarwal',
    items: [
      { id: 'oi-022', menuItemId: 'mi-sg-029', menuItemName: 'Non-Veg Thali', quantity: 3, price: 599, total: 1797, foodType: 'non-veg' },
    ],
    status: 'completed', subtotal: 1797, tax: 89.85, serviceCharge: 179.7, discount: 200, total: 1866.55,
    waiterId: 'usr-012', createdAt: '2026-03-29T13:00:00Z', updatedAt: '2026-03-29T14:30:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-29T13:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-29T13:02:00Z', updatedBy: 'usr-012' },
      { status: 'preparing', timestamp: '2026-03-29T13:05:00Z', updatedBy: 'usr-013' },
      { status: 'ready', timestamp: '2026-03-29T13:50:00Z', updatedBy: 'usr-013' },
      { status: 'served', timestamp: '2026-03-29T13:55:00Z', updatedBy: 'usr-012' },
      { status: 'completed', timestamp: '2026-03-29T14:30:00Z', updatedBy: 'usr-012' },
    ],
    paymentStatus: 'paid', paymentMethod: 'card',
  },
  {
    id: 'ord-008', orderNumber: 'SG-20260328-008',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-7', tableNumber: 7,
    customerName: 'Ananya Das',
    items: [
      { id: 'oi-023', menuItemId: 'mi-sg-005', menuItemName: 'Hara Bhara Kebab', quantity: 1, price: 249, total: 249, foodType: 'veg' },
      { id: 'oi-024', menuItemId: 'mi-sg-006', menuItemName: 'Tomato Shorba', quantity: 1, price: 179, total: 179, foodType: 'veg' },
    ],
    status: 'cancelled', subtotal: 428, tax: 21.4, serviceCharge: 42.8, discount: 0, total: 492.2,
    notes: 'Customer had to leave urgently',
    waiterId: 'usr-011', createdAt: '2026-03-28T20:00:00Z', updatedAt: '2026-03-28T20:10:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-28T20:00:00Z', updatedBy: 'system' },
      { status: 'cancelled', timestamp: '2026-03-28T20:10:00Z', updatedBy: 'usr-011' },
    ],
    paymentStatus: 'refunded',
  },
  // Italian Corner Orders
  {
    id: 'ord-009', orderNumber: 'IC-20260330-001',
    restaurantId: 'rest-002', branchId: 'branch-003', tableId: 'table-branch-003-1', tableNumber: 1,
    customerName: 'Aditya Rao',
    items: [
      { id: 'oi-025', menuItemId: 'mi-ic-006', menuItemName: 'Margherita Pizza', quantity: 1, price: 399, total: 399, foodType: 'veg' },
      { id: 'oi-026', menuItemId: 'mi-ic-010', menuItemName: 'Spaghetti Carbonara', quantity: 1, price: 429, total: 429, foodType: 'non-veg' },
      { id: 'oi-027', menuItemId: 'mi-ic-020', menuItemName: 'Cappuccino', quantity: 2, price: 199, total: 398, foodType: 'veg' },
    ],
    status: 'new', subtotal: 1226, tax: 61.3, serviceCharge: 122.6, discount: 0, total: 1409.9,
    waiterId: 'usr-021', createdAt: '2026-03-30T12:20:00Z', updatedAt: '2026-03-30T12:20:00Z',
    statusHistory: [{ status: 'new', timestamp: '2026-03-30T12:20:00Z', updatedBy: 'system' }],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-010', orderNumber: 'IC-20260330-002',
    restaurantId: 'rest-002', branchId: 'branch-003', tableId: 'table-branch-003-3', tableNumber: 3,
    customerName: 'Simran Kaur',
    items: [
      { id: 'oi-028', menuItemId: 'mi-ic-001', menuItemName: 'Bruschetta Classica', quantity: 1, price: 279, total: 279, foodType: 'veg' },
      { id: 'oi-029', menuItemId: 'mi-ic-007', menuItemName: 'Pepperoni Pizza', quantity: 1, price: 499, total: 499, foodType: 'non-veg' },
      { id: 'oi-030', menuItemId: 'mi-ic-012', menuItemName: 'Fettuccine Alfredo', quantity: 1, price: 399, total: 399, foodType: 'veg' },
      { id: 'oi-031', menuItemId: 'mi-ic-016', menuItemName: 'Tiramisu', quantity: 2, price: 349, total: 698, foodType: 'veg' },
    ],
    status: 'preparing', subtotal: 1875, tax: 93.75, serviceCharge: 187.5, discount: 0, total: 2156.25,
    waiterId: 'usr-022', createdAt: '2026-03-30T12:00:00Z', updatedAt: '2026-03-30T12:10:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T12:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T12:02:00Z', updatedBy: 'usr-022' },
      { status: 'preparing', timestamp: '2026-03-30T12:10:00Z', updatedBy: 'usr-023' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-011', orderNumber: 'IC-20260330-003',
    restaurantId: 'rest-002', branchId: 'branch-003', tableId: 'table-branch-003-7', tableNumber: 7,
    customerName: 'Nikhil Banerjee',
    items: [
      { id: 'oi-032', menuItemId: 'mi-ic-014', menuItemName: 'Mushroom Risotto', quantity: 1, price: 449, total: 449, foodType: 'veg' },
      { id: 'oi-033', menuItemId: 'mi-ic-005', menuItemName: 'Caesar Salad', quantity: 1, price: 299, total: 299, foodType: 'non-veg' },
      { id: 'oi-034', menuItemId: 'mi-ic-019', menuItemName: 'Espresso', quantity: 1, price: 149, total: 149, foodType: 'veg' },
    ],
    status: 'ready', subtotal: 897, tax: 44.85, serviceCharge: 89.7, discount: 0, total: 1031.55,
    waiterId: 'usr-021', createdAt: '2026-03-30T11:15:00Z', updatedAt: '2026-03-30T11:55:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T11:15:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T11:17:00Z', updatedBy: 'usr-021' },
      { status: 'preparing', timestamp: '2026-03-30T11:20:00Z', updatedBy: 'usr-023' },
      { status: 'ready', timestamp: '2026-03-30T11:55:00Z', updatedBy: 'usr-023' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-012', orderNumber: 'IC-20260329-004',
    restaurantId: 'rest-002', branchId: 'branch-003', tableId: 'table-branch-003-5', tableNumber: 5,
    customerName: 'Tanya Chandra',
    items: [
      { id: 'oi-035', menuItemId: 'mi-ic-013', menuItemName: 'Lasagna Bolognese', quantity: 2, price: 479, total: 958, foodType: 'non-veg' },
      { id: 'oi-036', menuItemId: 'mi-ic-008', menuItemName: 'Quattro Formaggi', quantity: 1, price: 549, total: 549, foodType: 'veg' },
      { id: 'oi-037', menuItemId: 'mi-ic-018', menuItemName: 'Chocolate Lava Cake', quantity: 2, price: 379, total: 758, foodType: 'veg' },
      { id: 'oi-038', menuItemId: 'mi-ic-021', menuItemName: 'Italian Lemonade', quantity: 3, price: 179, total: 537, foodType: 'veg' },
    ],
    status: 'completed', subtotal: 2802, tax: 140.1, serviceCharge: 280.2, discount: 250, total: 2972.3,
    waiterId: 'usr-021', createdAt: '2026-03-29T20:00:00Z', updatedAt: '2026-03-29T21:30:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-29T20:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-29T20:02:00Z', updatedBy: 'usr-021' },
      { status: 'preparing', timestamp: '2026-03-29T20:05:00Z', updatedBy: 'usr-023' },
      { status: 'ready', timestamp: '2026-03-29T20:50:00Z', updatedBy: 'usr-023' },
      { status: 'served', timestamp: '2026-03-29T20:55:00Z', updatedBy: 'usr-021' },
      { status: 'completed', timestamp: '2026-03-29T21:30:00Z', updatedBy: 'usr-021' },
    ],
    paymentStatus: 'paid', paymentMethod: 'card',
  },
  // Sushi Master Orders
  {
    id: 'ord-013', orderNumber: 'SM-20260330-001',
    restaurantId: 'rest-003', branchId: 'branch-005', tableId: 'table-branch-005-1', tableNumber: 1,
    customerName: 'Rahul Jain',
    items: [
      { id: 'oi-039', menuItemId: 'mi-sm-008', menuItemName: 'Sashimi Platter (12 pcs)', quantity: 1, price: 899, total: 899, foodType: 'non-veg' },
      { id: 'oi-040', menuItemId: 'mi-sm-009', menuItemName: 'California Roll (8 pcs)', quantity: 1, price: 399, total: 399, foodType: 'non-veg' },
      { id: 'oi-041', menuItemId: 'mi-sm-001', menuItemName: 'Edamame', quantity: 1, price: 199, total: 199, foodType: 'vegan' },
      { id: 'oi-042', menuItemId: 'mi-sm-023', menuItemName: 'Japanese Green Tea', quantity: 2, price: 129, total: 258, foodType: 'vegan' },
    ],
    status: 'accepted', subtotal: 1755, tax: 87.75, serviceCharge: 140.4, discount: 0, total: 1983.15,
    waiterId: 'usr-031', createdAt: '2026-03-30T12:40:00Z', updatedAt: '2026-03-30T12:43:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T12:40:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T12:43:00Z', updatedBy: 'usr-031' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-014', orderNumber: 'SM-20260330-002',
    restaurantId: 'rest-003', branchId: 'branch-005', tableId: 'table-branch-005-3', tableNumber: 3,
    customerName: 'Divya Nair',
    items: [
      { id: 'oi-043', menuItemId: 'mi-sm-013', menuItemName: 'Tonkotsu Ramen', quantity: 2, price: 499, total: 998, foodType: 'non-veg' },
      { id: 'oi-044', menuItemId: 'mi-sm-002', menuItemName: 'Gyoza (6 pcs)', quantity: 1, price: 329, total: 329, foodType: 'non-veg' },
      { id: 'oi-045', menuItemId: 'mi-sm-019', menuItemName: 'Mochi Ice Cream (3 pcs)', quantity: 2, price: 249, total: 498, foodType: 'veg' },
    ],
    status: 'preparing', subtotal: 1825, tax: 91.25, serviceCharge: 146.0, discount: 0, total: 2062.25,
    waiterId: 'usr-032', createdAt: '2026-03-30T12:25:00Z', updatedAt: '2026-03-30T12:35:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T12:25:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T12:28:00Z', updatedBy: 'usr-032' },
      { status: 'preparing', timestamp: '2026-03-30T12:35:00Z', updatedBy: 'usr-033' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-015', orderNumber: 'SM-20260330-003',
    restaurantId: 'rest-003', branchId: 'branch-005', tableId: 'table-branch-005-5', tableNumber: 5,
    customerName: 'Manish Tiwari',
    items: [
      { id: 'oi-046', menuItemId: 'mi-sm-011', menuItemName: 'Dragon Roll (8 pcs)', quantity: 1, price: 549, total: 549, foodType: 'non-veg' },
      { id: 'oi-047', menuItemId: 'mi-sm-010', menuItemName: 'Spicy Tuna Roll (8 pcs)', quantity: 1, price: 449, total: 449, foodType: 'non-veg' },
      { id: 'oi-048', menuItemId: 'mi-sm-004', menuItemName: 'Chicken Karaage', quantity: 1, price: 349, total: 349, foodType: 'non-veg' },
      { id: 'oi-049', menuItemId: 'mi-sm-021', menuItemName: 'Hot Matcha Latte', quantity: 2, price: 199, total: 398, foodType: 'veg' },
    ],
    status: 'served', subtotal: 1745, tax: 87.25, serviceCharge: 139.6, discount: 100, total: 1871.85,
    waiterId: 'usr-031', createdAt: '2026-03-30T11:30:00Z', updatedAt: '2026-03-30T12:20:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-30T11:30:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-30T11:33:00Z', updatedBy: 'usr-031' },
      { status: 'preparing', timestamp: '2026-03-30T11:36:00Z', updatedBy: 'usr-033' },
      { status: 'ready', timestamp: '2026-03-30T12:10:00Z', updatedBy: 'usr-033' },
      { status: 'served', timestamp: '2026-03-30T12:20:00Z', updatedBy: 'usr-031' },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ord-016', orderNumber: 'SM-20260329-004',
    restaurantId: 'rest-003', branchId: 'branch-005', tableId: 'table-branch-005-7', tableNumber: 7,
    customerName: 'Shreya Bhatt',
    items: [
      { id: 'oi-050', menuItemId: 'mi-sm-017', menuItemName: 'Salmon Poke Bowl', quantity: 2, price: 549, total: 1098, foodType: 'non-veg' },
      { id: 'oi-051', menuItemId: 'mi-sm-003', menuItemName: 'Tempura Vegetables', quantity: 1, price: 299, total: 299, foodType: 'veg' },
    ],
    status: 'completed', subtotal: 1397, tax: 69.85, serviceCharge: 111.76, discount: 0, total: 1578.61,
    waiterId: 'usr-031', createdAt: '2026-03-29T19:00:00Z', updatedAt: '2026-03-29T20:15:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-29T19:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-29T19:03:00Z', updatedBy: 'usr-031' },
      { status: 'preparing', timestamp: '2026-03-29T19:06:00Z', updatedBy: 'usr-033' },
      { status: 'ready', timestamp: '2026-03-29T19:30:00Z', updatedBy: 'usr-033' },
      { status: 'served', timestamp: '2026-03-29T19:35:00Z', updatedBy: 'usr-031' },
      { status: 'completed', timestamp: '2026-03-29T20:15:00Z', updatedBy: 'usr-031' },
    ],
    paymentStatus: 'paid', paymentMethod: 'upi',
  },
  {
    id: 'ord-017', orderNumber: 'SM-20260328-005',
    restaurantId: 'rest-003', branchId: 'branch-005', tableId: 'table-branch-005-2', tableNumber: 2,
    customerName: 'Vivek Pandey',
    items: [
      { id: 'oi-052', menuItemId: 'mi-sm-018', menuItemName: 'Katsu Curry Rice', quantity: 1, price: 449, total: 449, foodType: 'non-veg' },
      { id: 'oi-053', menuItemId: 'mi-sm-014', menuItemName: 'Miso Ramen', quantity: 1, price: 449, total: 449, foodType: 'non-veg' },
      { id: 'oi-054', menuItemId: 'mi-sm-022', menuItemName: 'Ramune Soda', quantity: 2, price: 149, total: 298, foodType: 'vegan' },
    ],
    status: 'completed', subtotal: 1196, tax: 59.8, serviceCharge: 95.68, discount: 0, total: 1351.48,
    waiterId: 'usr-032', createdAt: '2026-03-28T13:00:00Z', updatedAt: '2026-03-28T14:15:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-28T13:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-28T13:02:00Z', updatedBy: 'usr-032' },
      { status: 'preparing', timestamp: '2026-03-28T13:05:00Z', updatedBy: 'usr-033' },
      { status: 'ready', timestamp: '2026-03-28T13:40:00Z', updatedBy: 'usr-033' },
      { status: 'served', timestamp: '2026-03-28T13:45:00Z', updatedBy: 'usr-032' },
      { status: 'completed', timestamp: '2026-03-28T14:15:00Z', updatedBy: 'usr-032' },
    ],
    paymentStatus: 'paid', paymentMethod: 'cash',
  },
  // Additional completed orders from past days
  {
    id: 'ord-018', orderNumber: 'SG-20260327-009',
    restaurantId: 'rest-001', branchId: 'branch-001', tableId: 'table-branch-001-4', tableNumber: 4,
    customerName: 'Sunita Yadav',
    items: [
      { id: 'oi-055', menuItemId: 'mi-sg-013', menuItemName: 'Chicken Chettinad', quantity: 1, price: 379, total: 379, foodType: 'non-veg' },
      { id: 'oi-056', menuItemId: 'mi-sg-019', menuItemName: 'Veg Biryani', quantity: 1, price: 289, total: 289, foodType: 'veg' },
      { id: 'oi-057', menuItemId: 'mi-sg-014', menuItemName: 'Butter Naan', quantity: 2, price: 69, total: 138, foodType: 'veg' },
    ],
    status: 'completed', subtotal: 806, tax: 40.3, serviceCharge: 80.6, discount: 0, total: 926.9,
    waiterId: 'usr-011', createdAt: '2026-03-27T20:00:00Z', updatedAt: '2026-03-27T21:10:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-27T20:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-27T20:02:00Z', updatedBy: 'usr-011' },
      { status: 'preparing', timestamp: '2026-03-27T20:05:00Z', updatedBy: 'usr-013' },
      { status: 'ready', timestamp: '2026-03-27T20:40:00Z', updatedBy: 'usr-013' },
      { status: 'served', timestamp: '2026-03-27T20:45:00Z', updatedBy: 'usr-011' },
      { status: 'completed', timestamp: '2026-03-27T21:10:00Z', updatedBy: 'usr-011' },
    ],
    paymentStatus: 'paid', paymentMethod: 'cash',
  },
  {
    id: 'ord-019', orderNumber: 'IC-20260327-005',
    restaurantId: 'rest-002', branchId: 'branch-003', tableId: 'table-branch-003-2', tableNumber: 2,
    customerName: 'Farah Khan',
    items: [
      { id: 'oi-058', menuItemId: 'mi-ic-009', menuItemName: 'BBQ Chicken Pizza', quantity: 1, price: 529, total: 529, foodType: 'non-veg' },
      { id: 'oi-059', menuItemId: 'mi-ic-011', menuItemName: 'Penne Arrabbiata', quantity: 1, price: 349, total: 349, foodType: 'veg' },
      { id: 'oi-060', menuItemId: 'mi-ic-017', menuItemName: 'Panna Cotta', quantity: 1, price: 299, total: 299, foodType: 'veg' },
    ],
    status: 'completed', subtotal: 1177, tax: 58.85, serviceCharge: 117.7, discount: 0, total: 1353.55,
    waiterId: 'usr-022', createdAt: '2026-03-27T19:00:00Z', updatedAt: '2026-03-27T20:30:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-27T19:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-27T19:02:00Z', updatedBy: 'usr-022' },
      { status: 'preparing', timestamp: '2026-03-27T19:05:00Z', updatedBy: 'usr-023' },
      { status: 'ready', timestamp: '2026-03-27T19:45:00Z', updatedBy: 'usr-023' },
      { status: 'served', timestamp: '2026-03-27T19:50:00Z', updatedBy: 'usr-022' },
      { status: 'completed', timestamp: '2026-03-27T20:30:00Z', updatedBy: 'usr-022' },
    ],
    paymentStatus: 'paid', paymentMethod: 'upi',
  },
  {
    id: 'ord-020', orderNumber: 'SG-20260326-010',
    restaurantId: 'rest-001', branchId: 'branch-002', tableId: 'table-branch-002-3', tableNumber: 3,
    customerName: 'Gaurav Sinha',
    items: [
      { id: 'oi-061', menuItemId: 'mi-sg-003', menuItemName: 'Veg Spring Rolls', quantity: 1, price: 229, total: 229, foodType: 'veg' },
      { id: 'oi-062', menuItemId: 'mi-sg-008', menuItemName: 'Butter Chicken', quantity: 1, price: 389, total: 389, foodType: 'non-veg' },
      { id: 'oi-063', menuItemId: 'mi-sg-018', menuItemName: 'Hyderabadi Chicken Biryani', quantity: 1, price: 369, total: 369, foodType: 'non-veg' },
      { id: 'oi-064', menuItemId: 'mi-sg-015', menuItemName: 'Garlic Naan', quantity: 2, price: 79, total: 158, foodType: 'veg' },
      { id: 'oi-065', menuItemId: 'mi-sg-026', menuItemName: 'Mango Lassi', quantity: 2, price: 149, total: 298, foodType: 'veg' },
    ],
    status: 'completed', subtotal: 1443, tax: 72.15, serviceCharge: 144.3, discount: 0, total: 1659.45,
    waiterId: 'usr-014', createdAt: '2026-03-26T13:00:00Z', updatedAt: '2026-03-26T14:30:00Z',
    statusHistory: [
      { status: 'new', timestamp: '2026-03-26T13:00:00Z', updatedBy: 'system' },
      { status: 'accepted', timestamp: '2026-03-26T13:03:00Z', updatedBy: 'usr-014' },
      { status: 'preparing', timestamp: '2026-03-26T13:05:00Z', updatedBy: 'usr-013' },
      { status: 'ready', timestamp: '2026-03-26T13:50:00Z', updatedBy: 'usr-013' },
      { status: 'served', timestamp: '2026-03-26T13:55:00Z', updatedBy: 'usr-014' },
      { status: 'completed', timestamp: '2026-03-26T14:30:00Z', updatedBy: 'usr-014' },
    ],
    paymentStatus: 'paid', paymentMethod: 'card',
  },
];

// ============================================================
// PLANS
// ============================================================

export const plans: Plan[] = [
  {
    id: 'plan-001',
    name: 'Starter',
    type: 'starter',
    price: 999,
    billingCycle: 'monthly',
    features: [
      'Up to 1 branch',
      'Up to 15 tables',
      'Up to 50 menu items',
      'Up to 5 staff accounts',
      'Basic analytics dashboard',
      'QR code generation',
      'Order management',
      'Email support',
    ],
    maxBranches: 1,
    maxTables: 15,
    maxMenuItems: 50,
    maxStaff: 5,
    isActive: true,
  },
  {
    id: 'plan-002',
    name: 'Professional',
    type: 'professional',
    price: 2499,
    billingCycle: 'monthly',
    features: [
      'Up to 3 branches',
      'Up to 50 tables per branch',
      'Unlimited menu items',
      'Up to 20 staff accounts',
      'Advanced analytics & reports',
      'QR code generation & customization',
      'Order management with live tracking',
      'Coupon & discount management',
      'Priority email & chat support',
      'Custom branding',
      'Payment gateway integration',
    ],
    maxBranches: 3,
    maxTables: 50,
    maxMenuItems: 999,
    maxStaff: 20,
    isActive: true,
  },
  {
    id: 'plan-003',
    name: 'Enterprise',
    type: 'enterprise',
    price: 4999,
    billingCycle: 'monthly',
    features: [
      'Unlimited branches',
      'Unlimited tables',
      'Unlimited menu items',
      'Unlimited staff accounts',
      'Full analytics suite with export',
      'Custom QR code designs',
      'Real-time order tracking & kitchen display',
      'Coupon, loyalty & reward programs',
      '24/7 dedicated support',
      'Full white-label branding',
      'Multi-payment gateway support',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
    maxBranches: 999,
    maxTables: 999,
    maxMenuItems: 9999,
    maxStaff: 999,
    isActive: true,
  },
];

// ============================================================
// SUBSCRIPTIONS
// ============================================================

export const subscriptions: Subscription[] = [
  {
    id: 'sub-001',
    restaurantId: 'rest-001',
    planId: 'plan-002',
    startDate: '2025-01-15T00:00:00Z',
    endDate: '2026-07-15T00:00:00Z',
    status: 'active',
    amount: 2499,
  },
  {
    id: 'sub-002',
    restaurantId: 'rest-002',
    planId: 'plan-003',
    startDate: '2025-01-20T00:00:00Z',
    endDate: '2026-07-20T00:00:00Z',
    status: 'active',
    amount: 4999,
  },
  {
    id: 'sub-003',
    restaurantId: 'rest-003',
    planId: 'plan-001',
    startDate: '2026-02-01T00:00:00Z',
    endDate: '2026-05-01T00:00:00Z',
    status: 'active',
    amount: 999,
  },
];

// ============================================================
// PAYMENTS
// ============================================================

export const payments: Payment[] = [
  { id: 'pay-001', orderId: 'ord-006', restaurantId: 'rest-001', amount: 1029.25, method: 'upi', status: 'completed', transactionId: 'UPI-2026032901234', createdAt: '2026-03-29T20:45:00Z' },
  { id: 'pay-002', orderId: 'ord-007', restaurantId: 'rest-001', amount: 1866.55, method: 'card', status: 'completed', transactionId: 'CARD-2026032905678', createdAt: '2026-03-29T14:30:00Z' },
  { id: 'pay-003', orderId: 'ord-012', restaurantId: 'rest-002', amount: 2972.3, method: 'card', status: 'completed', transactionId: 'CARD-2026032909012', createdAt: '2026-03-29T21:30:00Z' },
  { id: 'pay-004', orderId: 'ord-016', restaurantId: 'rest-003', amount: 1578.61, method: 'upi', status: 'completed', transactionId: 'UPI-2026032912345', createdAt: '2026-03-29T20:15:00Z' },
  { id: 'pay-005', orderId: 'ord-017', restaurantId: 'rest-003', amount: 1351.48, method: 'cash', status: 'completed', createdAt: '2026-03-28T14:15:00Z' },
  { id: 'pay-006', orderId: 'ord-018', restaurantId: 'rest-001', amount: 926.9, method: 'cash', status: 'completed', createdAt: '2026-03-27T21:10:00Z' },
  { id: 'pay-007', orderId: 'ord-019', restaurantId: 'rest-002', amount: 1353.55, method: 'upi', status: 'completed', transactionId: 'UPI-2026032716789', createdAt: '2026-03-27T20:30:00Z' },
  { id: 'pay-008', orderId: 'ord-020', restaurantId: 'rest-001', amount: 1659.45, method: 'card', status: 'completed', transactionId: 'CARD-2026032620123', createdAt: '2026-03-26T14:30:00Z' },
  { id: 'pay-009', orderId: 'ord-008', restaurantId: 'rest-001', amount: 492.2, method: 'upi', status: 'refunded', transactionId: 'UPI-2026032820456', createdAt: '2026-03-28T20:10:00Z' },
];

// ============================================================
// COUPONS
// ============================================================

export const coupons: Coupon[] = [
  {
    id: 'coupon-001',
    restaurantId: 'rest-001',
    code: 'SPICE20',
    description: 'Get 20% off on your first order at Spice Garden',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 500,
    maxDiscount: 300,
    validFrom: '2026-03-01T00:00:00Z',
    validTo: '2026-06-30T23:59:59Z',
    isActive: true,
    usageCount: 45,
    maxUsage: 200,
  },
  {
    id: 'coupon-002',
    restaurantId: 'rest-001',
    code: 'BIRYANI100',
    description: 'Flat Rs.100 off on any biryani order',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 300,
    validFrom: '2026-03-15T00:00:00Z',
    validTo: '2026-04-30T23:59:59Z',
    isActive: true,
    usageCount: 22,
    maxUsage: 100,
  },
  {
    id: 'coupon-003',
    restaurantId: 'rest-002',
    code: 'PIZZA15',
    description: '15% off on all pizzas at The Italian Corner',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 400,
    maxDiscount: 250,
    validFrom: '2026-03-01T00:00:00Z',
    validTo: '2026-05-31T23:59:59Z',
    isActive: true,
    usageCount: 38,
    maxUsage: 150,
  },
  {
    id: 'coupon-004',
    restaurantId: 'rest-002',
    code: 'ITALOVE250',
    description: 'Flat Rs.250 off on orders above Rs.1500',
    discountType: 'fixed',
    discountValue: 250,
    minOrderValue: 1500,
    validFrom: '2026-02-14T00:00:00Z',
    validTo: '2026-04-14T23:59:59Z',
    isActive: true,
    usageCount: 60,
    maxUsage: 100,
  },
  {
    id: 'coupon-005',
    restaurantId: 'rest-003',
    code: 'SUSHI10',
    description: '10% off on your order at Sushi Master',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 600,
    maxDiscount: 200,
    validFrom: '2026-03-01T00:00:00Z',
    validTo: '2026-06-30T23:59:59Z',
    isActive: true,
    usageCount: 15,
    maxUsage: 100,
  },
];

// ============================================================
// SUPPORT TICKETS
// ============================================================

export const supportTickets: SupportTicket[] = [
  {
    id: 'ticket-001',
    restaurantId: 'rest-001',
    restaurantName: 'Spice Garden',
    subject: 'QR code not scanning properly on Table 7',
    description: 'Customers at Table 7 in the MG Road branch are reporting that the QR code is not scanning correctly. We have tried reprinting it but the issue persists. The QR code leads to a 404 page.',
    status: 'open',
    priority: 'high',
    createdAt: '2026-03-29T14:00:00Z',
    updatedAt: '2026-03-29T14:00:00Z',
  },
  {
    id: 'ticket-002',
    restaurantId: 'rest-002',
    restaurantName: 'The Italian Corner',
    subject: 'Request to add custom font to digital menu',
    description: 'We would like to use our brand font "Playfair Display" for the digital menu displayed on customer devices. Is it possible to customize the font in our menu theme settings?',
    status: 'in_progress',
    priority: 'low',
    createdAt: '2026-03-27T10:00:00Z',
    updatedAt: '2026-03-28T09:30:00Z',
  },
  {
    id: 'ticket-003',
    restaurantId: 'rest-003',
    restaurantName: 'Sushi Master',
    subject: 'Payment reconciliation discrepancy for March',
    description: 'We noticed a discrepancy of Rs.2,340 between our dashboard revenue figures and the actual bank settlement for the period March 20-25. Need help reconciling the transactions.',
    status: 'in_progress',
    priority: 'urgent',
    createdAt: '2026-03-28T16:00:00Z',
    updatedAt: '2026-03-29T11:00:00Z',
  },
];

// ============================================================
// TAX CONFIGS
// ============================================================

export const taxConfigs: TaxConfig[] = [
  { id: 'tax-001', restaurantId: 'rest-001', name: 'GST', rate: 5, isActive: true },
  { id: 'tax-002', restaurantId: 'rest-002', name: 'GST', rate: 5, isActive: true },
  { id: 'tax-003', restaurantId: 'rest-003', name: 'GST', rate: 5, isActive: true },
];

// ============================================================
// DASHBOARD STATS
// ============================================================

export const spiceGardenStats: DashboardStats = {
  totalOrders: 1247,
  totalRevenue: 1856420,
  activeOrders: 5,
  avgOrderValue: 1488,
  todayOrders: 28,
  todayRevenue: 38640,
  popularItems: [
    { name: 'Butter Chicken', count: 342 },
    { name: 'Hyderabadi Chicken Biryani', count: 298 },
    { name: 'Paneer Butter Masala', count: 275 },
    { name: 'Garlic Naan', count: 890 },
    { name: 'Paneer Tikka', count: 210 },
    { name: 'Dal Makhani', count: 195 },
    { name: 'Mango Lassi', count: 320 },
    { name: 'Non-Veg Thali', count: 178 },
  ],
  ordersByStatus: {
    new: 2,
    accepted: 1,
    preparing: 1,
    ready: 1,
    served: 1,
    completed: 1238,
    cancelled: 3,
  },
  revenueByDay: [
    { date: '2026-03-24', revenue: 42350 },
    { date: '2026-03-25', revenue: 38920 },
    { date: '2026-03-26', revenue: 45680 },
    { date: '2026-03-27', revenue: 41200 },
    { date: '2026-03-28', revenue: 36890 },
    { date: '2026-03-29', revenue: 48750 },
    { date: '2026-03-30', revenue: 38640 },
  ],
};

export const italianCornerStats: DashboardStats = {
  totalOrders: 982,
  totalRevenue: 2145600,
  activeOrders: 4,
  avgOrderValue: 2185,
  todayOrders: 22,
  todayRevenue: 46200,
  popularItems: [
    { name: 'Margherita Pizza', count: 285 },
    { name: 'Spaghetti Carbonara', count: 220 },
    { name: 'Lasagna Bolognese', count: 198 },
    { name: 'Fettuccine Alfredo', count: 175 },
    { name: 'Tiramisu', count: 310 },
    { name: 'Pepperoni Pizza', count: 245 },
    { name: 'Mushroom Risotto', count: 160 },
    { name: 'Cappuccino', count: 480 },
  ],
  ordersByStatus: {
    new: 1,
    accepted: 0,
    preparing: 1,
    ready: 1,
    served: 0,
    completed: 976,
    cancelled: 3,
  },
  revenueByDay: [
    { date: '2026-03-24', revenue: 52400 },
    { date: '2026-03-25', revenue: 48200 },
    { date: '2026-03-26', revenue: 55800 },
    { date: '2026-03-27', revenue: 51300 },
    { date: '2026-03-28', revenue: 44900 },
    { date: '2026-03-29', revenue: 58100 },
    { date: '2026-03-30', revenue: 46200 },
  ],
};

export const sushiMasterStats: DashboardStats = {
  totalOrders: 678,
  totalRevenue: 1423500,
  activeOrders: 3,
  avgOrderValue: 2099,
  todayOrders: 18,
  todayRevenue: 35820,
  popularItems: [
    { name: 'Tonkotsu Ramen', count: 195 },
    { name: 'California Roll (8 pcs)', count: 178 },
    { name: 'Salmon Poke Bowl', count: 165 },
    { name: 'Dragon Roll (8 pcs)', count: 142 },
    { name: 'Sashimi Platter (12 pcs)', count: 98 },
    { name: 'Chicken Karaage', count: 188 },
    { name: 'Katsu Curry Rice', count: 155 },
    { name: 'Mochi Ice Cream (3 pcs)', count: 210 },
  ],
  ordersByStatus: {
    new: 0,
    accepted: 1,
    preparing: 1,
    ready: 0,
    served: 1,
    completed: 672,
    cancelled: 3,
  },
  revenueByDay: [
    { date: '2026-03-24', revenue: 38200 },
    { date: '2026-03-25', revenue: 34500 },
    { date: '2026-03-26', revenue: 41800 },
    { date: '2026-03-27', revenue: 36900 },
    { date: '2026-03-28', revenue: 32400 },
    { date: '2026-03-29', revenue: 42600 },
    { date: '2026-03-30', revenue: 35820 },
  ],
};

// Aggregated platform-wide stats for superadmin
export const platformStats: DashboardStats = {
  totalOrders: 2907,
  totalRevenue: 5425520,
  activeOrders: 12,
  avgOrderValue: 1866,
  todayOrders: 68,
  todayRevenue: 120660,
  popularItems: [
    { name: 'Butter Chicken', count: 342 },
    { name: 'Margherita Pizza', count: 285 },
    { name: 'Mango Lassi', count: 320 },
    { name: 'Tiramisu', count: 310 },
    { name: 'Hyderabadi Chicken Biryani', count: 298 },
    { name: 'Pepperoni Pizza', count: 245 },
    { name: 'Mochi Ice Cream (3 pcs)', count: 210 },
    { name: 'Tonkotsu Ramen', count: 195 },
  ],
  ordersByStatus: {
    new: 3,
    accepted: 2,
    preparing: 3,
    ready: 2,
    served: 2,
    completed: 2886,
    cancelled: 9,
  },
  revenueByDay: [
    { date: '2026-03-24', revenue: 132950 },
    { date: '2026-03-25', revenue: 121620 },
    { date: '2026-03-26', revenue: 143280 },
    { date: '2026-03-27', revenue: 129400 },
    { date: '2026-03-28', revenue: 114190 },
    { date: '2026-03-29', revenue: 149450 },
    { date: '2026-03-30', revenue: 120660 },
  ],
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getBranchesByRestaurant(restaurantId: string): Branch[] {
  return branches.filter((b) => b.restaurantId === restaurantId);
}

export function getTablesByBranch(branchId: string): Table[] {
  return tables.filter((t) => t.branchId === branchId);
}

export function getCategoriesByRestaurant(restaurantId: string): Category[] {
  return categories.filter((c) => c.restaurantId === restaurantId);
}

export function getMenuItemsByCategory(categoryId: string): MenuItem[] {
  return menuItems.filter((m) => m.categoryId === categoryId);
}

export function getMenuItemsByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter((m) => m.restaurantId === restaurantId);
}

export function getOrdersByRestaurant(restaurantId: string): Order[] {
  return orders.filter((o) => o.restaurantId === restaurantId);
}

export function getOrdersByStatus(status: Order['status'], restaurantId?: string): Order[] {
  return orders.filter((o) => o.status === status && (!restaurantId || o.restaurantId === restaurantId));
}

export function getActiveOrders(restaurantId?: string): Order[] {
  const activeStatuses: Order['status'][] = ['new', 'accepted', 'preparing', 'ready', 'served'];
  return orders.filter((o) => activeStatuses.includes(o.status) && (!restaurantId || o.restaurantId === restaurantId));
}

export function getCouponsByRestaurant(restaurantId: string): Coupon[] {
  return coupons.filter((c) => c.restaurantId === restaurantId);
}

export function getStaffByRestaurant(restaurantId: string): User[] {
  return users.filter((u) => u.restaurantId === restaurantId);
}

export function getStatsForRestaurant(restaurantId: string): DashboardStats {
  switch (restaurantId) {
    case 'rest-001': return spiceGardenStats;
    case 'rest-002': return italianCornerStats;
    case 'rest-003': return sushiMasterStats;
    default: return platformStats;
  }
}

export function getPlanById(planId: string): Plan | undefined {
  return plans.find((p) => p.id === planId);
}

export function getSubscriptionByRestaurant(restaurantId: string): Subscription | undefined {
  return subscriptions.find((s) => s.restaurantId === restaurantId);
}
