import { useState } from 'react';
import { setConsoleAdminToken } from '../lib/twoFactorConfig.api.js';
export default function BackendAccess({ onConnect }) {
  const [key, setKey] = useState('');
  return <section className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><label className="mb-1.5 block text-xs font-semibold text-slate-700">Backend Admin Key</label><div className="flex flex-col gap-2 sm:flex-row"><input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm" type="password" value={key} onChange={e => setKey(e.target.value)} placeholder="Enter backend admin key" autoComplete="off"/><button type="button" onClick={() => { setConsoleAdminToken(key); onConnect(); }} className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Connect & Load</button></div><p className="mt-2 text-[11px] text-slate-500">Held in page memory only; do not put this key in frontend environment variables.</p></section>;
}
