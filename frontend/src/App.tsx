import { BrowserRouter, Route, Routes } from "react-router"
import { AppShell } from "./components/shell/AppShell.tsx"
import { DiscoverPage } from "./pages/discover/DiscoverPage.tsx"
import { HomePage } from "./pages/home/HomePage.tsx"
import { AccessibilityPage } from "./pages/legal/AccessibilityPage.tsx"
import { PrivacyPage } from "./pages/legal/PrivacyPage.tsx"
import { LinksPage } from "./pages/links/LinksPage.tsx"
import { VideosPage } from "./pages/videos/VideosPage.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/descubra" element={<DiscoverPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/acessibilidade" element={<AccessibilityPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
