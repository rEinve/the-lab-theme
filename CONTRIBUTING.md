# Contributing

Thanks for helping improve the Themeshak Publii Theme.

## Before You Change Anything

- Work from the theme folder only
- Preserve existing site behavior unless the change is intentional
- Prefer small, reviewable changes over broad rewrites
- Regenerate or preview the site after meaningful template or CSS updates

## File Ownership Guide

- `assets/css/main.css`: Core design system, tokens, utilities, layout primitives
- `assets/css/sitestyle.css`: Site sections, homepage composition, footer, newsletter, branded surfaces
- `assets/css/post-templates.css`: Post, page, archive, and template-specific layout rules
- `assets/css/page-fixes.css`: Temporary fixes only
- `partials/`: Shared markup fragments
- Root `.hbs` files: Top-level template structure and route-level markup

## Contribution Workflow

1. Understand whether the issue belongs to core, site composition, or a specific template.
2. Make the smallest change that fixes the actual layer owning the problem.
3. Check mobile behavior as well as desktop behavior.
4. Rebuild or preview in Publii before finalizing.

## Responsive Review Checklist

- Check at narrow mobile widths before calling layout work finished
- Avoid one-off grid rewrites when a core layout primitive already exists
- Keep `row` or flex helpers separate from grid span patterns
- Make sure `file://` preview still opens rendered pages correctly

## Template Notes

- `posts.hbs` depends on Publii post-prefix support
- Archive links are controlled through the theme `archivePath` setting
- `post-vlog.hbs` and `post.hbs` share related-post rendering through a partial

## Pull Request Expectations

- Explain what changed
- Explain why it changed
- Mention any template, config, or preview assumptions
- Note what you verified manually

## What To Avoid

- Do not edit minified CSS when an unminified layer already owns the concern
- Do not add emergency overrides to `page-fixes.css` if the fix belongs in core or site styles
- Do not hardcode site-domain internal links in templates when a site variable can be used
