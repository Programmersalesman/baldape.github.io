#!/usr/bin/env python3
"""
Simple HTTP server to serve the archived HTML version of the website.
Run this script from the project root directory.
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

def main():
    # Change to the archive directory
    archive_dir = Path("archive")
    if not archive_dir.exists():
        print("Error: 'archive' directory not found!")
        print("Make sure you're running this script from the project root directory.")
        sys.exit(1)
    
    os.chdir(archive_dir)
    
    # Server configuration
    PORT = 8000
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Create the server
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Archive server started!")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🌐 Server running at: http://localhost:{PORT}")
        print(f"📄 Main page: http://localhost:{PORT}/index.html")
        print("\n📋 Available pages:")
        print("  • Home: http://localhost:8000/index.html")
        print("  • About: http://localhost:8000/about.html")
        print("  • Services: http://localhost:8000/services.html")
        print("  • Portfolio: http://localhost:8000/portfolio.html")
        print("  • Contact: http://localhost:8000/contact.html")
        print("  • Testimonials: http://localhost:8000/testimonials.html")
        print("  • Consultation: http://localhost:8000/consultation.html")
        print("\n⏹️  Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            httpd.shutdown()

if __name__ == "__main__":
    main() 