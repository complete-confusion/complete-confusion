# Asset Management Scripts

This directory contains scripts for managing Complete Confusion demo assets using GitHub Releases.

## Setup

### Prerequisites

1. **Install GitHub CLI:**
   ```bash
   # On macOS
   brew install gh
   
   # On Ubuntu/Debian
   sudo apt-get install gh
   
   # Or download from: https://cli.github.com/
   ```

2. **Authenticate with GitHub (when needed):**
   ```bash
   gh auth login
   ```
   
   **When is authentication required?**
   - ✅ **Always required** for uploading assets (`upload_assets.sh`)
   - ✅ **Required for private repos** when downloading
   - ❌ **NOT required for public repos** when downloading
   
   This will prompt you to:
   - Choose authentication method (browser or token)
   - Select Git protocol (HTTPS recommended)
   - Authenticate via web browser or paste a personal access token

3. **Verify authentication:**
   ```bash
   gh auth status
   # Should show: ✓ Logged in to github.com as <your-username>
   ```

## Scripts

### `upload_assets.sh`

Creates a GitHub release with notebook output assets. This is only required if you want to update the published version of the demo outputs.

**Prerequisites:**
- GitHub CLI installed and authenticated (`gh auth login`)
- Notebook outputs already generated in `docs/source/notebooks/`

**Usage:**
```bash
./scripts/upload_assets.sh
```

**What it does:**
- Scans `docs/source/notebooks/` for output directories
- Creates a compressed tar.gz archive with all outputs
- Creates a GitHub release with the archive

### `download_assets.sh`

Downloads assets from the latest GitHub release.

**Prerequisites:**
- GitHub CLI installed
- Authentication (`gh auth login`) **only required for private repositories**

**Usage:**
```bash
# Download latest assets
./scripts/download_assets.sh

# Download specific release
./scripts/download_assets.sh --tag assets-20240918-143022

# Download to custom directory
./scripts/download_assets.sh --target /path/to/target
```

**What it does:**
- Finds the latest assets release (or uses specified tag)
- Downloads the assets archive
- Extracts to `docs/build/html/notebooks/` (or specified directory)

**Note:** For public repositories, downloading works without authentication. For private repositories, you need to run `gh auth login` first.

## Workflow

### For Developers

1. **First time setup:**
   ```bash
   # Install GitHub CLI (if not already installed)
   brew install gh  # macOS
   # or: sudo apt-get install gh  # Linux
   
   # Authenticate with GitHub
   gh auth login
   ```

2. **Generate notebook outputs** (run your demo notebooks)

3. **Upload assets:**
   ```bash
   ./scripts/upload_assets.sh
   ```

4. **Build documentation locally:**
   ```bash
   ./build_docs.sh  # Downloads assets automatically
   ```

### For CI/CD

The GitHub Actions workflow automatically downloads assets during documentation builds.

### For Contributors

1. **Install GitHub CLI:**
   ```bash
   # Install GitHub CLI
   brew install gh  # or appropriate package manager
   ```

2. **Get the latest demo outputs:**
   ```bash
   ./scripts/download_assets.sh
   # No authentication needed for public repos!
   ```

3. **Build docs:**
   ```bash
   ./build_docs.sh
   ```

**Note:** Authentication is only needed if the repository is private or if you want to upload new assets.

## Benefits vs Asset Branch Approach

### ✅ **Advantages**

- **Much simpler** - Just bash scripts, no Python complexity
- **Free unlimited storage** - GitHub releases have no storage limits
- **No bandwidth limits** - No quotas like Git LFS
- **Version tagged** - Each release is tagged with timestamp
- **Easy discovery** - Assets visible in GitHub releases UI
- **Better CI/CD** - Simpler GitHub Actions integration

### 📊 **Comparison**

| Feature | Asset Branch | GitHub Releases | Git LFS |
|---------|-------------|-----------------|---------|
| **Storage** | Free | Free (unlimited) | 1GB free, then paid |
| **Bandwidth** | Free | Free | 1GB/month free |
| **Complexity** | High | **Low** | Medium |
| **Discovery** | Hidden | **Visible in UI** | Hidden |
| **Versioning** | Manual | **Automatic** | Automatic |
| **Script complexity** | Python | **Bash** | Git commands |

## File Structure

After downloading assets:

```
docs/build/html/notebooks/
├── cifar10_performance/           # CIFAR-10 demo outputs
│   ├── complete-confusion.html
│   ├── complete-confusion.css
│   ├── complete-confusion.js
│   ├── complete-confusion-data.js
│   └── images/                    # 10,000+ CIFAR-10 images
│       ├── cifar10_test_00000.png
│       └── ...
├── example_output/                # Basic demo outputs
│   ├── complete-confusion.html
│   └── ...
└── other_outputs/                 # Any other notebook outputs
```

## Troubleshooting

**Q: "gh command not found"**
- Install GitHub CLI: https://cli.github.com/
- On macOS: `brew install gh`
- On Linux: `sudo apt-get install gh`

**Q: "authentication required" or "HTTP 401" when downloading**
- This typically means the repository is private
- Run: `gh auth login` and try again
- For public repos, downloading should work without authentication

**Q: "authentication required" when uploading**
- **Always required for uploads!** Run: `gh auth login`
- Follow the prompts to authenticate via browser or token
- Verify with: `gh auth status`

**Q: "No assets releases found"**
- Run `./scripts/upload_assets.sh` first
- Check that notebook outputs exist in `docs/source/notebooks/`
- Make sure you're authenticated: `gh auth status`

**Q: Download fails in CI**
- Ensure `GITHUB_TOKEN` has appropriate permissions
- Check that assets release exists

**Q: Assets not showing in docs**
- Verify extraction worked: `ls docs/build/html/notebooks/`
- Check documentation links reference correct paths
