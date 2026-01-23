/**
 * Breadcrumb label mappings for route segments
 * Maps URL path segments to human-readable labels
 */
export const BREADCRUMB_LABELS: Record<string, string> = {
  // Main sections
  admin: 'Admin',
  manager: 'Manager',
  agent: 'Agent',
  
  // Admin routes
  onboarding: 'Onboarding',
  knowledge: 'Knowledge',
  intents: 'Intents',
  features: 'Features',
  dashboards: 'Dashboards',
  automation: 'Automation',
  'data-retention': 'Data Retention',
  'audit-logs': 'Audit Logs',
  
  // Agent routes
  'live-call': 'Live Call',
  'post-call': 'Post Call',
  sop: 'SOP',
  chat: 'Chat Assistant',
  
  // Manager routes
  overview: 'Overview',
  agents: 'Agents',
  sessions: 'Sessions',
  'live-monitoring': 'Live Monitoring',
  intelligence: 'Intelligence',
};

/**
 * Formats a URL segment into a readable breadcrumb label
 * @param segment - The URL path segment (e.g., "data-retention")
 * @returns Formatted label (e.g., "Data Retention")
 */
export function formatBreadcrumbLabel(segment: string): string {
  // Check if we have a custom label mapping
  if (BREADCRUMB_LABELS[segment]) {
    return BREADCRUMB_LABELS[segment];
  }
  
  // Fallback: Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates breadcrumb items from a pathname
 * @param pathname - The current pathname (e.g., "/admin/features")
 * @returns Array of breadcrumb items with label and href
 */
export function generateBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
  const segments = pathname.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = formatBreadcrumbLabel(segment);
    
    return { label, href };
  });
}
