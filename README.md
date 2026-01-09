# tachikoma

RX-78-2 Gundam destroys your GitHub contribution graph.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma.svg" />
  <img alt="RX-78-2 Gundam destroying contribution cells" src="https://raw.githubusercontent.com/m-mohamed/m-mohamed/output/tachikoma.svg" />
</picture>

Fork of [Platane/snk](https://github.com/Platane/snk) with the snake replaced by an RX-78-2 Gundam mecha. Features beam saber, shoulder armor, and explosion effects.

## Usage

```yaml
- uses: m-mohamed/tachikoma/svg-only@main
  with:
    github_user_name: ${{ github.repository_owner }}
    outputs: |
      dist/tachikoma.svg
      dist/tachikoma-dark.svg?palette=github-dark
```

### Dark Mode

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="tachikoma-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="tachikoma.svg" />
  <img alt="Gundam" src="tachikoma.svg" />
</picture>
```

## Credits

- Original snake animation: [Platane/snk](https://github.com/Platane/snk)
- Gundam RX-78-2 design inspired by Mobile Suit Gundam

## License

MIT
