import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden">
      {/* Background Glowing Ambient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="fixed top-[40%] left-[30%] w-[350px] h-[350px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <Sidebar />
      <Navbar />

      <main className="lg:ml-64 pt-16 pb-20 lg:pb-8 min-h-[calc(100vh-4rem)] relative z-10">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default Layout;
