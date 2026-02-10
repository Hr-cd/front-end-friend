
# KMRL Document Management System
**A professional document overload solution for Kochi Metro Rail Limited staff**

## Design Direction
- **Professional & Corporate** style with clean layouts
- KMRL brand-aligned color scheme (blues/teals with professional accents)
- Responsive design optimized for desktop (primary) with tablet support

---

## Pages & Features

### 1. Dashboard (Home)
- **Stats overview cards**: Total documents, pending approvals, approved, rejected
- **Recent activity feed**: Latest document uploads, approvals, and comments
- **Quick action buttons**: Upload new document, view pending approvals
- **Charts**: Document status breakdown (pie/donut chart), upload trends over time (line/bar chart)

### 2. Documents List
- **Table/grid view** of all documents with columns: name, category, status (pending/approved/rejected), uploaded by, date, actions
- **Search bar** with real-time filtering
- **Filter options**: By status, category, date range, uploaded by
- **Sort options**: By date, name, status
- **Bulk actions**: Select multiple documents for batch operations
- **Upload button**: Opens document upload dialog

### 3. Document Detail View (Modal or sub-page)
- Document preview/download
- Metadata display (category, tags, uploaded by, date)
- **Approval workflow panel**: Approve/reject buttons with comment input
- Approval history and comments timeline

### 4. Document Upload Dialog
- Drag-and-drop file upload area
- Category selection and tagging
- Description/notes field
- Assign reviewers (optional)

---

## API Integration
Since your backend handles authentication and data, the frontend will:
- Use login/auth token from your REST API
- Fetch documents, stats, and user data via your API endpoints
- Send uploads and approval actions to your API
- We'll set up a clean API service layer so you can easily plug in your endpoints

## Navigation
- **Top header** with KMRL branding, search, notifications bell, and user avatar/menu
- **Sidebar** with navigation: Dashboard, Documents, and Settings links
