# Teacher Dashboard - Hierarchical Navigation System

## Overview

The Teacher Dashboard now features a comprehensive hierarchical navigation system that allows users to drill down from main modules to detailed sub-modules, with breadcrumb navigation showing the path: **Teacher Portal > Main Module > Detail Module**.

## Navigation Structure

### Main Modules

- **Dashboard** - Overview and statistics
- **Attendance** - Attendance management with hierarchical views ✅
- **Grades** - Grade management with department and subject drill-downs ✅
- **Classes** - Class management with hierarchical navigation ✅
- **Students** - Student management with detailed profiles ✅
- **Assignments** - Assignment management with department and detail views ✅
- **Leaves** - Leave approval system with hierarchical organization ✅
- **Schedule** - Class scheduling with detailed views ✅

### Hierarchical Navigation Examples

#### Attendance Module Navigation Flow:

1. **Teacher Portal > Attendance** (Main View)

   - Overview statistics
   - Department list with navigation buttons
   - Subject list with navigation buttons

2. **Teacher Portal > Attendance > Computer Science Department** (Sub-Module)

   - Department-specific statistics
   - Subject breakdown within department
   - Quick student overview
   - Navigation to detailed views

3. **Teacher Portal > Attendance > Computer Science Department > Programming Details** (Detail Module)
   - Detailed student attendance for specific subject
   - Individual student records
   - Action buttons for each student

#### Classes Module Navigation Flow:

1. **Teacher Portal > Classes** (Main View)

   - Department overview cards (clickable)
   - Classes overview statistics
   - Quick class preview by department

2. **Teacher Portal > Classes > Computer Science Classes** (Sub-Module)

   - Department-specific class statistics
   - All classes in department
   - Performance metrics

3. **Teacher Portal > Classes > Programming Details** (Detail Module)
   - Class-specific information
   - Performance analysis
   - Management actions

#### Students Module Navigation Flow:

1. **Teacher Portal > Students** (Main View)

   - Overall student statistics
   - Department overview cards (clickable)
   - Quick student preview by department

2. **Teacher Portal > Students > Computer Science Students** (Sub-Module)

   - Department student statistics
   - Complete student table
   - Performance metrics

3. **Teacher Portal > Students > John Doe Profile** (Detail Module)
   - Complete student profile
   - Academic performance details
   - Personal information and subjects

#### Assignments Module Navigation Flow:

1. **Teacher Portal > Assignments** (Main View)

   - Assignment overview statistics
   - Department navigation cards
   - Recent assignments list

2. **Teacher Portal > Assignments > Computer Science Assignments** (Sub-Module)

   - Department assignment statistics
   - All assignments in department
   - Submission progress tracking

3. **Teacher Portal > Assignments > Programming Quiz 1 Details** (Detail Module)
   - Assignment-specific information
   - Submission progress analysis
   - Management actions

#### Leaves Module Navigation Flow:

1. **Teacher Portal > Leaves** (Main View)

   - Leave overview statistics
   - Department navigation cards
   - Pending leave approvals

2. **Teacher Portal > Leaves > Computer Science Leaves** (Sub-Module)

   - Department leave statistics
   - All students with leave requests
   - Department-specific pending leaves

3. **Teacher Portal > Leaves > John Doe Leave Request** (Detail Module)
   - Complete leave request details
   - Student information
   - Approval/rejection actions

#### Schedule Module Navigation Flow:

1. **Teacher Portal > Schedule** (Main View)

   - Schedule overview statistics
   - Department navigation cards
   - Weekly schedule preview

2. **Teacher Portal > Schedule > Computer Science Schedule** (Sub-Module)

   - Department schedule statistics
   - Classes by day breakdown
   - Department-specific schedule

3. **Teacher Portal > Schedule > Programming Class Details** (Detail Module)
   - Class schedule information
   - Management actions
   - Quick actions for class operations

## Key Features

### 1. Breadcrumb Navigation

- Shows current location: "Teacher Portal > Module > Sub-Module"
- Clickable breadcrumbs for easy navigation back to any level
- Back button for quick return to previous level

### 2. Context-Aware Navigation

- Each module maintains its own navigation state
- Data is passed between navigation levels
- Smooth transitions between views

### 3. Modular Architecture

- Each module is self-contained
- Navigation context is shared across modules
- Easy to extend with new modules

### 4. Consistent Interface

- Standardized navigation patterns across all modules
- Consistent card layouts and interaction patterns
- Unified design language throughout

## Technical Implementation

### Navigation Context

```javascript
// NavigationProvider manages the navigation stack
const {
  navigateToModule, // Navigate to main module
  navigateToSubModule, // Navigate to sub-module
  navigateToDetailModule, // Navigate to detail module
  navigateBack, // Go back one level
  getBreadcrumbs, // Get breadcrumb trail
} = useNavigation();
```

### Module Structure

```
src/pages/TeacherDashboard/
├── context/
│   └── NavigationContext.js     # Navigation state management
├── components/
│   ├── BreadcrumbNavigation.js  # Breadcrumb component
│   ├── AttendanceModule.js      # Hierarchical attendance views ✅
│   ├── GradesModule.js          # Hierarchical grades views ✅
│   ├── ClassesModule.js         # Hierarchical classes views ✅
│   ├── StudentsModule.js        # Hierarchical students views ✅
│   ├── AssignmentsModule.js     # Hierarchical assignments views ✅
│   ├── LeavesModule.js          # Hierarchical leaves views ✅
│   ├── ScheduleModule.js        # Hierarchical schedule views ✅
│   └── DashboardOverview.js     # Main dashboard overview
└── index.js                     # Main dashboard with NavigationProvider
```

### Usage Example

```javascript
// In a module component
const { navigateToSubModule } = useNavigation();

// Navigate to sub-module with data
<button
  onClick={() =>
    navigateToSubModule(
      'attendance-department',
      'Computer Science Department',
      {
        department: 'Computer Science',
        students: deptStudents,
      }
    )
  }
>
  View Department Details
</button>;
```

## Implementation Status

✅ **COMPLETED**: All modules now have hierarchical navigation implemented:

- **Attendance Module**: Complete with department and subject drill-downs
- **Grades Module**: Complete with department and subject analysis
- **Classes Module**: Complete with department and class detail views
- **Students Module**: Complete with department and student profile views
- **Assignments Module**: Complete with department and assignment detail views
- **Leaves Module**: Complete with department and leave request detail views
- **Schedule Module**: Complete with department, day, and class detail views

## Benefits

1. **Improved User Experience**: Clear navigation path with breadcrumbs
2. **Better Organization**: Logical hierarchy from overview to details
3. **Maintainable Code**: Modular structure with shared navigation context
4. **Scalable Architecture**: Easy to add new modules and navigation levels
5. **Consistent Interface**: Standardized navigation patterns across all modules
6. **Enhanced Productivity**: Quick access to detailed information at any level

## Navigation Patterns

### Three-Level Hierarchy

1. **Main Module**: Overview with statistics and navigation options
2. **Sub-Module**: Category-specific views (e.g., department-wise)
3. **Detail Module**: Individual item details with actions

### Data Flow

- Data is passed down through navigation levels
- Context maintains navigation state and data
- Each level can access relevant information for its scope

### User Interactions

- Click on cards/buttons to navigate deeper
- Use breadcrumbs to jump to any previous level
- Back button for quick return to previous level
- Consistent interaction patterns across all modules

## Future Enhancements

- Add search functionality within each navigation level
- Implement filters and sorting options
- Add export functionality at each navigation level
- Implement deep linking for direct access to sub-modules
- Add keyboard shortcuts for navigation
- Implement module-specific bulk actions
