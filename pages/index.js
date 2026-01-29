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
    // Gunakan konfigurasi khusus untuk html2canvas agar tidak terpotong
    const canvas = await html2canvas(element, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 1000,
      height: 700
    });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Sertifikat-Elite-${name}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-[#020617] font-sans text-slate-200">
      <Head>
        <title>CodeDev | Professional Certificate Fix</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PANEL EDITOR */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-2xl h-fit sticky top-5">
          <h2 className="text-2xl font-black mb-6 text-[#EAB308]">Editor Panel</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penerima</label>
              <input 
                type="text" 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl mt-1 text-white outline-none focus:border-[#EAB308]"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pendiri (CEO)</label>
              <input 
                type="text" 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl mt-1 text-white outline-none focus:border-[#EAB308]"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Tanda Tangan</label>
              <div className="bg-white rounded-xl border-2 border-slate-700 overflow-hidden">
                <SignatureCanvas 
                  ref={sigCanvas}
                  penColor='black'
                  canvasProps={{ className: "w-full h-32 cursor-crosshair" }}
                  onEnd={saveSignature}
                />
              </div>
              <button onClick={clearSignature} className="mt-2 text-[10px] font-bold text-red-400 flex items-center gap-1 hover:underline">
                <Eraser size={12} /> HAPUS CORETAN
              </button>
            </div>

            <button 
              onClick={downloadCertificate}
              className="w-full bg-[#EAB308] text-slate-950 py-4 rounded-xl font-black shadow-lg hover:bg-yellow-400 transition-all active:scale-95"
            >
              DOWNLOAD SERTIFIKAT
            </button>
          </div>
        </div>

        {/* PREVIEW SERTIFIKAT */}
        <div className="lg:col-span-8 flex flex-col items-center overflow-x-auto pb-20">
          <div 
            ref={certRef}
            className="relative bg-white w-[1000px] h-[700px] flex flex-col justify-between p-12 border-[16px] border-[#EAB308] shadow-2xl overflow-hidden"
            style={{ minWidth: '1000px' }}
          >
            {/* INNER BORDER DECORATION */}
            <div className="absolute inset-4 border border-[#EAB308]/20 pointer-events-none z-0"></div>

            {/* HEADER SECTION */}
            <div className="flex justify-between items-start z-10">
              <div className="text-left">
                <h1 className="text-5xl font-black text-slate-950 tracking-tighter leading-none m-0 p-0">CODE<span className="text-[#EAB308]">DEV</span></h1>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400 mt-2">The Standard of Digital Excellence</p>
              </div>

              {/* RENDER ULANG RIBBON BADGE AGAR PRESISI */}
              <div className="absolute top-0 right-10 w-32 h-48 z-30">
                <div className="bg-gradient-to-b from-[#b8860b] to-[#926d08] w-full h-full shadow-lg flex flex-col items-center pt-6 text-white">
                  <span className="text-[8px] font-bold tracking-widest text-center leading-tight mb-4">SERTIFIKAT<br/>ELITE JS</span>
                  
                  {/* JS LOGO FIX - Gunakan Flex Center */}
                  <div className="w-16 h-16 bg-slate-950 rounded-lg border border-white/20 flex flex-col items-center justify-center rotate-3 shadow-inner">
                    <div className="flex gap-0.5 mb-0.5">
                      <Star size={8} fill="white" />
                      <Star size={10} fill="white" className="-translate-y-0.5" />
                      <Star size={8} fill="white" />
                    </div>
                    <span className="text-2xl font-black italic -mt-1">JS</span>
                  </div>
                  
                  <span className="mt-3 text-[8px] font-bold opacity-70 tracking-tighter">OFFICIAL VERIFIED</span>

                  {/* Ribbon Tail */}
                  <div className="absolute -bottom-6 left-0 right-0 h-6 flex">
                    <div className="w-1/2 h-full bg-[#926d08]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                    <div className="w-1/2 h-full bg-[#926d08]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* BODY SECTION */}
            <div className="text-center z-10 mt-[-20px]">
              <p className="text-[11px] font-bold text-slate-300 tracking-[0.6em] uppercase mb-4">Certificate of Excellence</p>
              <p className="text-xs text-slate-400 italic mb-6">Diberikan secara terhormat kepada:</p>
              
              <h3 className="text-[64px] font-black text-slate-900 leading-none tracking-tight mb-8" style={{fontFamily: "'Outfit', sans-serif"}}>
                {name || "NAMA LENGKAP ANDA"}
              </h3>

              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-20 h-[2px] bg-slate-100"></div>
                <Star size={16} fill="#EAB308" className="text-[#EAB308]" />
                <div className="w-20 h-[2px] bg-slate-100"></div>
              </div>

              <p className="max-w-2xl mx-auto text-slate-500 leading-relaxed text-lg font-medium">
                Telah teruji dan dinyatakan kompeten dalam penguasaan <br/>
                <span className="text-slate-950 font-black border-b-4 border-[#EAB308]"> ADVANCED JAVASCRIPT ECOSYSTEM </span> <br/>
                serta diakui secara profesional oleh CodeDev Technology Academy.
              </p>
            </div>

            {/* FOOTER SECTION FIX - Pastikan Z-Index Tinggi & Layout Flex */}
            <div className="flex justify-between items-end w-full z-20 pb-4">
              
              {/* Sisi Kiri: Pendiri & Tanggal */}
              <div className="text-left min-w-[200px]">
                <div className="h-20 flex items-end mb-2 relative">
                  {signature ? (
                    <img src={signature} alt="Sign" className="max-h-full mix-blend-multiply scale-110 origin-bottom-left" />
                  ) : (
                    <div className="w-40 border-b border-dashed border-slate-300 mb-6"></div>
                  )}
                </div>
                <div className="border-t-2 border-slate-900 pt-1">
                  <p className="text-xl font-black text-slate-950 uppercase leading-none">{founder}</p>
                  <p className="text-[9px] font-bold text-[#EAB308] uppercase tracking-widest mt-1">Chief Executive Officer</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Diterbitkan: {date}</p>
                </div>
              </div>

              {/* Sisi Kanan: QR & Verifikasi */}
              <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticity Check</p>
                  <p className="text-[8px] font-mono text-slate-500 mb-2">codedevsyntax.vercel.app</p>
                  <div className="bg-slate-950 text-white text-[8px] font-bold px-3 py-1 rounded-full">
                    ID: CD-2026-{Math.floor(Math.random() * 900000) + 100000}
                  </div>
                </div>
                <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-inner">
                  <QRCodeCanvas 
                    value={`https://codedevsyntax.vercel.app/verify/${name.replace(/\s+/g, '-').toLowerCase()}`} 
                    size={70}
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
