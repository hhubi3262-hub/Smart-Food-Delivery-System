# Menu Images Guide

## 📸 Image Requirements

### File Format
- **Format:** JPG or PNG
- **Size:** 500x500px minimum (Square format preferred)
- **Quality:** High resolution, well-lit photos
- **File Size:** Under 500KB for fast loading

### Naming Convention
Images should match the database `imageUrl` field. Use kebab-case (lowercase with hyphens).

## 📋 Required Images (40 Total)

### Ethiopian Main Courses (18 images)
1. `asham-vip.jpg` - Premium Ethiopian platter (250 AED)
2. `shekla-tibs.jpg` - Spicy beef cubes (50.50 AED)
3. `gomen-besega.jpg` - Collard greens with beef (45 AED)
4. `misir-wot.jpg` - Red lentil stew (40.50 AED)
5. `asham-shiro.jpg` - Chickpea stew (35 AED)
6. `asham-combo.jpg` - Mixed platter (80 AED)
7. `asham-mehaber-atwi.jpg` - Large sharing platter (80 AED)
8. `asham-dinot.jpg` - Mixed vegetable stew (80 AED)
9. `asham-doro.jpg` - Chicken stew (30 AED)
10. `goden-firfir.jpg` - Fermented injera mix (35 AED)
11. `bozena-shiro.jpg` - Chickpea with beef (30 AED)
12. `chikina-tibs.jpg` - Lean beef sauté (30 AED)
13. `doro-tibs.jpg` - Sautéed chicken (30 AED)
14. `enkula-firfir.jpg` - Scrambled injera (20 AED)
15. Plus other Ethiopian dishes...

### Pasta Dishes (4 images)
1. `spaghetti-bolognese.jpg` - Classic meat sauce pasta (38 AED)
2. `pasta-carbonara.jpg` - Creamy bacon pasta (42 AED)
3. `penne-arrabbiata.jpg` - Spicy tomato pasta (36 AED)
4. `fettuccine-alfredo.jpg` - Creamy white sauce (40 AED)

### Breakfast Items (4 images)
1. `breakfast-sandwich.jpg` - Eggs, cheese, meat (25 AED)
2. `full-english-breakfast.jpg` - Complete breakfast (45 AED)
3. `pancakes.jpg` - With maple syrup (28 AED)

### Beverages (8 images)
1. `ethiopian-coffee.jpg` - Traditional ceremony style (18 AED)
2. `cappuccino.jpg` - Italian coffee (16 AED)
3. `latte.jpg` - Smooth espresso with milk (17 AED)
4. `espresso.jpg` - Strong shot (12 AED)
5. `orange-juice.jpg` - Fresh squeezed (15 AED)
6. `mango-juice.jpg` - Sweet and refreshing (16 AED)
7. `coca-cola.jpg` - Soft drink (8 AED)
8. `mineral-water.jpg` - Pure water (5 AED)

### Desserts (2 images)
1. `tiramisu.jpg` - Italian coffee dessert (28 AED)
2. `baklava.jpg` - Sweet pastry with nuts (22 AED)

### Snacks (2 images)
1. `doritos.jpg` - Tortilla chips (12 AED)
2. `potato-chips.jpg` - Classic chips (10 AED)

## 📷 Photography Tips

### Lighting
- Use natural daylight when possible
- Avoid harsh shadows
- Use white or neutral background

### Styling
- Show the dish attractively plated
- Include garnishes and presentation
- Fill most of the frame with food
- Use props sparingly (plate, utensils)

### Angle
- 45-degree angle works best for most dishes
- Overhead (flat lay) for platters
- Eye-level for tall items (drinks, stacks)

## 🚀 How to Add Images

1. **Take/Get Photos:** Photograph actual dishes or use stock photos
2. **Edit:** Crop to square, adjust brightness/contrast
3. **Resize:** 500x500px or 1000x1000px
4. **Optimize:** Compress to under 500KB
5. **Save:** Use exact filename from this list
6. **Upload:** Place in this folder (`client/public/images/menu/`)

## 🎨 Placeholder System

Currently using emoji placeholders:
- 🍽️ = General food
- ☕ = Coffee/beverages
- 🍰 = Desserts
- 🍟 = Snacks

Replace these with real photos for better presentation!

## 🔗 Image URLs in Database

Images are referenced in database as:
```
/images/menu/[filename].jpg
```

Example:
```sql
imageUrl: '/images/menu/shekla-tibs.jpg'
```

## ✅ Quick Checklist

- [ ] Take photos of all 40 menu items
- [ ] Edit and crop to square format
- [ ] Optimize file sizes
- [ ] Name files correctly (kebab-case)
- [ ] Upload to this folder
- [ ] Test menu page display
- [ ] Verify images load correctly

## 📞 Need Stock Images?

Free stock photo sites:
- Unsplash.com (search: ethiopian food, pasta, coffee)
- Pexels.com
- Pixabay.com

**Note:** Stock photos are temporary. Use real photos of your actual dishes for best results!
