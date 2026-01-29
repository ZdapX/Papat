import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Upload, Award } from 'lucide-react';

export default function CertificateGenerator() {
  const [name, setName] = useState('DAFA PUTRA NAWAWI');
  const [founder, setFounder] = useState('Narendra Wicaksono');
  const [signature, setSignature] = useState(null);
  const [date, setDate] = useState('');
  const certRef = useRef(null);

  // Set real-time date
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
    const canvas = await html2canvas(element, {
      scale: 3, // High quality
      useCORS: true,
    });
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `Sertifikat-${name}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans">
      <Head>
        <title>CodeDev | Certificate Generator</title>
      </Head>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SIDEBAR INPUT */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Editor Sertifikat</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Penerima</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Pendiri (CEO)</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Tanda Tangan (PNG)</label>
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Pilih File</span>
                      <input type="file" className="sr-only" onChange={handleSignatureUpload} accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={downloadCertificate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Download size={20} /> Download Sertifikat
            </button>
          </div>
        </div>

        {/* CERTIFICATE PREVIEW */}
        <div className="lg:col-span-2 flex justify-center overflow-x-auto">
          <div 
            ref={certRef}
            className="relative bg-white w-[800px] h-[560px] shadow-2xl overflow-hidden border-[16px] border-[#1a2e4c]"
            style={{ minWidth: '800px' }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute rotate-45 -top-20 -left-20 w-64 h-64 bg-blue-900 rounded-full"></div>
              <div className="absolute rotate-45 -bottom-20 -right-20 w-96 h-96 bg-blue-900 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="p-12 flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black text-[#1a2e4c] tracking-tighter">
                  Code<span className="text-blue-600">Dev</span>
                </h1>
                <p className="text-xs tracking-[0.2em] text-gray-500 font-bold uppercase">Academy of Technology</p>
              </div>
              <div className="bg-[#1a2e4c] text-white p-4 text-center rounded-b-lg">
                <Award size={40} className="mx-auto text-yellow-400 mb-1" />
                <p className="text-[10px] font-bold uppercase leading-tight">Sertifikat<br/>Kelulusan</p>
              </div>
            </div>

            {/* Content */}
            <div className="px-16 text-center">
              <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Diberikan kepada</p>
              <h2 className="text-4xl font-serif font-bold text-[#1a2e4c] mb-2 border-b-2 border-yellow-500 inline-block px-8 pb-2">
                {name || "NAMA LENGKAP"}
              </h2>
              <p className="mt-6 text-gray-600 italic">
                Telah berhasil menyelesaikan kelas pelatihan intensif di CodeDev
              </p>
              <h3 className="text-2xl font-bold text-blue-600 mt-2">
                Professional Web Development Mastery
              </h3>
            </div>

            {/* Footer */}
            <div className="absolute bottom-12 left-0 right-0 px-16 flex justify-between items-end">
              <div className="text-left">
                <p className="text-xs text-gray-400 mb-1">{date}</p>
                <div className="h-16 w-40 flex items-center justify-start overflow-hidden mb-2">
                   {signature ? (
                     <img src={signature} alt="Signature" className="max-h-full" />
                   ) : (
                     <div className="h-px w-full bg-gray-300"></div>
                   )}
                </div>
                <p className="text-sm font-bold text-[#1a2e4c]">{founder}</p>
                <p className="text-[10px] text-gray-500">Chief Executive Officer, CodeDev</p>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="bg-white p-1 border border-gray-200 mb-2">
                   <QRCodeCanvas value={`https://codedev.id/verify/${name.replace(/\s+/g, '-').toLowerCase()}`} size={60} />
                </div>
                <p className="text-[10px] font-mono text-gray-400 tracking-tighter">
                  ID: CD-{Math.floor(Math.random() * 1000000)}<br/>
                  Berlaku hingga {new Date().getFullYear() + 3}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer Branding */}
      <footer className="text-center mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CodeDev Indonesia. Built for Professionalism.
      </footer>
    </div>
  );
}
