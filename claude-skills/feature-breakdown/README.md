# feature-breakdown skill

A Claude Code skill that turns a rough feature idea into a complete, branded PRD — with user stories, edge cases, analytics events, a QA checklist, and engineering tasks. It exports a PDF and DOCX automatically.

---

## What it does

When you type a prompt like:

> "write a PRD for [your feature]"

Claude picks up this skill, reads your config, asks clarifying questions if needed, then writes a full PRD and exports it to `prds/` and `exports/` inside your project directory.

---

## How to install this skill

### Option A — Terminal (recommended)

Clone the repo and copy the skill into your Claude skills folder in one go:

```bash
git clone https://github.com/rajeshshares/claude-code.git
cp -r claude-code/claude-skills/feature-breakdown ~/.claude/skills/
```

If `~/.claude/skills/` does not exist yet:

```bash
mkdir -p ~/.claude/skills
cp -r claude-code/claude-skills/feature-breakdown ~/.claude/skills/
```

### Option B — Download ZIP from GitHub

1. Go to [github.com/rajeshshares/claude-code](https://github.com/rajeshshares/claude-code)
2. Click **Code → Download ZIP**
3. Unzip the file
4. Open Terminal and run:
   ```bash
   cp -r claude-code-main/claude-skills/feature-breakdown ~/.claude/skills/
   ```

### Option C — Finder (macOS, no Terminal)

1. Download and unzip the repo from GitHub (Code → Download ZIP)
2. Open a **new Finder window** and press **Command + Shift + G**
3. Paste this and hit Enter:
   ```
   ~/.claude/skills/
   ```
4. Drag the `feature-breakdown/` folder from the unzipped download into this Finder window

---

## Folder structure

After copying to `~/.claude/skills/`, it should look like this:

```
feature-breakdown/
├── SKILL.md                          ← skill instructions (do not edit)
├── skill-config.md                   ← YOUR settings go here
├── brand_colors.py                   ← YOUR brand colors go here
├── convert_prd.py                    ← converter script (do not edit)
├── checklists/
│   └── release-checklist.md
├── examples/
│   └── good-feature-breakdown.md
└── templates/
    ├── analytics-events-template.md
    └── prd-template.md
```

**Files you edit:** only `skill-config.md` and `brand_colors.py`.
Everything else runs as-is.

---

## Setup

### Step 1 — Install Python dependencies

```bash
pip install python-docx reportlab
```

### Step 2 — Edit `skill-config.md`

Open the file and replace every value with your own:

```
company_name:      Your Company Name
company_tagline:   One-line description of what your product does
default_author:    Your Name
base_dir:          /absolute/path/to/your/project
logo_path:         /absolute/path/to/your/logo.png
brand_voice:       Describe your writing style in 1-2 sentences.
personas:
  builder:         Builder — [who this person is in your product]
  visitor:         Visitor — [who this person is]
  admin:           Admin — [who this person is]
analytics_convention: noun_past_tense_verb in snake_case (e.g. site_published, domain_attached)
```

**Field guide:**

| Field | What to put |
|-------|-------------|
| `company_name` | Your company or product name |
| `company_tagline` | One-line product description — shown on exported docs |
| `default_author` | Your name — stamped on every PRD |
| `base_dir` | Absolute path to your project folder — PRDs are saved here |
| `logo_path` | Absolute path to a PNG — embedded as a watermark in the PDF |
| `brand_voice` | How Claude should write — plain English, e.g. "Warm and direct. No jargon." |
| `personas` | The user types in your product — used to write targeted user stories |
| `analytics_convention` | Your event naming format — used in the analytics events table |

> `base_dir` and `logo_path` must be absolute paths. Relative paths will not work.
> If you do not have a logo yet, point `logo_path` at any PNG. The watermark is 2% opacity.

### Step 3 — Edit `brand_colors.py`

This file is the single source of truth for colors. `convert_prd.py` imports from it at runtime — nothing else sets the colors. Replace the hex values with your brand colors:

```python
# Primary
NAVY      = "#1B2A3B"   # headings, wordmark — your darkest brand color
GOLD      = "#F5C518"   # accents, divider lines — your highlight/CTA color

# Surfaces
ICE_BLUE  = "#D6EAF5"   # table headers, meta stamp backgrounds
OFF_WHITE = "#F7F9FC"   # page background, code blocks, alternating table rows

# Text
SLATE     = "#334155"   # body copy — use a mid-dark neutral
WARM_TAN  = "#C4956A"   # footer text, captions — muted secondary

# Borders
GRAY      = "#E2E8F0"   # table borders, horizontal rules
```

**Minimum changes:** `NAVY`, `GOLD`, and `ICE_BLUE`. The rest are neutral surfaces and can stay close to the defaults.

**Do not rename the variables.** The converter imports them by name. Renaming breaks the export.

**Contrast rules worth knowing:**
- `NAVY` on white: always safe for body text (aim for 12:1 contrast)
- `GOLD` on `NAVY`: works for hero/dark sections (aim for 5:1+ for large text)
- `GOLD` on white: decorative only — do not use for body text, it fails accessibility contrast
- Whatever you pick for `SLATE`, make sure it passes AA contrast on white

### Step 4 — Create output folders

```bash
mkdir -p /your/base_dir/prds /your/base_dir/exports
```

Or skip this — the skill creates them on first run.

---

## Using the skill

Open Claude Code and type:

```
write a PRD for [your feature idea]
```

Claude will ask clarifying questions if the idea is incomplete, then write the full PRD, save it, and export PDF + DOCX.

To re-export an existing PRD without rewriting it:

```
re-export the PRD for [feature name]
```

**Output locations:**

```
your-project/
├── prds/
│   └── your-feature-name.md
└── exports/
    ├── your-feature-name.pdf
    └── your-feature-name.docx
```

---

## Troubleshooting

**PDF or DOCX not generating**
```bash
pip install python-docx reportlab
```

**Logo not showing in PDF**
Check that `logo_path` in `skill-config.md` is an absolute path to a `.png` that exists on disk.

**"Module not found: brand_colors"**
Do not move `brand_colors.py` out of the skill folder. The converter imports it from the same directory.

**Colors not updating in exports**
Edit `brand_colors.py` directly. That is the only file the converter reads. Changing hex values anywhere else has no effect.
