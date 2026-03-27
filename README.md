# tachikoma

GitHub contribution grid action that renders an RX-78-2 Gundam instead of the original snake.

This fork is maintained as profile infrastructure for [`m-mohamed/m-mohamed`](https://github.com/m-mohamed/m-mohamed). It keeps the upstream contribution-grid logic, but swaps in a Gundam SVG renderer for the generated assets shown on the profile.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma.svg" />
  <img alt="RX-78-2 Gundam moving across the GitHub contribution graph" src="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma.svg" />
</picture>

## Usage

Use the SVG-only action in the profile or another README automation:

```yaml
- uses: m-mohamed/tachikoma/svg-only@main
  with:
    github_user_name: ${{ github.repository_owner }}
    outputs: |
      dist/tachikoma.svg
      dist/tachikoma-dark.svg?palette=github-dark
```

Embed the generated assets with light and dark variants:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="tachikoma-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="tachikoma.svg" />
  <img alt="RX-78-2 Gundam contribution animation" src="tachikoma.svg" />
</picture>
```

## Scope

- `svg-only` is the maintained path used on the profile.
- The repo intentionally keeps the upstream package layout to minimize churn.
- CI is focused on typecheck, lint, tests, and one SVG smoke path.

## Credits

- Original contribution-grid action: [Platane/snk](https://github.com/Platane/snk)
- Custom renderer and profile integration: [m-mohamed](https://github.com/m-mohamed)

## License

MIT
