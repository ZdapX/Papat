import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Upload, ShieldCheck } from 'lucide-react';

export default function CertificateGenerator() {
  const [name, setName] = useState('DAFA PUTRA NAWAWI');
  const [founder, setFounder] = useState('Andri Haryanto');
  const [signature, setSignature] = useState(null);
  const [date, setDate] = useState('');
  const certRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    setDate(today.toLocaleDateString('id-ID', options));
  }, []);

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setSignature(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const downloadCertificate = async () => {
    const element = certRef.current;
    const canvas = await html2canvas(element, { scale: 3, useCORS: true });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Sertifikat-CodeDev-${name}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-10">
      <Head>
        <title>CodeDev | Premium Certificate</title>
      </Head>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* PANEL CONTROL */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl text-white h-fit">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Editor Sertifikat</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold opacity-70">Nama Lengkap</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="text-sm font-semibold opacity-70">Nama Pendiri (CEO)</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold opacity-70">Tanda Tangan (Upload PNG Transparan)</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition mt-2">
                <Upload className="text-blue-400 mb-2" />
                <span className="text-xs opacity-60">Klik untuk upload</span>
                <input type="file" className="hidden" onChange={handleSignatureUpload} accept="image/*" />
              </label>
            </div>

            <button 
              onClick={downloadCertificate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition shadow-xl"
            >
              <Download size={20} /> Download PNG
            </button>
          </div>
        </div>

        {/* PREVIEW SERTIFIKAT */}
        <div className="lg:col-span-8 flex justify-center items-start overflow-x-auto pb-10">
          <div 
            ref={certRef}
            className="relative bg-[#fafafa] w-[1000px] h-[700px] overflow-hidden flex flex-col items-center justify-between p-16 shadow-2xl border-[20px] border-[#1e293b]"
            style={{ minWidth: '1000px' }}
          >
            {/* Border Ornamen */}
            <div className="absolute inset-4 border border-[#c5a059] pointer-events-none"></div>
            <div className="absolute inset-8 border-2 border-[#c5a059]/30 pointer-events-none"></div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e293b]/5 rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a059]/5 rounded-tr-full pointer-events-none"></div>

            {/* Header */}
            <div className="text-center z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShieldCheck size={40} className="text-[#c5a059]" />
                <h1 className="text-5xl font-black text-[#1e293b] tracking-tighter">
                  CODE<span className="text-[#c5a059]">DEV</span>
                </h1>
              </div>
              <p className="text-sm tracking-[0.4em] uppercase font-bold text-gray-400">Academy of Excellence</p>
            </div>

            {/* Body */}
            <div className="text-center z-10 -mt-10">
              <h2 className="cert-title text-6xl text-[#c5a059] mb-8">Sertifikat Kelulusan</h2>
              <p className="text-lg text-gray-500 italic mb-6">Penghargaan ini diberikan dengan bangga kepada:</p>
              <h3 className="text-5xl font-bold text-[#1e293b] border-b-4 border-[#c5a059] px-12 pb-4 inline-block mb-8">
                {name || "NAMA LENGKAP"}
              </h3>
              <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
                Atas dedikasi dan keberhasilannya menyelesaikan program pelatihan intensif 
                <span className="font-bold text-[#1e293b]"> Professional Fullstack Web Development </span> 
                di CodeDev Academy dengan hasil yang sangat memuaskan.
              </p>
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end z-10">
              {/* Founder Section */}
              <div className="text-left w-64">
                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">{date}</p>
                <div className="h-20 flex items-end justify-start mb-2 border-b border-gray-300">
                   {signature && <img src={signature} alt="Sign" className="max-h-full mix-blend-multiply" />}
                </div>
                <p className="text-xl font-bold text-[#1e293b]">{founder}</p>
                <p className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">CEO CodeDev Indonesia</p>
              </div>

              {/* QR & Verification */}
              <div className="text-right flex flex-col items-end">
                <div className="p-2 bg-white border-2 border-[#c5a059] rounded-lg mb-4 shadow-md">
                   <QRCodeCanvas value={`https://codedevsyntax.vercel.app/verify/${name.replace(/\s+/g, '-')}`} size={80} />
                </div>
                <div className="bg-[#1e293b] text-white px-4 py-2 rounded-md">
                   <p className="text-[10px] font-mono tracking-tighter uppercase opacity-80">ID: CD-2026-{Math.floor(Math.random() * 90000) + 10000}</p>
                   <p className="text-[9px] font-bold text-[#c5a059]">VERIFIED CERTIFICATE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
