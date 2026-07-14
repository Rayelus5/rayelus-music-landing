import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SpotifySection from './components/SpotifySection'
import SocialsSection from './components/SocialsSection'
import Footer from './components/Footer'
import PixelDivider from './components/PixelDivider'
import AlbumPopup from './components/AlbumPopup'
import { ReleaseGateProvider } from './components/ReleaseGate'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const player = useAudioPlayer()
  const { theme, toggleTheme } = useTheme()

  return (
    <ReleaseGateProvider>
      <AlbumPopup />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection player={player} />
        <PixelDivider />
        <SpotifySection />
        <PixelDivider flip />
        <SocialsSection />
      </main>
      <Footer />
    </ReleaseGateProvider>
  )
}
