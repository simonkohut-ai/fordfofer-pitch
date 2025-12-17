# MikoRK pohrebníctvo - Testing Checklist

**Goal:** Ensure website works for real users in real situations  
**Focus:** Local realism, accessibility, mobile-first  
**Last Updated:** 2025-12-17

---

## Test Scenarios

### 1. Elderly User on Mobile

**Scenario:**
- User: 70+ years old
- Device: Older smartphone
- Internet: Slow connection
- Situation: Stressed, needs information quickly

**Tests:**
- [ ] Website loads quickly (< 3 seconds)
- [ ] Text is large and readable (minimum 16px)
- [ ] Buttons are large and easy to tap (minimum 44px)
- [ ] Navigation is simple and clear
- [ ] Phone number is easy to find and click
- [ ] Contact form is simple and easy to fill
- [ ] No horizontal scroll
- [ ] No confusing animations

---

### 2. Stressed Family Member

**Scenario:**
- User: Family member in grief
- Device: Any device
- Internet: Any connection
- Situation: Urgent need, emotional state

**Tests:**
- [ ] Emergency contact is prominently displayed
- [ ] Phone number is always visible
- [ ] Contact form is simple (no complex fields)
- [ ] No pressure or urgency language
- [ ] Information is clear and helpful
- [ ] Website feels calm and respectful
- [ ] No aggressive marketing
- [ ] Easy to find what they need

---

### 3. Slow Internet

**Scenario:**
- User: Any user
- Device: Any device
- Internet: Slow connection (3G or slower)
- Situation: Normal browsing

**Tests:**
- [ ] Website loads in < 5 seconds
- [ ] Critical content loads first
- [ ] Images are optimized
- [ ] No heavy animations
- [ ] System fonts (no external requests)
- [ ] Minimal CSS/JS
- [ ] Graceful degradation

---

### 4. One-Handed Use

**Scenario:**
- User: Any user
- Device: Mobile phone
- Internet: Any connection
- Situation: Using phone with one hand

**Tests:**
- [ ] Navigation is accessible with thumb
- [ ] Buttons are in easy-to-reach areas
- [ ] Phone number is easy to tap
- [ ] Contact form is easy to fill
- [ ] No small click targets
- [ ] No horizontal scroll needed

---

## Functional Tests

### Contact Form

- [ ] Form submits successfully
- [ ] All required fields validated
- [ ] Email format validated
- [ ] Consent checkbox required
- [ ] Success message displays
- [ ] Error message displays (if error)
- [ ] Form resets after successful submission
- [ ] Email notification sent to business owner
- [ ] No automated response to customer

---

### Phone Links

- [ ] Click-to-call works on mobile
- [ ] Phone number is clickable
- [ ] Correct phone number dialed
- [ ] Works on iOS and Android
- [ ] Fallback for desktop (shows number)

---

### Email Links

- [ ] Email links open email client
- [ ] Correct email address used
- [ ] Subject line pre-filled (optional)
- [ ] Works on all devices

---

### Navigation

- [ ] All links work
- [ ] Navigation is clear
- [ ] Mobile menu works (if applicable)
- [ ] Back button works
- [ ] No broken links

---

## Accessibility Tests

### Keyboard Navigation

- [ ] All interactive elements accessible via keyboard
- [ ] Focus indicators visible
- [ ] Tab order is logical
- [ ] Can complete form with keyboard only
- [ ] Can navigate entire site with keyboard

---

### Screen Reader

- [ ] Semantic HTML used
- [ ] Alt text on all images
- [ ] Form labels associated correctly
- [ ] Headings in logical order
- [ ] ARIA labels where needed

---

### Contrast

- [ ] Text meets WCAG AA (4.5:1 minimum)
- [ ] Buttons meet contrast requirements
- [ ] Links meet contrast requirements
- [ ] All text readable

---

### Font Sizes

- [ ] Base font size is 18px (readable)
- [ ] No text smaller than 16px
- [ ] Headings are appropriately sized
- [ ] Text scales well on mobile

---

## Performance Tests

### Page Speed

- [ ] Homepage loads in < 2.5 seconds
- [ ] Contact page loads in < 2.5 seconds
- [ ] Services page loads in < 2.5 seconds
- [ ] About page loads in < 2.5 seconds

### Lighthouse Scores

- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### Core Web Vitals

- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1

---

## Mobile Tests

### Responsive Design

- [ ] Layout works on mobile (320px+)
- [ ] Layout works on tablet (768px+)
- [ ] Layout works on desktop (1024px+)
- [ ] No horizontal scroll
- [ ] Text is readable on all sizes
- [ ] Buttons are touch-friendly

### Touch Targets

- [ ] All buttons minimum 44px height
- [ ] Links are easy to tap
- [ ] Form inputs are easy to tap
- [ ] No overlapping touch targets

---

## Content Tests

### Tone & Language

- [ ] Tone is respectful and dignified
- [ ] No sales language
- [ ] No urgency or pressure
- [ ] Language is clear and helpful
- [ ] Slovak language used correctly
- [ ] No inappropriate content

### Information

- [ ] Contact information is accurate
- [ ] Phone number is correct
- [ ] Email address is correct
- [ ] Address is correct (if applicable)
- [ ] Service descriptions are clear
- [ ] No misleading information

---

## Browser Tests

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

- [ ] Chrome Mobile (iOS)
- [ ] Safari Mobile (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet (Android)

---

## Real-World Testing

### Test with Real Users

- [ ] Test with elderly users
- [ ] Test with stressed users
- [ ] Test with slow internet
- [ ] Test on actual mobile devices
- [ ] Test in real situations

### Feedback Collection

- [ ] Collect user feedback
- [ ] Monitor for issues
- [ ] Address concerns promptly
- [ ] Iterate based on feedback

---

## Verification Checklist

### Pre-Launch

- [ ] All functional tests pass
- [ ] All accessibility tests pass
- [ ] All performance tests pass
- [ ] All mobile tests pass
- [ ] All content reviewed
- [ ] All links verified
- [ ] Contact form tested
- [ ] Email notifications tested
- [ ] Phone links tested

### Post-Launch

- [ ] Monitor for errors
- [ ] Check analytics
- [ ] Review user feedback
- [ ] Address issues promptly
- [ ] Iterate based on data

---

## Testing Tools

### Automated Testing

- Lighthouse (Chrome DevTools)
- WAVE (Accessibility)
- PageSpeed Insights
- Mobile-Friendly Test (Google)

### Manual Testing

- Real devices
- Real users
- Real situations
- Real feedback

---

**Remember:** Test with real users in real situations. Accessibility and usability are paramount.

