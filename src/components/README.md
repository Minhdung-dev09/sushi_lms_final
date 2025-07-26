# Component Structure

## Course Page Components (`/course-page/`)

### `index.jsx` - Main Course Page Component

- **Props**: `studentViewCoursesList`, `loadingState`, `filters`, `setFilters`, `search`, `setSearch`, `sort`, `setSort`, `handleCourseNavigate`
- **Responsibility**: Main container component that orchestrates the course page layout
- **Features**:
  - Manages sidebar visibility state
  - Handles course filtering logic
  - Renders responsive layout

### `course-grid.jsx` - Course Grid Component

- **Props**: `courses`, `loadingState`, `onCourseClick`
- **Responsibility**: Displays courses in a responsive grid layout
- **Features**:
  - Loading skeleton states
  - Empty state handling
  - Course cards with hover effects
  - Course information display (title, instructor, lessons, rating, price)

### `course-toolbar.jsx` - Course Toolbar Component

- **Props**: `sort`, `setSort`, `filteredCoursesCount`
- **Responsibility**: Displays sorting options and course count
- **Features**:
  - Sort dropdown menu
  - Course count display

### `course-sidebar.jsx` - Course Sidebar Component

- **Props**: `showSidebar`, `setShowSidebar`, `search`, `setSearch`, `filters`, `setFilters`, `totalCourses`, `filteredCoursesCount`
- **Responsibility**: Sidebar with search and filter options
- **Features**:
  - Search input
  - Filter checkboxes
  - Statistics display
  - Mobile responsive with overlay

## Blog Page Components (`/blog-page/`)

### `index.jsx` - Main Blog Page Component

- **Props**: `posts`, `onPostClick`
- **Responsibility**: Main container component that orchestrates the blog page layout
- **Features**:
  - Manages sidebar visibility state
  - Handles post filtering logic (search, category, tags)
  - Renders responsive layout

### `blog-grid.jsx` - Blog Grid Component

- **Props**: `posts`, `onPostClick`
- **Responsibility**: Displays blog posts in a responsive grid layout
- **Features**:
  - Empty state handling
  - Blog post cards with hover effects
  - Post information display (title, category, date, author, summary)

### `blog-sidebar.jsx` - Blog Sidebar Component

- **Props**: `showSidebar`, `setShowSidebar`, `searchTerm`, `setSearchTerm`, `selectedCategory`, `setSelectedCategory`, `selectedTags`, `setSelectedTags`, `handleTagToggle`, `totalPosts`, `filteredPostsCount`
- **Responsibility**: Sidebar with search, category, and tag filters
- **Features**:
  - Search input
  - Category selection
  - Tag selection with toggle functionality
  - Statistics display
  - Mobile responsive with overlay

## Benefits of This Structure

### 1. **Separation of Concerns**

- Each component has a single responsibility
- Logic is separated from presentation
- Easy to test individual components

### 2. **Reusability**

- Components can be reused across different pages
- Props-based configuration makes components flexible
- Consistent UI patterns across the application

### 3. **Maintainability**

- Easy to locate and modify specific functionality
- Changes to one component don't affect others
- Clear component hierarchy

### 4. **Performance**

- Components can be optimized individually
- Lazy loading can be implemented at component level
- Memoization can be applied where needed

### 5. **Developer Experience**

- Clear file structure
- Easy to understand component relationships
- Consistent naming conventions

## Usage Examples

### Course Page

```jsx
<CoursePage
  studentViewCoursesList={courses}
  loadingState={loading}
  filters={filters}
  setFilters={setFilters}
  search={search}
  setSearch={setSearch}
  sort={sort}
  setSort={setSort}
  handleCourseNavigate={handleNavigate}
/>
```

### Blog Page

```jsx
<BlogPage posts={posts} onPostClick={handlePostClick} />
```

## Home Page Components (`/home-page/`)

### `home-sidebar.jsx` - Home Sidebar Component

- **Props**: `onPostClick`
- **Responsibility**: Sidebar for homepage with ads and latest posts
- **Features**:
  - Google AdSense placeholder (300x250)
  - Top 5 latest blog posts with ranking
  - Responsive design

## UI Components

### `floating-contact.jsx` - Floating Contact Button
- **Props**: None
- **Responsibility**: Floating contact button with social media links
- **Features**:
  - Fixed position at bottom-right corner
  - Expandable social media buttons (Zalo, Facebook, Instagram)
  - Auto-hide tooltip
  - Smooth animations and hover effects
  - Uses Ant Design icons

## File Structure

```
src/components/
├── course-page/
│   ├── index.jsx
│   ├── course-grid.jsx
│   ├── course-toolbar.jsx
│   └── course-sidebar.jsx
├── blog-page/
│   ├── index.jsx
│   ├── blog-grid.jsx
│   └── blog-sidebar.jsx
├── home-page/
│   └── home-sidebar.jsx
├── ui/
│   ├── floating-contact.jsx
│   └── ... (other UI components)
└── README.md
```
