# SECURE REPOS AND CHECK DEPLOYMENTS

## MAKE GITHUB REPOS PRIVATE

### Step 1: Make p2ba Repository Private

1. Go to: https://github.com/simonkohut-ai/p2ba/settings
2. Scroll to: Danger Zone
3. Click: Change visibility
4. Select: Make private
5. Type repository name to confirm
6. Click: I understand, change repository visibility

### Step 2: Check Other Repositories

1. Go to: https://github.com/simonkohut-ai?tab=repositories
2. For each repository:
   - Click on repository
   - Go to Settings
   - Scroll to Danger Zone
   - Make private if needed

### Step 3: Review Repository Access

1. Go to: Repository â†’ Settings â†’ Collaborators
2. Remove any unwanted collaborators
3. Check: Only trusted people have access

---

## CHECK VERCEL DEPLOYMENTS

### Step 1: Review All Projects

1. Go to: https://vercel.com/dashboard
2. Check all projects listed
3. Identify which ones are active

### Step 2: Check for Conflicting Deployments

Look for:
- Old deployments from other accounts
- Test deployments
- Duplicate projects
- Projects with wrong Root Directory

### Step 3: Cancel/Delete Problematic Deployments

For each problematic project:
1. Click on project
2. Go to: Deployments tab
3. Cancel running deployments
4. Delete old deployments if needed
5. Or delete entire project if not needed

### Step 4: Verify Current Deployments

**Keep these active:**
- ai-studio (Dashboard)
- p2ba (Console)

**Settings to verify:**
- ai-studio: Root Directory = dashboard
- ai-studio: OPENAI_API_KEY set
- p2ba: OPENAI_API_KEY set

---

## PROTECT API KEYS

### Already Done:
- âœ… Removed API keys from new commits
- âœ… Using placeholders in documentation

### Still Need:
- â³ Make GitHub repos private
- â³ Review old commits (may contain keys)
- â³ Rotate API keys if exposed

---

## CHECKLIST

- [ ] p2ba repository is private
- [ ] Other repositories are private
- [ ] No unwanted collaborators
- [ ] Conflicting deployments cancelled
- [ ] Only ai-studio and p2ba are active
- [ ] Root Directory settings correct
- [ ] Environment variables set

---

**After securing, your preview will be safe!**
