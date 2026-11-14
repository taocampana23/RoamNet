import React, { createContext, useContext, useMemo, useState } from 'react';

const RoamContext = createContext(null);

export function RoamProvider({ children }) {
  const [profile, setProfile] = useState({ name: 'Guest', email: '' });
  const [connection, setConnection] = useState(null);

  const value = useMemo(() => ({
    profile,
    setProfile,
    connection,
    startDemoConnection: (hotspot) => setConnection({ hotspot, startedAt: Date.now(), demo: true }),
    disconnect: () => setConnection(null),
  }), [profile, connection]);

  return <RoamContext.Provider value={value}>{children}</RoamContext.Provider>;
}

export function useRoam() {
  const context = useContext(RoamContext);
  if (!context) throw new Error('useRoam must be used inside RoamProvider');
  return context;
}
