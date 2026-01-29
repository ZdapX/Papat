import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ShieldCheck, Eraser, PenTool } from 'lucide-react';
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

  // Fungsi untuk menyimpan hasil coretan ke sertifikat
  const saveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      setSignature(dataURL);
    }
  };

  // Fungsi hapus coretan
  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  const downloadCertificate = async () => {
    const element = certRef.current;
    const canvas = await html2canvas(element, { 
      scale: 3, 
      useCORS: true,
      backgroundColor: null 
    });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Sertifikat-CodeDev-${name}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-[#0f172a]">
      <Head>
        <title>CodeDev | Signature Draw</title>
      </Head>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* PANEL CONTROL */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl text-white h-fit">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Editor Sertifikat</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold opacity-70 uppercase tracking-widest">Nama Penerima</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="text-xs font-semibold opacity-70 uppercase tracking-widest">Nama CEO / Pendiri</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </div>

            {/* SIGNATURE PAD AREA */}
            <div>
              <label className="text-xs font-semibold opacity-70 uppercase tracking-widest block mb-2">Gambar Tanda Tangan Disini</label>
              <div className="bg-white rounded-xl overflow-hidden shadow-inner">
                <SignatureCanvas 
                  ref={sigCanvas}
                  penColor='black'
                  canvasProps={{
                    className: "w-full h-40 cursor-crosshair",
                  }}
                  onEnd={saveSignature}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={clearSignature}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 py-2 rounded-lg text-xs transition"
                >
                  <Eraser size={14} /> Hapus Coretan
                </button>
                <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/20 text-emerald-300 py-2 rounded-lg text-xs">
                  <PenTool size={14} /> Tanda Tangan Aktif
                </div>
              </div>
            </div>

            <button 
              onClick={downloadCertificate}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 mt-4"
            >
              <Download size={20} /> Download Sertifikat (PNG)
            </button>
          </div>
        </div>

        {/* PREVIEW SERTIFIKAT */}
        <div className="lg:col-span-8 flex justify-center items-start overflow-x-auto pb-10">
          <div 
            ref={certRef}
            className="relative bg-[#ffffff] w-[1000px] h-[700px] overflow-hidden flex flex-col items-center justify-between p-16 shadow-2xl border-[20px] border-[#1e293b]"
            style={{ minWidth: '1000px' }}
          >
            {/* Ornamen Mewah */}
            <div className="absolute inset-4 border border-[#c5a059] pointer-events-none"></div>
            <div className="absolute inset-[18px] border-4 border-[#c5a059]/10 pointer-events-none"></div>

            {/* Header */}
            <div className="text-center z-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <ShieldCheck size={48} className="text-[#c5a059]" />
                <h1 className="text-6xl font-black text-[#1e293b] tracking-tighter">
                  CODE<span className="text-[#c5a059]">DEV</span>
                </h1>
              </div>
              <p className="text-sm tracking-[0.5em] uppercase font-bold text-gray-400">The Standard of Digital Excellence</p>
            </div>

            {/* Body */}
            <div className="text-center z-10 w-full px-10">
              <h2 className="text-6xl font-serif italic text-[#c5a059] mb-8" style={{fontFamily: 'serif'}}>Sertifikat Kelulusan</h2>
              <p className="text-lg text-gray-500 uppercase tracking-widest mb-4">Diberikan secara terhormat kepada</p>
              
              <div className="relative inline-block mb-10">
                <h3 className="text-5xl font-bold text-[#1e293b] px-12 pb-2">
                  {name || "NAMA LENGKAP"}
                </h3>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"></div>
              </div>

              <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed text-lg">
                Telah berhasil menunjukkan kompetensi luar biasa dan menyelesaikan kurikulum 
                <span className="font-bold text-[#1e293b]"> Fullstack Engineer & System Architect </span> 
                dengan predikat kelulusan memuaskan.
              </p>
            </div>

            {/* Footer Section */}
            <div className="w-full flex justify-between items-end z-10">
              {/* Founder Signature Area */}
              <div className="text-left w-64">
                <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-widest">{date}</p>
                <div className="h-24 flex items-end justify-start mb-2 relative">
                   {signature ? (
                     <img src={signature} alt="Digital Sign" className="max-h-full transition-opacity duration-500" />
                   ) : (
                     <div className="w-full border-b border-dashed border-gray-300 mb-4"></div>
                   )}
                </div>
                <p className="text-xl font-bold text-[#1e293b] border-t border-[#1e293b]/10 pt-1">{founder}</p>
                <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.2em]">Chief Executive Officer</p>
              </div>

              {/* QR Code & Security */}
              <div className="text-right flex flex-col items-end">
                <div className="p-2 bg-white border border-[#c5a059]/40 rounded-xl mb-3 shadow-lg">
                   <QRCodeCanvas 
                    value={`https://codedevsyntax.vercel.app/verify/${name.replace(/\s+/g, '-').toLowerCase()}`} 
                    size={85}
                    level="H"
                   />
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter">Verification ID: CD-{Math.floor(100000 + Math.random() * 900000)}</p>
                   <p className="text-[10px] font-black text-[#1e293b] tracking-widest">SECURE & VERIFIED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
