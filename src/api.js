const BASE_URL = import.meta.env.DEV ? '/api/api' : (import.meta.env.VITE_API_URL || 'https://beporto.vercel.app/api/api');

export const fetchProjects = async ({ category, page = 1 }) => {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (page) params.append('page', page);
  
  const url = `${BASE_URL}/projects?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  
  const json = await response.json();
  // Handle double wrapping or single wrapping
  return json.data?.data || json.data || json;
};

export const fetchCertificates = async () => {
  const response = await fetch(`${BASE_URL}/certificates`);
  if (!response.ok) throw new Error('Network response was not ok');
  
  const json = await response.json();
  return json.data?.data || json.data || json;
};

export const fetchProjectDetail = async (id) => {
  if (!id) return null;
  const response = await fetch(`${BASE_URL}/projects/${id}`);
  if (!response.ok) throw new Error('Project not found');
  
  const json = await response.json();
  const data = json.data?.data || json.data || json;
  return data;
};
