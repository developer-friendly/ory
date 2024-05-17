frontend:
  cd frontend && bun run dev -- --host 0.0.0.0 --port 8080

build-frontend:
  cd frontend && bun run build

install-frontend *packages:
  cd frontend && bun install {{packages}}
