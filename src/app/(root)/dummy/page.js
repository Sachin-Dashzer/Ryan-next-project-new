// pages/index.js

"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function WhatsAppSender() {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [sentNumbers, setSentNumbers] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState([]);
  const [inputNumbers, setInputNumbers] = useState('');

  // Load sent numbers from localStorage on component mount
  useEffect(() => {
    const savedSentNumbers = JSON.parse(localStorage.getItem('sentNumbers') || '[]');
    setSentNumbers(savedSentNumbers);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setInputNumbers(content);
      processPhoneNumbers(content);
    };
    reader.readAsText(file);
  };

  const processPhoneNumbers = (numbersText) => {
    const numbersArray = numbersText
      .split('\n')
      .map(num => num.trim())
      .filter(num => num !== '' && /^\d+$/.test(num));
    
    setPhoneNumbers(numbersArray);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputNumbers(value);
    processPhoneNumbers(value);
  };

  const sendMessages = async () => {
    if (phoneNumbers.length === 0) {
      setLog(prev => [...prev, 'ERROR: No phone numbers to send']);
      return;
    }

    setIsSending(true);
    setProgress(0);
    setLog([]);
    
    const totalNumbers = phoneNumbers.length;
    const apiUrl = 'https://crmapi.com.bot/api/meta/v19.0/638313309373363/messages';
    const bearerToken = 'fjHotv550CBLgg9ALdREFTSAntTtMknGqVU5ERVJTQ09SRQTdg2nXKaHCnZFb9sXwcn1Uq8dg4ttejEt1A1vV4AXtp4Bfirh32OzYv8aNa2Weg5h1y7OVhcC8IcsRFDt1sd4dgnVU5ERVJTQ09SRQHuTd0';
    
    const updatedSentNumbers = [...sentNumbers];
    const newLog = [...log];
    
    for (let i = 0; i < totalNumbers; i++) {
      const phoneNumber = phoneNumbers[i];
      
      // Skip if already sent
      if (updatedSentNumbers.includes(phoneNumber)) {
        newLog.push(`SKIPPED: ${phoneNumber} (already sent)`);
        setLog([...newLog]);
        setProgress(((i + 1) / totalNumbers) * 100);
        continue;
      }
      
      try {
        // API Payload
        const whatsappPayload = {
          messaging_product: "whatsapp",
          to: phoneNumber,
          recipient_type: "individual",
          type: "template",
          template: {
            language: { policy: "deterministic", code: "en_GB" },
            name: "bulk_templeate",
            components: []
          }
        };
            
        
        // API Request
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify(whatsappPayload)
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
          newLog.push(`SENT TO: ${phoneNumber} | Response: ${JSON.stringify(responseData)}`);
          updatedSentNumbers.push(phoneNumber);
          localStorage.setItem('sentNumbers', JSON.stringify(updatedSentNumbers));
        } else {
          newLog.push(`ERROR: ${phoneNumber} | ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        newLog.push(`ERROR: ${phoneNumber} | ${error.message}`);
      }
      
      setLog([...newLog]);
      setProgress(((i + 1) / totalNumbers) * 100);
      setSentNumbers([...updatedSentNumbers]);
      
      // Scroll to the bottom of the log
      setTimeout(() => {
        const logContainer = document.getElementById('log-container');
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      }, 0);
      
      // Delay to avoid rate limits (200ms)
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsSending(false);
  };

  const clearSentNumbers = () => {
    localStorage.removeItem('sentNumbers');
    setSentNumbers([]);
    setLog(prev => [...prev, 'Cleared sent numbers history']);
  };

  const clearAll = () => {
    setPhoneNumbers([]);
    setInputNumbers('');
    setLog([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Head>
        <title>WhatsApp Message Sender</title>
        <meta name="description" content="Send WhatsApp messages via API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">WhatsApp Message Sender</h1>
        <p className="text-center text-gray-600 mb-8">Send template messages to multiple numbers</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <p className="text-indigo-800 font-semibold">Total Numbers</p>
            <p className="text-2xl font-bold text-indigo-600">{phoneNumbers.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <p className="text-green-800 font-semibold">Sent Numbers</p>
            <p className="text-2xl font-bold text-green-600">{sentNumbers.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <p className="text-blue-800 font-semibold">Remaining</p>
            <p className="text-2xl font-bold text-blue-600">{phoneNumbers.length - sentNumbers.length}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="phoneInput" className="block text-sm font-medium text-gray-700 mb-1">
                Enter phone numbers (one per line)
              </label>
              <textarea
                id="phoneInput"
                className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={inputNumbers}
                onChange={handleInputChange}
                placeholder="Enter phone numbers, one per line"
              />
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">or upload a text file</p>
                <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload File
                  <input 
                    type="file" 
                    accept=".txt,.csv" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <button 
              onClick={sendMessages} 
              disabled={isSending || phoneNumbers.length === 0}
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Start Sending Messages
                </>
              )}
            </button>
            
            <button 
              onClick={clearSentNumbers} 
              disabled={isSending}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Sent History
            </button>
            
            <button 
              onClick={clearAll} 
              disabled={isSending}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
              Clear All
            </button>
          </div>
        </div>
        
        {isSending && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-indigo-700">Progress</span>
              <span className="text-sm font-medium text-indigo-700">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-indigo-700 text-white px-4 py-2 font-semibold">Activity Log</div>
          <div id="log-container" className="h-64 overflow-y-auto p-4 bg-gray-800 text-green-300 font-mono text-sm">
            {log.length === 0 ? (
              <div className="text-gray-500">No activity yet. Upload numbers and start sending to see logs.</div>
            ) : (
              log.map((entry, index) => (
                <div key={index} className="mb-1 last:mb-0">
                  {entry.includes('ERROR:') ? (
                    <span className="text-red-400">{entry}</span>
                  ) : entry.includes('SKIPPED:') ? (
                    <span className="text-yellow-400">{entry}</span>
                  ) : (
                    <span className="text-green-400">{entry}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Note: Messages are sent with a 200ms delay between each to avoid rate limiting.</p>
        </div>
      </main>
    </div>
  );
}