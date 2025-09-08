# server.py
import http.server
import socketserver
from functools import partial
from pathlib import Path

PORT = 8080
BASE_DIR = Path(__file__).resolve().parent  # folder containing server.py + index.html

Handler = partial(http.server.SimpleHTTPRequestHandler, directory=str(BASE_DIR))

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving {BASE_DIR} at http://localhost:{PORT}")
    httpd.serve_forever()
