# Portfolio Images Structure

This directory contains all images for the Discord Services portfolio page.

## Directory Structure

```
images/portfolio/
├── servers/           # Individual server screenshots
├── organization/      # Server organization and structure images
├── bots/             # Bot integration and configuration screenshots
├── transformations/  # Before/after transformation images
└── README.md         # This file
```

## Image Naming Conventions

### Server Screenshots (`servers/`)
- `baldapes-lab.jpg` - BaldApe's Lab server screenshot
- `panda-picks.jpg` - Panda Picks server screenshot
- `sportsscijacob.jpg` - SportsSciJacob server screenshot
- `cantstopthecaptv.jpg` - CantStopTheCapTV server screenshot
- `betsbyraven.jpg` - BetsByRaven server screenshot

### Organization Images (`organization/`)
- `private-access-categories.jpg` - Private access category structure
- `user-threads-management.jpg` - User threads management system

### Bot Integration (`bots/`)
- `bot-list.jpg` - Complete bot list and integration screenshot
- `bot-configuration.jpg` - Bot configuration examples

### Transformations (`transformations/`)
- `before-unorganized.jpg` - Before: Unorganized server screenshot
- `after-professional.jpg` - After: Professional setup screenshot

## Image Requirements

- **Format**: JPG or PNG
- **Resolution**: Minimum 1200px width for desktop display
- **Aspect Ratio**: 16:9 or 4:3 recommended
- **File Size**: Optimize for web (under 500KB per image)
- **Quality**: High quality, clear screenshots

## Usage in HTML

Images should be referenced in the portfolio.html file using relative paths:

```html
<img src="images/portfolio/servers/baldapes-lab.jpg" alt="BaldApe's Lab Server" class="portfolio-image">
```

## Placeholder Text

Until actual images are added, the portfolio uses placeholder text with emoji indicators:
- 📸 Insert [Server Name] Screenshot
- 📸 Insert [Feature] Screenshot

Replace these placeholders with actual `<img>` tags when images are ready. 