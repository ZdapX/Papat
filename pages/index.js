import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Eraser, Star } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

export default function CertificateGenerator() {
  const [name, setName] = useState('DAFA PUTRA NAWAWI');
  const [founder, setFounder] = useState('Andri Haryanto');
  const [signature, setSignature] = useState(null);
  const [date, setDate] = useState('');
  
  const certRef = useRef(null);
  const sigCanvas = useRef({});

  useEffect(() => {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    setDate(today.toLocaleDateString('id-ID', options));
  }, []);

  const saveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      setSignature(dataURL);
    }
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  const downloadCertificate = async () => {
    const element = certRef.current;
    const canvas = await html2canvas(element, { 
      scale: 3, 
      useCORS: true,
      backgroundColor: "#ffffff" 
    });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Sertifikat-Elite-CodeDev-${name}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-[#020617] font-sans text-slate-200">
      <Head>
        <title>CodeDev | Elite Gold Certificate</title>
      </Head>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PANEL CONTROL - SIDEBAR */}
        <div className="lg:col-span-4 bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl h-fit sticky top-10">
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-[#EAB308] to-yellow-200 bg-clip-text text-transparent italic">Certificate Editor</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Penerima Sertifikat</label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl mt-2 focus:ring-2 focus:ring-[#EAB308] outline-none transition-all font-medium text-white"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Nama CEO</label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl mt-2 focus:ring-2 focus:ring-[#EAB308] outline-none transition-all font-medium text-white"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </div>

            {/* SIGNATURE PAD */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Tulis Tanda Tangan</label>
              <div className="bg-white rounded-2xl overflow-hidden shadow-inner border-4 border-slate-800">
                <SignatureCanvas 
                  ref={sigCanvas}
                  penColor='black'
                  canvasProps={{ className: "w-full h-36 cursor-crosshair" }}
                  onEnd={saveSignature}
                />
              </div>
              <button 
                onClick={clearSignature}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-slate-800 hover:text-red-400 text-slate-400 py-3 rounded-xl text-xs font-bold transition-all"
              >
                <Eraser size={14} /> Hapus Coretan
              </button>
            </div>

            <button 
              onClick={downloadCertificate}
              className="w-full bg-[#EAB308] hover:bg-yellow-400 text-slate-950 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_15px_30px_-10px_rgba(234,179,8,0.5)]"
            >
              <Download size={22} /> CETAK SERTIFIKAT SEKARANG
            </button>
          </div>
        </div>

        {/* PREVIEW SERTIFIKAT */}
        <div className="lg:col-span-8 flex justify-center items-start overflow-x-auto pb-20">
          <div 
            ref={certRef}
            className="relative bg-white w-[1000px] h-[750px] overflow-hidden flex flex-col items-center justify-between p-20 shadow-2xl border-[20px] border-[#EAB308]"
            style={{ minWidth: '1000px' }}
          >
            {/* Inner Border Line */}
            <div className="absolute inset-4 border border-[#EAB308]/30 pointer-events-none"></div>

            {/* RIBBON BADGE ELITE (JS GOLD STYLE) */}
            <div className="absolute top-0 right-16 z-20">
                <div className="relative w-40 h-64 bg-gradient-to-b from-[#b8860b] via-[#EAB308] to-[#926d08] shadow-xl flex flex-col items-center pt-8 text-white px-4">
                    <p className="text-[10px] font-black tracking-widest text-center leading-tight mb-6">
                        SERTIFIKAT<br/>KOMPETENSI<br/>ELITE
                    </p>

                    {/* JS Logo Box */}
                    <div className="relative flex items-center justify-center w-24 h-24">
                        <div className="absolute w-20 h-20 bg-slate-950 rounded-md border-2 border-white/20 rotate-3"></div>
                        <div className="z-10 flex flex-col items-center translate-y-1">
                            <div className="flex gap-1 mb-1">
                                <Star size={12} fill="white" />
                                <Star size={16} fill="white" className="-translate-y-1" />
                                <Star size={12} fill="white" />
                            </div>
                            <span className="text-4xl font-black italic tracking-tighter -mt-2">JS</span>
                        </div>
                    </div>
                    <p className="mt-4 text-[9px] font-bold opacity-80 uppercase tracking-widest">CodeDev</p>
                    
                    {/* Ribbon Cut */}
                    <div className="absolute -bottom-8 left-0 right-0 h-8 flex">
                        <div className="w-1/2 h-full bg-[#926d08]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                        <div className="w-1/2 h-full bg-[#926d08]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}></div>
                    </div>
                </div>
            </div>

            {/* Header Brand (Logo AI Dihapus) */}
            <div className="w-full flex justify-start items-center z-10">
              <div className="text-left">
                <h1 className="text-5xl font-black text-slate-950 tracking-tighter leading-none">CODE<span className="text-[#EAB308]">DEV</span></h1>
                <p className="text-[11px] font-bold tracking-[0.5em] uppercase text-slate-400 mt-2 ml-1">The Standard of Digital Excellence</p>
              </div>
            </div>

            {/* Body Content */}
            <div className="text-center z-10 w-full">
              <h2 className="text-lg font-bold text-slate-300 uppercase tracking-[0.7em] mb-4">Certificate of Excellence</h2>
              <p className="text-sm text-slate-400 italic mb-8 uppercase tracking-widest">Diberikan secara terhormat kepada</p>
              
              {/* Modern Bold Name Font */}
              <h3 className="modern-name text-[76px] font-black text-slate-900 leading-none tracking-tighter mb-4 px-10">
                {name || "NAMA LENGKAP ANDA"}
              </h3>

              <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="w-24 h-[3px] bg-slate-100"></div>
                  <Star size={18} className="text-[#EAB308]" fill="#EAB308" />
                  <div className="w-24 h-[3px] bg-slate-100"></div>
              </div>

              <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed text-xl font-medium">
                Dinyatakan telah memenuhi standar kualifikasi tertinggi dalam kurikulum <br/>
                <span className="text-slate-950 font-black tracking-wide border-b-4 border-[#EAB308]"> ADVANCED TECHNOLOGY ECOSYSTEM </span> <br/>
                serta diakui kompetensinya sebagai tenaga profesional oleh CodeDev Academy.
              </p>
            </div>

            {/* Footer Section */}
            <div className="w-full flex justify-between items-end z-10 pt-10">
              {/* Signature Area */}
              <div className="text-left">
                <div className="h-28 flex items-end mb-2 relative min-w-[250px]">
                   {signature ? (
                     <img src={signature} alt="Sign" className="max-h-full mix-blend-multiply scale-125 origin-bottom-left" />
                   ) : (
                     <div className="w-56 h-[1px] bg-slate-200 mb-8 border-dashed border-t"></div>
                   )}
                </div>
                <div className="border-t-2 border-slate-950 w-64 pt-2">
                    <p className="text-2xl font-black text-slate-950 tracking-tighter uppercase">{founder}</p>
                    <p className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest mt-1">Chief Executive Officer, CodeDev</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-[0.2em]">{date}</p>
                </div>
              </div>

              {/* QR Code Security Section */}
              <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="text-right">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 underline decoration-[#EAB308] decoration-2">Verified System</p>
                   <p className="text-[9px] font-mono text-slate-400 mb-2 truncate w-32">codedevsyntax.vercel.app</p>
                   <div className="bg-slate-950 text-white text-[8px] font-black px-3 py-1.5 rounded-full inline-block tracking-widest">
                     ID: CD-2026-{Math.floor(100000 + Math.random() * 900000)}
                   </div>
                </div>
                <div className="p-2 bg-white rounded-2xl border border-slate-100 shadow-inner">
                   <QRCodeCanvas 
                    value={`https://codedevsyntax.vercel.app/verify/${name.replace(/\s+/g, '-').toLowerCase()}`} 
                    size={80}
                    level="H"
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-name {
          font-family: 'Outfit', sans-serif;
          filter: drop-shadow(0 4px 4px rgba(0,0,0,0.05));
        }
      `}</style>
    </div>
  );
}
