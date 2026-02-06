import { useParams, useNavigate } from '@tanstack/react-router';
import { WatchPartyView } from './WatchPartyView';

export default function WatchPartyViewWrapper() {
  const { partyId } = useParams({ strict: false }) as { partyId: string };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/movies' });
  };

  return <WatchPartyView partyId={partyId} onBack={handleBack} />;
}
