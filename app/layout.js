import { ThemeProvider } from "../components/ThemeProvider"
import NavBar from "../components/NavBar"
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
