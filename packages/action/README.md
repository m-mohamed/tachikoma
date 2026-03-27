# @snk/action

Docker-based action package for full SVG or GIF generation.

In this fork, the maintained public entrypoint is [`svg-only`](../../svg-only/README.md). This package remains for the Docker action path, which is still useful when GIF output is required.

## Notes

- GIF generation still requires native dependencies, so the root action stays Docker-based.
- The Docker action now builds from the local [`Dockerfile`](../../Dockerfile) in this fork.
- The profile repo does not use this path; it pins the lighter `svg-only` action instead.
