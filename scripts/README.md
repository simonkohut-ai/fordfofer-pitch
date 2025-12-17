# Scripts

Central place for automation scripts related to deployment, testing, and operations.

At the moment, most historical `.bat` and `.ps1` files still live at the repo root and under `dashboard/` for backwards compatibility.

## Current contents

- `RUN_EVERYTHING.bat` – top‑level setup helper (copied from root for convenience).  
- `DEPLOY_BOTH_NOW.bat` – helper to guide deployment of dashboard + p2ba-console (copied from root).  
- `START_LOCAL_DASHBOARD.bat` – opens/starts local dashboard server (copied from root).  
- `START_MAKING_SALES.bat` – opens dashboard, scripts, and sales channels (copied from root).  

> The originals remain in the repo root so existing documentation and shortcuts do not break. Over time, scripts can be fully migrated here with small wrapper launchers left behind.

## Recommended entrypoints

- **Deploy / verify production:** use `dashboard/REDEPLOY_LIVE.ps1` and `dashboard/VERIFY_DEPLOY_LIVE.ps1`.  
- **Test Stripe:** use `dashboard/TEST_STRIPE_SETUP.ps1`.  
- **Run end‑to‑end tests:** use `dashboard/COMPLETE_TEST_SUITE.ps1`.  

Future TODO:

- [ ] Add a single `START_HERE.ps1` that orchestrates the most common actions (deploy, test, open dashboard).  
- [ ] Gradually move remaining loose scripts into this folder, leaving lightweight wrappers at their original paths.


