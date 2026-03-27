# tachikoma/svg-only

Node-based GitHub Action for generating SVG contribution animations from this fork.

This is the maintained entrypoint for `m-mohamed/tachikoma`. It avoids the Docker/GIF path and is what powers the public profile output.

## Usage

```yaml
- uses: m-mohamed/tachikoma/svg-only@main
  with:
    github_user_name: ${{ github.repository_owner }}
    outputs: |
      dist/tachikoma.svg
      dist/tachikoma-dark.svg?palette=github-dark
```

Prefer pinning a commit SHA in long-lived workflows.

## Notes

- `outputs` accepts one SVG target per line.
- Query-string options support `palette`, `color_snake`, and `color_dots`.
- GIF generation is not available through `svg-only`; use the root Docker action only if you need that path.
