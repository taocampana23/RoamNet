// MusicConnect Rwanda prototype data.
// Artist identities are public figures; release names and event details are illustrative samples.
export const ARTISTS = [
  { id: 'bruce-melodie', name: 'Bruce Melodie', genre: 'Afropop', initials: 'BM', color: '#D96D3E', bio: 'Rwandan singer and songwriter known for Afropop and R&B sounds.' },
  { id: 'the-ben', name: 'The Ben', genre: 'R&B / Afropop', initials: 'TB', color: '#526E91', bio: 'Rwandan singer whose music blends R&B and Afropop.' },
  { id: 'bwiza', name: 'Bwiza', genre: 'Afropop', initials: 'BW', color: '#A65D89', bio: 'Rwandan singer and performer.' },
  { id: 'kenny-sol', name: 'Kenny Sol', genre: 'Afrobeats', initials: 'KS', color: '#498A78', bio: 'Rwandan singer known for melodic Afrobeats and R&B.' },
  { id: 'element-eleeh', name: 'Element Eleéeh', genre: 'Producer / Afrobeats', initials: 'EE', color: '#9A7B42', bio: 'Rwandan music producer and artist.' },
  { id: 'alyn-sano', name: 'Alyn Sano', genre: 'R&B / Soul', initials: 'AS', color: '#6C70A8', bio: 'Rwandan singer known for soulful vocals.' }
];

export const RELEASES = [
  { id: 'release-01', title: 'New Kigali Sound', artist: 'Bruce Melodie', artistId: 'bruce-melodie', type: 'Single', color: '#D96D3E', tag: 'FEATURED' },
  { id: 'release-02', title: 'City Lights', artist: 'The Ben', artistId: 'the-ben', type: 'Single', color: '#526E91', tag: 'NEW SOUND' },
  { id: 'release-03', title: 'Imizi', artist: 'Bwiza', artistId: 'bwiza', type: 'EP', color: '#A65D89', tag: 'EDITOR PICK' },
  { id: 'release-04', title: 'Feel the Vibe', artist: 'Kenny Sol', artistId: 'kenny-sol', type: 'Single', color: '#498A78', tag: 'TRENDING' }
];

export const EVENTS = [
  { id: 'event-01', title: 'Kigali Music Night', venue: 'Kigali · Venue to be confirmed', date: 'Demo date', time: 'To be confirmed', performers: 'Rwandan live performers', color: '#D96D3E' },
  { id: 'event-02', title: 'East Africa Sounds', venue: 'Kigali · Venue to be confirmed', date: 'Demo date', time: 'To be confirmed', performers: 'Regional music showcase', color: '#526E91' },
  { id: 'event-03', title: 'Acoustic Sessions', venue: 'Kigali · Venue to be confirmed', date: 'Demo date', time: 'To be confirmed', performers: 'Live acoustic performances', color: '#498A78' }
];

export const GENRES = ['All', 'Afropop', 'Afrobeats', 'R&B', 'Hip-hop', 'Gospel', 'Amapiano'];
