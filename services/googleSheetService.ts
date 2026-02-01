
import axios from 'axios';
import { SheetRow } from '../types';

const SHEET_ID = '1NS1v2-tfLP1b1Fo5XlisJ3S9LXSDmCNR7ra4wzbKJbA';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/**
 * Fetches the public Google Sheet data and parses the CSV into objects
 */
export async function fetchSheetData(): Promise<SheetRow[]> {
  try {
    const response = await axios.get(CSV_URL, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    const rows = response.data.split('\n');
    if (rows.length < 1) return [];

    const headers = rows[0].split(',').map((h: string) => h.trim().replace(/"/g, ''));
    const data: SheetRow[] = [];

    // Parse the rest of the rows (excluding headers)
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue;
      
      // Simple CSV parser that handles quotes
      const values = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((v: string) => v.trim().replace(/"/g, ''));
      const rowObj: SheetRow = {};
      
      headers.forEach((header: string, index: number) => {
        rowObj[header] = values[index] || '';
      });
      
      data.push(rowObj);
    }

    return data.reverse(); // Show newest first
  } catch (error) {
    console.error('Failed to fetch sheet data:', error);
    return [];
  }
}
