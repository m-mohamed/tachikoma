# tachikoma

GitHub contribution-grid action that renders an RX-78-2 Gundam across the graph.

This fork powers the assets used on [`m-mohamed/m-mohamed`](https://github.com/m-mohamed/m-mohamed). It keeps the upstream contribution-grid pipeline, but the maintained surface here is the `svg-only` action plus the custom Gundam renderer.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma.svg" />
  <img alt="RX-78-2 Gundam moving across the GitHub contribution graph" src="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma.svg" />
</picture>

## Maintained entrypoints

- `svg-only` is the main path for profile and README SVG generation.
- The root Docker action remains available when GIF output is needed.
- CI is intentionally narrow: typecheck, lint, tests, and smoke coverage for the maintained action paths.

## Quick start

Use the Node-based `svg-only` action in a profile or README automation:

```yaml
- uses: m-mohamed/tachikoma/svg-only@main
  with:
    github_user_name: ${{ github.repository_owner }}
    outputs: |
      dist/tachikoma.svg
      dist/tachikoma-dark.svg?palette=github-dark
```

Pin a commit SHA in long-lived workflows instead of `@main`.

Embed the generated assets with light and dark variants:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="tachikoma-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="tachikoma.svg" />
  <img alt="RX-78-2 Gundam contribution animation" src="tachikoma.svg" />
</picture>
```

## Repo notes

- The repo keeps the upstream package layout to minimize churn.
- Live GitHub API coverage is opt-in only; default tests use fixtures and mocks.
- The public profile pins the `svg-only` action to a specific commit.

## Credits

- Original contribution-grid action: [Platane/snk](https://github.com/Platane/snk)
- Custom renderer and profile integration: [m-mohamed](https://github.com/m-mohamed)

## License

MIT
