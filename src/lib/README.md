# Image Management Utility

## Tổng quan

File `images.js` trong thư mục `src/lib/` được tạo để quản lý tất cả hình ảnh trong ứng dụng một cách nhất quán và an toàn.

## Vấn đề đã giải quyết

- **Hiển thị hình ảnh không đồng nhất**: Trước đây, hình ảnh có thể hiển thị trên máy này nhưng không hiển thị trên máy khác
- **Đường dẫn không an toàn**: Sử dụng đường dẫn tương đối có thể gây lỗi trên các môi trường khác nhau
- **Thiếu xử lý lỗi**: Khi hình ảnh không load được, không có fallback

## Cách sử dụng

### 1. Import utility

```javascript
import { images, handleImageError } from "@/lib/images";
```

### 2. Sử dụng hình ảnh

```javascript
// Thay vì: src="/banners-img.jpg"
// Sử dụng: src={images.banner.jpg}
<img src={images.banner.jpg} alt="background" />
```

### 3. Xử lý lỗi

```javascript
<img
  src={images.banner.jpg}
  alt="background"
  onError={(e) => handleImageError(e, "#1e293b")}
/>
```

## Các hình ảnh có sẵn

### Banner images

- `images.banner.jpg` - Banner chính (JPG format)
- `images.banner.png` - Banner chính (PNG format)
- `images.banner.get()` - Tự động chọn format phù hợp

### Other images

- `images.ads` - Hình ảnh quảng cáo
- `images.bannerSvg` - Banner SVG
- `images.animation` - Animation GIF
- `images.spinner` - Loading spinner
- `images.viteLogo` - Vite logo

## Helper functions

### `getImage(imageKey, fallbackColor)`

Lấy hình ảnh với xử lý lỗi tự động:

```javascript
const imageSrc = getImage("banner", "#1e293b");
```

### `handleImageError(e, fallbackColor)`

Xử lý lỗi khi hình ảnh không load được:

```javascript
onError={(e) => handleImageError(e, '#1e293b')}
```

## Lợi ích

1. **Tính nhất quán**: Tất cả hình ảnh được quản lý từ một nơi
2. **Xử lý lỗi tốt hơn**: Có fallback khi hình ảnh không load được
3. **Dễ bảo trì**: Chỉ cần thay đổi một chỗ để cập nhật tất cả
4. **Tương thích tốt**: Hoạt động trên tất cả các môi trường

## Migration Guide

Để chuyển đổi từ đường dẫn cũ sang utility mới:

1. **Thay thế import**:

   ```javascript
   // Cũ
   // Không cần import gì

   // Mới
   import { images, handleImageError } from "@/lib/images";
   ```

2. **Thay thế src**:

   ```javascript
   // Cũ
   src="/banners-img.jpg"

   // Mới
   src={images.banner.jpg}
   ```

3. **Thêm error handling**:

   ```javascript
   // Cũ
   <img src="/banners-img.jpg" alt="background" />

   // Mới
   <img
     src={images.banner.jpg}
     alt="background"
     onError={(e) => handleImageError(e, '#1e293b')}
   />
   ```
