// import "../styles/globals.css";

export const metadata = {
  title: "RYAN CLINIC",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased `}>
        <h1>hello</h1>

        {children}
      </body>
    </html>
  );
}
