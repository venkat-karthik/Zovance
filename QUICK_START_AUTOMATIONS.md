# Automations Feature - Quick Start Guide

## 🚀 Quick Launch

### 1. Rebuild the Catalog (if needed)
```bash
cd /Users/venkatkarthik/Desktop/Zovance
python3 parse_workflows.py
```
✅ Generates: `public/n8n_workflows_data.json` (9,502 workflows)

### 2. Build Production Bundle
```bash
npm run build
```
✅ Creates: `dist/` folder ready for deployment

### 3. Test Locally
```bash
npm run dev
# Visit: http://localhost:5173/automations
```

---

## 📂 Key Files & What They Do

| File | Purpose | Status |
|------|---------|--------|
| `src/pages/website/AutomationsPage.jsx` | Main page with search & booking | ✅ NEW |
| `public/n8n_workflows_data.json` | 9,502 workflow catalog | ✅ Auto-generated |
| `parse_workflows.py` | Parser with null-safety fixes | ✅ FIXED |
| `dashboard_template.html` | Dashboard with safety checks | ✅ FIXED |
| `src/services/bookingsService.js` | Booking backend | ✅ Existing |
| `src/services/emailHelper.js` | Dual-dispatch emails | ✅ Existing |
| `api/sendEmail.js` | Email API handler | ✅ Existing |

---

## 🎯 Feature Overview

### Search & Discovery
- **Direct Match:** Search 9,502 workflows by title, category, tools
- **Dynamic Fallback:** No match? Auto-generates custom integration card
- **Real-time:** Results update as you type

### Booking Integration
- **Beautiful Form:** Collects name, email, company, date/time, requirements
- **Firestore Persistence:** Saves to `bookings` collection
- **Dual-Email System:** Sends to admin + client automatically
- **Google Calendar:** 1-click setup with pre-filled details + Google Meet

### Email Delivery
```
User submits → Firestore saved → Dual-dispatch emails:
  1. /api/sendEmail (Nodemailer - instant)
  2. FormSubmit.co (fallback - guaranteed)
```

---

## 🔗 Navigation Paths

### Desktop Navigation
**Top Menu Bar:**
- Home, Services, Solutions, **Automations**, Pricing, Blog, About, Contact

### Mobile Navigation
**Bottom Tab Bar:**
- Home, Services, Pricing, **Explore** (then select "9,500+ Automations Catalog")

### Direct URL
- `/automations` on your domain

---

## 📊 Workflow Search Examples

| Search | Result |
|--------|--------|
| `Google Sheets` | Shows 50+ Google Sheets automations |
| `Slack` | Shows 200+ Slack integration workflows |
| `email` | Shows 300+ email automation workflows |
| `sync Stripe to QuickBooks` | Shows direct matches or custom card |
| `my proprietary CRM sync` | **No match** → Dynamic "Custom Solution" card |

---

## 📧 Email Templates

### Customer Email
- **To:** Customer's email (from form)
- **Subject:** "We received your inquiry - Zovance AI Hub"
- **Contains:** Greeting, confirmation, Google Calendar link, support info
- **Time:** Instant delivery

### Admin Email
- **To:** `zovance6@gmail.com`
- **Subject:** `📅 Discovery Call Booked: [Name] ([Date] at [Time])`
- **Contains:** Full booking details, customer contact, requirements, calendar link
- **Time:** Instant delivery

---

## ⚙️ Configuration Checklist

### Environment Variables (`.env`)
```env
# These should already be set:
VITE_ADMIN_EMAIL=zovance6@gmail.com
VITE_GMAIL_APP_PASSWORD=your_app_password

VITE_FIREBASE_API_KEY=***
VITE_FIREBASE_AUTH_DOMAIN=***
VITE_FIREBASE_PROJECT_ID=velfound-d7c7d
# ... rest of Firebase config
```

### Firestore Rules (Optional - for security)
```javascript
// Allow writes to bookings collection
match /bookings/{document=**} {
  allow write: if request.auth != null;
  allow read: if request.auth.uid != null;
}
```

### Firebase Storage (Workflows JSON)
- `public/n8n_workflows_data.json` should be ~19MB
- Served from public folder (no auth needed)

---

## 🧪 5-Minute Test

1. **Navigate to page**
   ```
   http://localhost:5173/automations
   ```

2. **Search a common term**
   ```
   Search: "Google Sheets"
   Expected: Multiple results appear instantly
   ```

3. **Try custom search**
   ```
   Search: "sync my custom database"
   Expected: Dynamic card generated with "Custom Solution" badge
   ```

4. **Submit booking**
   - Click any "Book Integration Setup" button
   - Fill form with test data
   - Click "Request Automation Setup"
   - Expected: Success confirmation appears

5. **Verify Firestore**
   - Open Firebase Console
   - Check `bookings` collection
   - Latest document should have all form data

---

## 🎨 Customization Options

### Change "Custom Solution" Badge Color
**File:** `src/pages/website/AutomationsPage.jsx` line ~220
```jsx
background: 'linear-gradient(135deg, #f59e0b, #d97706)', // Gold
// Change to: '#3b82f6' for blue, '#10b981' for green, etc.
```

### Change Search Placeholder Text
**File:** `src/pages/website/AutomationsPage.jsx` line ~115
```jsx
placeholder="Search 'Google Sheets', 'sync Stripe to Slack'..."
// Customize with your own examples
```

### Modify Form Fields
**File:** `src/pages/website/AutomationsPage.jsx` lines ~200-300
- Add/remove form fields as needed
- Update `formData` state accordingly
- Ensure they're sent to `addBooking()`

### Adjust Card Grid Size
**File:** `src/pages/website/AutomationsPage.jsx` line ~168
```jsx
gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
// Change 320px to 280px for more cards, 360px for fewer
```

---

## 🔄 Workflow Data Updates

### Update Workflow Catalog (After n8n Sync)
```bash
# When you have new n8n workflows to add:
1. Copy new workflow folders to: n8nworkflows.xyz/workflows/
2. Run: python3 parse_workflows.py
3. Verify: public/n8n_workflows_data.json updated
4. Rebuild: npm run build
5. Redeploy
```

### Regenerate Dashboard (If needed)
```bash
python3 parse_workflows.py
# Also generates: n8n_workflows_dashboard.html (offline version)
```

---

## 📊 Monitor Bookings

### View All Bookings
```bash
# In Firebase Console:
1. Go to Firestore Database
2. Collections > bookings
3. Sort by createdAt (newest first)

# Or via Firebase CLI:
firebase firestore:describe /bookings
```

### Export Booking Data
```bash
# In Firebase Console:
1. Click three dots > Export collection
2. Choose destination bucket
3. Download CSV when ready
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Blank page on `/automations` | Check `public/n8n_workflows_data.json` exists |
| Search not working | Clear browser cache, refresh page |
| Booking form won't submit | Check console for errors, verify Firestore rules |
| Emails not delivering | Check spam folder, verify email config in `.env` |
| Dynamic card not showing | Ensure search returns 0 direct matches |
| Mobile layout broken | Use DevTools device emulation, check responsive design |

---

## 📱 Mobile-First Design

The page is fully responsive:
- **Desktop:** Multi-column grid with sidebar
- **Tablet:** 2-column grid, condensed drawer
- **Mobile:** Single-column, full-width drawer

Test breakpoints:
- 320px (small phone)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build` - no errors
- [ ] Test `/automations` locally
- [ ] Verify Firestore bookings collection exists
- [ ] Test booking email delivery
- [ ] Check Google Calendar link works
- [ ] Verify mobile responsiveness
- [ ] Run workflow parser: `python3 parse_workflows.py`
- [ ] Confirm `public/n8n_workflows_data.json` is ~19MB
- [ ] Deploy `dist/` to production
- [ ] Test on production URL
- [ ] Monitor Firestore for incoming bookings

---

## 🎯 Success Indicators

✅ **All working correctly if:**
1. Search returns results instantly
2. Dynamic cards generate for unmatched queries
3. Booking form submits without errors
4. Firestore saves booking data
5. Emails arrive at both addresses within 1-2 minutes
6. Google Calendar link opens correctly
7. Mobile view is responsive and usable
8. No console errors in DevTools

---

## 📞 Support

**Need help?**
- Check `AUTOMATIONS_TESTING_GUIDE.md` for detailed test scenarios
- Check `AUTOMATIONS_IMPLEMENTATION_SUMMARY.md` for technical details
- Review browser console (DevTools) for error messages
- Check Firestore logs for booking failures

---

## 🎉 You're All Set!

The Automations Finder is ready to:
1. ✅ Search 9,500+ workflows
2. ✅ Handle custom integration requests
3. ✅ Collect booking information
4. ✅ Send notifications to admin & customer
5. ✅ Generate Google Calendar links with Google Meet

**Happy launching!** 🚀

---

*Quick Start v1.0 | Last Updated: July 23, 2026*
