import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Languages, Globe, Sparkles, Settings, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface MultiLanguageSubtitlesProps {
  onLanguageChange?: (language: string) => void;
  onAudioLanguageChange?: (language: string) => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'am', name: 'Amharic', flag: '🇪🇹' },
  { code: 'zu', name: 'Zulu', flag: '🇿🇦' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
];

export function MultiLanguageSubtitles({ onLanguageChange, onAudioLanguageChange }: MultiLanguageSubtitlesProps) {
  const [subtitleLanguage, setSubtitleLanguage] = useState('en');
  const [audioLanguage, setAudioLanguage] = useState('en');
  const [subtitleSize, setSubtitleSize] = useState([16]);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [showCulturalContext, setShowCulturalContext] = useState(true);

  const handleSubtitleLanguageChange = (language: string) => {
    setSubtitleLanguage(language);
    onLanguageChange?.(language);
  };

  const handleAudioLanguageChange = (language: string) => {
    setAudioLanguage(language);
    onAudioLanguageChange?.(language);
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
              <Languages className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>Multi-Language Support</span>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </CardTitle>
              <p className="text-sm text-zinc-400 mt-1">
                AI-powered translation with cultural context preservation
              </p>
            </div>
          </div>
          <Settings className="w-5 h-5 text-zinc-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subtitle Language Selection */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-blue-400" />
            <span>Subtitle Language</span>
          </Label>
          <Select value={subtitleLanguage} onValueChange={handleSubtitleLanguageChange}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audio Language Selection */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-blue-400" />
            <span>Audio Language</span>
          </Label>
          <Select value={audioLanguage} onValueChange={handleAudioLanguageChange}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subtitle Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Subtitle Size</Label>
            <span className="text-sm text-zinc-400">{subtitleSize[0]}px</span>
          </div>
          <Slider
            value={subtitleSize}
            onValueChange={setSubtitleSize}
            min={12}
            max={24}
            step={2}
            className="w-full"
          />
        </div>

        {/* AI Features */}
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Auto-Translate</span>
              </Label>
              <p className="text-xs text-zinc-500">
                Automatically generate subtitles in your preferred language
              </p>
            </div>
            <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Cultural Context</span>
              </Label>
              <p className="text-xs text-zinc-500">
                Show tooltips explaining cultural references and idioms
              </p>
            </div>
            <Switch checked={showCulturalContext} onCheckedChange={setShowCulturalContext} />
          </div>
        </div>

        {/* Translation Quality Info */}
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">AI Translation Quality</h4>
              <p className="text-xs text-zinc-400">
                Our AI maintains cultural nuances, idioms, and context-specific expressions for authentic
                viewing experiences. Translation quality continuously improves based on user feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Languages className="w-4 h-4 mr-2" />
          Apply Language Settings
        </Button>
      </CardContent>
    </Card>
  );
}
