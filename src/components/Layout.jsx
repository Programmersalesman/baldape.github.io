import React from "react";
import NavBar from "./NavBar";

function Layout({ children }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingBottom: "2.5rem",
      }}
    >
      <NavBar />
      <main
        style={{
          flex: 1,
          padding: "2rem 0 0 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
      <footer
        className="site-footer"
        style={{
          background: "rgba(30,34,60,0.82)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "18px",
          boxShadow: "0 0 24px 2px #00eaff44",
          maxWidth: "1100px",
          margin: "2rem auto 0 auto",
          width: "calc(100% - 3rem)",
          color: "#a3e3ff",
          textAlign: "center",
          padding: "1.5rem 0 1.2rem 0",
          fontSize: "1.08em",
          letterSpacing: "0.01em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.08em",
            color: "#7df9ff",
            textShadow: "0 0 8px #00eaff",
          }}
        >
          {" "}
          &copy; 2025 BaldApe Services
        </div>
        <div
          style={{
            fontSize: "0.98em",
            color: "#a3e3ff",
            textShadow: "0 0 6px #00eaff55",
          }}
        >
          Built with React, Vite, TypeScript, and Cursor
        </div>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.2em" }}>
          <a
            href="mailto:BaldApeBiz@proton.me"
            title="Email"
            style={{
              color: "#a3e3ff",
              textDecoration: "none",
              fontSize: "1.3em",
              textShadow: "0 0 6px #00eaff",
            }}
          >
            📧
          </a>
          <a
            href="https://discord.gg/ZscedDjSct"
            title="Discord"
            style={{
              color: "#a3e3ff",
              textDecoration: "none",
              fontSize: "1.3em",
              textShadow: "0 0 6px #00eaff",
            }}
          >
            💬
          </a>
          <a
            href="https://github.com/programmersalesman"
            title="GitHub"
            style={{
              color: "#a3e3ff",
              textDecoration: "none",
              fontSize: "1.3em",
              textShadow: "0 0 6px #00eaff",
            }}
          >
            <svg
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ verticalAlign: "middle" }}
            >
              <path
                d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                fill="#a3e3ff"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
