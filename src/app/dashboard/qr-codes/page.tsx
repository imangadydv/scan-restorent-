'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useApp } from '@/lib/store';
import { QRCodeSVG } from 'qrcode.react';
import {
  Download,
  Printer,
  QrCode,
  Filter,
  CheckCircle,
  Building2,
} from 'lucide-react';

// QR Code Card Component
function QRCodeCard({ table, branchName, isSelected, onSelect, onDownload, onPrint }: any) {
  const getMenuUrl = (tableId: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/menu/${table.restaurantId}?table=${tableId}`;
  };

  return (
    <div
      onClick={() => onSelect(table.id)}
      className={`bg-white rounded-lg shadow-sm border p-4 text-center cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-slate-200'
      }`}
    >
      <QRCodeSVG
        id={`qr-${table.id}`}
        value={getMenuUrl(table.id)}
        size={120}
        level="H"
        includeMargin
        className="mx-auto"
      />
      <p className="text-lg font-bold text-slate-800 mt-2">
        Table {table.number}
      </p>
      <p className="text-xs text-slate-500">
        {branchName} | Floor {table.floor}
      </p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(table.id, table.number);
          }}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Download className="w-3 h-3" />
          Save
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrint(table.id, table.number);
          }}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Printer className="w-3 h-3" />
          Print
        </button>
      </div>
    </div>
  );
}

// QR Preview Component
function QRPreview({ table, restaurantName, onDownload, onPrint }: any) {
  const getMenuUrl = (tableId: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/menu/${table.restaurantId}?table=${tableId}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
      <div className="inline-block p-4 bg-orange-50 rounded-xl">
        <QRCodeSVG
          id={`qr-preview-${table.id}`}
          value={getMenuUrl(table.id)}
          size={180}
          level="H"
          includeMargin
          fgColor="#1F2937"
          className="bg-white rounded-lg p-2"
        />
      </div>
      <p className="text-xl font-bold text-slate-800 mt-3">
        Table {table.number}
      </p>
      <p className="text-sm text-slate-500">{restaurantName}</p>
      <p className="text-xs text-slate-400 mt-1">Scan to order</p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onDownload(table.id, table.number)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={() => onPrint(table.id, table.number)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>
    </div>
  );
}

// Main QR Codes Page
export default function QRCodesPage() {
  const { currentRestaurant, tables, branches } = useApp();
  const [filterBranch, setFilterBranch] = useState('all');
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  // Get restaurant branches
  const restaurantBranches = useMemo(
    () => branches.filter(b => b.restaurantId === currentRestaurant?.id),
    [branches, currentRestaurant]
  );

  // Get restaurant tables
  const restaurantTables = useMemo(() => {
    let result = tables.filter(t => t.restaurantId === currentRestaurant?.id);
    if (filterBranch !== 'all') {
      result = result.filter(t => t.branchId === filterBranch);
    }
    return result.sort((a, b) => a.number - b.number);
  }, [tables, currentRestaurant, filterBranch]);

  // Get branch name
  const getBranchName = (branchId: string) => {
    return branches.find(b => b.id === branchId)?.name || 'Unknown';
  };

  // Download QR as PNG
  const downloadQR = useCallback((tableId: string, tableNumber: number) => {
    const svgElement = document.getElementById(`qr-${tableId}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 480;
      if (ctx) {
        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw QR code
        ctx.drawImage(img, 50, 20, 300, 300);
        
        // Add text
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Table ${tableNumber}`, 200, 360);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText(currentRestaurant?.name || '', 200, 390);
        ctx.fillText('Scan to order', 200, 420);
      }

      // Download image
      const link = document.createElement('a');
      link.download = `QR-Table-${tableNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [currentRestaurant]);

  // Print QR
  const printQR = useCallback((tableId: string, tableNumber: number) => {
    const svgElement = document.getElementById(`qr-${tableId}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - Table ${tableNumber}</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              h1 { font-size: 28px; margin: 20px 0 5px; color: #1F2937; }
              p { font-size: 16px; color: #6B7280; margin: 5px; }
              svg { width: 300px; height: 300px; margin: 20px auto; display: block; }
            </style>
          </head>
          <body>
            ${svgData}
            <h1>Table ${tableNumber}</h1>
            <p>${currentRestaurant?.name || ''}</p>
            <p>Scan to order</p>
            <script>window.onload = function() { window.print(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }, [currentRestaurant]);

  const selectedTable = restaurantTables.find(t => t.id === selectedTableId);

  if (!currentRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <QrCode className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No restaurant selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">QR Codes</h1>
        <p className="text-sm text-slate-500 mt-1">
          Generate and manage QR codes for your tables
        </p>
      </div>

      {/* Branch Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-slate-400" />
          <select
            value={filterBranch}
            onChange={(e) => {
              setFilterBranch(e.target.value);
              setSelectedTableId(null);
            }}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
          >
            <option value="all">All Branches</option>
            {restaurantBranches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* QR Preview for Selected Table */}
      {selectedTable && (
        <div>
          <h2 className="font-semibold text-slate-800 mb-3">Preview</h2>
          <QRPreview
            table={selectedTable}
            restaurantName={currentRestaurant.name}
            onDownload={downloadQR}
            onPrint={printQR}
          />
        </div>
      )}

      {/* All QR Codes Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-800">All Table QR Codes</h2>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Filter className="w-3 h-3" />
            <span>{restaurantTables.length} tables</span>
          </div>
        </div>

        {restaurantTables.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">No tables found</h3>
            <p className="text-sm text-slate-500">Add tables first to generate QR codes</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {restaurantTables.map(table => (
              <QRCodeCard
                key={table.id}
                table={table}
                branchName={getBranchName(table.branchId)}
                isSelected={selectedTableId === table.id}
                onSelect={setSelectedTableId}
                onDownload={downloadQR}
                onPrint={printQR}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}