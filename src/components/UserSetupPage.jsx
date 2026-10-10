import { useState } from 'react';
import { UserRound, ShieldCheck, Save, CheckCircle2, AlertCircle, Eye, EyeOff, LoaderCircle, LockKeyhole } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';
const initial = { fullName: '', gender: '', phone: '', email: '', nickname: '', apiKey: '', smsToken: '', callToken: '', smsTemplateId: '', callTemplateId: '', isActive: true };

export default function UserSetupPage() {
  const [form, setForm] = useState(initial);
  const [showSecrets, setShowSecrets] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [savedProfile, setSavedProfile] = useState(null);
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const submit = async event => {
    event.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const response = await axios.post(API_BASE_URL + '/user-setup', form, {
        headers: { 'Content-Type': 'application/json' }, timeout: 15000, withCredentials: true
      });
      setSavedProfile(response.data.data);
      setNotice({ type: 'success', text: response.data.message || 'Profile saved successfully.' });
      setForm(initial);
    } catch (error) {
      const message = error.response?.data?.message || (error.code === 'ECONNABORTED' ? 'Request timed out. Please retry.' : error.response ? 'Request failed (' + error.response.status + ').' : 'Backend is unreachable. Check VITE_API_BASE_URL and the backend server.');
      setNotice({ type: 'error', text: message });
    } finally {
      setSaving(false);
    }
  };
  const Field = ({ name, title, placeholder, type = 'text', required = false, secret = false }) => (
    <div>
      <label className={labelClass} htmlFor={name}>{title}{required && <span className="text-rose-500"> *</span>}</label>
      <div className="relative">
        <input id={name} name={name} className={inputClass + (secret ? ' pr-11' : '')} type={secret ? (showSecrets ? 'text' : 'password') : type} value={form[name]} onChange={event => set(name, event.target.value)} placeholder={placeholder} required={required} autoComplete="off" maxLength={name === 'apiKey' ? 2048 : undefined}/>
        {secret && <button type="button" onClick={() => setShowSecrets(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label={showSecrets ? 'Hide secrets' : 'Show secrets'}>{showSecrets ? <EyeOff size={17}/> : <Eye size={17}/>}</button>}
      </div>
    </div>
  );
  return <main className="min-w-0 flex-1 bg-[#f5f7fb] p-4 md:p-7">
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <div className="text-xs font-medium text-slate-400">Home / User Setup</div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">User profile & API setup</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Add your contact details and configure one 2Factor SMS/Call integration. Login and account management can be added later.</p>
      </div>
      {notice && <div role="status" className={'mb-5 flex items-start gap-3 rounded-xl border p-4 text-sm ' + (notice.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800')}><span className="mt-0.5">{notice.type === 'success' ? <CheckCircle2 size={18}/> : <AlertCircle size={18}/>}</span><span>{notice.text}</span></div>}
      {savedProfile && <section className="mb-5 rounded-xl border border-emerald-200 bg-white p-4"><div className="font-semibold text-slate-800">Saved profile reference</div><div className="mt-1 break-all font-mono text-xs text-slate-500">{savedProfile.profileId}</div><p className="mt-2 text-xs text-amber-700">Save this reference for support. Profile editing/retrieval will be enabled with login in a later phase.</p></section>}
      <form onSubmit={submit} className="space-y-5">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 md:px-6"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><UserRound size={20}/></div><div><h2 className="font-semibold text-slate-900">Personal information</h2><p className="mt-0.5 text-xs text-slate-500">Your contact and profile details</p></div></div>
          <div className="grid gap-5 p-5 md:grid-cols-2 md:p-6">
            <Field name="fullName" title="Full name" placeholder="Enter your full name" required/>
            <div><label className={labelClass} htmlFor="gender">Gender <span className="text-rose-500">*</span></label><select id="gender" className={inputClass} value={form.gender} onChange={event => set('gender', event.target.value)} required><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="prefer_not_to_say">Prefer not to say</option></select></div>
            <Field name="phone" title="Phone number" type="tel" placeholder="+91 98765 43210" required/>
            <Field name="email" title="Email address" type="email" placeholder="you@example.com" required/>
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 md:px-6"><div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700"><ShieldCheck size={20}/></div><div><h2 className="font-semibold text-slate-900">2Factor API configuration</h2><p className="mt-0.5 text-xs text-slate-500">One configuration per submitted profile</p></div><span className="ml-auto rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">1 configuration</span></div>
          <div className="space-y-5 p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-2"><Field name="nickname" title="Configuration nickname" placeholder="e.g. Production OTP" required/><div><label className={labelClass}>Provider</label><input className={inputClass + ' bg-slate-50 text-slate-500'} value="2Factor.in" readOnly/></div></div>
            <Field name="apiKey" title="2Factor API key" placeholder="Paste your API key" required secret/>
            <div className="grid gap-5 md:grid-cols-2"><Field name="smsToken" title="SMS token (optional)" placeholder="SMS token" secret/><Field name="callToken" title="Call token (optional)" placeholder="Call token" secret/><Field name="smsTemplateId" title="SMS template ID / name" placeholder="e.g. LOGIN_OTP"/><Field name="callTemplateId" title="Call template ID (optional)" placeholder="Voice template ID"/></div>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3.5"><input type="checkbox" checked={form.isActive} onChange={event => set('isActive', event.target.checked)} className="h-4 w-4 accent-blue-600"/><span><span className="block text-sm font-medium text-slate-800">Enable configuration</span><span className="mt-0.5 block text-xs text-slate-500">Mark this configuration as active after saving.</span></span></label>
            <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800"><LockKeyhole size={16} className="mt-0.5 shrink-0"/><span>API secrets are encrypted by the backend before storage. Login is not implemented yet, so this public form should only be used in a controlled test environment until authentication and ownership checks are added.</span></div>
          </div>
        </section>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-400">Fields marked * are required.</p><button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={17}/> : <Save size={17}/>}{saving ? 'Saving profile…' : 'Save profile & configuration'}</button></div>
      </form>
    </div>
  </main>;
}