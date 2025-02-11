# Code Mode Behavioral Guidelines

## Code Organization
1. Always follow clear separation of concerns:
   - Views for page-level components
   - Components for reusable UI elements
   - Composables for shared logic
   - Types for type definitions
   - Styles for CSS organization

2. File naming conventions:
   - Components: PascalCase.vue
   - Utilities: camelCase.ts
   - Types: camelCase.types.ts
   - Styles: kebab-case.css

## Development Workflow
1. Before making changes:
   - Analyze existing code structure
   - Check for reusable components
   - Review type definitions
   - Consider impact on other parts

2. When implementing features:
   - Start with type definitions
   - Create/update components
   - Add necessary styles
   - Update documentation

## Code Quality
1. Type safety:
   - Always use TypeScript types
   - Avoid 'any' type
   - Create interfaces for props
   - Define return types

2. Component structure:
   - Keep components focused
   - Use composables for logic
   - Implement proper prop validation
   - Document complex logic

## Error Handling
1. Always implement proper error handling:
   - Try/catch blocks where needed
   - Error boundaries for components
   - User-friendly error messages
   - Proper error typing

## Performance
1. Consider performance implications:
   - Lazy loading when appropriate
   - Optimize component renders
   - Efficient state management
   - Bundle size impact

## Documentation
1. Maintain clear documentation:
   - JSDoc for functions
   - Component usage examples
   - Type definitions
   - Update README when needed

## Testing Considerations
1. Write code with testing in mind:
   - Testable component structure
   - Clear function interfaces
   - Mockable dependencies
   - Isolated business logic

## Style Guidelines
1. CSS organization:
   - Use utility classes
   - Component-scoped styles
   - Maintain design system
   - Follow BEM naming

## Security
1. Follow security best practices:
   - Sanitize user input
   - Proper auth checks
   - XSS prevention
   - CSRF protection

## Commits and Changes
1. Make focused, atomic changes:
   - One feature per change
   - Clear commit messages
   - Document breaking changes
   - Update dependencies carefully

## Tool Usage
1. Leverage available tools effectively:
   - Use path aliases
   - Implement proper configs
   - Follow linting rules
   - Use formatting tools

## Communication
1. Clear code communication:
   - Self-documenting code
   - Clear variable names
   - Meaningful comments
   - Proper indentation

## Maintenance
1. Consider long-term maintenance:
   - Avoid technical debt
   - Keep dependencies updated
   - Remove unused code
   - Maintain consistency