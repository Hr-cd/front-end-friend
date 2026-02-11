/**
 * API Service Layer for KMRL Document Management System
 * 
 * Replace the mock implementations below with your actual API calls.
 * All functions return promises so swapping in real fetch/axios calls is seamless.
 */

import {
  mockDocuments,
  mockStats,
  mockActivity,
  mockChartData,
  mockStatusData,
  type KMRLDocument,
  type DashboardStats,
} from "./mock-data";

// const API_BASE = "/api"; // Uncomment and set your API base URL

export async function fetchDashboardStats(): Promise<DashboardStats> {
  // return fetch(`${API_BASE}/stats`).then(r => r.json());
  return mockStats;
}

export async function fetchDocuments(): Promise<KMRLDocument[]> {
  // return fetch(`${API_BASE}/documents`).then(r => r.json());
  return mockDocuments;
}

export async function fetchDocument(id: string): Promise<KMRLDocument | undefined> {
  // return fetch(`${API_BASE}/documents/${id}`).then(r => r.json());
  return mockDocuments.find((d) => d.id === id);
}

export async function fetchActivity() {
  return mockActivity;
}

export async function fetchChartData() {
  return mockChartData;
}

export async function fetchStatusData() {
  return mockStatusData;
}

export async function uploadDocument(_formData: FormData): Promise<{ success: boolean }> {
  // return fetch(`${API_BASE}/documents/upload`, { method: "POST", body: formData }).then(r => r.json());
  return { success: true };
}

export async function approveDocument(_id: string, _comment: string): Promise<{ success: boolean }> {
  return { success: true };
}

export async function rejectDocument(_id: string, _comment: string): Promise<{ success: boolean }> {
  return { success: true };
}

export async function deleteDocument(_id: string): Promise<{ success: boolean }> {
  return { success: true };
}
