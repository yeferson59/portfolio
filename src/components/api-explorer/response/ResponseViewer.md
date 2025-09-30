# ResponseViewer Component Documentation

## Overview
The ResponseViewer is a comprehensive component for displaying API responses with enhanced visualization, performance optimizations, and interactive features. It's designed to handle everything from simple JSON responses to large, complex data structures.

## Features

### ✅ Core Functionality
- **Multi-tab Interface**: Body, Headers, and Raw views
- **JSON Formatting**: Pretty-printed with syntax highlighting
- **Copy Functionality**: Copy entire response or individual sections
- **Search & Filter**: Real-time header filtering
- **Export Options**: Download responses as JSON files
- **Performance Optimizations**: Smart truncation for large objects

### ✅ Performance Features
- **Large Object Detection**: Automatically detects responses >50KB
- **Smart Truncation**: Shows first 50 + last 25 items in large arrays
- **Lazy Loading**: Expand full content on demand
- **Memory Optimization**: Prevents browser freezing on massive responses
- **Scroll-based Warnings**: Performance alerts for very large content

### ✅ User Experience
- **Loading States**: Animated spinner during requests
- **Error Handling**: Clear error messages with retry options
- **Empty States**: Helpful placeholders when no data is available
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG 2.1 AA compliant

## Props Interface

```typescript
interface Props {
  result?: APIRequestResult;  // The API response data
  loading?: boolean;          // Loading state
  error?: string;            // Error message if request failed
  className?: string;        // Additional CSS classes
}
```

## APIRequestResult Structure

```typescript
interface APIRequestResult {
  request: APIRequest;
  response?: APIResponse;
  metrics: PerformanceMetrics;
  timestamp: string;
  success: boolean;
  error?: string;
}
```

## Usage Examples

### Basic Usage
```astro
---
import ResponseViewer from './ResponseViewer.astro';
---

<ResponseViewer result={apiResult} />
```

### With Loading State
```astro
<ResponseViewer loading={true} />
```

### With Error State
```astro
<ResponseViewer error="Connection timeout" />
```

### With Custom Styling
```astro
<ResponseViewer 
  result={apiResult} 
  className="custom-response-viewer" 
/>
```

## Component Architecture

### Tab Structure
1. **Body Tab**
   - JSON formatted content
   - Performance warnings for large objects
   - Expand/collapse functionality
   - Copy to clipboard

2. **Headers Tab**
   - Searchable table format
   - Individual header copying
   - Response metadata display

3. **Raw Tab**
   - Complete unformatted response
   - Download functionality
   - Text wrapping controls
   - Size information

### Performance Thresholds
- **Large Object**: >50KB
- **Very Large**: >1MB
- **Array Truncation**: >100 items
- **Object Truncation**: >50 properties
- **Max Depth**: 3 levels for display

## Event Handlers

The component includes several interactive features:

### Copy Operations
- `data-copy-body`: Copy formatted JSON body
- `data-copy-headers`: Copy all headers
- `data-copy-header`: Copy individual header
- `data-copy-raw`: Copy raw response

### View Controls
- `data-format-toggle`: Toggle JSON formatting
- `data-toggle-wrap`: Toggle text wrapping
- `data-expand-all`: Show full large object
- `data-collapse-all`: Return to truncated view

### Export Features
- `data-download-response`: Download as JSON file
- `data-export-response`: Export response data
- `data-clear-response`: Clear current response

## CSS Custom Properties

The component uses CSS custom properties for theming:

```css
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
  --color-primary: #3b82f6;
  --color-primary-rgb: 59, 130, 246;
}
```

## Browser Compatibility

### Clipboard API Support
- **Modern Browsers**: Uses `navigator.clipboard.writeText()`
- **Legacy Fallback**: Uses `document.execCommand('copy')`
- **Mobile Support**: Full iOS/Android compatibility

### Performance Features
- **Intersection Observer**: For lazy loading (IE11+ polyfill available)
- **ResizeObserver**: For responsive adjustments (polyfilled)
- **CSS Grid**: Fallback to flexbox for older browsers

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Color Contrast**: Meets AA standards (4.5:1 ratio minimum)
- **Focus Management**: Clear focus indicators and logical tab order

### Screen Reader Announcements
- Status changes announced
- Loading states communicated
- Error messages read aloud
- Success confirmations provided

## Testing Scenarios

### Functional Tests
1. **Basic Display**: Verify all tabs render correctly
2. **Copy Operations**: Test clipboard functionality
3. **Search Filter**: Validate header filtering
4. **Export Features**: Confirm file downloads
5. **Error Handling**: Test error states and recovery

### Performance Tests
1. **Large Objects**: Test with 1MB+ responses
2. **Deep Nesting**: Verify truncation at depth limits
3. **Long Arrays**: Test array truncation >100 items
4. **Memory Usage**: Monitor browser memory consumption
5. **Scroll Performance**: Test smooth scrolling in large content

### Cross-Browser Tests
1. **Chrome**: Full feature support
2. **Firefox**: Verify clipboard fallback
3. **Safari**: Test iOS compatibility
4. **Edge**: Validate legacy support
5. **Mobile Browsers**: Responsive behavior

## Common Issues & Solutions

### Issue: Large responses freeze browser
**Solution**: The component automatically truncates large objects and provides expand-on-demand functionality.

### Issue: Clipboard not working in older browsers
**Solution**: Automatic fallback to `document.execCommand()` for IE11 and older mobile browsers.

### Issue: Headers not filtering properly
**Solution**: Ensure header names are properly lowercase-normalized for case-insensitive search.

### Issue: Download not working
**Solution**: Check that the browser supports Blob URLs and the download attribute.

## Future Enhancements

### Planned Features
- **Syntax Highlighting**: Color-coded JSON with themes
- **Virtual Scrolling**: For extremely large arrays
- **Response Diffing**: Compare multiple responses
- **Schema Validation**: Validate against OpenAPI specs
- **Response History**: Navigate through previous responses

### Integration Opportunities
- **Code Generation**: Auto-generate client code from responses
- **API Documentation**: Link to endpoint documentation
- **Performance Monitoring**: Detailed metrics and analytics
- **Testing Integration**: Generate test cases from responses

## Dependencies

### Runtime Dependencies
- None (vanilla JavaScript/TypeScript)

### Development Dependencies
- Astro framework
- TypeScript
- CSS custom properties support

## Contributing

When contributing to the ResponseViewer component:

1. **Performance First**: Ensure changes don't impact large object handling
2. **Accessibility**: Test with screen readers and keyboard navigation
3. **Browser Support**: Verify compatibility across target browsers
4. **Documentation**: Update this file with any new features or changes
5. **Testing**: Add appropriate test cases for new functionality

## Version History

### v1.0.0 (Current)
- Initial implementation with all core features
- Performance optimizations for large objects
- Full accessibility support
- Comprehensive error handling
- Mobile-responsive design

---

*This component is part of the Interactive API Explorer project and follows the design patterns established in the NEXT_STEPS.md planning document.*