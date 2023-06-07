"use client"
import { useState } from 'react';
import useSWR from 'swr';
import Datepicker from "react-tailwindcss-datepicker";



export default function Home() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [tc, setTc] = useState('');
  const [gsm, setGsm] = useState('');
  const [classs, setClass] = useState('9');
  const [veliname, setVeliName] = useState('');
  const [kurum, setKurum] = useState('');
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    startDate: new Date(),
  });
  
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)

    console.log('mail send fired');

    if(!name || !surname || !gsm) {
      alert('Tüm bilgileri doldurunuz..')
    }

    // API rotasına POST isteği yapmak için fetch kullanın
    try {
      const response = await fetch('/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, tc, gsm, value, classs, veliname, kurum }),
      });

      const data = await response.json();
      console.log(data.message); // E-posta gönderildi!
      
      alert('Bilgileriniz alındı teşekkürler.  En kısa sürede size ulaşacağız..')
      setName('')
      setSurname('')
      setGsm('')
      setVeliName('')
      setLoading(false)

    } catch (error) {
      console.error('E-posta gönderilirken hata oluştu:', error);
    }
  };

  // inputların onchangine set et state'i
  return (
    <main className="p-5">
      <div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              TC
            </label>
            <input onChange={(e) => setTc(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="TC" />
            {/*<p className="text-red-500 text-xs italic">Lütfen bu alanı doldurunuz..</p>*/}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              İsim
            </label>
            <input onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="İsim" />
            {/*<p className="text-red-500 text-xs italic">Lütfen bu alanı doldurunuz..</p>*/}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Soyisim
            </label>
            <input onChange={(e) => setSurname(e.target.value)}  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Soyisim" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Telefon Numarası
            </label>
            <input onChange={(e) => setGsm(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="GSM" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Geçtiği Sınıf
            </label>
            <div className="relative">
              <select value={classs} onChange={(e) => setClass(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value={'9'}>9</option>
                <option value={'10'}>10</option>
                <option value={'11'}>11</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Kurum Tercihi
            </label>
            <div className="relative">
              <select value={kurum} onChange={(e) => setKurum(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value={'SEFAKÖY ENDERUN LİSE'}>SEFAKÖY ENDERUN LİSE</option>
                <option value={'SEYYİD KAMİL BEY ENDERUN LİSE'}>SEYYİD KAMİL BEY ENDERUN LİSE</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              Veli Adı
            </label>
            <input onChange={(e) => setVeliName(e.target.value)} className="disabled:opacity-25 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Veli adı" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              Doğum Tarihi
            </label>
            <Datepicker
                value={value}
                useRange={false} 
                asSingle={true} 
                onChange={handleValueChange}
            />
          </div>
        </div>

        <div>
        <button disabled={loading} type="submit" className="w-full mb-5 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
         Başvur
        </button>
        </div>
      </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023-2024 Bakırköy Enderun
        </p>
      </div>
    </main>
  );
}
