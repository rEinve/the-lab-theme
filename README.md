# The Lab Theme — Publii Theme

Custom Publii theme powering the editorial site at Intelli Web Lab.

This theme was built as a branded publication theme for essays, category-led browsing, podcast or vlog entries, and a dedicated archive experience. It is structured around a small in-house design system, with clear separation between core primitives, site composition, and template-specific styles.

## Highlights

- Responsive editorial homepage, archive, tag, author, page, and post templates
- Dedicated `posts.hbs` archive route support
- Shared related-posts carousel
- Mobile navigation drawer and subscribe modal support
- Cookie banner styling aligned with the site button system
- CSS architecture split into core, site, template, and fix layers

## Requirements

- Publii `0.46.5` or newer is recommended

This theme relies on Publii support for dedicated post-prefix rendering through `posts.hbs`.

## Installation

1. Copy this theme folder into your Publii site at `input/themes/`.
2. Select the theme in Publii.
3. Regenerate the site.

If you use a separate archive route, keep `postsPrefix` enabled in Publii site settings so the archive is published through `posts.hbs`.

## Project Structure

- `config.json`: Theme metadata, supported features, and theme settings
- `index.hbs`: Homepage
- `posts.hbs`: Archive listing template
- `post.hbs`: Standard article template
- `post-vlog.hbs`: Podcast or vlog template
- `page.hbs`: Standard page template
- `tag.hbs`, `tags.hbs`, `author.hbs`, `404.hbs`: Archive-family templates
- `partials/`: Shared template fragments
- `assets/css/main.css`: Core design-system layer
- `assets/css/sitestyle.css`: Site composition layer
- `assets/css/post-templates.css`: Template-specific layout styling
- `assets/css/page-fixes.css`: Temporary override or cleanup layer
- `assets/js/`: Drawer, tabs, modal, and post interaction scripts

## Styling Layers

Use this rule of thumb when editing styles:

- `main.css` for tokens, primitives, grids, and shared UI foundations
- `sitestyle.css` for branded sections and site-level composition
- `post-templates.css` for post, page, archive, and content-template behavior
- `page-fixes.css` only for temporary quarantine fixes during refactors

## Development Notes

- The archive route is wired through Publii `postsPrefix`
- In `file://` preview, some links intentionally target `index.html` paths so the rendered page opens directly instead of the folder listing
- The theme currently uses the folder slug `mytheme-01`; if you rename the folder, update your Publii site theme selection accordingly

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidance, file ownership expectations, and review workflow.
