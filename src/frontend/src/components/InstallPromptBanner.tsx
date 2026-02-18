import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X, Smartphone, Zap } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export function InstallPromptBanner() {
  const { isInstallable, isIOS, promptInstall, dismissPrompt } = useInstallPrompt();

  if (!isInstallable && !isIOS) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-gradient-to-r from-primary to-accent border-primary/50 shadow-2xl">
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Install TamriStream</h3>
              <p className="text-xs text-white/80">Get the app experience</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={dismissPrompt}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 text-xs text-white/90">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3" />
            <span>Faster loading & offline access</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-3 h-3" />
            <span>Works like a native app</span>
          </div>
        </div>

        {isIOS ? (
          <div className="space-y-2 text-xs text-white/90 p-3 rounded-lg bg-white/10">
            <p className="font-medium">To install on iOS:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Tap the Share button</li>
              <li>Scroll and tap "Add to Home Screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>
        ) : (
          <Button
            onClick={promptInstall}
            className="w-full bg-white text-primary hover:bg-white/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Install App
          </Button>
        )}
      </div>
    </Card>
  );
}
