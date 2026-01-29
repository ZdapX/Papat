import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ShieldCheck, Eraser, PenTool, Star } from 'lucide-react';
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
    link.download = `Sertifikat-Modern-CodeDev-${name}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-[#020617]">
      <Head>
        <title>CodeDev | Modern Certificate Generator</title>
      </Head>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PANEL CONTROL */}
        <div className="lg:col-span-4 bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-2xl text-white h-fit">
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">Editor <br/>Sertifikat</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Penerima Sertifikat</label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl mt-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Nama CEO</label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl mt-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </div>

            {/* SIGNATURE PAD */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Tanda Tangan Digital</label>
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
                className="w-full mt-3 flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 py-3 rounded-xl text-xs font-bold transition-all"
              >
                <Eraser size={14} /> Reset Tanda Tangan
              </button>
            </div>

            <button 
              onClick={downloadCertificate}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]"
            >
              <Download size={22} /> CETAK SERTIFIKAT
            </button>
          </div>
        </div>

        {/* PREVIEW SERTIFIKAT */}
        <div className="lg:col-span-8 flex justify-center items-start overflow-x-auto pb-10">
          <div 
            ref={certRef}
            className="relative bg-white w-[1000px] h-[700px] overflow-hidden flex flex-col items-center justify-between p-20 shadow-2xl border-[24px] border-slate-950"
            style={{ minWidth: '1000px' }}
          >
            {/* Minimalist Tech Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', size: '20px 20px' }}></div>

            {/* LOGO PIAGAM GOLD (JS STYLE) */}
            <div className="absolute top-12 right-12 flex flex-col items-center gap-2">
                <div className="w-24 h-24 bg-[#EAB308] rounded-lg shadow-xl flex flex-col items-center justify-center relative transform rotate-[-5deg] border-4 border-white">
                   <Star size={40} fill="white" className="text-white mb-1" />
                   <span className="text-[10px] font-black text-white tracking-widest uppercase">EXCELLENCE</span>
                   {/* JS Square Effect */}
                   <div className="absolute bottom-1 right-1 font-black text-white/40 text-sm">2026</div>
                </div>
            </div>

            {/* Header */}
            <div className="w-full flex justify-start items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-950 flex items-center justify-center rounded-xl">
                  <ShieldCheck size={28} className="text-[#EAB308]" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-950 tracking-tighter leading-none">CODE<span className="text-[#EAB308]">DEV</span></h1>
                  <p className="text-[8px] font-black tracking-[0.4em] uppercase text-slate-400">Verified Tech Academy</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-center z-10 w-full">
              <h2 className="cert-header-font text-5xl text-slate-950 mb-4 opacity-20">CERTIFICATE</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-8">PENGHARGAAN DIBERIKAN KEPADA</p>
              
              <h3 className="modern-name text-[70px] font-black text-slate-950 leading-none mb-10 tracking-tight">
                {name || "YOUR NAME HERE"}
              </h3>

              <div className="w-24 h-1 bg-[#EAB308] mx-auto mb-10"></div>

              <p className="max-w-2xl mx-auto text-slate-500 leading-relaxed text-lg font-medium">
                Dinyatakan lulus dengan predikat <span className="text-slate-950 font-black italic underline decoration-[#EAB308] decoration-4">Sangat Memuaskan</span> dalam program 
                pelatihan profesional pengembangan ekosistem teknologi modern CodeDev.
              </p>
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end z-10 pt-10">
              {/* Left: Founder */}
              <div className="text-left">
                <div className="h-24 flex items-end mb-2 relative min-w-[200px]">
                   {signature ? (
                     <img src={signature} alt="Sign" className="max-h-full mix-blend-multiply transition-all scale-125 origin-bottom-left" />
                   ) : (
                     <div className="w-48 h-[1px] bg-slate-200 mb-6"></div>
                   )}
                </div>
                <p className="text-2xl font-black text-slate-950 tracking-tighter">{founder}</p>
                <p className="text-[10px] font-black text-[#EAB308] uppercase tracking-widest">Chief Executive Officer</p>
                <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase">{date}</p>
              </div>

              {/* Right: Security & QR */}
              <div className="flex items-center gap-6">
                <div className="text-right border-r-2 border-slate-100 pr-6">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Authenticity Link</p>
                   <p className="text-[9px] font-mono text-slate-400 truncate w-32 tracking-tighter">codedevsyntax.vercel.app/verify</p>
                   <div className="mt-2 bg-slate-950 text-white text-[8px] font-black px-2 py-1 rounded-sm inline-block tracking-tighter">
                     ID: CD-{Math.floor(100000 + Math.random() * 900000)}
                   </div>
                </div>
                <div className="p-3 bg-white border-2 border-slate-50 rounded-2xl shadow-sm">
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
    </div>
  );
}
